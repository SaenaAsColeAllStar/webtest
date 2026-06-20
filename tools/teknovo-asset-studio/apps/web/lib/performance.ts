export interface PerformanceAssetLike {
  sizeBytes: number;
  category: string;
  analysis: Record<string, unknown> | null;
  manifestPath: string | null;
  validation: Record<string, unknown> | null;
}

export interface PerformanceInsight {
  score: number;
  summary: string;
  highlights: string[];
}

export function analyzePerformanceClient(asset: PerformanceAssetLike): PerformanceInsight {
  const sizeMb = asset.sizeBytes / (1024 * 1024);
  const warnings: string[] = [];
  let score = 100;

  if (sizeMb > 8) {
    score -= 35;
    warnings.push('Asset exceeds the 8 MB standard delivery target.');
  }
  if (asset.category === 'model' && !asset.analysis) {
    score -= 20;
    warnings.push('Model has not gone through the optimization pipeline yet.');
  }
  if (!asset.manifestPath) {
    score -= 10;
    warnings.push('Manifest has not been generated.');
  }
  if (asset.validation && asset.validation.passed === false) {
    score -= 25;
    warnings.push('Validation has failing checks that should be resolved before deployment.');
  }

  return {
    score: Math.max(20, score),
    summary: warnings.length === 0 ? 'Asset is in a healthy state for studio workflows.' : 'Asset has performance or workflow risks to address.',
    highlights: warnings.length === 0 ? ['No immediate bottlenecks detected.'] : warnings,
  };
}
