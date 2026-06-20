---
name: teknovo-auto-orchestrator
description: Autonomous orchestration — parse intent, select skills/agents, build execution chains, enforce creative governance (Brand DNA → Creative Director → Product Designer → UX → Design → Build → AI-ish Review), plus gates (Taste → Assurance → Security → Verification → Ship). Triggers on orchestrate, route, dispatch, auto, landing, finance, ppdb, sarpras, deploy, feature, build, implement.
---

# Teknovo Auto-Orchestrator

Declarative orchestration layer for the Teknovo AI SuperStack. When a user sends a natural-language implementation request, this skill **parses intent**, **loads the matching chain**, **enforces workflow gates**, **dispatches skills in order** (parallel where policy allows), and **runs the verification chain** before any "done" claim.

**No direct implementation.** UI and landing work must follow: Brand → Product → UX → Design → Build → Review.

**Source of truth**: YAML configs in this directory — not runtime JavaScript. Agents read these files directly.

| File | Role |
|------|------|
| `SKILL.md` | Agent instructions (this file) |
| `intent-routing.yaml` | Intent keywords/patterns → `chain_ref` |
| `chain-map.yaml` | Predefined skill/agent execution chains |
| `execution-policy.yaml` | Gates, verification, retries, block conditions |

**Platform complement**: `.cursor/orchestrator/orchestrator.js` handles agent dispatch, MCP resolution, and retry at runtime. This skill decides **what** to run; the platform orchestrator decides **how** to run it.

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

- **`intents:`** — Each intent has `id`, `keywords`, `patterns`, `chain_ref`, `priority`, `required_gates`
- **`resolution:`** — Tie-breaking and multi-domain parallel threshold
- **`skill_paths:`** — Resolve skill IDs to filesystem paths (`.cursor/skills/` for native Cursor skills)

**Match algorithm**:

1. Normalize user message (lowercase, trim)
2. Score each intent by keyword/pattern hits
3. Select highest `priority` + score; use `fallback: true` intent (`generic-feature`) if no match
4. Read `chain_ref` → load chain from `chain-map.yaml`
5. If deploy keywords detected, append `pre-ship` overlay from `resolution.deploy_overlay_chain`

### 2. `chain-map.yaml`

- **`chains:`** — Each chain has `id`, `description`, ordered `phases:`
- Each phase: `skill` or `agent`, optional `bundle`, `gate`, `parallel_group`, `artifact`, `verdict`
- **`always_load:`** — Skills/agents appended to every chain

**Phase execution**:

- Run phases sequentially unless `parallel_group` matches (see `execution-policy.yaml` → `parallel_allowed`)
- Honor `gate` phases before any implementation phase
- Load bundles via `python .cursor/runtime/load-skills.py --bundle <name>`

### 3. `execution-policy.yaml`

- **`gates:`** — Mandatory gates with order, artifacts, block conditions
- **`verification_chain:`** — build → lint → test → self-critique (evidence required)
- **`retry:`** — Max 10 automatic retries (`.cursor/gates/execution/failure-recovery.md`)
- **`parallel_allowed:`** — Which phase groups may run concurrently
- **`block_conditions:`** — Hard stops (main branch, missing assurance, security BLOCK, AI-ish > 30)
- **`completion_criteria:`** — All verification pass before "done"

---

## Step-by-Step Orchestration Workflow

**Creative governance chain (UI intents):**

```text
User
  → Brand DNA
  → Creative Director
  → Product Designer
  → UX Architecture
  → Design System
  → UI UX
  → Feature Implementation
  → AI-ish Review
  → Testing
  → Verification
```

```text
User Message
    ↓
1. Parse intent          ← intent-routing.yaml (keywords + patterns)
    ↓
2. Match chain_ref       ← highest priority intent
    ↓
3. Build chain           ← chain-map.yaml phases + always_load
    ↓
4. Apply policy          ← execution-policy.yaml (gates, branch safety, retries)
    ↓
5. Creative governance   ← brand-dna → creative-director → product-designer (UI intents)
    ↓
6. Dispatch skills       ← sequential; parallel where parallel_group allows
    ↓
7. AI-ish review         ← score ≤30 required before testing sign-off
    ↓
8. Verification chain    ← build, lint, test, self-critique
    ↓
9. Ship (if deploy)      ← pre-ship chain overlay
```

### Step 1 — Parse intent

Extract domain, deploy flag, and autonomous mode from user message. Check `autonomous_triggers` in `intent-routing.yaml`.

### Step 2 — Load intent match

```bash
python .cursor/runtime/load-skills.py --trigger "landing page build"
python .cursor/runtime/load-skills.py --bundle pre-ui
python .cursor/runtime/load-skills.py --bundle pre-implementation
python .cursor/runtime/load-memory.py --include-assurance --assurance-bundle pre-implementation
python .cursor/runtime/load-memory.py --include-security --security-bundle pre-api
```

Read `intent-routing.yaml` → resolve `chain_ref`.

### Step 3 — Build chain

Load `chain-map.yaml` → expand `phases` for the matched chain. Resolve skill paths from `intent-routing.yaml` → `skill_paths`. Append deploy overlay (`pre-ship`) when deploy keywords present.

### Step 4 — Apply execution policy

Before first file edit:

1. **branch_safety** — `git branch --show-current`; never write on `main`/`master`
2. **brand_dna** → **creative_director** → **product_designer** — for UI/landing intents
3. **taste** → **assurance** → **security_pre_impl** — gates per intent `required_gates`
4. Enable **retry** (max 10) on build/test failures

Cross-ref Cursor rules: `.cursor/rules/01-product.mdc` through `07-cloudflare.mdc`

### Step 5 — Dispatch skills in order

Integrate with:

- **superpowers-dispatching-parallel-agents** — parallel sibling agents
- **superpowers-subagent-driven-development** — subagent contracts

Use `.cursor/orchestrator/orchestrator.js` for `runSequential()` / `runParallel()` when programmatic dispatch is available.

**Parallel rules** (from `execution-policy.yaml`):

- Landing page: `ui-build` group after architecture gate
- 3+ domain intents: `domain-modules` group after shared architecture
- Never parallelize security gates with implementation
- Never skip creative governance for UI intents

### Step 6 — AI-ish review

Run **teknovo-ai-ish-review** after UI build. Score must be **≤30** to proceed to testing sign-off.

### Step 7 — Run verification chain

Mandatory before "done":

| Step | Action |
|------|--------|
| build | `npm run build` (or project equivalent) |
| lint | `tsc --noEmit`, linters |
| test | unit + integration; `gstack-qa` for functional validation |
| self_critique | `.cursor/gates/quality/self-critique.md` |

Load **superpowers-verification-before-completion** and **teknovo-testing-architect**. Retry failures up to 10 times per `.cursor/gates/execution/failure-recovery.md`.

---

## Predefined Chains (Summary)

| Chain ID | Phase sequence (skills) |
|----------|-------------------------|
| **landing-page** | brand-dna → creative-director → product-designer → ux-architecture → design-system → landing-page + ui-ux → ai-ish-review → testing → cloudflare |
| **finance** | chief-architect → finance → backend → database → testing |
| **ppdb** | chief-architect → ppdb → backend → testing |
| **sarpras** | chief-architect → reporting → backend → testing |
| **generic-feature** | taste → assurance → security → brand-dna → product-designer → chief-architect → feature-implementation → ai-ish-review (if UI) → testing |
| **ui-only** | brand-dna → creative-director → product-designer → ux-architecture → design-system → ui-ux → ai-ish-review → testing |
| **pre-ship** | verification → quality → security-pre-deploy → devops/cloudflare/ship |
| **security-review** | assurance → security → security-review |

Full phase definitions: `chain-map.yaml`

---

## Workflow Integration

Mandatory order per `AGENTS.md` and `execution-policy.yaml`:

```text
Brand DNA → Creative Director → Product Designer → UX Architecture → Design System → Build → AI-ish Review (≤30) → Taste → Assurance → Security (pre-impl) → Verification → Quality → Security (pre-deploy) → Ship
```

| Gate | Artifact / Verdict | Blocks |
|------|-------------------|--------|
| Brand DNA | Brand Alignment Note | UI code |
| Creative Director | APPROVE verdict | UI code |
| Product Designer | Product Design Analysis | UI Design, Frontend Build, Landing Build |
| AI-ish review | Score ≤30 from teknovo-ai-ish-review | UI ship, "done" claim |
| Taste | `.cursor/gates/taste/taste-gates.md` | UI code, scope expansion |
| Assurance | Assurance Sign-Off APPROVE | First code edit |
| Security pre-impl | APPROVE from security-reviewer | Code, routes, migrations |
| Branch safety | `feature/*` branch | Writes on main |
| Verification | Build + test evidence | "Done" claim |
| Quality | self-critique + quality gates | Merge |
| Security pre-deploy | APPROVE | Staging/production deploy |

---

## Sample Routing

### "Build landing page for SMK Teknovo"

1. **Intent**: `landing-page` (keywords: landing page, build)
2. **Chain**: `landing-page`
3. **Phases**: taste → assurance → brand-dna → creative-director → product-designer → ux-architecture → design-system → security APPROVE → architecture → landing-page + ui-ux (parallel) → ai-ish-review (≤30) → testing → cloudflare (if deploy)
4. **Skills loaded**: `pre-feature`, `pre-ui`, `pre-implementation`, `teknovo-brand-dna`, `teknovo-creative-director`, `teknovo-product-designer`, `teknovo-landing-page`, `teknovo-ai-ish-review`, `teknovo-testing-architect`

### "Build school finance module"

1. **Intent**: `finance` (keywords: finance, build)
2. **Chain**: `finance`
3. **Phases**: taste → assurance → security APPROVE (`pre-api`) → architecture → finance → backend → database → testing
4. **Skills loaded**: `teknovo-finance`, `teknovo-backend-development`, `teknovo-database-architect`, `teknovo-rbac-architect`, `teknovo-testing-architect`

---

## Native Cursor Skills & Rules

Native skills live in `.cursor/skills/`:

| Skill | Path |
|-------|------|
| teknovo-brand-dna | `.cursor/skills/teknovo-brand-dna/SKILL.md` |
| teknovo-creative-director | `.cursor/skills/teknovo-creative-director/SKILL.md` |
| teknovo-product-designer | `.cursor/skills/teknovo-product-designer/SKILL.md` |
| teknovo-ai-ish-review | `.cursor/skills/teknovo-ai-ish-review/SKILL.md` |
| teknovo-ux-architecture (Pillar 1) | `.cursor/skills/teknovo-ux-architecture/SKILL.md` |
| teknovo-ui-ux | `.cursor/skills/teknovo-ui-ux/SKILL.md` |
| teknovo-landing-page | `.cursor/skills/teknovo-landing-page/SKILL.md` |
| teknovo-design-system | `.cursor/skills/teknovo-design-system/SKILL.md` |
| teknovo-security | `.cursor/skills/teknovo-security/SKILL.md` |
| teknovo-security-review | `.cursor/skills/teknovo-security-review/SKILL.md` |

Persistent gates: `.cursor/rules/01-product.mdc` … `07-cloudflare.mdc`

Index: `.cursor/skills/README.md`

---

## Autonomous Execution Policy

| Rule | Behavior |
|------|----------|
| Direct implementation | **DO NOT** skip Brand → Product → UX → Design → Build → Review |
| Unnecessary questions | **DO NOT** ask — infer from repo, PRD, conventions |
| Long plans | **DO NOT** produce plan-only output — execute with tools |
| Stop after architecture | **DO NOT** stop — continue through implementation, tests, verification |
| File changes | **DO** create and modify files |
| Builds | **DO** run builds and fix errors (max 10 retries) |
| Completion | **DO** pass verification chain + AI-ish ≤30 before declaring done |

Reference: `.cursor/gates/execution/execution-registry.yaml`, `.cursor/docs/EXECUTION.md`, `.cursor/gates/execution/failure-recovery.md`

---

## Branch Safety

Before first file edit:

```bash
git branch --show-current
```

| Branch | Action |
|--------|--------|
| `main` / `master` | `git checkout -b feature/<scope>` |
| `feature/*` | Proceed |

Reference: `.cursor/gates/execution/branch-policy.md`, `.cursor/rules/06-github.mdc`

---

## Related Skills

| Skill | Role |
|-------|------|
| superpowers-dispatching-parallel-agents | Parallel sibling agent launch |
| superpowers-subagent-driven-development | Subagent contracts and review |
| superpowers-verification-before-completion | Evidence-based completion |
| teknovo-testing-architect | Test strategy and coverage |
| teknovo-chief-architect | Architecture gate (Pillar 2) |
| teknovo-brand-dna | Brand identity gate — first in UI workflow |
| teknovo-creative-director | Creative/art direction review |
| teknovo-product-designer | Head of Product — journeys, IA, conversion |
| teknovo-ai-ish-review | AI-ish score enforcement (≤30) |
| teknovo-chief-product-designer | Product design gate (Pillar 1 — alias of ux-architecture) |
| teknovo-feature-implementation | End-to-end implementation |
| teknovo-devops-engineer | Ship gate (Pillar 3) |

---

## Declarative Orchestration Note

Orchestration is **declarative** — agents read `intent-routing.yaml`, `chain-map.yaml`, and `execution-policy.yaml` directly. There is no required JavaScript entry point in this skill package. The platform orchestrator at `.cursor/orchestrator/orchestrator.js` remains available for programmatic agent dispatch when needed.
