import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

import obj2gltf from 'obj2gltf';
import { cloneDocument } from '@gltf-transform/functions';

import { loadPipelineConfig, getDefaultConfigPath, getPipelineRoot } from './config.js';
import type {
  AssetAnalysis,
  BudgetTier,
  CommandResult,
  CompressionMode,
  ConvertResult,
  LoadedAsset,
  ModelManifest,
  OptimizeOptions,
  PipelineContext,
  PipelineManifestLOD,
  PipelineReport,
  ToolCapability,
  ValidationReport,
} from './types.js';
import { detectCapabilities, ensureDir, fileExists, getBaseNameWithoutExtension, getFileSize, resolveInputPath } from './utils.js';
import { loadAsset, analyzeDocument, saveAsset } from '../processors/glb.js';
import { applyDracoCompression } from '../processors/draco.js';
import { applyMeshoptCompression } from '../processors/meshopt.js';
import { createLodAsset, optimizeGeometry } from '../processors/geometry.js';
import { optimizeMaterials } from '../processors/materials.js';
import { optimizeTextures } from '../processors/texture.js';
import { validatePerformance } from '../validators/performance.js';
import { validateTextures } from '../validators/textures.js';
import { validateTopology } from '../validators/topology.js';
import { writePipelineReport } from '../reports/report-generator.js';

async function spawnCommand(command: string, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'ignore' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code ?? -1}.`));
    });
  });
}

export async function createContext(): Promise<PipelineContext> {
  const rootDir = getPipelineRoot();
  const config = loadPipelineConfig();
  const reportsDir = path.join(rootDir, config.reports.directory);
  const optimizedDir = path.join(rootDir, config.output.optimizedDirectory);

  await ensureDir(reportsDir);
  await ensureDir(optimizedDir);

  return {
    rootDir,
    configPath: getDefaultConfigPath(),
    config,
    reportsDir,
    optimizedDir,
  };
}

export function getCapabilities(): ToolCapability[] {
  return detectCapabilities();
}

export async function analyzeInput(input: string): Promise<{ asset: LoadedAsset; analysis: AssetAnalysis; capabilities: ToolCapability[] }> {
  const inputPath = resolveInputPath(input);
  const sourceBytes = await getFileSize(inputPath);
  const asset = await loadAsset(inputPath);
  const capabilities = getCapabilities();
  const analysis = analyzeDocument(asset, sourceBytes, capabilities);

  return { asset, analysis, capabilities };
}

function getCapability(capabilities: ToolCapability[], tool: string): boolean {
  return capabilities.some((capability) => capability.tool === tool && capability.available);
}

async function convertObjToGlb(inputPath: string, outputPath: string): Promise<void> {
  const glb = await obj2gltf(inputPath, { binary: true, secure: true });
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, glb as Buffer);
}

async function convertBlendWithBlender(inputPath: string, outputPath: string): Promise<void> {
  const script = [
    'import bpy',
    `bpy.ops.wm.open_mainfile(filepath=r"${inputPath}")`,
    `bpy.ops.export_scene.gltf(filepath=r"${outputPath}", export_format='GLB')`,
  ].join('; ');
  await spawnCommand('blender', ['--background', '--python-expr', script]);
}

async function convertFbxWithBlender(inputPath: string, outputPath: string): Promise<void> {
  const script = [
    'import bpy',
    'bpy.ops.wm.read_factory_settings(use_empty=True)',
    `bpy.ops.import_scene.fbx(filepath=r"${inputPath}")`,
    `bpy.ops.export_scene.gltf(filepath=r"${outputPath}", export_format='GLB')`,
  ].join('; ');
  await spawnCommand('blender', ['--background', '--python-expr', script]);
}

async function convertFbxWithNativeTool(inputPath: string, outputPath: string): Promise<void> {
  await spawnCommand('FBX2glTF', ['--binary', '--input', inputPath, '--output', outputPath]);
}

async function convertStlWithAssimp(inputPath: string, outputPath: string): Promise<void> {
  await spawnCommand('assimp', ['export', inputPath, outputPath]);
}

export async function convertToGlb(input: string, output?: string): Promise<ConvertResult> {
  const inputPath = resolveInputPath(input);
  const extension = path.extname(inputPath).toLowerCase();
  const outputPath = output ? resolveInputPath(output) : path.join(path.dirname(inputPath), `${getBaseNameWithoutExtension(inputPath)}.glb`);
  const capabilities = getCapabilities();

  if (extension === '.glb') {
    return { outputPath: inputPath, format: '.glb', notes: ['Input is already a GLB asset.'] };
  }

  if (extension === '.gltf') {
    const asset = await loadAsset(inputPath);
    await saveAsset({ ...asset, format: '.glb' }, outputPath);
    return { outputPath, format: '.glb', notes: ['Converted GLTF to GLB using glTF Transform.'] };
  }

  if (extension === '.obj') {
    await convertObjToGlb(inputPath, outputPath);
    return { outputPath, format: '.glb', notes: ['Converted OBJ to GLB using obj2gltf.'] };
  }

  if (extension === '.blend') {
    if (!getCapability(capabilities, 'blender')) {
      throw new Error('BLEND conversion requires Blender on PATH. Install Blender or convert the asset to GLTF/GLB first.');
    }

    await convertBlendWithBlender(inputPath, outputPath);
    return { outputPath, format: '.glb', notes: ['Converted BLEND to GLB using Blender CLI.'] };
  }

  if (extension === '.fbx') {
    if (getCapability(capabilities, 'FBX2glTF')) {
      await convertFbxWithNativeTool(inputPath, outputPath);
      return { outputPath, format: '.glb', notes: ['Converted FBX to GLB using FBX2glTF.'] };
    }

    if (getCapability(capabilities, 'blender')) {
      await convertFbxWithBlender(inputPath, outputPath);
      return { outputPath, format: '.glb', notes: ['Converted FBX to GLB using Blender fallback.'] };
    }

    throw new Error('FBX conversion requires FBX2glTF or Blender on PATH. Install one of them or convert to GLTF/GLB before running the pipeline.');
  }

  if (extension === '.stl') {
    if (!getCapability(capabilities, 'assimp')) {
      throw new Error('STL conversion requires assimp on PATH. Install assimp or convert the asset to GLTF/GLB first.');
    }

    await convertStlWithAssimp(inputPath, outputPath);
    return { outputPath, format: '.glb', notes: ['Converted STL to GLB using assimp export fallback.'] };
  }

  throw new Error(`Unsupported input format "${extension}". Supported inputs: .glb, .gltf, .obj, .fbx, .blend, .stl.`);
}

export async function validateAsset(context: PipelineContext, analysis: AssetAnalysis, budgetTier: BudgetTier): Promise<ValidationReport> {
  const issues = [
    ...validatePerformance(analysis, context, budgetTier),
    ...validateTopology(analysis),
    ...validateTextures(analysis),
  ];

  return {
    passed: issues.every((issue) => issue.severity !== 'error'),
    budgetTier,
    issues,
  };
}

async function writeManifest(context: PipelineContext, manifest: ModelManifest): Promise<string> {
  const manifestPath = path.join(context.optimizedDir, manifest.id, context.config.output.manifestName);
  await ensureDir(path.dirname(manifestPath));
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifestPath;
}

async function generateLods(
  context: PipelineContext,
  asset: LoadedAsset,
  assetId: string,
): Promise<PipelineManifestLOD[]> {
  const lods: PipelineManifestLOD[] = [];

  for (const rule of context.config.lodRules) {
    const lodAsset = rule.ratio === 1 ? { ...asset, document: cloneDocument(asset.document) } : await createLodAsset(asset, rule);
    const lodPath = path.join(context.optimizedDir, assetId, `${assetId}-${rule.name}.glb`);
    await saveAsset({ ...lodAsset, format: '.glb' }, lodPath);
    lods.push({
      name: rule.name,
      ratio: rule.ratio,
      path: path.relative(context.rootDir, lodPath),
      bytes: await getFileSize(lodPath),
    });
  }

  return lods;
}

function createManifest(
  context: PipelineContext,
  assetId: string,
  sourceInput: string,
  outputPath: string,
  analysis: AssetAnalysis,
  lods: PipelineManifestLOD[],
): ModelManifest {
  return {
    id: assetId,
    source: sourceInput,
    optimized: path.relative(context.rootDir, outputPath),
    format: path.extname(outputPath).replace('.', '') as 'glb' | 'gltf',
    cloudflareReady: context.config.output.cloudflareReady,
    draco: context.config.compression.draco.enabled,
    meshopt: context.config.compression.meshopt.enabled,
    generatedAt: new Date().toISOString(),
    lods,
    textures: analysis.textures.map((texture) => ({
      name: texture.name,
      mimeType: texture.mimeType,
      width: texture.width,
      height: texture.height,
      bytes: texture.byteLength,
    })),
    r3f: {
      useGLTF: {
        path: path.relative(context.rootDir, outputPath),
        draco: context.config.compression.draco.enabled,
        meshopt: context.config.compression.meshopt.enabled,
      },
    },
  };
}

async function loadFromAnyInput(input: string): Promise<{ asset: LoadedAsset; sourceInput: string; notes: string[] }> {
  const inputPath = resolveInputPath(input);
  const extension = path.extname(inputPath).toLowerCase();
  if (extension === '.glb' || extension === '.gltf') {
    return { asset: await loadAsset(inputPath), sourceInput: inputPath, notes: [] };
  }

  const converted = await convertToGlb(inputPath);
  return {
    asset: await loadAsset(converted.outputPath),
    sourceInput: inputPath,
    notes: converted.notes,
  };
}

export async function applyCompressionMode(asset: LoadedAsset, context: PipelineContext, mode: CompressionMode): Promise<string[]> {
  const capabilities = getCapabilities();
  const notes: string[] = [];

  if (mode === 'draco' || mode === 'all') {
    await applyDracoCompression(asset, context.config);
    notes.push('Applied Draco mesh compression.');
  }

  if (mode === 'meshopt' || mode === 'all') {
    await applyMeshoptCompression(asset, context.config);
    notes.push('Applied Meshopt compression.');
  }

  if (mode === 'textures' || mode === 'all') {
    notes.push(...(await optimizeTextures(asset, context.config, capabilities)));
  }

  return notes;
}

export async function optimizeAsset(context: PipelineContext, options: OptimizeOptions): Promise<CommandResult> {
  const { asset, sourceInput, notes: initialNotes } = await loadFromAnyInput(options.input);
  const assetId = getBaseNameWithoutExtension(sourceInput);
  const outputDir = path.join(context.optimizedDir, assetId);
  const outputPath = options.output
    ? resolveInputPath(options.output)
    : path.join(outputDir, `${assetId}-optimized.glb`);

  await ensureDir(outputDir);

  await optimizeGeometry(asset);
  await optimizeMaterials(asset);
  const notes = [...initialNotes, ...(await applyCompressionMode(asset, context, 'all'))];
  await saveAsset({ ...asset, format: '.glb' }, outputPath);

  const sourceBytes = await getFileSize(outputPath);
  const analysis = analyzeDocument({ ...asset, inputPath: outputPath, format: '.glb' }, sourceBytes, getCapabilities());
  const validation = await validateAsset(context, analysis, options.budgetTier);
  const lods = options.generateLods ? await generateLods(context, asset, assetId) : [];
  const manifest = createManifest(context, assetId, sourceInput, outputPath, analysis, lods);
  const manifestPath = await writeManifest(context, manifest);

  const report: PipelineReport = {
    name: 'optimize',
    input: sourceInput,
    output: outputPath,
    analysis,
    validation,
    manifest,
    outputs: [outputPath, manifestPath, ...lods.map((lod) => path.join(context.rootDir, lod.path))],
    notes,
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [
      `Optimized asset written to ${outputPath}`,
      `Validation ${validation.passed ? 'passed' : 'reported issues'} for ${options.budgetTier} budget`,
      `Manifest written to ${manifestPath}`,
    ],
  };
}

export async function analyzeCommand(context: PipelineContext, input: string, budgetTier: BudgetTier): Promise<CommandResult> {
  const { asset, analysis } = await analyzeInput(input);
  const validation = await validateAsset(context, analysis, budgetTier);
  const report: PipelineReport = {
    name: 'analyze',
    input: asset.inputPath,
    analysis,
    validation,
    outputs: [],
    notes: [],
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [`Analyzed ${asset.inputPath}`, `HTML report: ${reportPaths.htmlPath}`, `JSON report: ${reportPaths.jsonPath}`],
  };
}

export async function validateCommand(context: PipelineContext, input: string, budgetTier: BudgetTier): Promise<CommandResult> {
  const { asset, analysis } = await analyzeInput(input);
  const validation = await validateAsset(context, analysis, budgetTier);
  const report: PipelineReport = {
    name: 'validate',
    input: asset.inputPath,
    analysis,
    validation,
    outputs: [],
    notes: [],
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [`Validation ${validation.passed ? 'passed' : 'failed'} for ${asset.inputPath}`],
  };
}

export async function compressCommand(
  context: PipelineContext,
  input: string,
  mode: CompressionMode,
  output?: string,
): Promise<CommandResult> {
  const { asset, sourceInput } = await loadFromAnyInput(input);
  const assetId = getBaseNameWithoutExtension(sourceInput);
  const defaultPath = path.join(context.optimizedDir, assetId, `${assetId}-${mode}.glb`);
  const outputPath = output ? resolveInputPath(output) : defaultPath;

  await ensureDir(path.dirname(outputPath));
  const notes = await applyCompressionMode(asset, context, mode);
  await saveAsset({ ...asset, format: '.glb' }, outputPath);

  const sourceBytes = await getFileSize(outputPath);
  const analysis = analyzeDocument({ ...asset, inputPath: outputPath, format: '.glb' }, sourceBytes, getCapabilities());
  const validation = await validateAsset(context, analysis, 'standard');
  const report: PipelineReport = {
    name: 'compress',
    input: sourceInput,
    output: outputPath,
    analysis,
    validation,
    outputs: [outputPath],
    notes,
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [`Compression mode ${mode} completed`, `Output: ${outputPath}`],
  };
}

export async function lodCommand(context: PipelineContext, input: string): Promise<CommandResult> {
  const { asset, sourceInput } = await loadFromAnyInput(input);
  const assetId = getBaseNameWithoutExtension(sourceInput);
  const lods = await generateLods(context, asset, assetId);
  const sourceBytes = await getFileSize(sourceInput);
  const analysis = analyzeDocument(asset, sourceBytes, getCapabilities());
  const validation = await validateAsset(context, analysis, 'standard');
  const manifest = createManifest(
    context,
    assetId,
    sourceInput,
    path.join(context.optimizedDir, assetId, `${assetId}-lod0.glb`),
    analysis,
    lods,
  );
  const manifestPath = await writeManifest(context, manifest);

  const report: PipelineReport = {
    name: 'generate-lod',
    input: sourceInput,
    output: manifest.optimized,
    analysis,
    validation,
    manifest,
    outputs: [manifestPath, ...lods.map((lod) => path.join(context.rootDir, lod.path))],
    notes: ['Generated LOD chain using 100/60/30/10 simplification rules.'],
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [`Generated ${lods.length} LOD assets`, `Manifest: ${manifestPath}`],
  };
}

export async function convertCommand(context: PipelineContext, input: string, output?: string): Promise<CommandResult> {
  const converted = await convertToGlb(input, output);
  const outputPath = converted.outputPath;
  if (!(await fileExists(outputPath))) {
    throw new Error(`Conversion reported success but output was not found at ${outputPath}.`);
  }

  const asset = await loadAsset(outputPath);
  const analysis = analyzeDocument(asset, await getFileSize(outputPath), getCapabilities());
  const validation = await validateAsset(context, analysis, 'standard');
  const report: PipelineReport = {
    name: 'convert',
    input: resolveInputPath(input),
    output: outputPath,
    analysis,
    validation,
    outputs: [outputPath],
    notes: converted.notes,
  };

  const reportPaths = await writePipelineReport(context, report);
  report.outputs.push(reportPaths.htmlPath, reportPaths.jsonPath);

  return {
    report,
    summary: [`Converted asset to ${outputPath}`],
  };
}
