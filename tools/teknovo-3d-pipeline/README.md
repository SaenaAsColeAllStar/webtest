# Teknovo 3D Pipeline

Production-ready 3D asset analysis and optimization CLI for Teknovo web products.

## What it does

- analyzes `glb` / `gltf` assets and emits JSON + HTML reports
- converts supported source formats to `glb`
- applies Draco and Meshopt compression
- optimizes embedded textures with `sharp`
- generates 100/60/30/10 LOD chains
- validates assets against Teknovo scene budgets
- writes Cloudflare-ready outputs and a `model-manifest.json`
- emits manifest metadata usable from Three.js / React Three Fiber loaders

## Supported inputs

Native, fully supported:

- `.glb`
- `.gltf`

Supported with adapters:

- `.obj` via `obj2gltf`
- `.fbx` via `FBX2glTF` if installed, or Blender fallback if available
- `.blend` via Blender CLI if installed
- `.stl` via `assimp` if installed

If an adapter tool is missing, the CLI exits with an actionable error instead of pretending the format is supported.

## Install

```bash
cd tools/teknovo-3d-pipeline
npm install
npm run build
```

## Commands

```bash
npm run analyze -- assets/raw/sample-triangle.gltf --budget standard
npm run convert -- assets/raw/model.obj --output assets/optimized/model.glb
npm run draco -- assets/raw/model.glb
npm run meshopt -- assets/raw/model.glb
npm run textures -- assets/raw/model.glb
npm run lod -- assets/raw/model.glb
npm run validate -- assets/raw/model.glb --budget mobile
npm run optimize -- assets/raw/model.glb --budget hero
```

You can also call the built CLI directly:

```bash
node dist/cli/index.js optimize assets/raw/sample-triangle.gltf --budget mobile
```

## Output layout

- `assets/optimized/<asset-id>/` — optimized `glb` plus generated LODs
- `assets/optimized/<asset-id>/model-manifest.json` — runtime manifest
- `reports/latest.json` — machine-readable report
- `reports/latest.html` — human-readable report

## Budget tiers

- `hero`: 15 MB
- `standard`: 8 MB
- `mobile`: 5 MB

## Texture policy

- uses `sharp` for PNG / JPEG / WebP / AVIF optimization when textures are embedded in the glTF asset
- KTX2 is capability-detected through `toktx`; if unavailable, the pipeline falls back gracefully to WebP/AVIF-friendly output notes

## Cloudflare + R3F integration

`model-manifest.json` includes:

- optimized asset path
- available LODs
- texture metadata
- flags indicating Draco and Meshopt usage
- `r3f.useGLTF.path` for direct loader integration

## Notes

- The pipeline is most reliable end-to-end for `glb` and `gltf`.
- Some external source formats depend on native tools outside Node. This project detects those dependencies and explains what is missing.
- The included `assets/raw/sample-triangle.gltf` fixture is used for local smoke verification.
