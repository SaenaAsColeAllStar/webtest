# 3D Experience Review — SMK Teknovo Portal

**Date:** 2026-06-20 (Phase 3 update)  
**Gate:** 3D Experience Architect  
**Verdict:** PASS  
**3D Experience Score:** 88 / 100

## Scene Inventory

### Story Scene (Phase 1 — IMPLEMENTED)

| Element | Purpose | Why It Exists |
|---------|---------|---------------|
| Icosahedron (core) | SMK Teknovo hub | Central school identity in ecosystem |
| TorusKnot (orbit) | Industry connection ring | Link-and-match curriculum |
| Sphere nodes (×8) | Student skill nodes | Workforce network metaphor |
| Connection lines | Career pathways | Visualize journey between nodes |
| Ambient particles | Depth atmosphere | Spatial depth — supports "ecosystem" narrative |

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

### Student Journey Scene (Phase 2 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Curved path (Line) | Learning journey trajectory |
| Progress line (cyan overlay) | Scroll-linked completion |
| Milestone spheres (×6) | Six learning stages light up on progress |

### Career Journey Scene (Phase 2 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Octahedron nodes (×3) | TKJ/RPL/DKV career destinations |
| Connection lines | Alumni path flow between programs |

### Proof Scene (Phase 3 — IMPLEMENTED)

| Element | Purpose |
|---------|---------|
| Golden octahedron (Float) | Achievement / excellence metaphor |
| Trophy pedestal (cylinders) | Editorial prestige anchor — not decorative spam |
| Torus ring accent | Spatial depth beside DOM timeline |

**Scene purpose:** Subtle spatial proof narrative — DOM carries editorial content; 3D reinforces "earned achievement" without KPI blocks

**Scroll behavior:** Section-scoped visibility on `#proof`, scroll-linked Y position + rotation

### Action / FAQ / Kontak (Phase 3 — DOM-FIRST)

| Chapter | 3D | Rationale |
|---------|-----|-----------|
| Action | None | Conversion clarity — CTA must dominate without WebGL distraction |
| FAQ | None | Accordion readability requires stable layout |
| Kontak | None | Form interaction — no 3D behind inputs |

## Camera Flow

```text
Story:          Position z=4 → scroll scrub → z=8 (pull back)
Transform:      Fixed side angle, object scale morph
Industry:       Three objects at x=-2.8, 0, 2.8 — stagger orbit enter
Student Journey: Path curve at y=-1.5, milestone markers along curve
Career Journey:  Minimal nodes at z=-2, subtle rotation on flow progress
Proof:           Trophy cluster at x=2.8, float + scroll rotation (section-scoped)
```

## Spatial Hierarchy

1. **Foreground:** DOM copy (z-index 10)
2. **Midground:** R3F Canvas (fixed/sticky) — section-scoped visibility
3. **Background:** Deep Space gradient + subtle grid

## Mobile Fallback

- `<768px`: dpr={[1, 1.25]}, simplified geometry counts
- Section-scoped 3D activation reduces GPU load
- `prefers-reduced-motion`: Static composition, no scroll-linked camera
- Proof 3D: minimal triangle count (~800 tris)

## Performance

- Polygon budget Phase 3: ~15K triangles (peak Proof + Career overlap brief)
- Action/FAQ/Kontak: zero additional WebGL cost
- Section visibility toggling prevents all scenes rendering at full opacity

## Scoring (Phase 3)

| Dimension | Score |
|-----------|-------|
| Purposeful objects | 9/10 |
| Spatial hierarchy | 9/10 |
| Camera flow | 8/10 |
| Narrative alignment | 9/10 |
| Mobile fallback | 9/10 |
| Performance | 9/10 |
| DOM/3D balance | 9/10 |

**Weighted Score: 88** — PASS (≥85)
