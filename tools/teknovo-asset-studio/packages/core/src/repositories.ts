import Database from 'better-sqlite3';
import type { AssetRecord, JobRecord, JobStatus, JobType } from './types';

function parseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== 'string' || value.length === 0) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mapAsset(row: Record<string, unknown>): AssetRecord {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    category: row.category as AssetRecord['category'],
    status: row.status as AssetRecord['status'],
    description: (row.description as string | null) ?? null,
    originalName: String(row.original_name),
    fileName: String(row.file_name),
    extension: String(row.extension),
    mimeType: String(row.mime_type),
    filePath: String(row.file_path),
    relativePath: String(row.relative_path),
    sizeBytes: Number(row.size_bytes),
    tags: parseJson<string[]>(row.tags, []),
    metadata: parseJson<Record<string, unknown>>(row.metadata, {}),
    analysis: parseJson<Record<string, unknown> | null>(row.analysis, null),
    validation: parseJson<Record<string, unknown> | null>(row.validation, null),
    deployment: parseJson<Record<string, unknown> | null>(row.deployment, null),
    manifestPath: (row.manifest_path as string | null) ?? null,
    exportPath: (row.export_path as string | null) ?? null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    deletedAt: (row.deleted_at as string | null) ?? null
  };
}

function mapJob(row: Record<string, unknown>): JobRecord {
  return {
    id: String(row.id),
    assetId: String(row.asset_id),
    type: row.type as JobType,
    status: row.status as JobStatus,
    message: String(row.message),
    payload: parseJson<Record<string, unknown> | null>(row.payload, null),
    result: parseJson<Record<string, unknown> | null>(row.result, null),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

export class AssetRepository {
  constructor(private readonly db: Database.Database) {}

  list(): AssetRecord[] {
    return this.db
      .prepare('SELECT * FROM assets WHERE deleted_at IS NULL ORDER BY created_at DESC')
      .all()
      .map((row) => mapAsset(row as Record<string, unknown>));
  }

  getById(id: string): AssetRecord | null {
    const row = this.db.prepare('SELECT * FROM assets WHERE id = ? AND deleted_at IS NULL').get(id);
    return row ? mapAsset(row as Record<string, unknown>) : null;
  }

  insert(asset: AssetRecord): AssetRecord {
    this.db.prepare(`
      INSERT INTO assets (
        id, slug, name, category, status, description, original_name, file_name, extension, mime_type,
        file_path, relative_path, size_bytes, tags, metadata, analysis, validation, deployment,
        manifest_path, export_path, created_at, updated_at, deleted_at
      ) VALUES (
        @id, @slug, @name, @category, @status, @description, @originalName, @fileName, @extension, @mimeType,
        @filePath, @relativePath, @sizeBytes, @tags, @metadata, @analysis, @validation, @deployment,
        @manifestPath, @exportPath, @createdAt, @updatedAt, @deletedAt
      )
    `).run({
      ...asset,
      tags: JSON.stringify(asset.tags),
      metadata: JSON.stringify(asset.metadata),
      analysis: JSON.stringify(asset.analysis),
      validation: JSON.stringify(asset.validation),
      deployment: JSON.stringify(asset.deployment),
      originalName: asset.originalName,
      fileName: asset.fileName,
      mimeType: asset.mimeType,
      filePath: asset.filePath,
      relativePath: asset.relativePath,
      sizeBytes: asset.sizeBytes,
      manifestPath: asset.manifestPath,
      exportPath: asset.exportPath,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
      deletedAt: asset.deletedAt
    });
    return asset;
  }

  update(id: string, patch: Partial<AssetRecord>): AssetRecord {
    const current = this.getById(id);
    if (!current) {
      throw new Error(`Asset ${id} not found`);
    }

    const next: AssetRecord = {
      ...current,
      ...patch,
      updatedAt: patch.updatedAt ?? new Date().toISOString()
    };

    this.db.prepare(`
      UPDATE assets SET
        slug = @slug,
        name = @name,
        category = @category,
        status = @status,
        description = @description,
        original_name = @originalName,
        file_name = @fileName,
        extension = @extension,
        mime_type = @mimeType,
        file_path = @filePath,
        relative_path = @relativePath,
        size_bytes = @sizeBytes,
        tags = @tags,
        metadata = @metadata,
        analysis = @analysis,
        validation = @validation,
        deployment = @deployment,
        manifest_path = @manifestPath,
        export_path = @exportPath,
        updated_at = @updatedAt,
        deleted_at = @deletedAt
      WHERE id = @id
    `).run({
      ...next,
      tags: JSON.stringify(next.tags),
      metadata: JSON.stringify(next.metadata),
      analysis: JSON.stringify(next.analysis),
      validation: JSON.stringify(next.validation),
      deployment: JSON.stringify(next.deployment),
      originalName: next.originalName,
      fileName: next.fileName,
      mimeType: next.mimeType,
      filePath: next.filePath,
      relativePath: next.relativePath,
      sizeBytes: next.sizeBytes,
      manifestPath: next.manifestPath,
      exportPath: next.exportPath,
      updatedAt: next.updatedAt,
      deletedAt: next.deletedAt
    });

    return next;
  }
}

export class JobRepository {
  constructor(private readonly db: Database.Database) {}

  listRecent(limit = 12): JobRecord[] {
    return this.db
      .prepare('SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?')
      .all(limit)
      .map((row) => mapJob(row as Record<string, unknown>));
  }

  create(job: JobRecord): JobRecord {
    this.db.prepare(`
      INSERT INTO jobs (id, asset_id, type, status, message, payload, result, created_at, updated_at)
      VALUES (@id, @assetId, @type, @status, @message, @payload, @result, @createdAt, @updatedAt)
    `).run({
      ...job,
      assetId: job.assetId,
      payload: JSON.stringify(job.payload),
      result: JSON.stringify(job.result),
      createdAt: job.createdAt,
      updatedAt: job.updatedAt
    });
    return job;
  }

  update(id: string, patch: Partial<JobRecord>): JobRecord {
    const currentRow = this.db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
    if (!currentRow) throw new Error(`Job ${id} not found`);
    const current = mapJob(currentRow as Record<string, unknown>);
    const next: JobRecord = { ...current, ...patch, updatedAt: new Date().toISOString() };
    this.db.prepare(`
      UPDATE jobs SET status = @status, message = @message, payload = @payload, result = @result, updated_at = @updatedAt
      WHERE id = @id
    `).run({
      ...next,
      payload: JSON.stringify(next.payload),
      result: JSON.stringify(next.result),
      updatedAt: next.updatedAt
    });
    return next;
  }
}
