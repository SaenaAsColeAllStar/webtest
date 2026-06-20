import mime from 'mime-types';
import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';
import { uploadToR2, getR2Status } from '@teknovo-asset-studio/r2';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const asset = ctx.assets.requireAsset(id);
  if (!asset.manifestPath) {
    return new NextResponse('Generate a manifest before deployment.', { status: 400 });
  }

  const status = getR2Status();
  const bucket = status.bucket ?? process.env.CLOUDFLARE_R2_BUCKET ?? 'teknovo-assets';
  const key = `${asset.slug}/${asset.fileName}`;
  const result = await uploadToR2({
    bucket,
    key,
    filePath: asset.filePath,
    contentType: mime.lookup(asset.fileName) || 'application/octet-stream'
  });
  const updated = ctx.assets.saveDeployment(id, {
    ...result,
    bucket,
    key,
    deployedAt: new Date().toISOString()
  });

  return NextResponse.json({ asset: updated, deployment: updated.deployment });
}
