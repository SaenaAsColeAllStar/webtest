# Changelog

All notable changes to the SMK Teknovo public portal are documented here.

## [2.2.0] — 2026-06-21

### Phase 4 — Rebuild Chapters 1–4 (V2.1 interim)

- **Future Starts Here** (`#future-starts-here`) — chapter 1 with manifest-driven 3D
- **Industry Challenge** (`#industry-challenge`) — chapter 2 narrative + scene
- **Teknik Mesin** (`#teknik-mesin`) — chapter 3 program spotlight
- **ULW** (`#ulw`) — chapter 4 Usaha Layanan Wisata with real GLB assets
- **Industry Alignment** (`#industry-alignment`) — chapter 5 (V2.1 spine continuation)
- V2.1 nav spine via `lib/chapters.ts`; subpages migrated under `apps/immersive-portal/{ppdb,berita,program}/`
- Multi-page Vite build + merge pipeline; `validate.js` aligned to V2.1 section IDs
- Public `/models/` LOD GLBs for tourism/airport and hotel hospitality scenes


## [2.1.0] — 2026-06-20

### Phase 3 — Conversion & Proof

- **Proof** (`#proof`) — editorial achievements timeline with subtle 3D trophy scene
- **Action** (`#action`) — PPDB conversion chapter with urgency timeline and dominant CTA
- **FAQ** (`#faq`) — single-open accessible accordion with Motion.dev height animation
- **Kontak** (`#kontak`) — contact info + form ported from static site
- Header nav updated with Prestasi, PPDB, FAQ, Kontak anchors
- Footer placeholder removed; full chapter anchor links
- `validate.js` extended for Phase 3 section anchors
- Gate artifacts updated: motion ≥80, 3D ≥85, AI-ish preliminary score

## [2.0.0] — 2025-06-20

### Phase 1–2 — Immersive portal evolution

- Added `apps/immersive-portal` Vite + React 19 + R3F/GSAP/Lenis immersive experience
- Merge pipeline: `build:immersive` → `merge:immersive` → `validate.js` into `public/`
- Cloudflare Workers static deploy via `wrangler.jsonc` (`public/` assets)
- Roadmap and phase documentation under `docs/roadmap/`
- Design layer: motion designer, 3D experience architect skills; orchestrator chain updates

### [1.0.0]

- Initial multi-page public portal shell and Teknovo AI SuperStack `.cursor/` platform
