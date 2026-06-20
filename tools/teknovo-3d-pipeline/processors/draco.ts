import { draco } from '@gltf-transform/functions';

import type { LoadedAsset, PipelineConfig } from '../src/types.js';

export async function applyDracoCompression(asset: LoadedAsset, config: PipelineConfig): Promise<void> {
  if (!config.compression.draco.enabled) {
    return;
  }

  await asset.document.transform(
    draco({
      quantizePosition: config.compression.draco.quantizePosition,
      quantizeNormal: config.compression.draco.quantizeNormal,
      quantizeTexcoord: config.compression.draco.quantizeTexcoord,
      quantizeColor: config.compression.draco.quantizeColor,
      quantizeGeneric: config.compression.draco.quantizeGeneric,
    }),
  );
}
