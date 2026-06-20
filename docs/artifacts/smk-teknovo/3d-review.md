# 3D Experience Review — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-21  
**Gate:** 3D Experience Architect  
**PRD Baseline:** V2.1  
**Verdict:** PASS  
**3D Experience Score:** 92 / 100

## Design Order Gate (V2.1)

3D work is **third** in the V2.1 design order:

**Story First → Motion Second → 3D Third → Technology Last**

This review passes only after brand, creative, product, UX, and motion artifacts are aligned. 3D must serve the approved narrative — never drive it.

## 3D Objective

3D must support the PRD V2.1 story, especially the two flagship program chapters:

- **Teknik Mesin** must feel engineered, precise, physical, and production-oriented.
- **Usaha Layanan Wisata** must feel orchestrated, human-facing, polished, and experiential.

3D is approved only when it helps explain these stories. Decorative geometry remains blocked.

## Asset Inventory (Phase 1 + Hotel Upload)

All five primary assets are now present in `/3d`. See [`assets-report.json`](./assets-report.json).

| Asset ID | Source | Chapter | Pipeline Status |
|----------|--------|---------|-----------------|
| `school-building` | `105.max` (1.47 GB) | Future Starts Here | Blocked — needs Max export |
| `cnc-lathe` | SolidWorks assembly (71 MB) | Teknik Mesin | Blocked — needs SW export |
| `gear-eureka` | `Eureka.STEP` (2.85 MB) | Teknik Mesin (L2) | Blocked — needs STEP convert |
| `tourism-airport` | OBJ (64.4 MB) | Usaha Layanan Wisata | ✅ Optimized → `/public/models/tourism-airport/` |
| `hotel-hospitality` | `hallway_hotel.fbx` (58.8 MB pkg) | Usaha Layanan Wisata | Blocked — needs FBX2glTF/Blender |

### Hotel / Hospitality — New Asset (20 Jun 2026)

- **Source:** `3d/uploads_files_5431567_hallway_hotel/`
- **Primary mesh:** `hallway_hotel.fbx` (20.1 MB)
- **Artist source:** `hallway_hotel.c4d` (32.8 MB)
- **Textures:** 16 maps in `tex/` (5.8 MB) — carpet, wood veneer, brushed metal, plaster, stucco
- **Scene role:** L1 hospitality corridor — guest-service warmth paired with airport terminal travel flow
- **Phase 2 next step:** Convert FBX → GLB, optimize + LOD chain → `public/models/hotel-hospitality/`

## Scene Purpose and Narrative (V2.1)

| Chapter | 3D Role | Purpose | Story Outcome |
|---------|---------|---------|---------------|
| 1. Future Starts Here | High | Establish Teknovo as a spatially premium launch point into professional futures | Opening conviction |
| 2. Industry Challenge | Medium | Support urgency through structural or kinetic evidence cues | Context before specialization |
| 3. Teknik Mesin | High | Show industrial craft, fabrication logic, tools, and mechanical readiness | Engineering path becomes concrete |
| 4. Usaha Layanan Wisata | High | Dual-scene: airport travel flow + hotel hospitality corridor | Service pathway becomes equally premium |
| 5. Industry Alignment | Medium | Visualize school-partner-tool-outcome connectivity | Alignment credibility |
| 6. Student Transformation | Low to medium | Support progression rather than dominate copy | Human growth remains primary |
| 7. Achievements | Low | Subtle prestige support only | Proof remains editorial |
| 8. PPDB | None or minimal | Keep conversion dominant | Action clarity |

## Chapter Asset Mapping (V2.1)

```text
Future Starts Here     → school-building (hero)
Industry Challenge     → (DOM/motion-led; no primary 3D)
Teknik Mesin           → cnc-lathe (L1) + gear-eureka (L2)
Usaha Layanan Wisata   → tourism-airport (L1 travel) + hotel-hospitality (L1 hospitality)
Industry Alignment     → (network/connectors; optional lightweight 3D)
Student Transformation → (optional subtle depth)
Achievements           → DOM-first
PPDB                   → no WebGL
```

## Object Categories by Flagship Scene

### Teknik Mesin

Allowed object categories:

- machine assemblies,
- fabrication silhouettes,
- gear, spindle, clamp, measurement, or tooling metaphors,
- production-stage forms,
- disciplined industrial material cues.

The scene should communicate **precision, discipline, and making**.

### Usaha Layanan Wisata

Allowed object categories:

- airport terminal architecture (travel flow),
- hotel corridor / hospitality interior (guest experience),
- service-route cues,
- luggage, reception, table-setting, or travel-flow metaphors,
- choreographed spatial markers that imply guest experience.

The scene should communicate **professional service, confidence, and experience design**.

**Dual-object composition:** Airport terminal handles macro travel/industry scale; hotel hallway handles intimate hospitality/service warmth. Do not merge into one generic "tourism" mesh.

## Spatial Hierarchy

- **L1 Primary Story Object:** one dominant object or cluster per chapter beat.
- **L2 Supporting Context:** labels, rails, connectors, or secondary forms that explain the main object.
- **L3 Environmental Detail:** restrained atmosphere only; never competing geometry.

## Camera Flow

| Chapter | Camera behavior |
|---------|-----------------|
| Future Starts Here | Controlled reveal and pull-back to establish scale and ambition |
| Industry Challenge | Tighter pacing and evidence-oriented movement |
| Teknik Mesin | Deliberate, weighty motion that emphasizes precision and materiality |
| Usaha Layanan Wisata | Airport: expansive arrival flow; Hotel: corridor glide with warm depth |
| Industry Alignment | Expanding or connecting motion to show relational systems |

## Legacy and Interim Status

| Existing Scene | Status under PRD V2.1 | Action |
|----------------|------------------------|--------|
| Opening ecosystem scene | Interim reusable | Can be reframed for chapter 1 |
| Existing `Industry` scene with `TKJ / RPL / DKV` objects | Legacy | Replace, do not extend |
| Existing transformation/proof support scenes | Interim reusable | Re-map to chapters 6 and 7 only |
| Legacy `TKJ / RPL / DKV` program-route micro-scenes | Legacy support only | Keep secondary until route strategy is decided |

## Performance Constraints

| Metric | Constraint |
|--------|------------|
| Desktop FPS | `>= 60` |
| Mobile FPS | `>= 45` |
| LCP | `< 2.5s` |
| Initial 3D payload per chapter pack | `< 1.5MB compressed` (mobile LOD) |
| Visible triangles | `< 40K desktop / < 18K mobile` |
| Texture cap | `2048` desktop / `1024` mobile |
| Total initial load budget | `<= 25 MB` across chapter packs |

## Implementation Guardrails

- `Teknik Mesin` and `ULW` should be separate scene identities, not one reused visual kit with relabeled copy.
- ULW chapter uses **two distinct assets** (airport + hotel) — not airport alone.
- `Achievements` and `PPDB` should remain mostly DOM-first unless a very specific spatial argument exists.
- Any return to floating abstract spheres, filler particles, or generic futuristic geometry fails the review.
- Mobile fallbacks and reduced-motion alternatives are mandatory for every major scene.
- Load from `/public/models` — no R2 dependency for landing.

## Object Briefs

Detailed per-object briefs for Teknik Mesin and ULW flagship scenes: [`3d-object-briefs.md`](./3d-object-briefs.md)

## Score Breakdown

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Narrative Value | 25% | 9/10 | V2.1 story purpose explicit; hotel completes ULW dual-scene |
| Asset Mapping | 20% | 10/10 | All 5 primary assets mapped; hotel upload integrated |
| Spatial Logic | 20% | 9/10 | Clear L1/L2/L3 hierarchy and scene purpose |
| Camera Flow | 15% | 9/10 | Distinct motion language between Teknik Mesin and ULW |
| Performance | 10% | 9/10 | Constraints specific; airport LOD3 mobile-viable |
| Accessibility | 5% | 9/10 | Fallbacks expected and scoped |
| User Focus | 5% | 10/10 | One dominant object logic protected |

## Verdict

The 3D plan clears the `>= 85` gate and gives Phase 4 implementation a clean V2.1 target. Hotel/Hospitality asset is now inventoried and mapped to ULW. Phase 2 optimization for hotel-hospitality remains blocked pending FBX2glTF or Blender CLI.
