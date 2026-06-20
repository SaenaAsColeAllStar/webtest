# 3D Object Briefs — Teknik Mesin & Usaha Layanan Wisata

**Date:** 2026-06-21  
**Gate:** 3D Experience Architect  
**PRD Baseline:** V2.1  
**Companion:** [`3d-review.md`](./3d-review.md), [`assets-report.json`](./assets-report.json)

---

## Teknik Mesin — Chapter 3

### Scene Intent

Communicate **precision, discipline, and making**. The visitor should feel that Teknik Mesin students work with real industrial tools and production logic — not abstract "technology" shapes.

### L1 Primary: CNC Lathe (`cnc-lathe`)

| Field | Brief |
|-------|-------|
| Asset | Double Station Lathe — SolidWorks assembly, 100 parts |
| Source | `3d/uploads-files-4351282-Double+station+lathe+loading+and+unloading/` |
| Narrative role | Hero machine — the tangible center of Teknik Mesin |
| Visual emphasis | Spindle axis, loading/unloading stations, industrial mass |
| Material language | Brushed steel, machine paint, functional surfaces — no glossy sci-fi |
| Camera | Slow orbit or dolly along the spindle line; weighty, deliberate |
| Motion inherit | Mechanical cadence from motion review — heavier easing |
| Scale | Dominant in frame; visitor should sense physical scale |
| Mobile fallback | Simplified silhouette mesh or static hero frame + DOM copy |
| Budget tier | Standard (≤8 MB lod0); decimate assembly before web export |
| Blocker | Export simplified GLB from SolidWorks |

**Do:** Show the machine as a working production unit.  
**Don't:** Float disconnected parts, add particle sparks, or use neon accent lighting.

### L2 Supporting: Eureka Gear (`gear-eureka`)

| Field | Brief |
|-------|-------|
| Asset | Eureka gear — STEP CAD, 2.85 MB |
| Source | `3d/uploads-files-328120-Eureka/Eureka.STEP` |
| Narrative role | Precision metaphor — systems thinking, mechanical linkage |
| Visual emphasis | Tooth profile, rotational symmetry, engineering clarity |
| Placement | Secondary cluster near CNC — explains "how things connect" |
| Camera | Tighter macro pass; can intercut with CNC wide shot |
| Scale | 20–30% of visual weight vs L1 lathe |
| Budget tier | Mobile (≤5 MB) — smallest asset, fastest load |
| Blocker | Convert STEP → GLB via FreeCAD/Blender/assimp |

**Do:** Use as a teaching metaphor for precision and interlocking systems.  
**Don't:** Replace the CNC lathe as L1 or animate as decorative spinner.

### Teknik Mesin Composition

```text
[Viewport]
  L1: CNC Lathe (center-left, 60% visual weight)
  L2: Gear cluster (right rail or foreground, 25%)
  L3: Workshop atmosphere — subtle depth fog, restrained (15%)
```

### Copy Pairing (Brand V2.1)

- Headline direction: industrial readiness, hands-on craft
- Support: connect to **Belajar. Berkarya. Siap Industri.** — the "Berkarya" beat
- CTA: none primary — story continues to ULW

---

## Usaha Layanan Wisata — Chapter 4

### Scene Intent

Communicate **professional service, confidence, and experience design**. ULW is human-facing excellence — travel, hospitality, and guest experience choreography. This chapter uses **two L1 assets** in sequence or split composition.

### L1 Primary A: Airport Terminal (`tourism-airport`)

| Field | Brief |
|-------|-------|
| Asset | Modern Airport Terminal — OBJ, pipeline-optimized |
| Source | `3d/uploads-files-6830356-modern+airport+terminal+3d+model/` |
| Output | `public/models/tourism-airport/` (lod0–lod3 + manifest) ✅ |
| Narrative role | Travel industry scale — movement, arrival, professional infrastructure |
| Visual emphasis | Terminal architecture, arrival hall volume, transit flow |
| Material language | Glass, concrete, wayfinding — clean and operational |
| Camera | Expansive pull-back or lateral glide suggesting passenger flow |
| Motion inherit | Softer professional pacing from motion review |
| LOD policy | Desktop: lod0 (6.4 MB); Mobile: lod3 (1.6 MB) |
| Triangle note | 964K source — serve lod3 on mobile; decimation recommended for desktop hero |
| Status | **Production-ready** |

**Do:** Frame as real tourism/travel industry infrastructure.  
**Don't:** Use as generic "futuristic building" without service context.

### L1 Primary B: Hotel Hallway (`hotel-hospitality`)

| Field | Brief |
|-------|-------|
| Asset | Hotel Hallway — FBX + C4D, 16 textures |
| Source | `3d/uploads_files_5431567_hallway_hotel/hallway_hotel.fbx` |
| Narrative role | Hospitality intimacy — guest experience, service warmth, interior polish |
| Visual emphasis | Corridor depth, carpet texture, wood/metal material contrast, ambient warmth |
| Material language | Carpet, mahogany veneer, brushed aluminum, plaster — warm hospitality palette |
| Camera | Corridor glide — forward dolly with vanishing-point depth |
| Motion inherit | Service-flow choreography; softer than Teknik Mesin |
| Texture set | 16 maps in `tex/` — downscale to 1024 for mobile LOD |
| Budget tier | Standard (≤8 MB lod0 estimate) |
| Blocker | FBX → GLB via FBX2glTF or Blender CLI |
| Status | **Uploaded — pending Phase 2 optimize**

**Do:** Pair with airport to show ULW covers both travel and hospitality service paths.  
**Don't:** Merge airport and hotel into one scene kit; keep distinct identities.

### ULW Dual-Scene Composition

**Option A — Scroll handoff (recommended):**

```text
Beat 1 (scroll 0–50%): Airport terminal — travel/industry scale
Beat 2 (scroll 50–100%): Hotel hallway — hospitality/service warmth
```

**Option B — Split viewport (desktop only):**

```text
[Left 55%] Airport terminal (arrival flow)
[Right 45%] Hotel corridor (guest service)
```

### L2 Supporting Elements (both beats)

- Service-route markers (subtle floor lines, signage abstractions)
- Copy rails explaining ULW career paths
- No literal human figures required — environment tells the story

### L3 Environmental Detail

- Restrained ambient lighting shifts: cool terminal → warm corridor
- No particle effects, no floating icons

### Copy Pairing (Brand V2.1)

- Headline direction: service excellence, human-facing professionalism
- Support: ULW as second flagship alongside Teknik Mesin
- Connect to **Belajar. Berkarya. Siap Industri.** — the "Siap Industri" service beat

---

## Cross-Chapter 3D Load Budget

| Chapter | Assets loaded | Mobile LOD target | Desktop LOD target |
|---------|---------------|-------------------|---------------------|
| Future Starts Here | school-building | TBD (blocked) | lod0 hero |
| Teknik Mesin | cnc-lathe + gear-eureka | gear + simplified lathe | full assembly |
| Usaha Layanan Wisata | tourism-airport + hotel-hospitality | airport lod3 + hotel lod2 | airport lod0 + hotel lod0 |

**Total initial load guidance:** ≤25 MB documented in assets-report; lazy-load per chapter, never preload all five packs.

---

## Phase 4 Implementation Checklist

- [ ] Export `cnc-lathe` simplified GLB from SolidWorks
- [ ] Convert `gear-eureka` STEP → GLB
- [ ] Convert `hotel-hospitality` FBX → GLB, run optimize + LOD
- [ ] Export `school-building` from 3ds Max
- [ ] Wire `/public/models/*` paths in immersive portal (no R2)
- [ ] Mobile LOD selection per manifest
- [ ] Reduced-motion: static hero frames for each scene
- [ ] Verify ULW chapter loads **both** airport and hotel — not airport alone
