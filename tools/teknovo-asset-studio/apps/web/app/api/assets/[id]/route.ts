import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';
import { createAssetManifest } from '@teknovo-asset-studio/preview';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const asset = ctx.assets.getAsset(id);
  if (!asset) {
    return new NextResponse('Asset not found', { status: 404 });
  }

  return NextResponse.json({
    asset,
    manifest: createAssetManifest(asset),
    fileUrl: `/api/assets/${asset.id}/file`
  });
}
