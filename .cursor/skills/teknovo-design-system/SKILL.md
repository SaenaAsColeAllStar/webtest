---
name: teknovo-design-system
description: >-
  Teknovo design tokens, typography, spacing, 3D spatial language, motion system,
  component libraries, icon rules, and visual taste constraints. Use when choosing
  colors, fonts, icons, shadows, motion, 3D scenes, or components for ERP admin
  or public immersive surfaces; when reviewing design system compliance; or when
  rejecting forbidden UI libraries.
---

# Teknovo Design System

**Philosophy**: Teknovo is a **future workforce ecosystem** — not a school site, gov portal, WordPress theme, admin dashboard marketed as marketing, or LMS clone.

**North stars (extract principles only — do NOT copy layouts)**: Apple, Framer, Linear, Stripe, Vercel, Arc Browser, Figma, Awwwards winners.

**Visitor feelings**: Innovation · Technology · Engineering · Professionalism · Future Careers.

Load **teknovo-brand-dna** before token selection.

---

## Surface Split (Mandatory)

| Surface | Philosophy | Stack emphasis |
|---------|------------|----------------|
| **Public / marketing / landing** | Immersive, motion-driven, 3D spatial, Awwwards-level | Three.js, R3F, Motion.dev, GSAP |
| **ERP admin / portal** | PageShell, data density, operational clarity | Radix + shadcn/ui in `packages/ui` |

**Rule**: ERP dashboard patterns (KPI grids, flat card walls, admin chrome) **must not bleed** into public surfaces. Public surfaces **must not** default to ERP PageShell layout.

---

## Color Tokens — ERP Dashboard

| Token | Hex | Use |
|-------|-----|-----|
| Primary | `#1D4ED8` | Primary actions; hover `#1E40AF` |
| Accent | `#0EA5E9` | Focus, links |
| Success | `#16A34A` | Paid, approved |
| Warning | `#D97706` | Pending, attention |
| Danger | `#DC2626` | Delete, void, error |
| Neutral | `#0F172A` | Headings, strong text |
| Background | `#F8FAFC` | Page background |
| Card | `#FFFFFF` | Surfaces |

**Rules**: Color is semantic (status, action) — never decorative on ERP. No gradient backgrounds on admin content areas.

---

## Color Tokens — Public Immersive Surfaces

| Token | Hex | Use |
|-------|-----|-----|
| Deep Space | `#0A0A0F` | Primary canvas, 3D scene backdrop |
| Surface Layer 1 | `#14141F` | Elevated panels |
| Surface Layer 2 | `#1E1E2E` | Floating objects, cards |
| Accent Electric | `#6366F1` | Interactive highlights, motion accents |
| Accent Cyan | `#22D3EE` | Engineering/tech signals |
| Text Primary | `#F8FAFC` | Headlines on dark |
| Text Secondary | `#94A3B8` | Supporting copy |

Light-mode sections allowed when story requires contrast — maintain **depth hierarchy** via layered surfaces, not flat white blocks stacked vertically.

---

## Typography

| Context | Font | Weights |
|---------|------|---------|
| ERP body/headings | Inter | 400/500 body; 600/700 headings |
| Public display | Geist | 600/700/800 |
| Public body | Inter | 400/500/600 |
| Monospace (code/tech) | Geist Mono | 400/500 |
| Fallback | system-ui | — |

Public scale: Display 72–96 · H1 56 · H2 40 · H3 32 · H4 24 · Body 18 · Small 14 · Caption 12.

**Hierarchy rule (Apple-level)**: One dominant headline per viewport · generous line-height on display · supporting copy subordinate · CTA visually anchored, not competing.

---

## Spacing & Shape

- **Spacing scale**: 4, 8, 12, 16, 24, 32, 48, 64, 80, 120, 160px.
- **Radius**: sm 8px · md 12px · lg 16px · xl 24px · 2xl 32px. ERP: no fully rounded cards.
- **Depth shadows (public)**: Soft volumetric — multi-layer `box-shadow` or CSS `filter: drop-shadow` simulating z-axis lift. Avoid flat Material elevation only.
- **Container**: Public full-bleed scenes allowed; reading content max 720px within scenes.

---

## 3D Design Language (Public Surfaces)

### Require

- Spatial depth · layered surfaces · floating objects with purpose · perspective transitions · depth hierarchy · soft volumetric shadows · interactive 3D scenes where story demands
- Every 3D object **supports storytelling** — career path, industry tool, engineering concept, student journey beat
- Performance budget: lazy-load 3D · reduce polygon count on mobile · static fallback for low-power devices

### Forbidden

- Fake 3D (CSS-only cubes with no narrative)
- Random floating shapes · decorative objects without purpose
- 3D for decoration alone

### Approved 3D Stack

| Library | Scope |
|---------|-------|
| **Three.js** | Core WebGL engine |
| **React Three Fiber (@react-three/fiber)** | React integration for 3D scenes |
| **@react-three/drei** | Helpers (controls, environments, text) |
| **GSAP** | Timeline orchestration, scroll-linked 3D transforms |
| **Motion.dev (motion/react)** | UI motion + layout; pair with R3F via shared scroll progress |

Document scene purpose in implementation plan before coding.

---

## Motion Design System (Public Surfaces)

### Mandatory motion types

- Scroll-linked animation · section/scene transitions · parallax depth · hover transformations · viewport-triggered reveal · progressive disclosure

### Avoid

- Bounce · excessive motion · decoration-only animation · autoplay loops without user context

**Rule**: Motion must **communicate information** — chapter change, hierarchy shift, data reveal, career progression.

### Approved motion stack

| Library | Use |
|---------|-----|
| **Motion.dev** | Primary UI motion, layout, scroll triggers |
| **GSAP + ScrollTrigger** | Complex scroll narratives, 3D camera paths |
| **Lenis** (optional) | Smooth scroll when cinematic experience requires it |

ERP admin: subtle transitions only — no scroll-jacking, no parallax on data tables.

---

## Component Stack

| Layer | Library | Scope |
|-------|---------|-------|
| ERP base | Radix UI + shadcn/ui | Authenticated portal in `packages/ui` |
| Public motion | Motion.dev | Section transitions, reveals |
| Public 3D | React Three Fiber + drei | Interactive scenes |
| Public animation | GSAP | Scroll narratives, complex timelines |
| Reference | Awwwards, Apple.com, linear.app | Principles only — not copy-paste |

**Deprecated for public hero/marketing**: Aceternity UI template blocks, generic Magic UI hero patterns without narrative.

---

## Icons

- **Primary**: Phosphor (`@phosphor-icons/vue`) — Regular default; Bold for active nav only.
- **Secondary**: Tabler Icons.
- **Forbidden**: Lucide, Font Awesome, Bootstrap Icons, glyphicons, mixed sets.

---

## Forbidden Libraries

Reject immediately: Bootstrap, AdminLTE, Ant Design, Material UI, Lucide, Font Awesome.

---

## Visual Personality Rules

### Reject

- Generic SaaS · Dashboard Marketing · AI Generated Layout · Template hero · Feature grid landing · KPI block marketing · Tailwind demo appearance

### Require (public)

- Immersive experience · Motion-driven narrative · 3D spatial interface · Premium product feel · Story chapters · Progressive discovery

### Require (ERP)

- Editorial data hierarchy · Premium whitespace · Operational clarity · Human visual rhythm

---

## Visual Taste — Reject

| Anti-pattern | Surface | Fix |
|--------------|---------|-----|
| Gradient hero on admin pages | ERP | Plain PageShell title |
| 6+ KPI cards above fold | ERP | ≤4 metrics on Beranda; rest in lists |
| Background image hero | Public | Interactive 3D/motion scene |
| Feature grid (3-col icons) | Public | Story chapter with motion reveal |
| Glassmorphism / neon borders | Both | Purposeful depth layers |
| Chart walls without table alt | ERP | One chart or table per screen job |
| Fake 3D decorative shapes | Public | Narrative-linked 3D objects only |
| Disconnected static sections | Public | Cinematic scroll continuity |

---

## Visual Taste — Prefer

- **ERP**: Tables over cards for data lists · cards only for Beranda summary (≤4)
- **Public**: Scene-based chapters over section stacking · motion continuity between beats
- **Finance**: tabular nums, right-aligned, `Rp 1.234.567` consistent

---

## Visual Originality Gate (Quick)

Block public UI if **Visual Originality Score < 85** (full rubric: **teknovo-ai-ish-review**).

Auto-reject signals: generic cards · feature grids · KPI blocks · dashboard layouts · template heroes · Tailwind demo appearance.

---

## Module Visual Notes

| Module | Priority |
|--------|----------|
| PPDB (public funnel) | Immersive journey — not banner CTA |
| PPDB (admin) | Trust — document preview, stepper on detail only |
| Finance | Auditability — no playful money colors |
| CBT | Focus — no sidebar during exam; calm timer |
| Reports | Screen matches print |

---

## Canonical Documentation

**Full design system spec**: [`.cursor/design-system/`](../../.cursor/design-system/README.md) — authoritative reference. This skill is the agent quick-reference; update docs when tokens or motion/3D rules change.

---

## References

- `.cursor/design-system/` — canonical design system (primary)
- `docs/standards/design-system/design-system-contract.md` (legacy pointer)
- `.cursor/gates/taste/design-principles.md`, `.cursor/gates/quality/design-taste.md`
- **teknovo-ui-ux** — ERP implementation · **teknovo-landing-page** — public immersive surfaces
- **teknovo-ai-ish-review** — Visual Originality Score ≥85 gate
