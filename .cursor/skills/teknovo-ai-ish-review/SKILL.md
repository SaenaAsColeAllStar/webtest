---
name: teknovo-ai-ish-review
description: >-
  Evaluates Teknovo UI for generic/template patterns and assigns Visual Originality
  Score (0–100). Blocks implementation when score is below 85. Detects feature grids,
  KPI blocks, dashboard layouts, template heroes, and Tailwind demo appearance.
  Use after UI build and before testing or ship claims.
---

# Teknovo AI-ish Review

**Scope**: Post-design, pre-ship enforcement gate for visual authenticity and originality.

**When**: After **teknovo-ui-ux** / **teknovo-landing-page** implementation draft — before testing completion and "done" claims.

**Primary metric**: **Visual Originality Score** (0–100, higher = more distinctive).

---

## Responsibilities

Evaluate UI against immersive design standards. Issue PASS/BLOCK verdict based on Visual Originality Score and auto-reject rules.

---

## Visual Originality Score (Primary Gate)

| Score | Band | Verdict |
|-------|------|---------|
| 85–100 | Distinctive | **PASS** — proceed to testing |
| 70–84 | Derivative | **REVISE** — redesign required |
| 50–69 | Generic | **BLOCK** |
| 0–49 | Template | **BLOCK** — full creative restart |

**Minimum to pass: 85.** Score **<85** → **BLOCK IMPLEMENTATION**.

Return to **teknovo-creative-director** → **teknovo-product-designer** → **teknovo-ux-architecture** before re-implementation.

---

## Auto-Reject Rules (Immediate BLOCK)

Regardless of partial scores, **automatic BLOCK** if any present:

- Generic cards layout (icon + title + blurb grid)
- Feature grids (3×N "Why Choose Us" patterns)
- KPI blocks / stat counters as primary marketing pattern
- Dashboard layouts on public/marketing surfaces
- Template heroes (headline + subtitle + CTA + stock image)
- Background image hero
- Tailwind demo / UI kit showcase appearance
- Hero banner with CTA only — no interactive scene
- Disconnected static section stack with no motion continuity

Auto-reject caps Visual Originality at **69 maximum**.

---

## Scoring Rubric

Score each dimension 0–10; weighted sum normalized to 0–100 Visual Originality:

| Dimension | Weight | 10 = | 0 = |
|-----------|--------|------|-----|
| Narrative originality | 15% | Unique workforce story chapters | Generic welcome + features |
| Spatial / 3D design | 15% | Purposeful immersive depth | Flat template or fake 3D |
| Motion design | 15% | Information-carrying scroll narrative | Static or decorative-only |
| Visual hierarchy | 10% | Apple-level focal clarity | Competing elements |
| Layout distinctiveness | 10% | Custom scene architecture | Bootstrap/Tailwind demo |
| Typography & craft | 10% | Intentional type scale | Default theme fonts |
| Color & depth | 10% | Layered volumetric surfaces | Generic gradient hero |
| Content authenticity | 10% | Real school/workforce voice | Lorem / placeholder stats |
| Anti-template signals | 5% | No generic patterns detected | Multiple auto-reject signals |

**Quick block**: ≥3 dimensions scored ≤3 → automatic score ≤69.

---

## Legacy AI-ish Signals (Diagnostic)

For evidence documentation, also score generic-pattern signals (0–10 each):

- Hero Generic · KPI Spam · Card Spam · Template Grid · Generic Icons
- Placeholder Content · Gradient Abuse · Dashboard Clone · SaaS Clone · Static Section Stack

High AI-ish signals (≥8 on ≥2) → cap Visual Originality at 74 (REVISE minimum).

---

## Enforcement

```
Visual Originality Score < 85  →  BLOCK IMPLEMENTATION
Auto-reject rule triggered     →  BLOCK IMPLEMENTATION
```

---

## Review Workflow

1. Load **teknovo-brand-dna** forbidden directions
2. Inspect layout, motion, 3D scenes, copy, density
3. Check auto-reject rules first — if any hit, BLOCK immediately
4. Score rubric dimensions with evidence (screenshots, file paths, scroll recording)
5. Compute Visual Originality Score
6. Issue verdict: PASS (≥85) · REVISE (70–84) · BLOCK (<70 or auto-reject)

---

## Deliverable

Save: `docs/plans/YYYY-MM-DD-<feature>-ai-ish-review.md`

```markdown
# Visual Originality Review — <feature>

## Visual Originality Score: <0–100>
## Band: Distinctive | Derivative | Generic | Template
## Verdict: PASS | REVISE | BLOCK

## Auto-Reject Triggers
| Rule | Triggered | Evidence |
|------|-----------|----------|
| Generic cards | Y/N | |
| Feature grid | Y/N | |
| KPI blocks | Y/N | |
| Dashboard layout (public) | Y/N | |
| Template hero | Y/N | |
| Tailwind demo appearance | Y/N | |

## Dimension Scores
| Dimension | Score (0–10) | Weight | Evidence |
|-----------|--------------|--------|----------|

## Diagnostic AI-ish Signals
| Signal | Score (0–10) | Evidence |
|--------|--------------|----------|

## Required Fixes (if REVISE/BLOCK)
1. ...
```

---

## Integration

- **teknovo-ux-architecture**: Pre-code and pre-ship gate — Visual Originality ≥85
- **teknovo-design-system**: 3D/motion standards inform scoring
- **teknovo-auto-orchestrator**: Runs after UI build, before testing sign-off
- **execution-policy.yaml**: `visual_originality_review` gate blocks completion when score <85
