# Teknovo Asset Studio Implementation Plan

## Goal
Build a production-structured asset management application for Teknovo 3D and media assets with Next.js 15, shared packages, SQLite persistence, local preview, manifest/export generation, deployment orchestration, and a graceful Cloudflare R2 integration layer.

## Proposed Changes
### Database Layer
- [NEW] `packages/core/src/context.ts` - SQLite bootstrap, migrations, repositories, and services.
- [NEW] `packages/core/src/services.ts` - asset, dashboard, manifest, and validation service orchestration.

### Repository Layer
- [NEW] `packages/core/src/repositories.ts` - typed repositories for assets and jobs with soft delete support.

### Service Layer
- [NEW] `packages/asset-engine/src/index.ts` - 3D pipeline adapter and performance analysis helpers.
- [NEW] `packages/r2/src/index.ts` - env-driven Cloudflare R2 client with graceful unavailable state.
- [NEW] `packages/preview/src/index.ts` - manifest and React Three Fiber export generators.

### Controller Layer
- [NEW] `apps/web/app/api/**` - route handlers for dashboard, assets, upload, optimize, validate, deploy, manifest, export, and preview file streaming.

### UI Layer
- [NEW] `apps/web/app/**` - Dashboard, Asset Library, Upload Center, Optimization, Validation, Deployment, and Preview Studio pages.
- [NEW] `packages/ui/src/**` - shared shadcn-style design primitives.

## Architecture Impact
- Self-contained monorepo under `tools/teknovo-asset-studio`.
- Uses filesystem storage plus SQLite for initial production use, with a repository/service split to allow future PostgreSQL replacement.
- Integrates with `tools/teknovo-3d-pipeline` through an adapter that invokes the existing CLI when available.

## Security Impact
- No embedded credentials; all R2 config is env-driven.
- Uploads are stored locally and surfaced only through route handlers.
- Mutations are validated server-side with Zod.

## Verification Plan
- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run verify:flow`
