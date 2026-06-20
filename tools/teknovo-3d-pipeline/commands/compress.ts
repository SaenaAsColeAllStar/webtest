import type { CommandResult, CompressionMode, PipelineContext } from '../src/types.js';
import { compressCommand } from '../src/pipeline.js';

export async function runCompressCommand(
  context: PipelineContext,
  input: string,
  mode: CompressionMode,
  output?: string,
): Promise<CommandResult> {
  return compressCommand(context, input, mode, output);
}
