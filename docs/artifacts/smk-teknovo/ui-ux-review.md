# UI UX Layout Contract Review — SMK Teknovo Portal

**Date:** 2026-06-20  
**Gate:** UI UX Review  
**Verdict:** PASS (Phase 1 scope)

## Public Surface — ImmersivePage Contract

```text
ImmersivePage
├── SceneNavigation — minimal header, portal dropdown
├── ScrollProgress — top indicator
├── SceneStack
│   ├── StoryScene (3D + copy)
│   └── TransformationScene (motion split)
└── InteractiveLayer — R3F Canvas sticky
```

## Checklist

- [x] No PageShell on public homepage
- [x] No hero banner pattern
- [x] No KPI stat block on immersive homepage (removed from Phase 1 build)
- [x] No feature grid 3×N on immersive homepage
- [x] Scene-based chapters, not section stack
- [x] RBAC N/A — public unauthenticated
- [x] Five states: Loading ✓, Success ✓ (Phase 1); Error/Empty/Permission Phase 3+

## ERP Portal Pages (Static — unchanged Phase 1)

- Portal pages remain static HTML
- No 3D on portal entry pages
- Future: PageShell when ERP app integrated

**Verdict: PASS** — proceed to implementation.
