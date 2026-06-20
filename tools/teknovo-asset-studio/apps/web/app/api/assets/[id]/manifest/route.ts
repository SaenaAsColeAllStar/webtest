import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const manifest = ctx.assets.generateManifest(id);
  return NextResponse.json({ manifest });
}
