import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import type { BudgetTier, PipelineContext, ToolCapability } from './types.js';

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function fileExists(targetPath: string): Promise<boolean> {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function getFileSize(targetPath: string): Promise<number> {
  const stats = await fs.stat(targetPath);
  return stats.size;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let value = bytes / 1024;
  let index = 0;

  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(value >= 100 ? 0 : 2)} ${units[index]}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function getBudgetLimitBytes(context: PipelineContext, tier: BudgetTier): number {
  const megabytes =
    tier === 'hero'
      ? context.config.budgets.heroMb
      : tier === 'standard'
        ? context.config.budgets.standardMb
        : context.config.budgets.mobileMb;

  return megabytes * 1024 * 1024;
}

export function resolveInputPath(input: string, cwd = process.cwd()): string {
  return path.isAbsolute(input) ? input : path.resolve(cwd, input);
}

export function replaceExtension(targetPath: string, extension: string): string {
  return path.join(path.dirname(targetPath), `${path.basename(targetPath, path.extname(targetPath))}${extension}`);
}

export function getBaseNameWithoutExtension(targetPath: string): string {
  return path.basename(targetPath, path.extname(targetPath));
}

export function normalizeOutputPath(inputPath: string, outputPath: string | undefined, defaultExtension: string): string {
  if (outputPath) {
    return path.isAbsolute(outputPath) ? outputPath : path.resolve(process.cwd(), outputPath);
  }

  return replaceExtension(inputPath, defaultExtension);
}

export async function writeJson(targetPath: string, data: unknown): Promise<void> {
  await ensureDir(path.dirname(targetPath));
  await fs.writeFile(targetPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function writeText(targetPath: string, data: string): Promise<void> {
  await ensureDir(path.dirname(targetPath));
  await fs.writeFile(targetPath, data, 'utf8');
}

function detectBinary(command: string): boolean {
  const result = spawnSync('bash', ['-lc', `command -v "${command}" >/dev/null 2>&1`], {
    stdio: 'ignore',
  });
  return result.status === 0;
}

export function detectCapabilities(): ToolCapability[] {
  return [
    {
      tool: 'gltf-transform',
      available: true,
      purpose: 'Native GLTF/GLB reading, writing, optimization, Draco, Meshopt, and LOD transforms',
      details: 'Backed by installed Node packages.',
    },
    {
      tool: 'obj2gltf',
      available: true,
      purpose: 'OBJ to GLTF/GLB conversion',
      details: 'Backed by installed Node package.',
    },
    {
      tool: 'blender',
      available: detectBinary('blender'),
      purpose: 'BLEND/FBX import-export fallback via Blender CLI',
      details: 'Required for reliable .blend conversion and an optional .fbx fallback.',
    },
    {
      tool: 'FBX2glTF',
      available: detectBinary('FBX2glTF'),
      purpose: 'FBX to GLTF/GLB conversion',
      details: 'Optional native converter for .fbx sources.',
    },
    {
      tool: 'assimp',
      available: detectBinary('assimp'),
      purpose: 'STL and miscellaneous mesh format conversion',
      details: 'Optional CLI fallback for .stl sources.',
    },
    {
      tool: 'toktx',
      available: detectBinary('toktx'),
      purpose: 'KTX2 texture compression',
      details: 'Optional external encoder for KTX2 output.',
    },
  ];
}
