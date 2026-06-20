---
name: teknovo-auto-orchestrator
description: Autonomous orchestration — parse intent, select skills/agents, build execution chains, enforce creative governance (Brand DNA → Creative Director → Product Designer → Motion Design Review → 3D Experience Review → UX Architecture → Design System → UI UX Review → Implementation → AI-ish Review → Testing), plus gates (Taste → Assurance → Security → Verification → Ship). Triggers on orchestrate, route, dispatch, auto, landing, finance, ppdb, sarpras, deploy, feature, build, implement.
---

# Teknovo Auto-Orchestrator

Declarative orchestration layer for the Teknovo AI SuperStack. When a user sends a natural-language implementation request, this skill **parses intent**, **loads the matching chain**, **enforces workflow gates**, **dispatches skills in order** (parallel where policy allows), and **runs the verification chain** before any "done" claim.

**No direct implementation.** UI and landing work **must** follow the mandatory creative governance chain below — agents **must not** skip to code.

**Source of truth**: YAML configs in this directory — not runtime JavaScript. Agents read these files directly.

| File | Role |
|------|------|
| `SKILL.md` | Agent instructions (this file) |
| `intent-routing.yaml` | Intent keywords/patterns → `chain_ref` |
| `chain-map.yaml` | Predefined skill/agent execution chains |
| `execution-policy.yaml` | Gates, verification, retries, block conditions |

**Platform complement**: `.cursor/orchestrator/orchestrator.js` handles agent dispatch, MCP resolution, and retry at runtime. This skill decides **what** to run; the platform orchestrator decides **how** to run it.

---

## Mandatory Creative Governance Chain (UI Intents)

**No direct implementation allowed.** Every UI/landing intent runs this sequence in order:

```text
Brand DNA
  → Creative Director
  → Product Designer
  → Motion Design Review
  → 3D Experience Review
  → UX Architecture
  → Design System
  → UI UX Review
  → Implementation
  → AI-ish Review (Visual Originality ≥85)
  → Testing
```

| Phase | Skill / Gate | Blocks if skipped |
|-------|--------------|-------------------|
| Brand DNA | teknovo-brand-dna | All UI code |
| Creative Director | teknovo-creative-director — APPROVE | All UI code |
| Product Designer | teknovo-product-designer — four goals per page | UI design, build |
| Motion Design Review | teknovo-motion-designer — PASS (Motion Quality Score ≥80) | 3D review, implementation |
| 3D Experience Review | teknovo-3d-experience-architect — PASS (3D Experience Score ≥85) | Implementation |
| UX Architecture | teknovo-ux-architecture — scroll IA, pre-code artifacts | Implementation |
| Design System | teknovo-design-system — tokens, R3F stack | Implementation |
| UI UX Review | teknovo-ui-ux — layout contract check | Implementation |
| Implementation | teknovo-feature-implementation + teknovo-ui-ux / teknovo-landing-page | — |
| AI-ish Review | teknovo-ai-ish-review — Visual Originality ≥85 | Testing sign-off, "done" |
| Testing | teknovo-testing-architect, gstack-qa | Ship claim |

ERP-only UI intents follow the same chain; Motion/3D reviews may PASS with "not applicable" documented when no public immersive surface.

---

## When to Activate

Load this skill when the user:

- Asks to **build**, **implement**, **create**, **develop**, or **deploy** a feature or system
- Uses **orchestrate**, **route**, **dispatch**, or **auto** orchestration language
- Mentions domain keywords: **landing**, **finance**, **PPDB**, **sarpras**, **deploy**, **feature**
- Needs autonomous multi-skill execution without manual skill selection

**Trigger words**: orchestrate, route, dispatch, auto, landing, finance, ppdb, sarpras, deploy, feature, build, implement, create, ship, release

---

## Configuration Files — How to Use

### 1. `intent-routing.yaml`

Match algorithm: normalize message → score intents → load `chain_ref` from `chain-map.yaml` → apply `execution-policy.yaml`.

### 2. `chain-map.yaml`

Phases run sequentially unless `parallel_group` matches. Honor `gate` phases before implementation.

### 3. `execution-policy.yaml`

- **`gates:`** — Mandatory gates including motion_design_review, three_d_experience_review, ux_architecture, ui_ux_review, visual_originality_review
- **`block_conditions:`** — Hard stops (main branch, missing assurance, security BLOCK, Visual Originality <85, skipped creative chain)
- **`verification_chain:`** — build → lint → test → self-critique

---

## Step-by-Step Orchestration Workflow

```text
User Message
    ↓
1. Parse intent          ← intent-routing.yaml
    ↓
2. Match chain_ref       ← highest priority intent
    ↓
3. Build chain           ← chain-map.yaml phases + always_load
    ↓
4. Apply policy          ← execution-policy.yaml (gates, branch safety)
    ↓
5. Creative governance   ← Brand → Creative → Product → Motion → 3D → UX → Design System → UI UX
    ↓
6. Dispatch implementation ← teknovo-feature-implementation (never before step 5)
    ↓
7. AI-ish review         ← Visual Originality ≥85 required
    ↓
8. Verification chain    ← build, lint, test, self-critique
    ↓
9. Ship (if deploy)      ← pre-ship chain overlay
```

### Step 1 — Branch safety

```bash
git branch --show-current
```

Never write on `main`/`master` — create `feature/<scope>` first.

### Step 2 — Load skills

```bash
python .cursor/runtime/load-skills.py --trigger "landing page build"
python .cursor/runtime/load-skills.py --bundle pre-ui
python .cursor/runtime/load-skills.py --bundle pre-implementation
python .cursor/runtime/load-skills.py --bundle pre-creative-review
```

### Step 3 — Enforce creative chain

**DO NOT** write UI code until:

1. Brand Alignment Note complete
2. Creative Direction APPROVE
3. Product Design Analysis with four goals per page
4. Motion Design Review PASS (Motion Quality Score ≥80)
5. 3D Experience Review PASS (3D Experience Score ≥85, or N/A documented)
6. UX Architecture pre-code artifacts
7. Design System tokens and stack aligned
8. UI UX Review PASS

### Step 4 — Implementation

Only after all review gates PASS. Load **teknovo-feature-implementation** + **teknovo-ui-ux** / **teknovo-landing-page**.

### Step 5 — Visual Originality gate

Run **teknovo-ai-ish-review**. **Visual Originality Score must be ≥85** to proceed to testing sign-off.

### Step 6 — Verification chain

| Step | Action |
|------|--------|
| build | `npm run build` |
| lint | `tsc --noEmit`, linters |
| test | unit + integration; `gstack-qa` |
| self_critique | `.cursor/gates/quality/self-critique.md` |

---

## Predefined Chains (Summary)

| Chain ID | Phase sequence (skills) |
|----------|-------------------------|
| **landing-page** | brand-dna → creative-director → product-designer → motion-review → 3d-experience-review → ux-architecture → design-system → ui-ux-review → landing-page + ui-ux → ai-ish-review → testing → cloudflare |
| **ui-only** | brand-dna → creative-director → product-designer → motion-review → 3d-experience-review → ux-architecture → design-system → ui-ux-review → ui-ux → ai-ish-review → testing |
| **finance** | chief-architect → finance → backend → database → testing |
| **ppdb** | chief-architect → ppdb → backend → testing |
| **generic-feature** | taste → assurance → security → brand-dna → product-designer → chief-architect → feature-implementation → ai-ish-review (if UI) → testing |
| **pre-ship** | verification → quality → security-pre-deploy → devops/ship |

Full phase definitions: `chain-map.yaml`

---

## Workflow Integration

Extended sequence with platform gates:

```text
Branch Safety
  → Brand DNA → Creative Director → Product Designer
  → Motion Design Review → 3D Experience Review → UX Architecture → Design System → UI UX Review
  → Taste → Assurance → Security (pre-impl)
  → Implementation
  → AI-ish Review (Visual Originality ≥85)
  → Verification → Quality → Security (pre-deploy) → Ship
```

| Gate | Artifact / Verdict | Blocks |
|------|-------------------|--------|
| Brand DNA | Brand Alignment Note | UI code |
| Creative Director | APPROVE | UI code |
| Product Designer | Four goals per page + Product Design Analysis | UI design, build |
| Motion Design Review | PASS in `*-motion-review.md` (≥80) | 3D review, implementation |
| 3D Experience Review | PASS in `*-3d-review.md` (≥85) | Implementation |
| UX Architecture | Pre-code scroll IA artifacts | Implementation |
| Design System | Tokens and R3F stack aligned | Implementation |
| UI UX Review | Layout contract PASS | Implementation |
| Visual Originality | Score ≥85 from teknovo-ai-ish-review | UI ship, "done" claim |
| Taste | taste-gates.md | UI code, scope expansion |
| Assurance | APPROVE | First code edit |
| Security pre-impl | APPROVE | Code, routes, migrations |
| Branch safety | `feature/*` branch | Writes on main |
| Verification | Build + test evidence | "Done" claim |

---

## Sample Routing

### "Build landing page for SMK Teknovo"

1. **Intent**: `landing-page`
2. **Chain**: full creative governance → implementation → Visual Originality ≥85 → testing
3. **Skills**: brand-dna, creative-director, product-designer, motion-designer, 3d-experience-architect, ux-architecture, design-system, landing-page, ui-ux, ai-ish-review, testing-architect
4. **Forbidden**: skipping to hero + features implementation

### "Build school finance module"

1. **Intent**: `finance` — no immersive UI chain unless UI surfaces included
2. **Chain**: taste → assurance → security → architecture → finance → backend → testing

---

## Autonomous Execution Policy

| Rule | Behavior |
|------|----------|
| Direct implementation | **DO NOT** — mandatory creative chain first |
| Skip Motion/3D Experience/UI UX review | **DO NOT** — block_conditions enforce |
| Unnecessary questions | **DO NOT** ask — infer from repo, PRD |
| Long plans only | **DO NOT** — execute with tools after gates |
| File changes | **DO** create/modify after gates PASS |
| Builds | **DO** run builds; max 10 retries |
| Completion | **DO** pass verification + Visual Originality ≥85 before "done" |

Reference: `.cursor/gates/execution/execution-registry.yaml`, `.cursor/docs/EXECUTION.md`

---

## Branch Safety

```bash
git branch --show-current
```

| Branch | Action |
|--------|--------|
| `main` / `master` | `git checkout -b feature/<scope>` |
| `feature/*` | Proceed |

---

## Related Skills

| Skill | Role |
|-------|------|
| teknovo-brand-dna | Brand identity gate — first in UI workflow |
| teknovo-creative-director | Creative/art direction + 3D narrative review |
| teknovo-product-designer | Four goal artifacts per page |
| teknovo-ux-architecture | Scroll IA, pre-code artifacts |
| teknovo-motion-designer | Motion Design Review gate — Motion Quality Score ≥80 |
| teknovo-3d-experience-architect | 3D Experience Review gate — 3D Experience Score ≥85 |
| teknovo-design-system | Tokens, motion, R3F stack |
| teknovo-ui-ux | ERP PageShell + public immersive implementation |
| teknovo-landing-page | Public chapter structure |
| teknovo-ai-ish-review | Visual Originality ≥85 enforcement |
| teknovo-feature-implementation | End-to-end implementation (after reviews) |
| superpowers-verification-before-completion | Evidence-based completion |

---

## Declarative Orchestration Note

Orchestration is **declarative** — agents read YAML configs directly. No JavaScript entry point required in this skill package.
