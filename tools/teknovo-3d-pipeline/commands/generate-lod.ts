import type { CommandResult, PipelineContext } from '../src/types.js';
import { lodCommand } from '../src/pipeline.js';

export async function runGenerateLodCommand(context: PipelineContext, input: string): Promise<CommandResult> {
  return lodCommand(context, input);
}
