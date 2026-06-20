# UX Architecture — SMK Teknovo Immersive Portal

**Date:** 2026-06-20  
**Gate:** UX Architecture

## Information Architecture

```text
Homepage (immersive SPA)
├── Story (#story)
├── Transformation (#transformation)
├── Industry (#industry) — Phase 2
├── Student Journey (#student-journey) — Phase 2
├── Career Journey (#career-journey) — Phase 2
├── Proof (#proof) — Phase 3
├── Action (#action) — Phase 3
├── FAQ (#faq) — Phase 3
└── Kontak (#kontak) — Phase 3

Static (Phase 1 preserved)
├── /ppdb/
├── /berita/
├── /program/{tkj,rpl,dkv}.html
└── /portal/{siswa,guru,orang-tua}.html
```

## Navigation

| Element | Behavior |
|---------|----------|
| Primary nav | Anchor links to chapters + Berita/PPDB external |
| Portal dropdown | Links to static portal pages |
| Scroll progress | Top bar + optional chapter dots (Phase 2) |
| Mobile | Hamburger drawer, full-screen overlay |

## Scroll Chapter Map

| # | Chapter ID | Trigger | Motion Handoff | 3D Layer |
|---|------------|---------|----------------|----------|
| 1 | story | Page load | Load stagger → scroll scrub | Full Canvas |
| 2 | transformation | 30vh | Clip wipe from Story | Partial Canvas |
| 3 | industry | 60vh | Object orbit enter | Full Canvas |
| 4 | student-journey | 90vh | Timeline scrub | Path curve |
| 5 | career-journey | 120vh | Data flow | Minimal |
| 6 | proof | 150vh | Fade stagger | None |
| 7 | action | 170vh | CTA focus | None |

## Accessibility

- Skip link to `#story` content
- Focus trap in mobile nav
- `prefers-reduced-motion` respected
- Semantic landmarks: header, main, footer

## Mobile IA

- Chapter nav collapses to hamburger
- 3D simplified, copy remains primary
- Sticky PPDB CTA bottom bar (Phase 3)
