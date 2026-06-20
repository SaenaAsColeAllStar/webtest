# 3D Experience Review — SMK Teknovo Portal

**Date:** 2026-06-20 (Phase 2 update)  
**Gate:** 3D Experience Architect  
**Verdict:** PASS  
**3D Experience Score:** 87 / 100

## Scene Inventory

### Story Scene (Phase 1 — IMPLEMENTED)

| Element | Purpose | Why It Exists |
|---------|---------|---------------|
| Icosahedron (core) | SMK Teknovo hub | Central school identity in ecosystem |
| TorusKnot (orbit) | Industry connection ring | Link-and-match curriculum |
| Sphere nodes (×8) | Student skill nodes | Workforce network metaphor |
| Connection lines | Career pathways | Visualize journey between nodes |
| Ambient particles | Depth atmosphere | Spatial depth — supports "ecosystem" narrative |

**Scene purpose:** Industry Simulation + School Ecosystem Visualization

### Transformation Scene (Phase 1 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Morphing scale states | Student → professional transition |
| Split lighting | Before/after emotional beat |

### Industry Scene (Phase 2 — IMPLEMENTED)

| Object | Program | Purpose |
|--------|---------|---------|
| Server rack (stacked boxes + panel) | TKJ | Network infrastructure metaphor |
| Code brackets (angled box pairs) | RPL | Software development syntax symbol |
| Pen tool (cylinder + cone + sphere) | DKV | Creative design instrument |

**Scene purpose:** Program-specific industry alignment — each object maps to real career tools

**Scroll behavior:** Sequential opacity stagger (rack → brackets → pen), rotation on scrub

### Student Journey Scene (Phase 2 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Curved path (Line) | Learning journey trajectory |
| Progress line (cyan overlay) | Scroll-linked completion |
| Milestone spheres (×6) | Six learning stages light up on progress |

**Scene purpose:** Visualize day-in-life learning path as spatial timeline

### Career Journey Scene (Phase 2 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Octahedron nodes (×3) | TKJ/RPL/DKV career destinations |
| Connection lines | Alumni path flow between programs |
| Minimal geometry | DOM carries narrative; 3D supports depth |

**Scene purpose:** Career outcome visualization — not decorative, anchors program-to-career flow

## Camera Flow

```text
Story:          Position z=4 → scroll scrub → z=8 (pull back)
Transform:      Fixed side angle, object scale morph
Industry:       Three objects at x=-2.8, 0, 2.8 — stagger orbit enter
Student Journey: Path curve at y=-1.5, milestone markers along curve
Career Journey:  Minimal nodes at z=-2, subtle rotation on flow progress
```

## Spatial Hierarchy

1. **Foreground:** DOM copy (z-index 10)
2. **Midground:** R3F Canvas (fixed/sticky) — section-scoped visibility
3. **Background:** Deep Space gradient + subtle grid

## Mobile Fallback

- `<768px`: dpr={[1, 1.25]}, simplified geometry counts
- Section-scoped 3D activation reduces GPU load
- `prefers-reduced-motion`: Static composition, no scroll-linked camera

## Performance

- Polygon budget Phase 2: ~14K triangles (all scenes, not simultaneous full render)
- Section visibility toggling prevents all scenes rendering at full opacity
- `dpr={[1, 1.5]}` desktop, `[1, 1.25]` mobile

## Scoring (Phase 2)

| Dimension | Score |
|-----------|-------|
| Purposeful objects | 9/10 |
| Spatial hierarchy | 9/10 |
| Camera flow | 8/10 |
| Narrative alignment | 9/10 |
| Mobile fallback | 8/10 |
| Performance | 8/10 |
| Section transitions | 9/10 |

**Weighted Score: 87** — PASS (≥85)
