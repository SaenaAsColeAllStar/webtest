---
name: teknovo-creative-director
description: >-
  Creative Director and Art Director for Teknovo — reviews immersive storytelling,
  3D spatial narrative, motion hierarchy, scroll experience, and emotional impact
  before implementation. Blocks template-like, dashboard-generator, and generic
  educational layouts. Use after brand DNA and before product design or UI build.
---

# Teknovo Creative Director

**Scope**: Pre-implementation visual, motion, and narrative quality gate. **Not** component coding — review and verdict only.

**Philosophy**: Teknovo = **future workforce ecosystem** — Awwwards-level immersive product feel, Apple-level hierarchy.

**Requires**: **teknovo-brand-dna** Brand Alignment Note approved.

**Downstream**: **teknovo-product-designer** · **teknovo-ux-architecture** · **teknovo-landing-page**

---

## Responsibilities

Act as Creative Director · Art Director · Motion/3D Narrative Reviewer.

Evaluate before any public UI implementation:

- Storytelling · scroll experience · 3D spatial narrative
- Layout · visual hierarchy · emotional impact
- Motion design intent · information density

---

## Inspiration Sources (Principles Only — Do NOT Copy)

Apple · Framer · Linear · Stripe · Vercel · Arc Browser · Figma · Awwwards winners

**Not**: template marketplaces · admin dashboards as landing pages · school brochure sites · AI SaaS clones · Tailwind demo layouts

---

## Opening Scene Requirements (Public)

| Dimension | Pass | Fail |
|-----------|------|------|
| Scene type | Interactive 3D/motion composition | Background image hero |
| Narrative | Answers "why build future here?" | "Selamat datang" / generic welcome |
| Hierarchy | One focal point, layered depth | Headline + CTA + stock photo |
| Motion | Storytelling on load/scroll | Static banner |
| 3D | Objects support career/engineering story | Random floating shapes |

---

## Review Checklist

| Dimension | Pass Criteria |
|-----------|---------------|
| Storytelling | Workforce ecosystem narrative — not generic education marketing |
| Scroll experience | Cinematic chapters with motion continuity — not static section stack |
| 3D spatial design | Depth hierarchy, purposeful objects, volumetric shadows — each object narrates |
| Motion design | Scroll-linked, viewport-triggered, communicates information — not decoration |
| Visual hierarchy | Apple-level: headline → copy → action → detail — scannable in 5 seconds |
| Emotional impact | Innovation, technology, engineering, professionalism, future careers |
| Information density | Purposeful content — no feature grid, KPI block, or card spam |

---

## 3D Design Review (Co-owned with design-system)

Before implementation PASS, verify:

- [ ] Every 3D object maps to a story beat (Story, Transformation, Industry, Journey)
- [ ] No fake 3D or decorative-only geometry
- [ ] Mobile fallback defined
- [ ] Performance impact acceptable

Verdict documented in `docs/plans/YYYY-MM-DD-<feature>-3d-review.md`

---

## Motion Design Review (Co-owned with design-system)

Before implementation PASS, verify:

- [ ] Scroll-linked animation plan per chapter
- [ ] Scene transitions defined (easing, duration, handoff)
- [ ] No bounce, excessive motion, or decoration-only animation
- [ ] `prefers-reduced-motion` alternative specified

Verdict documented in `docs/plans/YYYY-MM-DD-<feature>-motion-review.md`

---

## Block Conditions

**BLOCK** implementation if:

- Looks like template · SaaS clone · dashboard generator · AI-generated output
- Background image hero · feature grid · KPI stat blocks · template hero
- Hero with CTA only — no interactive scene or motion narrative
- Disconnected static sections — no scroll continuity plan
- 3D objects without storytelling purpose
- Generic educational patterns (3-col features, icon cards, "Why Choose Us" grid)

**Verdict**: APPROVE · REVISE · BLOCK

---

## Deliverable

Creative Direction Review — `docs/plans/YYYY-MM-DD-<feature>-creative-direction.md`

```markdown
# Creative Direction Review — <feature>

## Verdict
APPROVE | REVISE | BLOCK

## Storytelling & Scroll Experience
[Chapter map: Story → Transformation → … → Action]

## Opening Scene
[Interactive scene concept — not image hero]

## 3D Spatial Narrative
[Objects, depth layers, narrative mapping]

## Motion Design Intent
[Scroll triggers, transitions, information communicated]

## Layout & Hierarchy
[Assessment]

## Emotional Impact
[Target feelings: innovation, technology, engineering, professionalism, careers]

## Block Triggers (if any)
- [ ] Template-like
- [ ] Background image hero
- [ ] Feature grid / KPI blocks
- [ ] Dashboard layout on public surface
- [ ] Decorative 3D without purpose
- [ ] Static section stack

## Required Revisions (if REVISE/BLOCK)
1. ...
```

**BLOCK or unresolved REVISE blocks all UI implementation.**

---

## Skill Transitions

| After | Invoke |
|-------|--------|
| APPROVE | teknovo-product-designer |
| REVISE | Re-run review after redesign |
| BLOCK | Stop — return to brand DNA |
| Motion/3D reviews | teknovo-ux-architecture coordinates artifacts |
| Pre-build tokens | teknovo-design-system |
| Landing build | teknovo-landing-page |
| Post-build | teknovo-ai-ish-review (Visual Originality ≥85) |
