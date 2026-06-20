import type { AssetAnalysis, BudgetTier, PipelineContext, ValidationIssue } from '../src/types.js';
import { formatBytes, getBudgetLimitBytes } from '../src/utils.js';

export function validatePerformance(
  analysis: AssetAnalysis,
  context: PipelineContext,
  budgetTier: BudgetTier,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const limit = getBudgetLimitBytes(context, budgetTier);

  if (analysis.sourceBytes > limit) {
    issues.push({
      code: 'budget.exceeded',
      severity: 'error',
      message: `Asset size ${formatBytes(analysis.sourceBytes)} exceeds the ${budgetTier} budget of ${formatBytes(limit)}.`,
      recommendation: 'Run the optimize command or reduce textures/geometry before shipping.',
    });
  }

  if (analysis.drawCallCount > 30) {
    issues.push({
      code: 'draw-calls.high',
      severity: 'warning',
      message: `Draw calls are high (${analysis.drawCallCount}).`,
      recommendation: 'Merge primitives or materials where practical.',
    });
  }

  if (analysis.vertexCount > 200_000 && budgetTier === 'mobile') {
    issues.push({
      code: 'vertices.mobile-high',
      severity: 'warning',
      message: `Vertex count ${analysis.vertexCount} is high for mobile delivery.`,
      recommendation: 'Generate and serve lower LODs for mobile scenes.',
    });
  }

  return issues;
}
