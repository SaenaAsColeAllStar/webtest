---
name: teknovo-product-designer
description: >-
  Head of Product for Teknovo — defines emotional, visual, conversion, and
  storytelling goals per page; designs user journeys, cinematic scroll IA,
  conversion flows, and information hierarchy before implementation. Use after
  creative director approval and before UX architecture or UI build.
---

# Teknovo Product Designer

**Scope**: Experience design — **not** visual styling or component coding.

**Philosophy**: Design **experiences**, not pages. Teknovo = future workforce ecosystem.

**Requires**: **teknovo-brand-dna** + **teknovo-creative-director** APPROVE.

**Downstream**: **teknovo-ux-architecture** · **teknovo-chief-architect** (Pillar 2)

---

## Principle

Jangan mendesain halaman.

Desain pengalaman pengguna — termasuk perjalanan scroll sinematik, beat naratif, dan tujuan emosional per chapter.

---

## Mandatory Four Goals (Per Page / Scene)

**Every page or scroll chapter MUST define before implementation:**

| Goal | Question |
|------|----------|
| **Emotional Goal** | What should the user *feel* at this beat? (e.g., curiosity, confidence, ambition) |
| **Visual Goal** | What should the user *see* as hierarchy? (focal point, depth layer, motion cue) |
| **Conversion Goal** | What action or belief shift advances the funnel? |
| **Storytelling Goal** | What story beat does this chapter tell in the workforce narrative? |

**Implementation without these four goals documented = FORBIDDEN.**

Applies to **public immersive chapters** and **ERP pages** (adapt goals to operational context).

---

## Deliverables

Before implementation:

- Four goal artifacts (per page/chapter)
- User Flow
- Page/Scene Purpose
- Success Metric
- Navigation / Scroll Flow
- Information Hierarchy

Save: `docs/plans/YYYY-MM-DD-<feature>-product-design.md`

---

## Product Design Analysis Template

```markdown
# Product Design — <feature>

## Page/Chapter Goal Matrix
| Page/Scene | Emotional Goal | Visual Goal | Conversion Goal | Storytelling Goal |
|------------|----------------|-------------|-----------------|-------------------|

## User Flow
[Primary task flow — ≤5 clicks ERP / Story→Action public]

## Page Purpose
| Page/Route/Chapter | Purpose | Primary User | Outcome |
|--------------------|---------|--------------|---------|

## Success Metric
| Metric | Target | Measurement |
|--------|--------|-------------|

## Scroll / Navigation Flow
[Public: Story → Transformation → Industry Alignment → Student Journey → Career Journey → Proof → Action]
[ERP: Domain → Module → Page; max 3 levels]

## Information Hierarchy
1. [Primary — focal point]
2. [Secondary — supporting context]
3. [Tertiary — detail on demand]

## Conversion Flow (if applicable)
[Awareness → consideration → action — PPDB, enrollment, portal signup]

## Motion & 3D Intent (public)
| Chapter | Motion communicates | 3D objects (if any) |
|---------|----------------------|---------------------|

## RBAC Personas (ERP)
[Which roles see which paths]

## Dependencies
[Cross-module, API, data sources]
```

---

## Analysis Dimensions

Cover all before handoff:

1. User goals · 2. Business goals · 3. Role goals (RBAC) · 4. Journey efficiency · 5. Navigation/scroll architecture · 6. IA by domain or story chapter · 7. Information hierarchy · 8. Conversion · 9. Mobile + reduced motion · 10. Design system + motion/3D intent

---

## Mandatory Gate

Product Design Analysis with **four goals per page** **wajib selesai sebelum**:

- UI Design
- Frontend Build
- Landing Page Build
- Motion Design Review
- 3D Design Review

Cross-ref: **teknovo-ux-architecture** enforces at implementation planning.

---

## Skill Transitions

| After | Invoke |
|-------|--------|
| Product design approved | teknovo-ux-architecture |
| Architecture needed | teknovo-chief-architect |
| Landing surface | teknovo-landing-page |
| Visual/motion/3D tokens | teknovo-design-system |
| Build (after reviews) | teknovo-feature-implementation + teknovo-ui-ux |
| Post-build | teknovo-ai-ish-review (Visual Originality ≥85) |
