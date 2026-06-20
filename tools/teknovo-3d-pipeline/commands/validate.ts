import type { BudgetTier, CommandResult, PipelineContext } from '../src/types.js';
import { validateCommand } from '../src/pipeline.js';

export async function runValidateCommand(context: PipelineContext, input: string, budgetTier: BudgetTier): Promise<CommandResult> {
  return validateCommand(context, input, budgetTier);
}
