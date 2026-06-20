import { meshopt } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';

import type { LoadedAsset, PipelineConfig } from '../src/types.js';

export async function applyMeshoptCompression(asset: LoadedAsset, config: PipelineConfig): Promise<void> {
  if (!config.compression.meshopt.enabled) {
    return;
  }

  await MeshoptEncoder.ready;

  await asset.document.transform(
    meshopt({
      encoder: MeshoptEncoder,
      level: config.compression.meshopt.level,
    }),
  );
}
