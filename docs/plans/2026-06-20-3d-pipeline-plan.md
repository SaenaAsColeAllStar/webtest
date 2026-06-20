# Teknovo 3D Asset Pipeline Implementation Plan

## Goal
Build a production-ready TypeScript CLI at `tools/teknovo-3d-pipeline` that analyzes, converts, optimizes, validates, and reports on 3D assets for Teknovo web products. The pipeline must be fully functional for GLTF/GLB assets, generate Cloudflare-ready outputs and manifests for Three.js / React Three Fiber consumers, and fail gracefully when optional native converters are unavailable.

## User Review Required
> [!IMPORTANT]
> This work introduces a new local toolchain and third-party dependencies, including image and glTF processing libraries. The implementation will prefer native Node support for GLTF/GLB, and capability-detect external tools like Blender instead of pretending unsupported conversions work.

## Proposed Changes

### Database Layer
- No changes.

### Repository Layer
- No changes.

### Service Layer
- No changes.

### Controller Layer
- No changes.

### Tooling Layer
- [NEW] `tools/teknovo-3d-pipeline/package.json` — standalone npm package with TypeScript build and CLI scripts.
- [NEW] `tools/teknovo-3d-pipeline/tsconfig.json` — strict compilation for CLI + processors.
- [NEW] `tools/teknovo-3d-pipeline/README.md` — operational docs, supported formats, limitations, and command examples.
- [NEW] `tools/teknovo-3d-pipeline/cli/index.ts` — command parser and CLI entrypoint.
- [NEW] `tools/teknovo-3d-pipeline/commands/*.ts` — analyze, convert, compress, generate-lod, validate, optimize orchestration.
- [NEW] `tools/teknovo-3d-pipeline/processors/*.ts` — glTF/GLB IO, Draco, Meshopt, geometry, materials, and texture optimization logic.
- [NEW] `tools/teknovo-3d-pipeline/validators/*.ts` — performance, topology, and texture validators.
- [NEW] `tools/teknovo-3d-pipeline/reports/report-generator.ts` — JSON + HTML report generation and manifest output.
- [NEW] `tools/teknovo-3d-pipeline/config/pipeline.config.json` — default budgets, LOD rules, output policy, and manifest options.
- [NEW] `tools/teknovo-3d-pipeline/assets/raw/` — raw source assets and sample fixture.
- [NEW] `tools/teknovo-3d-pipeline/assets/optimized/` — processed asset output root.
- [NEW] `tools/teknovo-3d-pipeline/reports/` — generated reports including `latest.html` and `latest.json`.

## Architecture Impact
The tool will be a self-contained Node package rather than part of the portal runtime bundle. Core functionality will be implemented around a pipeline service layer under `src/` and thin command wrappers under `commands/`, with the CLI entrypoint delegating all asset work to reusable processors and validators. Native support is limited to GLTF/GLB operations using glTF Transform. Conversion for formats like `blend`, `fbx`, `obj`, and `stl` will use an adapter pattern with capability detection and actionable failure messages rather than silent no-ops.

## Database Impact
No schema, migration, persistence, or audit impact.

## API Impact
| Method | Route | Permission | Description |
|--------|-------|------------|-------------|
| None | None | N/A | Offline local tooling only |

## RBAC Impact
| Permission | Roles | Layer |
|-----------|-------|-------|
| None | Local developer only | CLI |

## Security Impact
| Control | Layer | Verification |
|---------|-------|--------------|
| No secrets in config or output | Tooling | Review generated files |
| Dependency realism for converters | Tooling | Capability detection and explicit error messages |
| Safe file writes under tool root | CLI | Output path normalization |
| No network dependency for core GLTF/GLB pipeline | Processors | End-to-end local run |

## Taste Gate Sign-Off
| Gate | Status | Notes |
|------|--------|-------|
| 1 Product | PASS | Standardized asset pipeline directly supports Phase 2 immersive build quality |
| 2 UX | N/A | Developer tooling, not end-user UI |
| 3 Visual | N/A | Developer tooling, not rendered product UI |
| 4 Architecture | PASS | Self-contained package with reusable processors and explicit support matrix |
| 5 Copy | PASS | Reports and CLI messaging will be actionable and plain-language |

## UI Impact
No direct user-facing page changes in this task. The deliverable is a build-time tool that emits manifests consumed by `three` / `@react-three/fiber` integrations.

## Test Plan
| Type | File | Scenario |
|------|------|----------|
| TypeScript build | `tools/teknovo-3d-pipeline` | Strict compilation succeeds |
| Command smoke test | CLI | `analyze` on fixture GLTF/GLB asset succeeds |
| Pipeline orchestration | CLI | `optimize` emits optimized asset, manifests, and reports |
| Validation | CLI | `validate` enforces budgets and emits actionable findings |

## Verification Plan
- [ ] `npm install` succeeds in `tools/teknovo-3d-pipeline`
- [ ] `npm run build` succeeds
- [ ] `node dist/cli/index.js analyze ...` succeeds on fixture asset
- [ ] `node dist/cli/index.js optimize ...` emits optimized output, `reports/latest.html`, `reports/latest.json`, and `model-manifest.json`
- [ ] Capability detection returns actionable errors for unsupported conversions without crashing the CLI

## Assurance Sign-Off
| Step | Status | Evidence |
|------|--------|----------|
| Requirement clarification | ☑ | User provided exact structure, features, and validation requirements |
| Context build | ☑ | Repo conventions, roadmap, root package setup, and existing R3F usage reviewed |
| Risk analysis | ☑ | External converter availability and glTF processing support identified as primary risks |
| Sharp edges | ☑ | Dependency API compatibility, texture codecs, and path-safe output handling identified |
| Insecure defaults | ☑ | Tool is offline/local only; no credential or runtime access changes |
| Static analysis plan | ☑ | TypeScript build, lint diagnostics, and CLI smoke tests required |
| Second opinion (if high-risk) | ☐ | Not required for local tooling package |

**Assurance verdict**: PASS

## Security Gate Sign-Off — Teknovo 3D Pipeline

| Gate | Status | Evidence |
|------|--------|----------|
| 1 Threat context | ✅ | Local-only offline asset pipeline with path and dependency constraints |
| 2 RBAC | N/A | No routes, auth, or runtime permissions |
| 3 API | N/A | No API surface |
| 4 Database | N/A | No database surface |
| 5 Infra | N/A | No deployment or tunnel work in scope |
| 6 Supply chain | ✅ | Dependencies limited to asset tooling; unsupported tools are capability-detected |
| 7 Pre-deploy | ☐ | Pending local build and smoke verification |

**Verdict**: PASS

## Implementation Tasks
1. Scaffold package structure, strict TS config, folders, and default config.
2. Implement shared pipeline utilities for config loading, path handling, format detection, GLTF/GLB IO, and report models.
3. Implement native GLTF/GLB analysis, validation, optimization, Draco/Meshopt compression, texture processing, and manifest generation.
4. Implement converter adapters with graceful detection for `obj`, `stl`, `fbx`, and `blend`.
5. Add fixture asset(s), build the package, run smoke tests, and fix issues until green.
