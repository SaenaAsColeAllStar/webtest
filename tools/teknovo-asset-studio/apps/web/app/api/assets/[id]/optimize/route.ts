import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getStudioContext } from '@teknovo-asset-studio/core';
import { analyzePerformance, runPipelineAction } from '@teknovo-asset-studio/asset-engine';

const schema = z.object({ budget: z.enum(['hero', 'standard', 'mobile']).default('standard') });

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = getStudioContext();
  const { id } = await params;
  const asset = ctx.assets.requireAsset(id);
  const parsed = schema.parse(await request.json().catch(() => ({ budget: 'standard' })));
  const pipeline = await runPipelineAction(ctx.paths.rootDir, 'optimize', asset, parsed.budget);
  const performance = analyzePerformance(asset);

  const updated = ctx.assets.saveAnalysis(id, {
    optimized: pipeline.ok,
    pipeline,
    performance,
    budget: parsed.budget
  }, pipeline.ok ? 'Optimization completed' : 'Optimization fell back to adapter diagnostics');

  return NextResponse.json({ asset: updated, pipeline, performance });
}
