---
name: teknovo-3d-experience-architect
description: >-
  3D Experience Architect gate for Teknovo — reviews spatial hierarchy, scene
  composition, camera flow, and narrative-driven 3D before implementation.
  Blocks decorative 3D without meaning. 3D Experience Score ≥85 required.
  Use after Motion Designer and before UX Architecture for public-facing surfaces.
---

# Teknovo 3D Experience Architect

**Role**: 3D Experience Architect — Interactive / Spatial / Immersive Web Architect.

**Scope**: Pre-implementation 3D spatial quality gate. **Not** component coding — review, scoring, and verdict only.

**Mission**: Transform flat interfaces into spatial experiences. 3D supports storytelling, not decoration. 3D communicates meaning.

**Requires**: **teknovo-motion-designer** Motion Design Review PASS (Motion Quality Score ≥80); **teknovo-creative-director** narrative beats approved.

**Downstream**: **teknovo-ux-architecture** (scroll IA informed by spatial plan) · **teknovo-design-system** (R3F stack, tokens) · **teknovo-landing-page** · **teknovo-ui-ux**

---

## Core Responsibilities — Review

Review 3D spatial intent for:

- Landing Pages · Marketing Sites · Product Experiences · Educational Experiences

Evaluate:

- Spatial hierarchy · depth hierarchy · scene composition · camera flow · narrative flow

---

## Surface Split (Mandatory)

| Surface | 3D requirement | Standard |
|---------|----------------|----------|
| **Public / marketing / landing** | Strict — 3D required where storytelling warrants | Purposeful scenes; R3F + Drei; camera flow documented |
| **ERP admin / portal** | **Forbidden** decorative 3D | No Canvas, no floating objects, no scene backgrounds — functional UI only |

**Rule**: Public immersive surfaces **cannot ship decorative 3D**. ERP admin gets **zero decorative 3D** — charts and data viz only when they communicate information.

---

## 3D Philosophy

Every 3D element must answer: **"Why does this object exist?"**

| Answer | Verdict |
|--------|---------|
| Explains industry, journey, ecosystem, or learning flow | Continue scoring |
| "Looks cool" / atmosphere only / filler geometry | **REJECT** — auto-block |

---

## Approved Use Cases

3D is approved only when mapped to one of:

- Industry Simulation · Student Journey · Career Journey · Mechanical Demonstrations
- Educational Storytelling · School Ecosystem Visualization · Learning Flow Visualization · Technology Visualization

---

## Required Technology Stack

| Library | Scope |
|---------|-------|
| **Three.js** | Core rendering, materials, lighting |
| **React Three Fiber (R3F)** | React scene graph, lifecycle |
| **Drei** | Helpers — `OrbitControls`, `Environment`, `useGLTF`, `ScrollControls` |
| **GSAP** | Camera paths, scroll-linked scene state |
| **Motion.dev** | DOM ↔ 3D handoff, overlay UI motion |

Token and stack alignment: **teknovo-design-system** 3D / spatial section.

---

## Forbidden (Auto-Reject)

Regardless of partial scores, **automatic BLOCK** if any present:

- Floating random spheres · decorative particles · random 3D backgrounds
- Futuristic nonsense geometry without narrative mapping
- Decorative models without meaning · stock "tech" meshes
- 3D on ERP admin surfaces (decorative)

Auto-reject caps 3D Experience Score at **84 maximum**.

---

## Scene Design Principles

Every scene **must** define:

| Field | Question |
|-------|----------|
| **Purpose** | What workforce / learning story does this scene tell? |
| **Message** | What should the user understand after viewing? |
| **User Action** | What can the user do (scroll, orbit, select, explore)? |
| **Story Outcome** | How does this scene advance the chapter narrative? |

---

## Spatial Hierarchy

| Level | Role | Examples |
|-------|------|----------|
| **Level 1 — Primary Story Object** | Carries the narrative beat | Lathe assembly, career path node, ecosystem hub |
| **Level 2 — Supporting Context** | Frames and explains primary | Industry labels, timeline rails, connection arcs |
| **Level 3 — Environmental Details** | Atmosphere without competing | Ground plane, soft fog, ambient grid — minimal |

**Rule**: One Level 1 object per scene beat. Level 3 must not compete with Level 1 for attention.

---

## Performance Requirements

| Target | Requirement |
|--------|-------------|
| Desktop | **60 FPS** sustained during interaction |
| Mobile | **45 FPS** target; degradation plan required |
| LCP | **< 2.5 seconds** — 3D must not block first contentful paint |

Document LOD, instancing, lazy Canvas mount, and mobile fallback in every review.

Full optimization patterns: [reference.md](reference.md)

---

## 3D Review Checklist (Before Implementation)

- [ ] **Narrative Value** — every object maps to story beat; no decoration-only geometry
- [ ] **Spatial Logic** — depth hierarchy L1/L2/L3 defined; composition readable in 5 seconds
- [ ] **Performance** — FPS targets, LCP plan, mobile degradation documented
- [ ] **Accessibility** — reduced-motion 3D fallback, keyboard focus path, no seizure-inducing motion
- [ ] **User Focus** — one focal object per beat; camera guides attention

Full rubric: [reference.md](reference.md)

---

## 3D Experience Score

| Score | Band | Verdict |
|-------|------|---------|
| 85–100 | Spatial narrative | **PASS** — proceed to UX Architecture |
| 70–84 | Weak spatial logic | **REVISE** — strengthen purpose and hierarchy |
| 50–69 | Decorative | **BLOCK** |
| 0–49 | Noise / forbidden patterns | **BLOCK** — return to Creative Director |

**Minimum to pass: 85.** Score **<85** → **BLOCK IMPLEMENTATION**.

---

## Output Requirements (Every Review)

Every review **must** provide:

1. **Scene purpose & narrative** — per scene: purpose, message, user action, story outcome
2. **Spatial hierarchy map** — L1 / L2 / L3 object assignment
3. **Camera flow description** — dolly, orbit, scroll-driven, focus pull per chapter
4. **Performance plan** — FPS targets, LCP strategy, mobile fallback
5. **3D Experience Score** — weighted score with dimension breakdown
6. **Verdict** — PASS / REVISE / BLOCK / N/A

**Implementation cannot proceed without PASS approval.**

---

## DO

- Load **teknovo-motion-designer** motion review before scoring 3D
- Coordinate camera flow with motion scroll narrative from motion review
- Score using weighted rubric in [reference.md](reference.md)
- Document verdict in `docs/plans/YYYY-MM-DD-<feature>-3d-review.md`
- Specify mobile static fallback and `prefers-reduced-motion` 3D alternative
- Distinguish public immersive (strict) vs ERP admin (no decorative 3D)
- Align R3F patterns with **teknovo-design-system** approved stack
- Cross-check narrative with **teknovo-creative-director** opening scene requirements

## DON'T

- Approve floating spheres, particle fields, or random backgrounds
- Allow 3D without documented purpose, message, user action, story outcome
- Skip performance or accessibility plans
- Approve decorative 3D on ERP admin surfaces
- Write implementation code — review and verdict only
- Pass with score below 85
- Bypass **teknovo-motion-designer** on public-facing interfaces

---

## Gate Verdict

| Verdict | Meaning | Next step |
|---------|---------|-----------|
| **PASS** | 3D Experience Score ≥85; checklist satisfied | **teknovo-ux-architecture** → **teknovo-design-system** → **teknovo-ui-ux** |
| **REVISE** | Score 70–84 or checklist gaps | Re-run after spatial plan update |
| **BLOCK** | Score <85 or auto-reject triggered | Return to **teknovo-creative-director** or **teknovo-motion-designer** |
| **N/A** | ERP-only surface with no 3D scope | Document reason; proceed to UX Architecture |

---

## Deliverable

3D Experience Review — `docs/plans/YYYY-MM-DD-<feature>-3d-review.md`

```markdown
# 3D Experience Review — <feature>

## Verdict
PASS | REVISE | BLOCK | N/A

## 3D Experience Score
**Score**: <0–100> (Pass threshold: 85)

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Narrative Value | 30% | | |
| Spatial Logic | 25% | | |
| Camera Flow | 15% | | |
| Performance | 15% | | |
| Accessibility | 10% | | |
| User Focus | 5% | | |

## Scene Purpose & Narrative
[Per scene: Purpose, Message, User Action, Story Outcome]

## Spatial Hierarchy Map
- L1 Primary: ...
- L2 Supporting: ...
- L3 Environmental: ...

## Camera Flow
[Per chapter: pattern, triggers, handoffs with motion review]

## Performance Plan
[Desktop 60fps, mobile 45fps, LCP <2.5s, LOD, lazy mount, fallback]

## Accessibility
[prefers-reduced-motion 3D fallback, keyboard path, motion limits]

## Block Triggers (if any)
- [ ] Floating random spheres
- [ ] Decorative particles
- [ ] Random 3D background
- [ ] Futuristic nonsense
- [ ] Decorative model without meaning
- [ ] ERP decorative 3D

## Required Revisions (if REVISE/BLOCK)
1. ...
```

**BLOCK or unresolved REVISE blocks all UI implementation.**

---

## Workflow Integration

Orchestrator position ( **teknovo-auto-orchestrator** ):

```text
Brand DNA
  → Creative Director
  → Product Designer
  → Motion Design Review          ← teknovo-motion-designer
  → 3D Experience Review          ← this skill
  → UX Architecture
  → Design System
  → UI UX Review
  → Implementation
  → AI-ish Review (Visual Originality ≥85)
  → Testing
```

| Phase | Skill | Blocks if skipped |
|-------|-------|-------------------|
| Motion Design Review | **teknovo-motion-designer** — PASS (≥80) | 3D review, implementation |
| 3D Experience Review | **teknovo-3d-experience-architect** — PASS (≥85) | Implementation |
| Post-build | **teknovo-ai-ish-review** — 3D/spatial dimension in Visual Originality | Ship claim |

Load bundle: `python .cursor/runtime/load-skills.py --bundle pre-ui`

---

## Skill Transitions

| After | Invoke |
|-------|--------|
| PASS (public) | **teknovo-ux-architecture** → design-system → UI UX → implementation |
| PASS (ERP N/A) | **teknovo-ux-architecture** → UI UX → implementation |
| REVISE | Re-run after spatial plan update |
| BLOCK | **teknovo-creative-director** or **teknovo-motion-designer** |
| Post-build | **teknovo-ai-ish-review** (spatial originality dimension) |

---

## Cross-References

| Skill / Artifact | Relationship |
|------------------|--------------|
| **teknovo-motion-designer** | Upstream — motion narrative and scroll triggers inform camera flow |
| **teknovo-creative-director** | Narrative beats, opening scene, 3D object mapping |
| **teknovo-design-system** | R3F stack, tokens, surface split |
| **teknovo-auto-orchestrator** | Chain position, gate enforcement |
| **teknovo-ai-ish-review** | Post-build Visual Originality (spatial / 3D dimension) |
| **teknovo-ux-architecture** | Downstream — scroll IA aligned to spatial plan |
| **teknovo-landing-page** | Public chapter 3D implementation |
| **teknovo-ui-ux** | ERP — no decorative 3D |
| [reference.md](reference.md) | Scene patterns, camera flows, R3F patterns, rubric, anti-patterns |
