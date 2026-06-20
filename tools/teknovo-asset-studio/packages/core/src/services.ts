import fs from 'node:fs';
import path from 'node:path';
import mime from 'mime-types';
import { v7 as uuidv7 } from 'uuid';
import { z } from 'zod';
import { createAssetManifest, createR3FComponentSource } from '@teknovo-asset-studio/preview';
import type { AssetCategory, AssetRecord, CreateAssetFromExistingFileInput, CreateAssetFromUploadInput, DashboardSummary, JobRecord, StudioPaths } from './types';
import { AssetRepository, JobRepository } from './repositories';

const assetSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  category: z.enum(['model', 'texture', 'material', 'scene', 'video', 'image', 'audio', 'document']),
  description: z.string().trim().max(1000).optional(),
  tags: z.array(z.string().trim().min(1).max(32)).default([])
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'asset';
}

function detectCategory(fileName: string): AssetCategory {
  const ext = path.extname(fileName).toLowerCase();
  if (['.glb', '.gltf', '.fbx', '.obj', '.blend', '.stl'].includes(ext)) return 'model';
  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.ktx2'].includes(ext)) return 'image';
  if (['.mp4', '.webm', '.mov'].includes(ext)) return 'video';
  if (['.mp3', '.wav', '.ogg'].includes(ext)) return 'audio';
  return 'document';
}

function createAssetRecord(params: {
  input: CreateAssetFromExistingFileInput | CreateAssetFromUploadInput;
  storedPath: string;
  relativePath: string;
  sizeBytes: number;
}): AssetRecord {
  const now = new Date().toISOString();
  const originalName = params.input.originalName;
  const extension = path.extname(originalName).toLowerCase();
  const category = params.input.category ?? detectCategory(originalName);
  const parsed = assetSchema.parse({
    ...params.input,
    category,
    tags: params.input.tags ?? []
  });
  const derivedName = parsed.name ?? (path.basename(originalName, extension) || 'Untitled asset');

  return {
    id: uuidv7(),
    slug: slugify(derivedName),
    name: derivedName,
    category: parsed.category,
    status: 'draft',
    description: parsed.description ?? null,
    originalName,
    fileName: path.basename(params.storedPath),
    extension,
    mimeType: ('mimeType' in params.input && params.input.mimeType) ? params.input.mimeType : mime.lookup(originalName) || 'application/octet-stream',
    filePath: params.storedPath,
    relativePath: params.relativePath,
    sizeBytes: params.sizeBytes,
    tags: parsed.tags,
    metadata: {
      extension,
      ingestSource: 'buffer' in params.input ? 'upload' : 'existing-file'
    },
    analysis: null,
    validation: null,
    deployment: null,
    manifestPath: null,
    exportPath: null,
    createdAt: now,
    updatedAt: now,
    deletedAt: null
  };
}

export class AssetService {
  constructor(
    private readonly assets: AssetRepository,
    private readonly jobs: JobRepository,
    private readonly paths: StudioPaths
  ) {}

  listAssets(): AssetRecord[] {
    return this.assets.list();
  }

  getAsset(id: string): AssetRecord | null {
    return this.assets.getById(id);
  }

  createAssetFromUpload(input: CreateAssetFromUploadInput): AssetRecord {
    const assetId = uuidv7();
    const directory = path.join(this.paths.assetDir, assetId);
    fs.mkdirSync(directory, { recursive: true });
    const safeFileName = `${slugify(path.basename(input.originalName, path.extname(input.originalName)))}${path.extname(input.originalName).toLowerCase()}`;
    const storedPath = path.join(directory, safeFileName);
    fs.writeFileSync(storedPath, input.buffer);
    const relativePath = path.relative(this.paths.rootDir, storedPath);
    const asset = createAssetRecord({ input, storedPath, relativePath, sizeBytes: input.buffer.byteLength });
    asset.id = assetId;
    this.assets.insert(asset);
    this.logJob(asset.id, 'manifest', 'success', 'Asset uploaded', { fileName: safeFileName });
    return asset;
  }

  createAssetFromExistingFile(input: CreateAssetFromExistingFileInput): AssetRecord {
    const stats = fs.statSync(input.filePath);
    const asset = createAssetRecord({
      input,
      storedPath: input.filePath,
      relativePath: path.relative(this.paths.rootDir, input.filePath),
      sizeBytes: stats.size
    });
    this.assets.insert(asset);
    this.logJob(asset.id, 'manifest', 'success', 'Asset registered from existing file', { originalName: input.originalName });
    return asset;
  }

  updateAsset(id: string, patch: Partial<AssetRecord>): AssetRecord {
    return this.assets.update(id, patch);
  }

  saveAnalysis(id: string, analysis: Record<string, unknown>, message = 'Analysis completed'): AssetRecord {
    this.logJob(id, 'analyze', 'success', message, analysis);
    return this.assets.update(id, {
      analysis,
      status: analysis.optimized ? 'optimized' : 'ready',
      metadata: {
        ...(this.getAsset(id)?.metadata ?? {}),
        lastAnalyzedAt: new Date().toISOString()
      }
    });
  }

  saveValidation(id: string, validation: Record<string, unknown>): AssetRecord {
    this.logJob(id, 'validate', validation.passed ? 'success' : 'failed', validation.passed ? 'Validation passed' : 'Validation found issues', validation);
    return this.assets.update(id, { validation, status: 'ready' });
  }

  saveDeployment(id: string, deployment: Record<string, unknown>): AssetRecord {
    const status = deployment.success ? 'deployed' : 'ready';
    this.logJob(id, 'deploy', deployment.success ? 'success' : 'failed', deployment.success ? 'Deployment completed' : 'Deployment unavailable', deployment);
    return this.assets.update(id, { deployment, status });
  }

  generateManifest(id: string) {
    const asset = this.requireAsset(id);
    const manifest = createAssetManifest(asset);
    const outputPath = path.join(this.paths.manifestDir, `${asset.slug}.manifest.json`);
    fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
    this.assets.update(id, { manifestPath: outputPath, status: 'ready' });
    this.logJob(id, 'manifest', 'success', 'Manifest generated', { outputPath });
    return manifest;
  }

  generateR3FExport(id: string) {
    const asset = this.requireAsset(id);
    const manifest = createAssetManifest(asset);
    const source = createR3FComponentSource(manifest);
    const outputPath = path.join(this.paths.exportDir, `${asset.slug}.tsx`);
    fs.writeFileSync(outputPath, source);
    this.assets.update(id, { exportPath: outputPath, status: 'ready' });
    this.logJob(id, 'export', 'success', 'R3F export generated', { outputPath });
    return { source, outputPath };
  }

  dashboardSummary(): DashboardSummary {
    const assets = this.listAssets();
    const recentJobs = this.jobs.listRecent();
    return {
      totalAssets: assets.length,
      byStatus: assets.reduce<Record<string, number>>((acc, asset) => {
        acc[asset.status] = (acc[asset.status] ?? 0) + 1;
        return acc;
      }, {}),
      byCategory: assets.reduce<Record<string, number>>((acc, asset) => {
        acc[asset.category] = (acc[asset.category] ?? 0) + 1;
        return acc;
      }, {}),
      recentAssets: assets.slice(0, 6),
      recentJobs,
      deploymentReady: assets.filter((asset) => asset.manifestPath && asset.validation?.passed !== false).length,
      optimizationCandidates: assets.filter((asset) => asset.category === 'model' && !asset.analysis).length
    };
  }

  listJobs(): JobRecord[] {
    return this.jobs.listRecent();
  }

  logJob(assetId: string, type: JobRecord['type'], status: JobRecord['status'], message: string, result?: Record<string, unknown>) {
    const now = new Date().toISOString();
    return this.jobs.create({
      id: uuidv7(),
      assetId,
      type,
      status,
      message,
      payload: null,
      result: result ?? null,
      createdAt: now,
      updatedAt: now
    });
  }

  requireAsset(id: string): AssetRecord {
    const asset = this.getAsset(id);
    if (!asset) {
      throw new Error(`Asset ${id} not found`);
    }
    return asset;
  }
}
