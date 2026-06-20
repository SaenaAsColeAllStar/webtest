---
name: teknovo-ui-ux
description: >-
  Implement and review Teknovo UI — ERP PageShell for admin, immersive motion/3D
  patterns for public surfaces, five page states, tables, forms, navigation,
  RBAC-aware UX, and mobile rules. Use when building or reviewing dashboard pages,
  public portal marketing UI, forms, data tables, or components in apps/portal
  or packages/ui.
---

# Teknovo UI/UX Implementation

**Scope split**:

| Surface | This skill covers |
|---------|-------------------|
| **ERP admin** (`apps/portal`, authenticated) | PageShell, tables, forms, 5 states, RBAC nav |
| **Public immersive** (marketing, landing) | Motion, 3D scenes, scroll narrative — pair with **teknovo-landing-page** |

For pre-code IA/planning → **teknovo-ux-architecture**. For tokens/motion/3D → **teknovo-design-system**.

**Requires before public UI code**: Motion Design Review + 3D Experience Review gates passed (see **teknovo-auto-orchestrator**).

---

## ERP Admin — Layout Contract

Every ERP page uses:

```text
PageShell
├── PageHeader — breadcrumb, title, description, optional primary action (RBAC-gated)
├── PageContent — table | form | dashboard grid
└── PageFooter — secondary actions, metadata
```

- **Breadcrumb**: `Domain > Module > Page` (max 3 segments).
- **No** decorative hero bands on admin pages.
- **No** per-module custom sidebars — global domain-driven sidebar only.
- **No** 3D scenes, scroll-jacking, or parallax on ERP data screens.

---

## Public Immersive — Layout Contract

Public surfaces **do not** use PageShell. Use **scene-based chapters**:

```text
ImmersivePage
├── SceneNavigation — minimal, persistent wayfinding
├── SceneStack — scroll-linked chapters with motion continuity
│   ├── Scene (Story | Transformation | Journey | Proof | Action)
│   └── Transitions — Motion.dev / GSAP between scenes
└── InteractiveLayer — R3F canvas where narrative requires 3D
```

### Public UI — DO

- Scroll-linked animation · viewport-triggered reveals · parallax depth layers
- Interactive 3D scenes with narrative purpose (R3F + Three.js)
- Hover transformations that communicate affordance
- Progressive reveal of career/industry story beats
- Apple-level hierarchy: one focal point per viewport

### Public UI — DON'T

- Background image hero · hero banner · hero with CTA only
- Feature grid (3×N icon cards) · KPI stat blocks · template section stacking
- Fake 3D · random floating shapes · bounce animations
- Dashboard patterns on marketing pages
- Bleed ERP table/card density into public surfaces

---

## Motion Implementation (Public)

| Pattern | Stack | When |
|---------|-------|------|
| Section enter/exit | Motion.dev | Every scene transition |
| Scroll progress | GSAP ScrollTrigger or Motion scroll | Cinematic chapters |
| Parallax depth | GSAP + layered z-index | Story, Transformation scenes |
| Micro-interaction | Motion.dev | Buttons, cards with purpose |

**Rule**: Every animation answers "what information does this communicate?"

ERP: loading skeletons, subtle modal transitions only — no scroll-linked effects.

---

## 3D Implementation (Public)

| Pattern | Stack | When |
|---------|-------|------|
| Hero narrative scene | R3F + drei | Opening Story scene — replaces image hero |
| Industry alignment visual | R3F objects/models | Transformation, Industry Alignment |
| Career path visualization | R3F + GSAP camera | Student Journey, Career Journey |

**Checklist before 3D code**:

- [ ] Object maps to story beat (documented in Product Design Analysis)
- [ ] Mobile fallback defined (static image or simplified scene)
- [ ] Performance budget: LCP impact assessed
- [ ] Reduced motion / prefers-reduced-motion respected

---

## Navigation

```text
Domain (L1) → Module (L2) → Page (L3)   [max depth: 3 — ERP only]
```

Approved ERP domains: Dashboard, Academic, Student Affairs, Finance, Administration, Communication, System.

| Rule | ERP | Public |
|------|-----|--------|
| Nav style | Global sidebar, RBAC Layer 1 | Minimal scene nav, scroll progress indicator |
| Mobile | Drawer or bottom nav | Full-screen scenes, sticky action when conversion requires |
| RBAC UX | Hide inaccessible nav | N/A on public marketing |
| Primary tasks | ≤5 clicks from dashboard | Story → Action without friction |

---

## Five Page States (ERP — Mandatory)

Every ERP content page implements **all five**. Missing any = Major defect, blocks ship.

| State | Implementation |
|-------|------------------|
| Loading | Skeleton matching layout (TanStack Query pending) |
| Empty | Friendly message + CTA if user has create permission |
| Error | Non-blocking card + Retry |
| Success | Toast/alert on mutation |
| Permission | Lock screen or restricted view — not toast-only |

Public immersive pages: Loading (scene preload) · Error (graceful fallback) · Success (conversion confirmation) — adapt states to narrative context.

---

## Tables (ERP Data Grids)

Required: search + filters · column visibility · row selection · bulk actions · pagination · PDF/CSV export · sticky header · empty state · mobile card fallback.

Prefer **data tables** over card grids for ERP lists.

---

## Forms

- **Validation**: Zod at controller; inline errors; error summary on submit.
- **Grouping**: Mental model — not database column order.
- **Dirty state**: Prompt before navigate away.
- **Multi-step**: Progress indicator; modal scrolls → dedicated page.
- **Mobile**: Single column; sticky **Simpan** footer on long forms.

---

## Modals vs Pages (ERP)

| Use modal | Use page/drawer |
|-----------|-----------------|
| Confirm destructive | Multi-step forms |
| Quick 1–2 field edit | Document preview |
| — | Sortable/paginated tables |

---

## Mobile (Mandatory)

- Tap targets ≥44×44px · test at 375×667.
- ERP tables → cards or horizontal scroll.
- Public: 3D may degrade; motion may simplify; story must remain coherent.

---

## Accessibility (WCAG AA)

Contrast ≥4.5:1 · visible focus · keyboard order · labels + `aria-describedby` · `prefers-reduced-motion` honored on all motion/3D.

---

## Review Gates (Pre-Implementation)

| Gate | Owner skill | Pass |
|------|-------------|------|
| Motion Design Review | teknovo-design-system + this skill | All mandatory motion types mapped to story beats |
| 3D Experience Review | teknovo-3d-experience-architect | Every 3D object has narrative purpose; score ≥85 |
| UI UX Review | this skill | ERP PageShell or public scene contract satisfied |

Document reviews in `docs/plans/YYYY-MM-DD-<feature>-motion-review.md` and `*-3d-review.md`.

---

## Implementation Checklist

### ERP

- [ ] PageShell → PageHeader → PageContent
- [ ] All 5 page states verified
- [ ] Phosphor/Tabler · shadcn/Radix only
- [ ] RBAC on route, menu, actions
- [ ] Components in `packages/ui`

### Public immersive

- [ ] No background image hero · no feature grid · no KPI blocks
- [ ] Story chapter structure (see **teknovo-landing-page**)
- [ ] Motion.dev + GSAP scroll narrative implemented
- [ ] R3F scenes where approved in 3D Experience Review
- [ ] Visual Originality Score ≥85 (**teknovo-ai-ish-review**)

---

## Skill Handoff

| Phase | Skill |
|-------|-------|
| Brand + creative | teknovo-brand-dna → teknovo-creative-director |
| Product goals | teknovo-product-designer |
| Pre-code planning | teknovo-ux-architecture |
| Tokens / motion / 3D | teknovo-design-system |
| Public structure | teknovo-landing-page |
| Code implementation | teknovo-feature-implementation |
| Post-build gate | teknovo-ai-ish-review |
| Pre-ship | gstack-qa, gstack-browser-testing |

---

## References

- `docs/standards/design-system/design-system-contract.md`
- `docs/standards/rbac/rbac-standard.md`
- `apps/portal/`, `packages/ui/`
- **teknovo-auto-orchestrator** — mandatory creative chain
