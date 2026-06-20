import fs from 'node:fs/promises';
import path from 'node:path';
import { createStudioContext } from '@teknovo-asset-studio/core';
import { createAssetManifest, createR3FComponentSource } from '@teknovo-asset-studio/preview';

async function main() {
  const rootDir = path.resolve(process.cwd());
  const tmpRoot = path.join(rootDir, '.verification');
  const ctx = createStudioContext({ rootDir: tmpRoot });

  await fs.mkdir(path.join(tmpRoot, 'fixtures'), { recursive: true });
  const fixturePath = path.join(tmpRoot, 'fixtures', 'triangle.glb');
  await fs.writeFile(fixturePath, 'glTF-fixture');

  const asset = ctx.assets.createAssetFromExistingFile({
    filePath: fixturePath,
    originalName: 'triangle.glb',
    category: 'model',
    description: 'Verification asset',
    tags: ['verify', 'fixture']
  });

  const manifest = ctx.assets.generateManifest(asset.id);
  const exportFile = ctx.assets.generateR3FExport(asset.id);
  const fetched = ctx.assets.getAsset(asset.id);

  if (!manifest.asset.id || !exportFile.outputPath || !fetched?.manifestPath) {
    throw new Error('Verification flow failed to persist manifest/export paths.');
  }

  const previewManifest = createAssetManifest(fetched);
  const componentSource = createR3FComponentSource(previewManifest);

  console.log(JSON.stringify({
    assetId: asset.id,
    manifestFile: fetched.manifestPath,
    exportFile: fetched.exportPath,
    previewComponentLength: componentSource.length,
    totalAssets: ctx.assets.listAssets().length
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
