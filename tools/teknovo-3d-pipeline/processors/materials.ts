import { prune } from '@gltf-transform/functions';

import type { LoadedAsset } from '../src/types.js';

export async function optimizeMaterials(asset: LoadedAsset): Promise<void> {
  const root = asset.document.getRoot();

  for (const material of root.listMaterials()) {
    if (!material.getName()) {
      material.setName(`material-${root.listMaterials().indexOf(material) + 1}`);
    }
  }

  for (const texture of root.listTextures()) {
    if (!texture.getName()) {
      texture.setName(`texture-${root.listTextures().indexOf(texture) + 1}`);
    }
  }

  await asset.document.transform(prune());
}
