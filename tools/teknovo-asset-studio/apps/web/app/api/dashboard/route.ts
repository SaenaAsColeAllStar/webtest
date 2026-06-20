import { NextResponse } from 'next/server';
import { getStudioContext } from '@teknovo-asset-studio/core';
import { getR2Status } from '@teknovo-asset-studio/r2';

export async function GET() {
  const ctx = getStudioContext();
  return NextResponse.json({
    summary: ctx.assets.dashboardSummary(),
    r2: getR2Status()
  });
}
