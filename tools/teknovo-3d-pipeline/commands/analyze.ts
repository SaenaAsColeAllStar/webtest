import type { BudgetTier, CommandResult, PipelineContext } from '../src/types.js';
import { analyzeCommand } from '../src/pipeline.js';

export async function runAnalyzeCommand(context: PipelineContext, input: string, budgetTier: BudgetTier): Promise<CommandResult> {
  return analyzeCommand(context, input, budgetTier);
}
