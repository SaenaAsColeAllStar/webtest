import type { BudgetTier, CommandResult, PipelineContext } from '../src/types.js';
import { optimizeAsset } from '../src/pipeline.js';

export async function runOptimizeCommand(
  context: PipelineContext,
  input: string,
  budgetTier: BudgetTier,
  output?: string,
  generateLods = true,
): Promise<CommandResult> {
  return optimizeAsset(context, {
    input,
    output,
    budgetTier,
    generateLods,
  });
}
