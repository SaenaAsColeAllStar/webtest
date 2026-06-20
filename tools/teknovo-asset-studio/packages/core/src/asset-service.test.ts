import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createStudioContext } from './context';

const created: string[] = [];

afterEach(async () => {
  await Promise.all(created.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe('AssetService', () => {
  it('creates an asset and generates a manifest', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'asset-studio-'));
    created.push(root);
    const ctx = createStudioContext({ rootDir: root });
    const fixture = path.join(root, 'fixture.glb');
    await fs.writeFile(fixture, 'glb');

    const asset = ctx.assets.createAssetFromExistingFile({
      filePath: fixture,
      originalName: 'fixture.glb',
      category: 'model',
      tags: ['test']
    });

    const manifest = ctx.assets.generateManifest(asset.id);
    const fetched = ctx.assets.getAsset(asset.id);

    expect(manifest.asset.id).toBe(asset.id);
    expect(fetched?.manifestPath).toBeTruthy();
    expect(ctx.assets.listAssets()).toHaveLength(1);
  });
});
