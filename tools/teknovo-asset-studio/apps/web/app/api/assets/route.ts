import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';

export async function GET() {
  const ctx = getStudioContext();
  return NextResponse.json({ assets: ctx.assets.listAssets() });
}
