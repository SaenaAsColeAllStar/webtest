export type AssetCategory = 'model' | 'texture' | 'material' | 'scene' | 'video' | 'image' | 'audio' | 'document';
export type AssetStatus = 'draft' | 'ready' | 'optimized' | 'deployed' | 'archived';
export type JobType = 'analyze' | 'optimize' | 'validate' | 'deploy' | 'manifest' | 'export';
export type JobStatus = 'queued' | 'running' | 'success' | 'failed';

export interface AssetRecord {
  id: string;
  slug: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  description: string | null;
  originalName: string;
  fileName: string;
  extension: string;
  mimeType: string;
  filePath: string;
  relativePath: string;
  sizeBytes: number;
  tags: string[];
  metadata: Record<string, unknown>;
  analysis: Record<string, unknown> | null;
  validation: Record<string, unknown> | null;
  deployment: Record<string, unknown> | null;
  manifestPath: string | null;
  exportPath: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface JobRecord {
  id: string;
  assetId: string;
  type: JobType;
  status: JobStatus;
  message: string;
  payload: Record<string, unknown> | null;
  result: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalAssets: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  recentAssets: AssetRecord[];
  recentJobs: JobRecord[];
  deploymentReady: number;
  optimizationCandidates: number;
}

export interface AssetInput {
  name?: string;
  category: AssetCategory;
  description?: string;
  tags?: string[];
}

export interface CreateAssetFromUploadInput extends AssetInput {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface CreateAssetFromExistingFileInput extends AssetInput {
  filePath: string;
  originalName: string;
}

export interface StudioPaths {
  rootDir: string;
  dataDir: string;
  storageDir: string;
  assetDir: string;
  manifestDir: string;
  exportDir: string;
  dbPath: string;
}

export interface StudioContextOptions {
  rootDir?: string;
}
