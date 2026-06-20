import type { AssetAnalysis, ValidationIssue } from '../src/types.js';

export function validateTopology(analysis: AssetAnalysis): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (analysis.meshCount === 0) {
    issues.push({
      code: 'mesh.missing',
      severity: 'error',
      message: 'Asset contains no meshes.',
      recommendation: 'Provide a GLTF/GLB file with at least one mesh primitive.',
    });
  }

  for (const mesh of analysis.meshes) {
    if (mesh.vertexCount === 0) {
      issues.push({
        code: 'mesh.empty',
        severity: 'warning',
        message: `Mesh "${mesh.name}" contains no vertices.`,
        recommendation: 'Remove empty meshes from the source scene.',
      });
    }

    if (mesh.primitiveCount > 8) {
      issues.push({
        code: 'mesh.primitive-heavy',
        severity: 'warning',
        message: `Mesh "${mesh.name}" has ${mesh.primitiveCount} primitives.`,
        recommendation: 'Consider merging submeshes to reduce draw calls.',
      });
    }
  }

  return issues;
}
