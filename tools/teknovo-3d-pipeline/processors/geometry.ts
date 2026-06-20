import { cloneDocument, dedup, prune, simplify, weld } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';

import type { LODRule, LoadedAsset } from '../src/types.js';

export async function optimizeGeometry(asset: LoadedAsset): Promise<void> {
  await asset.document.transform(dedup(), weld(), prune());
}

export async function createLodAsset(asset: LoadedAsset, rule: LODRule): Promise<LoadedAsset> {
  const clone = cloneDocument(asset.document);

  await MeshoptSimplifier.ready;
  await clone.transform(
    weld({ overwrite: false }),
    simplify({
      simplifier: MeshoptSimplifier,
      ratio: rule.ratio,
      error: rule.ratio >= 0.6 ? 0.0005 : 0.0015,
      lockBorder: false,
    }),
    prune(),
  );

  return {
    document: clone,
    inputPath: asset.inputPath,
    format: '.glb',
  };
}
