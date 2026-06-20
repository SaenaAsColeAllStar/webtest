import type { AssetAnalysis, ValidationIssue } from '../src/types.js';

export function validateTextures(analysis: AssetAnalysis): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const texture of analysis.textures) {
    if (texture.width > 4096 || texture.height > 4096) {
      issues.push({
        code: 'texture.oversized',
        severity: 'warning',
        message: `Texture "${texture.name}" is ${texture.width}x${texture.height}.`,
        recommendation: 'Resize to 2048px or less unless the asset is a hero scene.',
      });
    }

    if (texture.byteLength > 2 * 1024 * 1024) {
      issues.push({
        code: 'texture.byte-heavy',
        severity: 'warning',
        message: `Texture "${texture.name}" is larger than 2 MB.`,
        recommendation: 'Convert to WebP/AVIF or compress more aggressively.',
      });
    }
  }

  return issues;
}
