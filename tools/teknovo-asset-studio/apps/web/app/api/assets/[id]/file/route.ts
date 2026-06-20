import fs from 'node:fs';
import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const asset = ctx.assets.getAsset(id);
  if (!asset || !fs.existsSync(asset.filePath)) {
    return new NextResponse('Asset file not found', { status: 404 });
  }

  const stream = fs.createReadStream(asset.filePath);
  return new NextResponse(stream as never, {
    headers: {
      'Content-Type': asset.mimeType,
      'Content-Disposition': `inline; filename="${asset.fileName}"`
    }
  });
}
