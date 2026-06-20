#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runAnalyzeCommand } from '../commands/analyze.js';
import { runCompressCommand } from '../commands/compress.js';
import { runConvertCommand } from '../commands/convert.js';
import { runGenerateLodCommand } from '../commands/generate-lod.js';
import { runOptimizeCommand } from '../commands/optimize.js';
import { runValidateCommand } from '../commands/validate.js';
import { createContext } from '../src/pipeline.js';
import type { BudgetTier, CommandResult, CompressionMode } from '../src/types.js';

function printResult(result: CommandResult): void {
  for (const line of result.summary) {
    console.log(line);
  }

  console.log(`Report JSON: ${result.report.outputs.find((output) => output.endsWith('latest.json')) ?? 'generated'}`);
  console.log(`Report HTML: ${result.report.outputs.find((output) => output.endsWith('latest.html')) ?? 'generated'}`);
}

const budgetChoices: BudgetTier[] = ['hero', 'standard', 'mobile'];
const compressionChoices: CompressionMode[] = ['draco', 'meshopt', 'textures', 'all'];

void yargs(hideBin(process.argv))
  .scriptName('teknovo-3d-pipeline')
  .command(
    'analyze <input>',
    'Analyze an asset and generate JSON + HTML reports',
    (command) =>
      command.positional('input', { type: 'string', demandOption: true }).option('budget', {
        type: 'string',
        choices: budgetChoices,
        default: 'standard',
      }),
    async (argv) => {
      const context = await createContext();
      printResult(await runAnalyzeCommand(context, argv.input, argv.budget as BudgetTier));
    },
  )
  .command(
    'convert <input>',
    'Convert supported source assets to GLB',
    (command) =>
      command
        .positional('input', { type: 'string', demandOption: true })
        .option('output', { type: 'string', demandOption: false }),
    async (argv) => {
      const context = await createContext();
      printResult(await runConvertCommand(context, argv.input, argv.output));
    },
  )
  .command(
    'compress <input>',
    'Apply Draco, Meshopt, or texture compression to an asset',
    (command) =>
      command
        .positional('input', { type: 'string', demandOption: true })
        .option('mode', { type: 'string', choices: compressionChoices, default: 'all' })
        .option('output', { type: 'string', demandOption: false }),
    async (argv) => {
      const context = await createContext();
      printResult(await runCompressCommand(context, argv.input, argv.mode as CompressionMode, argv.output));
    },
  )
  .command(
    'generate-lod <input>',
    'Generate the 100/60/30/10 LOD chain',
    (command) => command.positional('input', { type: 'string', demandOption: true }),
    async (argv) => {
      const context = await createContext();
      printResult(await runGenerateLodCommand(context, argv.input));
    },
  )
  .command(
    'validate <input>',
    'Validate an asset against Teknovo performance budgets',
    (command) =>
      command.positional('input', { type: 'string', demandOption: true }).option('budget', {
        type: 'string',
        choices: budgetChoices,
        default: 'standard',
      }),
    async (argv) => {
      const context = await createContext();
      printResult(await runValidateCommand(context, argv.input, argv.budget as BudgetTier));
    },
  )
  .command(
    'optimize <input>',
    'Run the full conversion + optimization + reporting pipeline',
    (command) =>
      command
        .positional('input', { type: 'string', demandOption: true })
        .option('budget', { type: 'string', choices: budgetChoices, default: 'standard' })
        .option('output', { type: 'string', demandOption: false })
        .option('lods', { type: 'boolean', default: true }),
    async (argv) => {
      const context = await createContext();
      printResult(await runOptimizeCommand(context, argv.input, argv.budget as BudgetTier, argv.output, argv.lods));
    },
  )
  .demandCommand(1)
  .strict()
  .help()
  .parseAsync()
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Pipeline failed: ${message}`);
    process.exitCode = 1;
  });
