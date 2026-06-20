# Roadmap Evolusi Portal SMK Teknovo — Immersive, Motion & 3D

**Versi:** 1.0.0  
**Tanggal:** 20 Juni 2026  
**Branch:** `feature/design-layer-evolution`  
**Intent Orchestrator:** `landing-page`  
**Chain:** Brand DNA → Creative Director → Product Designer → Motion Review → 3D Review → UX Architecture → Design System → UI UX → Implementation → AI-ish Review → Testing

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Orchestrator Execution Chain](#2-orchestrator-execution-chain)
3. [Page Inventory](#3-page-inventory)
4. [Story Structure](#4-story-structure)
5. [Technology Stack & Migration Path](#5-technology-stack--migration-path)
6. [Phase Breakdown](#6-phase-breakdown)
7. [Motion & 3D Scene Specs](#7-motion--3d-scene-specs)
8. [Performance Budget](#8-performance-budget)
9. [Risk & Mitigation](#9-risk--mitigation)
10. [Success Criteria](#10-success-criteria)
11. [Status Implementasi Sesi Ini](#11-status-implementasi-sesi-ini)

> Detail task per fase: [`smk-teknovo-portal-phases.md`](./smk-teknovo-portal-phases.md)

---

## 1. Executive Summary

### State Saat Ini (Baseline)

Portal SMK Teknovo saat ini adalah **static HTML multi-page** di `public/`:

| Aspek | Kondisi |
|-------|---------|
| Stack | HTML/CSS/vanilla JS, Phosphor Icons CDN, Cloudflare Workers static assets |
| Homepage | Single-page scroll dengan **Hero banner + statistik KPI + grid keunggulan + carousel testimonial** |
| Motion | CSS transitions, IntersectionObserver fade-in — **tidak ada scroll narrative** |
| 3D | Tidak ada — logo PNG statis di hero |
| Struktur naratif | **Hero → Features → Testimonials → CTA** (pattern deprecated) |
| Halaman anak | PPDB, Berita, Program (TKJ/RPL/DKV), Portal (Siswa/Guru/Orang Tua) — static HTML terpisah |
| Build | `node scripts/validate.js` — validasi file wajib, bukan compile |

**Gap terhadap filosofi Teknovo:**

- ❌ Background-image / flat hero dengan headline + CTA
- ❌ KPI stat blocks (`stats` section) sebagai pola marketing utama
- ❌ Feature grid 3×N (Keunggulan, Fasilitas)
- ❌ Testimonial carousel 3-kolom
- ❌ Section stack statis tanpa motion continuity
- ❌ Tidak ada 3D spatial narrative
- ❌ Tidak ada cinematic scroll chapters

### Target State

Portal SMK Teknovo menjadi **future workforce ecosystem experience**:

| Aspek | Target |
|-------|--------|
| Filosofi | Immersive, motion-driven, 3D spatial — Awwwards-level craft |
| Struktur | **Story → Transformation → Industry Alignment → Student Journey → Career Journey → Proof → Action** |
| Opening | Interactive 3D/motion scene — bukan hero banner |
| Motion | GSAP ScrollTrigger + Motion.dev + Lenis smooth scroll — score ≥80 |
| 3D | R3F + Drei — purposeful objects per chapter — score ≥85 |
| Visual Originality | AI-ish Review score ≥85 |
| Performance | 60fps desktop, 45fps mobile, LCP <2.5s |
| ERP Portal | Tetap PageShell, **tanpa** 3D dekoratif |

---

## 2. Orchestrator Execution Chain

Setiap gate memetakan deliverable ke artifact di `/docs/artifacts/smk-teknovo/`.

### Gate 0: Branch Safety

| Item | Detail |
|------|--------|
| Check | `git branch --show-current` → `feature/*` |
| Branch aktif | `feature/design-layer-evolution` |
| Blocks | Write on `main`/`master` |

### Gate 0.5: Brand DNA → Brand Alignment Note

| Deliverable | Artifact |
|-------------|----------|
| Brand personality mapping | `brand-alignment.md` |
| Visual language untuk SMK Teknovo | Warna, tipografi, voice Indonesian-first |
| Forbidden directions | Generic school template, gov portal, AI marketing |
| Pass criteria | Brand Alignment Note complete |

**Artifacts needed:**
- Brand personality: Modern Vocational, Industry-Oriented, Technology-Driven
- Color philosophy: Deep Space canvas + Electric accent (public immersive)
- Voice: Profesional namun human — bukan "Selamat datang" generik

### Gate 0.6: Creative Director → Art Direction Brief

| Deliverable | Artifact |
|-------------|----------|
| Creative Direction Review | `creative-direction.md` |
| Verdict | **APPROVE** required |
| Opening scene spec | 3D ecosystem network — "Mengapa membangun masa depan di sini?" |
| Blocks | All UI code until APPROVE |

**Artifacts needed:**
- Inspiration principles (Apple, Framer, Linear — extract only)
- Opening scene rejection of flat hero
- Scroll chapter art direction per beat

### Gate 0.7: Product Designer → Four Goals Per Page

| Deliverable | Artifact |
|-------------|----------|
| Product Design Analysis | `product-design.md` |
| Matrix | Emotional · Visual · Conversion · Storytelling per chapter |
| Pass criteria | Four goals documented for every page/chapter |

### Gate 0.72: Motion Designer → Motion Design Review

| Deliverable | Artifact |
|-------------|----------|
| Motion Design Review | `motion-review.md` |
| Verdict | **PASS** |
| Score target | **Motion Quality Score ≥80** |
| Systems | Page Load · Scroll · Hover · Section Transition |

**Artifacts needed:**
- Motion narrative map per chapter
- Scroll narrative strategy (Lenis + GSAP)
- Transition language between scenes
- Reduced-motion fallback plan

### Gate 0.74: 3D Experience Architect → 3D Experience Review

| Deliverable | Artifact |
|-------------|----------|
| 3D Experience Review | `3d-review.md` |
| Verdict | **PASS** |
| Score target | **3D Experience Score ≥85** |
| Per scene | Purpose · spatial hierarchy · camera flow |

**Artifacts needed:**
- Scene purpose per chapter (no decorative-only geometry)
- Camera flow diagram
- Mobile fallback (2D motion composition)
- R3F stack confirmation

### Gate 0.76: UX Architecture → Pre-code Artifacts

| Deliverable | Artifact |
|-------------|----------|
| Scroll IA map | `ux-architecture.md` |
| Chapter navigation | Scroll progress indicator + anchor nav |
| Mobile IA | Drawer nav, chapter jump |
| ERP pages | N/A for public rebuild — portal pages stay functional |

### Gate 0.765: Design System → Tokens & Stack

| Deliverable | Artifact |
|-------------|----------|
| Token alignment | `design-system-notes.md` |
| Public tokens | Deep Space `#0A0A0F`, Electric `#6366F1`, Cyan `#22D3EE` |
| Typography | Geist display + Inter body |
| 3D stack | Three.js · R3F · Drei · GSAP · Motion.dev · Lenis |

### Gate 0.77: UI UX Review → Layout Contract

| Deliverable | Artifact |
|-------------|----------|
| Layout contract check | `ui-ux-review.md` |
| Verdict | **PASS** |
| Public | SceneStack — bukan PageShell |
| ERP portal | PageShell — no 3D |

### Gate 1–3: Taste · Assurance · Security Pre-impl

| Gate | Artifact | Status Phase 1 |
|------|----------|----------------|
| Taste | Documented/waived | Waived — static→immersive rebuild scoped |
| Assurance | Sign-off in roadmap | APPROVE via this document |
| Security pre-impl | Static public site — no auth/API | APPROVE — no new endpoints |

### Gate 4: Implementation

| Deliverable | Location |
|-------------|----------|
| Immersive app scaffold | `apps/immersive-portal/` |
| Build output | `public/` (merged) |
| Gate artifacts | `/docs/artifacts/smk-teknovo/` |

### Gate 4.5: AI-ish Review

| Deliverable | Artifact |
|-------------|----------|
| Visual Originality Score | `ai-ish-review.md` |
| Target | **≥85** |
| Auto-reject check | No hero banner, no KPI grid, no feature grid |

### Gate 5: Testing

| Deliverable | Checklist |
|-------------|-----------|
| Build | `npm run build` |
| Lint | `tsc --noEmit` |
| Five page states | Loading, Empty, Error, Success, Permission (public: Loading + Success primary) |
| Performance | Lighthouse / FPS sampling |
| Browser | Chrome, Safari mobile |

---

## 3. Page Inventory

### Homepage (Immersive SPA — `public/index.html` dari Vite build)

| Chapter / Route | Purpose | Gate Artifacts |
|-----------------|---------|----------------|
| `#story` | Opening 3D ecosystem — positioning workforce | brand, creative, product, motion, 3d, ux |
| `#transformation` | Learner → professional arc | product, motion, 3d |
| `#industry` | TKJ · RPL · DKV industry alignment | product, motion, 3d |
| `#student-journey` | Day-in-life learning path | product, motion |
| `#career-journey` | Alumni outcomes, employability | product, motion |
| `#proof` | Editorial proof — accreditation, achievements | product, ux |
| `#action` | PPDB conversion | product, ux |
| `#faq` | Accordion answers | ux |
| `#kontak` | Contact form + map | ux |

### Static Subpages (Phase 2–4 migration)

| Route | Purpose | Phase | Gate Artifacts |
|-------|---------|-------|----------------|
| `/ppdb/` | PPDB registration funnel | Phase 3 | product (conversion), ux |
| `/berita/` | News index | Phase 4 | ux (integrate into scroll or editorial) |
| `/berita/pembukaan-ppdb-2026.html` | News detail | Phase 4 | ux |
| `/program/tkj.html` | TKJ program detail | Phase 3 | product, 3d (industry object) |
| `/program/rpl.html` | RPL program detail | Phase 3 | product, 3d |
| `/program/dkv.html` | DKV program detail | Phase 3 | product, 3d |
| `/portal/siswa.html` | Student portal entry | Phase 5 | ui-ux (ERP PageShell) |
| `/portal/guru.html` | Teacher portal entry | Phase 5 | ui-ux (ERP PageShell) |
| `/portal/orang-tua.html` | Parent portal entry | Phase 5 | ui-ux (ERP PageShell) |

---

## 4. Story Structure

### Deprecated (Current Site)

```text
Hero → Stats/KPI → Programs Grid → Advantages Grid → Facilities Grid
     → About → Achievements → News Tabs → Testimonials Carousel
     → Gallery → PPDB Banner → FAQ → Contact
```

### Mandatory (Target)

```text
Navbar (persistent wayfinding)
  ↓
1. STORY          — "Ekosistem tenaga kerja masa depan dimulai di Rancasari"
  ↓ [scroll transition — camera pull-back, depth parallax]
2. TRANSFORMATION — "Dari calon siswa menjadi profesional siap industri"
  ↓
3. INDUSTRY       — TKJ · RPL · DKV sebagai objek 3D narratif
  ↓
4. STUDENT        — Perjalanan belajar: lab, project, sertifikasi
  ↓
5. CAREER         — Alumni paths, mitra industri, employability data motion
  ↓
6. PROOF          — Akreditasi, prestasi — editorial layout
  ↓
7. ACTION         — PPDB 2026/2027 — single dominant CTA
  ↓
8. FAQ            — Accordion purposeful
  ↓
9. Footer/Kontak  — Contact, legal, portal links
```

### Copy Direction (Indonesian-first)

- **Story headline:** "Karier di Industri Teknologi Dimulai dari Sini" → evolve to spatial narrative headline with scroll reveal
- **Avoid:** "Selamat datang di SMK Teknovo", generic welcome
- **Emphasize:** 25+ mitra industri, lab standar kerja, TKJ/RPL/DKV outcomes

---

## 5. Technology Stack & Migration Path

### Current → Target

| Layer | Current | Target |
|-------|---------|--------|
| Markup | Static HTML | React 19 + TypeScript |
| Bundler | None | Vite 6 |
| 3D | None | Three.js + @react-three/fiber + @react-three/drei |
| Motion DOM | CSS only | Motion.dev (motion/react) |
| Scroll motion | Native scroll | Lenis smooth scroll + GSAP ScrollTrigger |
| CSS | Custom properties in styles.css | CSS modules / tokens from design system |
| Deploy | Wrangler static `./public` | Same — Vite build merges into `public/` |
| Subpages | Static HTML | Progressive: keep static Phase 1–2, migrate Phase 3–4 |

### Migration Strategy (Recommended)

```text
Phase 1 (Sesi ini):
  apps/immersive-portal/  →  Vite + React + R3F + GSAP + Lenis
  Build → dist/ → copy merge to public/index.html + public/assets/immersive/
  Keep static subpages untouched

Phase 2:
  Complete all 7 scroll chapters on homepage
  Update validate.js for new section anchors

Phase 3:
  Migrate /program/* to React routes or enhanced static with shared nav

Phase 4:
  Migrate /ppdb/ and /berita/ with conversion-optimized flows

Phase 5:
  Portal pages → ERP PageShell (authenticated app — separate repo/app)
```

### Integration Architecture

```text
┌─────────────────────────────────────────────────┐
│  Lenis (smooth scroll root)                      │
│  ├── GSAP ScrollTrigger (scrub timelines)        │
│  ├── Motion.dev (DOM enter/exit, stagger)        │
│  └── R3F Canvas (fixed/sticky 3D layer)          │
│       ├── StoryScene3D (network ecosystem)       │
│       ├── IndustryObjects (TKJ/RPL/DKV)          │
│       └── Camera rig (scroll-linked via GSAP)    │
└─────────────────────────────────────────────────┘
```

### Dependency List

```json
{
  "react": "^19",
  "react-dom": "^19",
  "three": "^0.17x",
  "@react-three/fiber": "^9",
  "@react-three/drei": "^10",
  "gsap": "^3.12",
  "@gsap/react": "^2",
  "lenis": "^1.1",
  "motion": "^12",
  "@phosphor-icons/react": "^2"
}
```

---

## 6. Phase Breakdown

| Phase | Scope | Effort | Dependencies | Acceptance Criteria |
|-------|-------|--------|--------------|---------------------|
| **1** | Scaffold + Story + Transformation chapters | 3–5 h | Gates PASS | Vite build, 3D hero, 2 chapters scroll, `npm run build` ✓ |
| **2** | Industry + Student + Career chapters | 5–8 h | Phase 1 | 5 chapters, motion score ≥80 |
| **3** | Proof + Action + FAQ + subpage nav unification | 4–6 h | Phase 2 | Full 7-beat sequence, PPDB CTA |
| **4** | Program + PPDB + Berita migration | 8–12 h | Phase 3 | All routes immersive or editorial-consistent |
| **5** | Portal ERP integration, AI-ish ≥85, perf hardening | 6–10 h | Phase 4 | Lighthouse perf ≥90, originality ≥85 |
| **6** | Cloudflare deploy, SEO, analytics | 2–4 h | Phase 5 | Production live, sitemap updated |

> Task-level breakdown: [`smk-teknovo-portal-phases.md`](./smk-teknovo-portal-phases.md)

### Phase 1 Acceptance Criteria (Sesi Ini)

- [x] Roadmap documents in `/docs/roadmap/`
- [x] Gate artifacts in `/docs/artifacts/smk-teknovo/`
- [ ] `apps/immersive-portal/` scaffold with TypeScript strict
- [ ] Lenis + GSAP ScrollTrigger wired
- [ ] R3F Story scene with purposeful 3D objects
- [ ] Story + Transformation DOM chapters with motion
- [ ] Build copies to `public/`, `npm run build` passes
- [ ] Static subpages still accessible

---

## 7. Motion & 3D Scene Specs

### Chapter 0: Navbar

| Motion | Spec |
|--------|------|
| Scroll shrink | Height 80px → 64px after 100px scroll |
| Backdrop | blur + opacity fade |
| Hover | Subtle underline slide — Motion.dev |

### Chapter 1: Story (Opening)

| 3D | Motion |
|----|--------|
| **Purpose:** Visualize "workforce ecosystem network" — nodes = skills, edges = career paths | Page load: stagger reveal headline (GSAP) |
| Objects: Icosahedron (core school), TorusKnot (industry orbit), small spheres (students) | Scroll 0–30%: camera dolly out, nodes connect |
| Camera: Start close on core, pull back on scroll | Parallax: foreground copy, midground 3D, background gradient |
| Mobile fallback: CSS animated network SVG, no WebGL | Reduced motion: static composition + fade |

### Chapter 2: Transformation

| 3D | Motion |
|----|--------|
| Morph/transitions between "student" and "professional" state objects | Scroll-triggered text reveal left-to-right |
| Split scene: left dim "before", right bright "after" | Section enter: clip-path wipe transition |
| Optional: simple GLTF graduation cap → toolbox morph | Timeline scrub 30–50% scroll |

### Chapter 3: Industry Alignment

| 3D | Motion |
|----|--------|
| Three labeled objects: Server rack (TKJ), Code brackets (RPL), Pen tool (DKV) | Objects rotate into view on scroll |
| Click/hover: expand to program detail link | Stagger 0.15s between objects |

### Chapter 4–5: Student & Career Journey

| 3D | Motion |
|----|--------|
| Timeline path in 3D space (curve) | Scroll-linked timeline progress bar |
| Milestone markers light up | Horizontal scroll section optional (desktop) |

### Chapter 6: Proof

| 3D | Motion |
|----|--------|
| N/A — editorial layout | Viewport-triggered fade-up stagger |
| Accordion-style achievement reveal | No card grid |

### Chapter 7: Action (PPDB)

| 3D | Motion |
|----|--------|
| N/A | CTA pulse subtle (not bounce) |
| Urgency via copy + countdown optional | Background subtle gradient shift |

---

## 8. Performance Budget

| Metric | Desktop | Mobile |
|--------|---------|--------|
| FPS (3D scenes) | ≥60 | ≥45 |
| LCP | <2.5s | <2.5s |
| FID / INP | <100ms | <200ms |
| CLS | <0.1 | <0.1 |
| JS bundle (initial) | <250KB gzip | <200KB gzip |
| 3D polygon budget | <50K triangles visible | <20K triangles |
| Texture max | 2048×2048 | 1024×1024 |

### Optimization Tactics

- Lazy-load 3D Canvas below fold chapters
- `dpr={[1, 1.5]}` on mobile R3F Canvas
- `prefers-reduced-motion`: disable Lenis, static scenes
- Code-split per chapter with React.lazy
- Preload only Story scene assets

---

## 9. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebGL unsupported | No 3D on old devices | CSS/SVG fallback per chapter |
| Bundle size bloat | Slow LCP | Code splitting, tree-shake Three.js |
| SEO regression | Lower discoverability | SSR/prerender Phase 5; retain JSON-LD |
| Static subpage nav drift | Broken links | Shared nav component Phase 3 |
| Motion sickness | User discomfort | Reduced-motion media query |
| Build complexity | CI failures | Single `npm run build` orchestrates Vite + validate |
| Content stale | Wrong PPDB year | Centralize content in `content/` JSON |

---

## 10. Success Criteria

### Scoring Gates

| Gate | Metric | Threshold | Phase Target |
|------|--------|-----------|--------------|
| Motion Design Review | Motion Quality Score | ≥80 | Phase 2 |
| 3D Experience Review | 3D Experience Score | ≥85 | Phase 2 |
| AI-ish Review | Visual Originality | ≥85 | Phase 5 |
| Build | npm run build | Pass | Phase 1 |
| Performance | Lighthouse Performance | ≥85 | Phase 5 |

### Definition of Done (Full Project)

1. All 7 narrative chapters implemented with motion continuity
2. No auto-reject patterns (hero banner, KPI grid, feature grid, testimonial carousel)
3. All gate artifacts approved in `/docs/artifacts/smk-teknovo/`
4. Static subpages migrated or editorially consistent
5. `npm run build` + tests pass
6. Visual Originality ≥85, Motion ≥80, 3D ≥85
7. Deployed to Cloudflare with updated sitemap

---

## 11. Status Implementasi Sesi Ini

**Stopping point setelah Phase 1 roadmap execution:**

| Item | Status |
|------|--------|
| Roadmap | ✅ Complete |
| Gate artifacts | ✅ Complete (`/docs/artifacts/smk-teknovo/`) |
| Vite + React scaffold | ✅ `apps/immersive-portal/` |
| Lenis + GSAP ScrollTrigger | ✅ Wired |
| Story 3D scene (R3F) | ✅ Ecosystem network |
| Transformation chapter | ✅ Split panel + scroll motion |
| Build pipeline | ✅ `npm run build` passes |
| Static subpages preserved | ✅ ppdb, berita, program, portal |
| Chapters 3–7 | ✅ Phase 3: Proof + Action + FAQ + Kontak complete |
| AI-ish formal review ≥85 | ⏳ Preliminary 84 — Phase 5 |
| Subpage migration | ⏳ Phase 4 |

**Branch:** `main`  
**Next session:** PPDB funnel + Berita + Program migration (Phase 4)
