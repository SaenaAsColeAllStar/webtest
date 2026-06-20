import path from 'node:path';
import { fileURLToPath } from 'node:url';

import configJson from '../config/pipeline.config.json' with { type: 'json' };

import type { PipelineConfig } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getPipelineRoot(): string {
  return path.resolve(__dirname, '..', '..');
}

export function getDefaultConfigPath(): string {
  return path.join(getPipelineRoot(), 'config', 'pipeline.config.json');
}

export function loadPipelineConfig(): PipelineConfig {
  return configJson as PipelineConfig;
}
