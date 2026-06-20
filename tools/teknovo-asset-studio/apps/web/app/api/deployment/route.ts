import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';
import { getR2Status } from '@teknovo-asset-studio/r2';

export async function GET() {
  const ctx = getStudioContext();
  return NextResponse.json({
    assets: ctx.assets.listAssets().filter((asset) => asset.manifestPath || asset.category === 'model'),
    r2: getR2Status()
  });
}
