import Database from 'better-sqlite3';
import type { StudioContextOptions } from './types';
import { ensureStudioDirectories, resolveStudioPaths } from './config';
import { AssetRepository, JobRepository } from './repositories';
import { AssetService } from './services';

export interface StudioContext {
  db: Database.Database;
  assets: AssetService;
  paths: ReturnType<typeof resolveStudioPaths>;
}

function migrate(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL,
      description TEXT,
      original_name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      extension TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      file_path TEXT NOT NULL,
      relative_path TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      tags TEXT NOT NULL,
      metadata TEXT NOT NULL,
      analysis TEXT,
      validation TEXT,
      deployment TEXT,
      manifest_path TEXT,
      export_path TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT NOT NULL,
      payload TEXT,
      result TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(asset_id) REFERENCES assets(id)
    );

    CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category);
    CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
    CREATE INDEX IF NOT EXISTS idx_jobs_asset ON jobs(asset_id);
    CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);
  `);
}

let cached: StudioContext | null = null;

export function createStudioContext(options: StudioContextOptions = {}): StudioContext {
  const paths = resolveStudioPaths(options.rootDir);
  ensureStudioDirectories(paths);
  const db = new Database(paths.dbPath);
  migrate(db);
  const assetRepository = new AssetRepository(db);
  const jobRepository = new JobRepository(db);

  return {
    db,
    paths,
    assets: new AssetService(assetRepository, jobRepository, paths)
  };
}

export function getStudioContext(): StudioContext {
  if (!cached) {
    cached = createStudioContext();
  }
  return cached;
}
