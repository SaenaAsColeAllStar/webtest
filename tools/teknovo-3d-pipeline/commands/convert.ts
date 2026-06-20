import type { CommandResult, PipelineContext } from '../src/types.js';
import { convertCommand } from '../src/pipeline.js';

export async function runConvertCommand(context: PipelineContext, input: string, output?: string): Promise<CommandResult> {
  return convertCommand(context, input, output);
}
