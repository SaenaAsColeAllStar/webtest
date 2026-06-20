# Roadmap Evolusi Portal SMK Teknovo — PRD V2.1 Alignment

**Versi:** 2.1.0  
**Tanggal:** 20 Juni 2026  
**PRD Baseline:** V2.1 (Approved)  
**Branch evaluasi:** `feature/phase-4-subpage-migration`  
**Scope dokumen:** penyelarasan roadmap terhadap PRD V2.1 untuk **SMK Teknovo Immersive Landing Experience**

> Dokumen task per fase: [`smk-teknovo-portal-phases.md`](./smk-teknovo-portal-phases.md)  
> Deliverable audit 3D: [`docs/artifacts/smk-teknovo/assets-report.json`](../artifacts/smk-teknovo/assets-report.json)

---

## 1. Ringkasan Eksekutif

PRD V2.1 **dapat dieksekusi**, dengan constraint tooling dan asset yang terdokumentasi di Phase 1 audit. Implementasi publik saat ini memiliki fondasi berguna (`Vite + React 19 + R3F + GSAP + Lenis`), tetapi narasi, urutan chapter, pipeline asset, dan target deploy perlu diselaraskan ke V2.1 sebelum rebuild lanjutan.

### Keputusan inti V2.1

1. **Pesan utama:** **Belajar. Berkarya. Siap Industri.**
2. **Urutan desain:** Story First → Motion Second → 3D Third → Technology Last.
3. **Phase 1 (PRD) = 3D Asset Audit** — deliverable `assets-report.json` ✅ selesai.
4. **Phase 2 (PRD) = 3D Optimization** — output ke `/public/models` via `tools/teknovo-3d-pipeline`.
5. **Phase 3+ = Creative refresh, chapter rebuild, migration, launch.**
6. **Deploy target:** Cloudflare Pages + `/public/models` — **R2 tidak diperlukan** untuk landing experience.
7. **Stack transisi:** Vite interim; **Next.js 15 + Tailwind** tetap target jangka menengah.
8. **Program utama:** `Teknik Mesin + Usaha Layanan Wisata (ULW)`.

### Status kelayakan

| Area | Status | Catatan |
|------|--------|---------|
| PRD V2.1 roadmap alignment | **Executable now** | Roadmap dan phase plan diperbarui sesi ini |
| Phase 1 Asset Audit | **Complete** | `assets-report.json` — 4/5 primary assets found, 1.67 GB source |
| Phase 2 Pipeline optimization | **Blocked partially** | Blender/assimp tidak terpasang; 3/4 assets butuh konversi manual |
| Lanjutan chapter rebuild (Vite) | **Executable with constraints** | Butuh Phase 2 asset + Phase 3 creative refresh |
| Migrasi Next.js 15 | **Not immediate** | Setelah chapter dan asset strategy stabil |
| Hotel/Hospitality asset | **Missing** | PRD lists 5 primary; audit menemukan 4 packages |

---

## 2. Baseline Saat Ini

### Implementasi yang benar-benar ada

| Area | Baseline aktual |
|------|------------------|
| Public experience app | `apps/immersive-portal` |
| Stack | `React 19 + TypeScript + Vite 6 + Three.js + @react-three/fiber + drei + GSAP + Lenis + motion` |
| Root build | `npm run build` di root menggabungkan build immersive ke `public/` lalu validasi |
| Deploy saat ini | Berbasis `wrangler` dengan output static ke `public/` |
| 3D source assets | `/3d` — 4 packages, 166 files, ~1.67 GB (audit 20 Jun 2026) |
| 3D pipeline tool | `tools/teknovo-3d-pipeline` — analyze/convert/optimize/LOD tersedia |
| Asset studio (internal) | `tools/teknovo-asset-studio` — opsional; R2 deploy **bukan** jalur landing |
| Optimized models dir | `/public/models` — **belum ada** (target Phase 2) |
| Framework target PRD V2.1 | **Belum** `Next.js 15` |
| Target deploy PRD V2.1 | **Belum** `Cloudflare Pages` (interim: wrangler static) |

### Asset inventory (Phase 1 audit)

| PRD Role | Asset | Format | Size | Status |
|----------|-------|--------|------|--------|
| School Building | `6275780-105/105.max` | 3ds Max | 1.47 GB | Inventory; needs export |
| CNC / Teknik Mesin | Double station lathe | SolidWorks (100 parts) | 71 MB | Inventory; needs export |
| Gear | Eureka.STEP | STEP CAD | 2.85 MB | Inventory; needs conversion |
| Tourism | Modern airport terminal | OBJ + 4 PBR textures | 66.8 MB | Pipeline analyzed; 964K tris |
| Hotel / Hospitality | — | — | — | **Missing** |

Detail lengkap: [`assets-report.json`](../artifacts/smk-teknovo/assets-report.json)

---

## 3. Evaluasi Executability PRD V2.1

### Verdict

PRD V2.1 **feasible**, dengan constraint berikut:

1. **Constraint tooling:** Blender, FBX2glTF, dan assimp tidak terpasang — `.max`, `.STEP`, dan SolidWorks tidak bisa dikonversi otomatis tanpa export manual atau instalasi tool.
2. **Constraint asset:** Hotel/Hospitality belum ada di `/3d`; School Building (1.5 GB) melebihi semua budget tier tanpa decimation agresif.
3. **Constraint platform:** implementasi publik belum di `Next.js 15 + Tailwind + Cloudflare Pages`.
4. **Constraint narrative:** chapter implementasi saat ini masih berporos struktur lama (`TKJ/RPL/DKV`).
5. **Constraint triangle budget:** Airport terminal (964K tris) jauh di atas target visible triangles (<40K desktop).

### Yang bisa dieksekusi sekarang

- ✅ Phase 1 audit → `assets-report.json`
- Penyelarasan roadmap V2.1 (sesi ini)
- Phase 2 optimization untuk asset yang sudah convertible (OBJ → GLB)
- Instalasi Blender/assimp untuk unblock konversi sisa asset

### Yang belum boleh dianggap selesai

- Claim landing sudah align PRD V2.1
- Deploy asset via R2 (PRD V2.1: **no R2** for landing)
- Full chapter rebuild sebelum creative refresh Phase 3

---

## 4. Struktur Cerita PRD V2.1

### Pesan dan filosofi desain

| Elemen | V2.1 |
|--------|------|
| Primary message | **Belajar. Berkarya. Siap Industri.** |
| Design order | Story First → Motion Second → 3D Third → Technology Last |
| Positioning | Future Workforce Academy / Digital Experience Platform |
| Program pillars | Teknik Mesin + Usaha Layanan Wisata |

### Urutan 8 chapter

```text
1. Future Starts Here
2. Industry Challenge
3. Teknik Mesin
4. Usaha Layanan Wisata
5. Industry Alignment
6. Student Transformation
7. Achievements
8. PPDB
```

### Perubahan nama chapter vs V2.0

| V2.0 | V2.1 |
|------|------|
| Why Industry Needs Skilled Workers | **Industry Challenge** |
| Industry Ecosystem | **Industry Alignment** |

### Makna produk per chapter

| # | Chapter | Fungsi naratif | 3D asset mapping (audit) |
|---|---------|----------------|--------------------------|
| 1 | **Future Starts Here** | Membuka positioning SMK Teknovo | School Building (hero) |
| 2 | **Industry Challenge** | Urgency skill gap dari sisi industri | Motion/editorial-first; 3D minimal |
| 3 | **Teknik Mesin** | Program pillar engineering | CNC lathe + Eureka gear |
| 4 | **Usaha Layanan Wisata** | Program pillar hospitality/tourism | Airport terminal + Hotel (missing) |
| 5 | **Industry Alignment** | Sekolah-industri-partner-outcome | Network/editorial; 3D supporting |
| 6 | **Student Transformation** | Belajar → siap kerja | Reuse Transformation lama |
| 7 | **Achievements** | Bukti kredibilitas | Editorial-first |
| 8 | **PPDB** | Konversi utama | DOM-first |

---

## 5. Keputusan Stack dan Deploy

### Stack: Vite interim → Next.js 15 target

| Tahap | Stack | Status |
|-------|-------|--------|
| Transisi (sekarang) | Vite + React 19 + CSS + R3F + GSAP + Lenis | **Active** — chapter rebuild aman di sini |
| Target PRD V2.1 | Next.js 15 + Tailwind + R3F + GSAP + Lenis | **Planned** — setelah chapter + asset stabil |

**Aturan:** Jangan migrasi Next.js 15 sebelum chapter V2.1 final dan `/public/models` terisi.

### Deploy: Cloudflare Pages + `/public/models`, NO R2

| Surface | Asset delivery | R2? |
|---------|----------------|-----|
| Landing experience (PRD V2.1) | Static files in `/public/models` via Cloudflare Pages | **No** |
| `teknovo-asset-studio` (internal) | Optional R2 deploy for asset management workflow | Optional — **not required for landing** |

**Reconciliation:** `tools/teknovo-asset-studio` tetap berguna sebagai internal asset management UI, tetapi **bukan dependency deploy** untuk immersive landing. Pipeline output langsung ke `/public/models`; Cloudflare Pages serves static assets without R2.

Deploy berbasis `wrangler`/static sekarang = **interim delivery mechanism**.

---

## 6. Pipeline Asset 3D

### Phase plan PRD V2.1

| Phase | Fokus | Deliverable |
|-------|-------|-------------|
| **Phase 1** | 3D Asset Audit | `assets-report.json` ✅ |
| **Phase 2** | 3D Optimization | Optimized GLB + LOD + manifest → `/public/models` |
| **Phase 3** | Creative refresh | Brand, motion, 3D, UX artifacts V2.1 |
| **Phase 4–5** | Chapter rebuild 1–8 | Immersive portal on Vite |
| **Phase 6** | Legacy route remapping | TKJ/RPL/DKV decision |
| **Phase 7–8** | Next.js 15 migration | Cloudflare Pages launch |
| **Phase 9** | Hardening and launch | Quality gates + production release |

### Tooling

| Tool | Role | Landing deploy path |
|------|------|---------------------|
| `tools/teknovo-3d-pipeline` | Analyze, convert, optimize, LOD, validate | **Primary** → `/public/models` |
| `tools/teknovo-asset-studio` | Internal upload, preview, optional R2 | **Optional** — not on landing critical path |
| Blender / assimp | Convert `.max`, `.STEP`, SolidWorks | **Required** to unblock Phase 2 for 3/4 assets |

### Budget performa PRD V2.1

| Tier | Budget |
|------|--------|
| Hero scene | **15 MB** |
| Standard scene | **8 MB** |
| Mobile scene | **5 MB** |
| Total initial load | **25 MB** |

| Metrik tambahan | Target |
|-----------------|--------|
| Desktop FPS | ≥60 |
| Mobile FPS | ≥45 |
| LCP | <2.5s |
| Visible triangles | <40K desktop / <18K mobile |
| Visual Originality (AI-ish) | **≥85** |
| Brand Consistency | **≥90** |

### Audit findings (Phase 1)

- **Total source:** 1.67 GB across 4 packages
- **Estimated post-optimization:** ~115 MB (pre-decimation)
- **Airport terminal:** 964K triangles — needs mesh decimation, not just compression
- **School building:** 1.47 GB `.max` — critical blocker for hero budget
- **Missing:** Hotel/Hospitality asset

---

## 7. Gate Kualitas

| Gate | Threshold |
|------|-----------|
| Motion Quality | ≥80 |
| 3D Experience | ≥85 |
| Visual Originality (AI-ish) | **≥85** |
| Brand Consistency | **≥90** |

Design order enforcement: Story and motion gates must pass before 3D scene approval. Technology choices (framework, deploy) evaluated last.

---

## 8. Risiko dan Dependency Gate

| Risk / constraint | Dampak | Penanganan |
|-------------------|--------|------------|
| Blender not installed | 3/4 assets cannot auto-convert | Install Blender CLI or manual CAD export before Phase 2 |
| School Building 1.5 GB | Exceeds all budgets | Aggressive decimation + scene splitting in Phase 2 |
| Hotel asset missing | ULW chapter incomplete | Procure or substitute before chapter 4 build |
| R2 vs static confusion | Wrong deploy architecture | Document: landing = `/public/models`, no R2 |
| Vite vs Next.js drift | Premature migration | Vite for chapter rebuild; Next.js after parity plan |
| Asset-studio scope creep | Landing blocked on internal tool | Asset-studio = optional internal workflow only |

### Dependency gate sebelum Phase 4 (chapter rebuild)

1. Phase 2 optimization complete for at least hero + Teknik Mesin + ULW assets
2. Creative refresh artifacts updated for V2.1 chapter names and primary message
3. Hotel/Hospitality asset decision (procure, substitute, or defer)
4. `/public/models` populated with manifest-backed GLB packs

---

## 9. Definition of Done PRD V2.1

1. All 8 chapters follow V2.1 order and naming.
2. Primary message **Belajar. Berkarya. Siap Industri.** consistent across copy and CTA.
3. Design order respected: story → motion → 3D → technology.
4. 3D assets served from `/public/models` on Cloudflare Pages — no R2.
5. Performance budgets met (hero 15MB, standard 8MB, mobile 5MB, total initial 25MB).
6. `Visual Originality ≥85` and `Brand Consistency ≥90`.
7. Programs shown: Teknik Mesin + ULW, not TKJ/RPL/DKV as hero story.

---

## 10. Rekomendasi Langkah Berikutnya

1. **Unblock Phase 2:** Install Blender CLI (or manual export `.max`/SolidWorks/STEP → GLB).
2. **Run pipeline optimize** on all convertible assets → output to `/public/models`.
3. **Procure Hotel/Hospitality** 3D asset or approve airport-only ULW scene with editorial hospitality layer.
4. **Phase 3 creative refresh:** Update artifacts for V2.1 primary message and chapter names.
5. **Then** begin chapter rebuild on Vite interim stack.
