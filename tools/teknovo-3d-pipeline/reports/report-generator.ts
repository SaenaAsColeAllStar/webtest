import path from 'node:path';

import type { ModelManifest, PipelineContext, PipelineReport } from '../src/types.js';
import { ensureDir, formatBytes, writeJson, writeText } from '../src/utils.js';

function issueColor(severity: 'error' | 'warning' | 'info'): string {
  if (severity === 'error') {
    return '#ef4444';
  }

  if (severity === 'warning') {
    return '#f59e0b';
  }

  return '#38bdf8';
}

function renderManifest(manifest: ModelManifest | undefined): string {
  if (!manifest) {
    return '<p>No manifest generated for this run.</p>';
  }

  const lods = manifest.lods
    .map((lod) => `<li><strong>${lod.name}</strong> (${Math.round(lod.ratio * 100)}%) - ${lod.path} - ${formatBytes(lod.bytes)}</li>`)
    .join('');

  return `
    <section>
      <h2>Manifest</h2>
      <p><strong>Optimized asset:</strong> ${manifest.optimized}</p>
      <p><strong>R3F / useGLTF path:</strong> ${manifest.r3f.useGLTF.path}</p>
      <ul>${lods}</ul>
    </section>
  `;
}

function buildHtml(report: PipelineReport): string {
  const issues = report.validation.issues
    .map(
      (issue) =>
        `<li style="border-left:4px solid ${issueColor(issue.severity)};padding:12px 16px;margin:0 0 12px;background:#111827;border-radius:8px;">
          <strong>${issue.code}</strong><br />
          <span>${issue.message}</span><br />
          ${issue.recommendation ? `<em>${issue.recommendation}</em>` : ''}
        </li>`,
    )
    .join('');

  const textures = report.analysis.textures
    .map(
      (texture) =>
        `<tr><td>${texture.name}</td><td>${texture.mimeType}</td><td>${texture.width}x${texture.height}</td><td>${formatBytes(
          texture.byteLength,
        )}</td></tr>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Teknovo 3D Pipeline Report</title>
    <style>
      body { font-family: Inter, Arial, sans-serif; background: #030712; color: #e5e7eb; margin: 0; padding: 32px; }
      h1, h2 { color: #f9fafb; }
      section { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      .metric { background: #111827; border-radius: 10px; padding: 16px; }
      table { width: 100%; border-collapse: collapse; }
      td, th { text-align: left; padding: 10px; border-bottom: 1px solid #1f2937; }
      code { color: #93c5fd; }
    </style>
  </head>
  <body>
    <h1>Teknovo 3D Pipeline Report</h1>
    <section>
      <p><strong>Input:</strong> ${report.input}</p>
      <p><strong>Output:</strong> ${report.output ?? 'N/A'}</p>
      <p><strong>Generated:</strong> ${report.analysis.generatedAt}</p>
    </section>
    <section>
      <h2>Asset Summary</h2>
      <div class="grid">
        <div class="metric"><strong>Size</strong><br />${formatBytes(report.analysis.sourceBytes)}</div>
        <div class="metric"><strong>Triangles</strong><br />${report.analysis.triangleCount}</div>
        <div class="metric"><strong>Vertices</strong><br />${report.analysis.vertexCount}</div>
        <div class="metric"><strong>Draw Calls</strong><br />${report.analysis.drawCallCount}</div>
        <div class="metric"><strong>Meshes</strong><br />${report.analysis.meshCount}</div>
        <div class="metric"><strong>Textures</strong><br />${report.analysis.textureCount}</div>
      </div>
    </section>
    <section>
      <h2>Validation</h2>
      <p><strong>Passed:</strong> ${report.validation.passed ? 'Yes' : 'No'} (${report.validation.budgetTier})</p>
      <ul>${issues || '<li>No issues found.</li>'}</ul>
    </section>
    <section>
      <h2>Textures</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Format</th><th>Resolution</th><th>Size</th></tr>
        </thead>
        <tbody>${textures || '<tr><td colspan="4">No textures</td></tr>'}</tbody>
      </table>
    </section>
    ${renderManifest(report.manifest)}
  </body>
</html>`;
}

export async function writePipelineReport(context: PipelineContext, report: PipelineReport): Promise<{ jsonPath: string; htmlPath: string }> {
  await ensureDir(context.reportsDir);
  const jsonPath = path.join(context.reportsDir, context.config.reports.latestJson);
  const htmlPath = path.join(context.reportsDir, context.config.reports.latestHtml);

  await writeJson(jsonPath, report);
  await writeText(htmlPath, buildHtml(report));

  return { jsonPath, htmlPath };
}
