# Phase 2 — 3D Tooling Install (SMK Teknovo Portal)

**Generated:** 2026-06-20  
**Updated:** 2026-06-21  
**Workstation:** Ubuntu Noble (24.04), Linux 6.8, x86_64, glibc 2.39  
**Branch:** `feature/phase-4-subpage-migration`  
**Status:** ✅ **Tooling installed** — CAD export still required for 3 blocked assets

---

## Current system state (verified 21 Jun 2026)

| Tool | On PATH | Version | Location |
|------|---------|---------|----------|
| `FBX2glTF` | ✅ | 0.13.1 | `~/.local/bin/FBX2glTF` |
| `blender` | ✅ | 4.0.2 | `/usr/bin/blender` |
| `assimp` | ✅ | 5.3 | `/usr/bin/assimp` (via `assimp-utils`) |

All three tools confirmed on PATH. Pipeline build passes (`npm run build` in `tools/teknovo-3d-pipeline`).

---

## Conversion results after tooling install

| Asset | Source | Pipeline | assimp | Blender | Result |
|-------|--------|----------|--------|---------|--------|
| **hotel-hospitality** | `.fbx` | ✅ FBX2glTF | — | — | ✅ **Optimized** → `public/models/hotel-hospitality/` |
| **tourism-airport** | `.obj` | ✅ (prior) | — | — | ✅ **Optimized** → `public/models/tourism-airport/` |
| **school-building** | `.max` | ❌ unsupported | — | ❌ no `.max` importer | ⏸️ **Blocked** — 3ds Max export required |
| **gear-eureka** | `.STEP` | ❌ unsupported | ❌ AUTOMOTIVE_DESIGN schema | ❌ no STEP importer | ⏸️ **Blocked** — FreeCAD/SolidWorks export |
| **cnc-lathe** | `.SLDASM` | ❌ unsupported | ❌ no reader | — | ⏸️ **Blocked** — SolidWorks export required |

---

## Step 1 — Install apt packages ✅ DONE

```bash
sudo apt update
sudo apt install -y blender assimp-utils
```

Installed:
- **`blender`** 4.0.2 — CLI for `.blend`, `.fbx` fallback
- **`assimp`** 5.3 — via `assimp-utils`; STL export (STEP/SLDASM not supported for these sources)

---

## Step 2 — Install FBX2glTF ✅ DONE

`FBX2glTF` 0.13.1 at `~/.local/bin/FBX2glTF` (Godot fork, no sudo).

---

## Step 3 — Verification ✅ PASS

```bash
which blender assimp FBX2glTF
# /usr/bin/blender
# /usr/bin/assimp
# /home/teknovo/.local/bin/FBX2glTF

blender --version   # Blender 4.0.2
assimp version      # 5.3
FBX2glTF --version  # 0.13.1
```

---

## Step 4 — Hotel-hospitality ✅ DONE

Output: `public/models/hotel-hospitality/` (lod0–lod3 + `model-manifest.json`)

---

## Step 5 — Remaining CAD assets (manual export required)

### school-building (`105.max`, 1.47 GB)

Blender 4.0.2 **cannot** import `.max` natively (`bpy.ops.import_scene.max` not found).

**Next step:** Export from 3ds Max → glTF 2.0 (.glb), then:

```bash
cd /www/wwwroot/webtest/tools/teknovo-3d-pipeline
node dist/cli/index.js optimize \
  ../../public/models/school-building/.work/school-building-export.glb \
  --budget hero \
  --output ../../public/models/school-building/school-building-lod0.glb
```

### gear-eureka (`Eureka.STEP`, 2.85 MB)

`assimp export` fails: `IFC: Unrecognized file schema: AUTOMOTIVE_DESIGN`

**Next step:** Open in FreeCAD or SolidWorks → export GLB/OBJ, then pipeline optimize `--budget mobile`.

### cnc-lathe (`Double station lathe...SLDASM`, 71 MB package)

`assimp`: `No suitable reader found for .SLDASM`

**Next step:** Simplify assembly in SolidWorks → export GLB/OBJ/FBX, then pipeline convert + optimize `--budget standard`.

---

## What each tool unblocks

| Asset | Source format | Tool(s) tried | Fully unblocked? |
|-------|---------------|---------------|------------------|
| **hotel-hospitality** | `.fbx` | FBX2glTF | ✅ Yes |
| **tourism-airport** | `.obj` | obj2gltf | ✅ Yes |
| **school-building** | `.max` | Blender, pipeline | ❌ No — 3ds Max export required |
| **gear-eureka** | `.STEP` | assimp, Blender, pipeline | ❌ No — FreeCAD/SolidWorks export |
| **cnc-lathe** | `.SLDASM` | assimp, pipeline | ❌ No — SolidWorks export |

---

## Post-install artifact updates ✅ DONE

- `docs/artifacts/smk-teknovo/optimization-report.json` — tooling true, conversion attempts logged
- `docs/artifacts/smk-teknovo/assets-report.json` — `phase2Status` updated
- `public/models/*/conversion-required.json` — per-asset attempt logs + instructions
- `docs/roadmap/smk-teknovo-portal-phases.md` — Phase 2 status updated

---

## References

- Pipeline README: `tools/teknovo-3d-pipeline/README.md`
- CAD adapter stubs: `tools/teknovo-3d-pipeline/adapters/cad-formats.json`
- Phase roadmap: `docs/roadmap/smk-teknovo-portal-phases.md` (task 2.1)
- Optimization report: `docs/artifacts/smk-teknovo/optimization-report.json`
