# Phase 4 Subpage Migration Implementation Plan

## Goal
Migrate the public Phase 4 subpages for SMK Teknovo into the existing immersive Vite/React system so `PPDB`, `Berita`, the PPDB article detail, and the three `Program` detail pages share one premium editorial language, one navigation system, one build pipeline, and one accessibility baseline while preserving the current public URLs.

## User Review Required
> [!IMPORTANT]
> No backend, auth, or database changes are planned. This plan changes the public rendering path for existing routes and updates build/SEO artifacts. Existing URLs must keep resolving after the migration.

## Proposed Changes

### Database Layer
- No changes.

### Repository Layer
- No changes.

### Service Layer
- No changes.

### Controller Layer
- No changes.

### UI Layer
- [MODIFY] `apps/immersive-portal/vite.config.ts` — enable multi-page build output for homepage plus subpages.
- [NEW] `apps/immersive-portal/ppdb/index.html` — immersive PPDB entry shell.
- [NEW] `apps/immersive-portal/berita/index.html` — editorial berita index entry shell.
- [NEW] `apps/immersive-portal/berita/pembukaan-ppdb-2026.html` — immersive article detail shell.
- [NEW] `apps/immersive-portal/program/tkj.html` — TKJ immersive program detail shell.
- [NEW] `apps/immersive-portal/program/rpl.html` — RPL immersive program detail shell.
- [NEW] `apps/immersive-portal/program/dkv.html` — DKV immersive program detail shell.
- [NEW] `apps/immersive-portal/src/subpages/*` — shared page frame, content data, and route-specific entrypoints.
- [MODIFY] `apps/immersive-portal/src/components/layout/Header.tsx` — align global nav links with migrated routes.
- [MODIFY] `apps/immersive-portal/src/App.tsx` — align footer links with migrated route set.
- [MODIFY] `apps/immersive-portal/src/styles/global.css` — add editorial subpage system, reduced-motion fallbacks, and route-specific immersive sections.
- [MODIFY] `scripts/merge-immersive-build.js` — merge all generated route HTML and assets into `public/`.
- [MODIFY] `scripts/validate.js` — validate migrated route outputs and link expectations.
- [MODIFY] `public/sitemap.xml` — include migrated route set and article detail freshness.
- [MODIFY] `docs/artifacts/smk-teknovo/{product-design,motion-review,3d-review,ux-architecture,ui-ux-review,ai-ish-review}.md` — refresh gate evidence if Phase 4 materially changes page architecture or scores.

## Architecture Impact
The migration keeps the current public hosting model but replaces hand-authored static subpages with Vite-built HTML entries. The homepage remains the immersive SPA, while subpages become dedicated React-powered documents sharing the same tokens, motion language, and navigation/footer primitives. This reduces drift between `public/` pages and the immersive source of truth.

## Database Impact
No schema, migration, or persistence changes.

## API Impact
| Method | Route | Permission | Description |
|--------|-------|------------|-------------|
| None | None | N/A | Static public migration only |

## RBAC Impact
| Permission | Roles | Layer |
|-----------|-------|-------|
| None | Public | Static marketing routes only |

## Security Impact
| Control | Layer | Verification |
|---------|-------|--------------|
| Existing public-only surface preserved | Route/build | No new forms post to backend |
| External link integrity | UI | Verify route paths after build |
| SEO metadata correctness | HTML | Review canonical/OG/article schema |
| Reduced-motion fallback | UI | `prefers-reduced-motion` coverage on new motion |

## Taste Gate Sign-Off
| Gate | Status | Notes |
|------|--------|-------|
| 1 Product | PASS | Pages remain tied to PPDB conversion and program decision support |
| 2 UX | PASS | Shared wayfinding, existing URLs preserved, clear return paths |
| 3 Visual | PASS | Editorial immersive pages, no feature-grid fallback |
| 4 Architecture | PASS | One source of truth via Vite multi-page output |
| 5 Copy | PASS | Indonesian-first, premium vocational narrative retained |

## UI Impact
Phase 4 adds dedicated immersive public pages for:
- `PPDB`: conversion-first narrative with steps, deadlines, proof, and action hierarchy.
- `Berita`: editorial list with lead story rhythm, not card spam.
- `Berita detail`: one immersive article flow for `pembukaan-ppdb-2026`.
- `Program`: `tkj`, `rpl`, `dkv` pages reframed as industry pathways with program-specific micro-scenes and CTA continuity.

Public state checklist:
- Loading: shared page loader
- Success: primary route content
- Error: graceful static render if motion hooks are disabled
- Reduced motion: no scrub/pulse motion, simplified transforms
- Permission: not applicable for public marketing pages

## Test Plan
| Type | File | Scenario |
|------|------|----------|
| Build verification | `scripts/merge-immersive-build.js` | Multi-page dist merges into `public/` |
| Static validation | `scripts/validate.js` | All public routes and key links still exist |
| TypeScript | `apps/immersive-portal` | New page entries compile cleanly |
| Manual structure sanity | Built HTML routes | Canonical/meta/nav/footer preserved |

## Verification Plan
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `apps/immersive-portal` multi-page outputs generated for homepage + migrated routes
- [ ] `public/ppdb/`, `public/berita/`, `public/berita/pembukaan-ppdb-2026.html`, and `public/program/{tkj,rpl,dkv}.html` are replaced by merged immersive output
- [ ] Gate artifacts updated if Phase 4 materially changes scores or review evidence

## Assurance Sign-Off
| Step | Status | Evidence |
|------|--------|----------|
| Requirement clarification | ☑ | Phase 4 scope and minimum targets specified in user request |
| Context build | ☑ | Roadmap, evolution doc, artifacts, app structure, static pages reviewed |
| Risk analysis | ☑ | Route preservation and build merge identified as primary risk |
| Sharp edges | ☑ | Relative asset paths and multi-entry HTML output need careful handling |
| Insecure defaults | ☑ | No new backend/auth surface added |
| Static analysis plan | ☑ | `npm run build` and `npm run lint` required |
| Second opinion (if high-risk) | ☐ | Not required; public static migration only |

**Assurance verdict**: PASS
