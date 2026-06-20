import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const asset = ctx.assets.requireAsset(id);
  const checks: string[] = [];
  let passed = true;

  if (asset.category === 'model' && !['.glb', '.gltf'].includes(asset.extension)) {
    passed = false;
    checks.push('Model is not in a preview-safe glTF format yet.');
  }
  if (asset.sizeBytes > 8 * 1024 * 1024) {
    passed = false;
    checks.push('Asset exceeds the 8 MB standard target.');
  }
  if (asset.tags.length === 0) {
    checks.push('Tags are empty; add discovery tags for marketplace readiness.');
  }

  const validation = {
    passed,
    checks,
    checkedAt: new Date().toISOString()
  };

  const updated = ctx.assets.saveValidation(id, validation);
  return NextResponse.json({ asset: updated, validation });
}
