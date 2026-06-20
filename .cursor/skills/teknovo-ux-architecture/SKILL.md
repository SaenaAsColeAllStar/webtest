---
name: teknovo-ux-architecture
description: >-
  Pre-code UX architecture for Teknovo — PRD alignment, cinematic scroll IA,
  navigation planning, user journeys, motion/3D pre-code artifacts, design reviews,
  and Visual Originality enforcement. Use before UI implementation, for UX review,
  navigation planning, IA restructure, product design analysis, accessibility audit,
  or when user asks to build UI pages.
---

# Teknovo UX Architecture

**Scope**: Planning, review, and pre-code architecture — **not** component coding.

**Philosophy**: Teknovo = **future workforce ecosystem**. Plan **immersive scroll experiences**, not flat section stacks.

For implementation → **teknovo-ui-ux**. For tokens/motion/3D → **teknovo-design-system**.

**Requires**: **teknovo-brand-dna** → **teknovo-creative-director** APPROVE → **teknovo-product-designer** (four goal artifacts complete).

**Prohibited**: Generate UI code before completing mandatory artifacts and orchestrator chain gates.

---

## When to Activate

| Intent | Mode |
|--------|------|
| New feature, PRD alignment, strategy | **Product Design** |
| Plan navigation, IA, cinematic scroll flows | **Planning** |
| Review existing UI, dashboard, landing | **Design Review** |
| Audit a11y, mobile, pre-release | **Audit** |
| User asks to build/create UI | **Implementation Planning** |

---

## Role Split

| Skill | Phase |
|-------|-------|
| **teknovo-brand-dna** | Brand identity — first gate |
| **teknovo-creative-director** | Creative/art direction, 3D narrative |
| **teknovo-product-designer** | Four goal artifacts per page |
| **This skill** | IA, scroll architecture, journeys, reviews, pre-code artifacts |
| teknovo-ui-ux | Build — ERP PageShell or public scenes |
| teknovo-chief-architect | Pillar 2 — after Product Design approved |

---

## Scroll Experience Architecture (Public)

Public surfaces require **cinematic scrolling** — not disconnected static section stacking.

### Require

- Story chapters · progressive discovery · scene transitions · motion continuity across viewport
- Scroll progress as narrative device (chapter indicators, parallax depth cues)
- Each chapter maps to landing structure beat (see **teknovo-landing-page**)

### Avoid

- Hero → Features → Testimonials → CTA wireframe
- Alternating white/gray static blocks with no transition design
- Independent sections with no shared motion language

Document scroll map in Product Design Analysis: chapter name · scroll trigger · motion handoff · 3D layer (if any).

---

## Analyze Before Any UI Work

### Strategic (10 Areas — Product Design)

1. User goals · 2. Business goals · 3. Role goals (RBAC) · 4. Journey (≤5 clicks ERP / story→action public) · 5. Navigation · 6. IA · 7. Information hierarchy · 8. Conversion · 9. Mobile + reduced motion · 10. Design system + motion/3D compliance

### Tactical (11 Dimensions — UX Review)

User goals · Business goals · RBAC · Navigation · Page/scene hierarchy · Data density · Mobile · Accessibility · Responsiveness · Motion/3D consistency · Feasibility (`packages/ui` ERP · R3F/Motion public)

---

## Information Architecture

**Business domains, not technical modules** (ERP):

```text
Dashboard
Academic → Curriculum | Classes | Attendance | Grading
Finance → Billing | Payments | Cash Book | Reports
Student Affairs | Administration | Communication | System
```

**Public narrative IA** (not ERP sidebar):

```text
Story → Transformation → Industry Alignment → Student Journey → Career Journey → Proof → Action
```

Each leaf: route/scene anchor + permission (ERP) or scroll chapter (public). IA complexity scoring — High (9+) blocks build. See [reference.md](reference.md).

---

## Navigation Rules

**ERP**: Max 3 levels · global sidebar · RBAC Layer 1 · mobile drawer.

**Public**: Minimal persistent nav · scroll progress · chapter jump optional · no ERP domain sidebar.

---

## Dashboard Philosophy (ERP Only)

Dashboards serve **daily operators**, not demos.

- ≤6 cards without scroll; reject 8+ equal-weight KPI cards
- Role-specific dashboards
- **Do not** use dashboard KPI patterns on public marketing surfaces

---

## Mandatory Gate — Product Design Analysis

From **teknovo-product-designer** — **wajib selesai sebelum** UI Design, Frontend Build, Landing Build.

Must include per page: **Emotional Goal · Visual Goal · Conversion Goal · Storytelling Goal**.

---

## Visual Originality Gate (Mandatory)

**Visual Originality Score** 0–100 (higher = more distinctive). **Must be ≥85 before UI handoff and ship.**

| Score | Band | Action |
|-------|------|--------|
| 85–100 | Distinctive | PASS — proceed |
| 70–84 | Derivative | REVISE — redesign required |
| 50–69 | Generic | BLOCK |
| 0–49 | Template | BLOCK — full creative restart |

**Auto-reject** (score capped at 69): generic cards · feature grids · KPI blocks · dashboard layouts · template heroes · Tailwind demo appearance.

Enforcement: score **<85** → BLOCK IMPLEMENTATION — return to **teknovo-creative-director**.

Full rubric: **teknovo-ai-ish-review**

---

## Pre-Implementation Review Gates

| Gate | When | Artifact |
|------|------|----------|
| Motion Design Review | After Product Designer, before 3D Experience Review | `*-motion-review.md` |
| 3D Experience Review | After Motion Review, before UX Architecture | `*-3d-review.md` |
| UI UX Review | After Design System, before code | Checklist in implementation plan |

Orchestrator enforces order — see **teknovo-auto-orchestrator**.

---

## PRD Alignment Checklist

1. Module scope bounded · 2. Roles/permissions · 3. FRs trace to journey · 4. Pages/scenes align with IA · 5. Success metrics · 6. Cross-domain dependencies

---

## Required Output — Product Design Analysis

Delegate template to **teknovo-product-designer**; this skill reviews alignment.

Save: `docs/plans/YYYY-MM-DD-<feature>-product-design.md`

**Implementation without this artifact is FORBIDDEN.**

---

## Required Output — Design Review

UX Score + Priority Matrix + Verdict. UX Score ≥80 to ship ERP; public surfaces also require Visual Originality ≥85.

Frameworks: Dashboard · Form UX · Table UX · Scroll/Cinematic UX · Mobile · Accessibility. Template: [reference.md](reference.md).

---

## Implementation Planning Mode

When asked to **build UI**, produce **all 10 pre-code artifacts** before code:

Folder tree · Component tree · Route/scene tree · Page/scene layout · Responsive layout · State management · API · RBAC · Acceptance criteria · Frontend plan (include motion map + 3D scene list).

Then invoke **teknovo-feature-implementation** + **teknovo-ui-ux** — only after Motion + 3D reviews PASS.

---

## Workflows (Condensed)

| Workflow | Steps |
|----------|-------|
| New public feature | PRD → brand-dna → creative-director → product-designer (4 goals) → scroll IA → motion review → 3D review → UI UX review → build → Visual Originality ≥85 → chief-architect (if backend) |
| New ERP feature | PRD → product-designer → IA → build → ai-ish review (ERP anti-patterns) |
| UX review | Checklist → frameworks → Design Review output |
| Pre-release | Critical flows · forbidden patterns · E2E |

---

## Anti-Patterns

| Wrong | Right |
|-------|-------|
| Code before IA/scene tree | IA + scroll map first |
| Static section stack (public) | Cinematic chapters with motion continuity |
| Background image hero | Interactive scene / 3D narrative |
| Skip Motion/3D review | Mandatory pre-code gates |
| Skip four goal artifacts | Product designer gate |
| Dashboard patterns on landing | Immersive story structure |
| Skip Visual Originality score | Mandatory ≥85 via teknovo-ai-ish-review |

---

## Skill Transitions

| After | Invoke |
|-------|--------|
| Brand alignment | teknovo-creative-director |
| Creative APPROVE | teknovo-product-designer |
| Product design approved | Motion Design Review → 3D Experience Review → teknovo-ux-architecture (this skill) |
| UX Architecture complete | Design System → UI UX Review |
| Reviews PASS | teknovo-feature-implementation + teknovo-ui-ux |
| Post UI build | teknovo-ai-ish-review (Visual Originality ≥85) |
| Architecture needed | teknovo-chief-architect |
| Landing | teknovo-landing-page |
| Pre-ship | gstack-qa, gstack-browser-testing |

---

## Key Principles

- **Story over sections** — public UX is a journey, not a sitemap rendered vertically
- **Motion communicates** — every animation has information job
- **3D serves narrative** — no decorative spatial clutter
- **ERP ≠ public** — PageShell for operators; scenes for visitors
- **Evidence over claims** — scroll recordings, Lighthouse, checklist marks
