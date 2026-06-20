import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { AssetRecord } from '@teknovo-asset-studio/core';

const execFileAsync = promisify(execFile);

export interface PipelineResult {
  ok: boolean;
  action: 'analyze' | 'optimize' | 'validate';
  summary: string[];
  outputs: string[];
  raw: string;
  reason?: string;
}

export interface PerformanceInsight {
  score: number;
  summary: string;
  highlights: string[];
}

function pipelineCliPath(rootDir: string): string | null {
  const candidate = path.resolve(rootDir, '..', 'teknovo-3d-pipeline', 'dist', 'cli', 'index.js');
  return fs.existsSync(candidate) ? candidate : null;
}

export async function runPipelineAction(rootDir: string, action: PipelineResult['action'], asset: AssetRecord, budget = 'standard'): Promise<PipelineResult> {
  const cliPath = pipelineCliPath(rootDir);
  if (!cliPath) {
    return {
      ok: false,
      action,
      summary: ['3D pipeline is not available in this environment.'],
      outputs: [],
      raw: '',
      reason: 'missing-cli'
    };
  }

  const args = [cliPath, action, asset.filePath, '--budget', budget];
  if (action === 'optimize') {
    args.push('--lods', 'true');
  }

  try {
    const { stdout, stderr } = await execFileAsync('node', args, { cwd: path.dirname(cliPath) });
    const raw = `${stdout}\n${stderr}`.trim();
    const outputs = raw
      .split('\n')
      .filter((line) => line.startsWith('Report ') || line.includes('model-manifest.json'));
    return {
      ok: true,
      action,
      summary: raw.split('\n').filter(Boolean).slice(0, 8),
      outputs,
      raw
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      action,
      summary: [message],
      outputs: [],
      raw: message,
      reason: 'command-failed'
    };
  }
}

export function analyzePerformance(asset: AssetRecord): PerformanceInsight {
  const sizeMb = asset.sizeBytes / (1024 * 1024);
  const warnings: string[] = [];
  let score = 100;

  if (sizeMb > 8) {
    score -= 35;
    warnings.push('Asset exceeds the 8 MB standard delivery target.');
  }
  if (asset.category === 'model' && !asset.analysis) {
    score -= 20;
    warnings.push('Model has not gone through the optimization pipeline yet.');
  }
  if (!asset.manifestPath) {
    score -= 10;
    warnings.push('Manifest has not been generated.');
  }
  if (asset.validation && asset.validation.passed === false) {
    score -= 25;
    warnings.push('Validation has failing checks that should be resolved before deployment.');
  }

  return {
    score: Math.max(20, score),
    summary: warnings.length === 0 ? 'Asset is in a healthy state for studio workflows.' : 'Asset has performance or workflow risks to address.',
    highlights: warnings.length === 0 ? ['No immediate bottlenecks detected.'] : warnings
  };
}
