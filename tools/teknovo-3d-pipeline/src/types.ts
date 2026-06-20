import type { Document } from '@gltf-transform/core';

export type BudgetTier = 'hero' | 'standard' | 'mobile';
export type CompressionMode = 'draco' | 'meshopt' | 'textures' | 'all';
export type SupportedNativeFormat = '.glb' | '.gltf';
export type ConvertibleFormat = SupportedNativeFormat | '.obj' | '.fbx' | '.blend' | '.stl';

export interface LODRule {
  name: string;
  ratio: number;
}

export interface PipelineConfig {
  budgets: {
    heroMb: number;
    standardMb: number;
    mobileMb: number;
  };
  lodRules: LODRule[];
  textures: {
    maxDimension: number;
    preferredFormat: 'png' | 'jpeg' | 'webp' | 'avif' | 'ktx2';
    quality: number;
    generateAvif: boolean;
    generateKtx2WhenAvailable: boolean;
  };
  compression: {
    draco: {
      enabled: boolean;
      quantizePosition: number;
      quantizeNormal: number;
      quantizeTexcoord: number;
      quantizeColor: number;
      quantizeGeneric: number;
    };
    meshopt: {
      enabled: boolean;
      level: 'medium' | 'high';
    };
  };
  reports: {
    directory: string;
    latestJson: string;
    latestHtml: string;
  };
  output: {
    optimizedDirectory: string;
    manifestName: string;
    cloudflareReady: boolean;
  };
  conversion: {
    preferGlb: boolean;
    supportedInputExtensions: ConvertibleFormat[];
  };
}

export interface TextureInfo {
  name: string;
  uri: string;
  mimeType: string;
  width: number;
  height: number;
  byteLength: number;
}

export interface MeshInfo {
  name: string;
  primitiveCount: number;
  vertexCount: number;
  indexCount: number;
  materialCount: number;
}

export interface AssetAnalysis {
  sourcePath: string;
  sourceFormat: string;
  sourceBytes: number;
  generatedAt: string;
  meshCount: number;
  materialCount: number;
  textureCount: number;
  nodeCount: number;
  sceneCount: number;
  animationCount: number;
  triangleCount: number;
  vertexCount: number;
  drawCallCount: number;
  estimatedGpuBytes: number;
  textures: TextureInfo[];
  meshes: MeshInfo[];
  warnings: string[];
  capabilities: ToolCapability[];
}

export interface ValidationIssue {
  code: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  recommendation?: string;
}

export interface ValidationReport {
  passed: boolean;
  budgetTier: BudgetTier;
  issues: ValidationIssue[];
}

export interface ToolCapability {
  tool: string;
  available: boolean;
  purpose: string;
  details: string;
}

export interface PipelineManifestLOD {
  name: string;
  ratio: number;
  path: string;
  bytes: number;
}

export interface ModelManifest {
  id: string;
  source: string;
  optimized: string;
  format: 'glb' | 'gltf';
  cloudflareReady: boolean;
  draco: boolean;
  meshopt: boolean;
  generatedAt: string;
  lods: PipelineManifestLOD[];
  textures: Array<{
    name: string;
    mimeType: string;
    width: number;
    height: number;
    bytes: number;
  }>;
  r3f: {
    useGLTF: {
      path: string;
      draco: boolean;
      meshopt: boolean;
    };
  };
}

export interface PipelineReport {
  name: string;
  input: string;
  output?: string;
  analysis: AssetAnalysis;
  validation: ValidationReport;
  manifest?: ModelManifest;
  outputs: string[];
  notes: string[];
}

export interface PipelineContext {
  rootDir: string;
  configPath: string;
  config: PipelineConfig;
  reportsDir: string;
  optimizedDir: string;
}

export interface LoadedAsset {
  document: Document;
  inputPath: string;
  format: SupportedNativeFormat;
}

export interface ConvertResult {
  outputPath: string;
  format: SupportedNativeFormat;
  notes: string[];
}

export interface OptimizeOptions {
  input: string;
  output?: string;
  budgetTier: BudgetTier;
  generateLods: boolean;
}

export interface CommandResult {
  report: PipelineReport;
  summary: string[];
}
