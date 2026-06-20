import fs from 'node:fs';
import path from 'node:path';
import type { StudioPaths } from './types';

function detectRootDir(): string {
  const envRoot = process.env.ASSET_STUDIO_ROOT;
  if (envRoot) {
    return path.resolve(envRoot);
  }

  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'apps', 'web')) && fs.existsSync(path.join(cwd, 'packages'))) {
    return cwd;
  }

  if (cwd.endsWith(path.join('apps', 'web'))) {
    return path.resolve(cwd, '../..');
  }

  if (cwd.includes(`${path.sep}packages${path.sep}`)) {
    return path.resolve(cwd, '../..');
  }

  return cwd;
}

export function resolveStudioPaths(rootOverride?: string): StudioPaths {
  const rootDir = path.resolve(rootOverride ?? detectRootDir());
  const dataDir = path.join(rootDir, 'data');
  const storageDir = path.join(rootDir, 'storage');
  return {
    rootDir,
    dataDir,
    storageDir,
    assetDir: path.join(storageDir, 'assets'),
    manifestDir: path.join(storageDir, 'manifests'),
    exportDir: path.join(storageDir, 'exports'),
    dbPath: path.join(dataDir, 'asset-studio.db')
  };
}

export function ensureStudioDirectories(paths: StudioPaths): void {
  [paths.dataDir, paths.storageDir, paths.assetDir, paths.manifestDir, paths.exportDir].forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
  });
}
