import { spawn } from 'node:child_process';
import path from 'node:path';
import { promises as fs } from 'node:fs';

import sharp from 'sharp';
import { textureCompress } from '@gltf-transform/functions';

import type { LoadedAsset, PipelineConfig, ToolCapability } from '../src/types.js';
import { fileExists } from '../src/utils.js';

function hasTool(capabilities: ToolCapability[], tool: string): boolean {
  return capabilities.some((capability) => capability.tool === tool && capability.available);
}

export async function optimizeTextures(
  asset: LoadedAsset,
  config: PipelineConfig,
  capabilities: ToolCapability[],
): Promise<string[]> {
  const preferredFormat = config.textures.preferredFormat === 'ktx2' ? 'webp' : config.textures.preferredFormat;
  const notes: string[] = [];

  await asset.document.transform(
    textureCompress({
      encoder: sharp,
      resize: [config.textures.maxDimension, config.textures.maxDimension],
      targetFormat: preferredFormat === 'jpeg' ? 'jpeg' : preferredFormat,
      quality: config.textures.quality,
      effort: 6,
    }),
  );

  if (config.textures.generateAvif) {
    notes.push('AVIF generation is supported through glTF texture conversion when source textures are embedded.');
  }

  if (config.textures.generateKtx2WhenAvailable) {
    if (hasTool(capabilities, 'toktx')) {
      notes.push('KTX2 encoder detected. Use the generated GLB/GLTF textures as source for an optional toktx post-process.');
    } else {
      notes.push('KTX2 encoder not detected. Falling back to WebP/AVIF-ready texture output.');
    }
  }

  return notes;
}

export async function transcodeDirectoryTexturesToKtx2(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory);
  const results: string[] = [];

  for (const entry of entries) {
    const ext = path.extname(entry).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(ext)) {
      continue;
    }

    const inputPath = path.join(directory, entry);
    if (!(await fileExists(inputPath))) {
      continue;
    }

    const outputPath = path.join(directory, `${path.basename(entry, ext)}.ktx2`);

    await new Promise<void>((resolve, reject) => {
      const child = spawn('toktx', ['--t2', outputPath, inputPath], { stdio: 'ignore' });
      child.on('exit', (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`toktx failed for ${entry} with exit code ${code ?? -1}.`));
      });
      child.on('error', reject);
    });

    results.push(outputPath);
  }

  return results;
}
