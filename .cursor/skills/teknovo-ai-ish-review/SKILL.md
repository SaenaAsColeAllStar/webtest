---
name: teknovo-ai-ish-review
description: >-
  Evaluates Teknovo UI for AI-generated patterns and assigns an AI-ish Score
  (0–100). Blocks implementation when score exceeds 30. Detects generic heroes,
  KPI spam, card spam, template grids, and SaaS clones. Use after UI build and
  before testing or ship claims.
---

# Teknovo AI-ish Review

**Scope**: Post-design, pre-ship enforcement gate for visual authenticity.

**When**: After **teknovo-ui-ux** / **teknovo-landing-page** implementation draft — before testing completion and "done" claims.

---

## Responsibilities

Melakukan evaluasi AI-ish Score.

---

## Scoring

| Score | Band | Action |
|-------|------|--------|
| 0–20 | Excellent | Proceed |
| 21–30 | Acceptable | Proceed with minor notes |
| 31–40 | Needs Revision | Redesign required |
| 41–60 | Block | BLOCK — redesign mandatory |
| 61–100 | Reject | BLOCK — full creative restart |

---

## AI-ish Signals

Score each signal 0–10; sum and normalize to 0–100:

- Hero Generic
- KPI Spam
- Card Spam
- Template Grid
- Generic Icons
- Placeholder Content
- Gradient Abuse
- Glassmorphism Abuse
- Dashboard Clone
- SaaS Clone

**Quick block**: ≥2 strong signals (8+) → automatic score ≥41.

---

## Enforcement

Jika skor:

> 30

maka:

BLOCK IMPLEMENTATION

dan wajib redesign.

Return to **teknovo-creative-director** → **teknovo-product-designer** → **teknovo-ux-architecture** before re-implementation.

---

## Review Workflow

1. Load **teknovo-brand-dna** forbidden directions
2. Inspect layout, copy, components, density
3. Score each signal with evidence (screenshot refs or file paths)
4. Compute total AI-ish Score
5. Issue verdict: PASS (≤30) · REVISE (31–40) · BLOCK (≥41)

---

## Deliverable

Save: `docs/plans/YYYY-MM-DD-<feature>-ai-ish-review.md`

```markdown
# AI-ish Review — <feature>

## Score: <0–100>
## Band: Excellent | Acceptable | Needs Revision | Block | Reject
## Verdict: PASS | REVISE | BLOCK

## Signal Scores
| Signal | Score (0–10) | Evidence |
|--------|--------------|----------|
| Hero Generic | | |
| KPI Spam | | |
| Card Spam | | |
| Template Grid | | |
| Generic Icons | | |
| Placeholder Content | | |
| Gradient Abuse | | |
| Glassmorphism Abuse | | |
| Dashboard Clone | | |
| SaaS Clone | | |

## Required Fixes (if REVISE/BLOCK)
1. ...
```

---

## Integration

- **teknovo-ux-architecture**: Pre-code gate uses ≤30 threshold (aligned)
- **teknovo-design-system**: Visual Personality Rules inform scoring
- **teknovo-auto-orchestrator**: Runs after UI build, before testing sign-off
- **execution-policy.yaml**: `ai_ish_review` gate blocks completion when score > 30
