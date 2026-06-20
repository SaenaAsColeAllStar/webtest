# Teknovo Motion Designer — Reference

Expanded motion design standards, scoring rubric, and review templates. Agent quick-reference: [SKILL.md](SKILL.md).

---

## Motion Hierarchy Principles

Three layers — every animation must be assigned to exactly one layer per beat.

| Layer | Role | Examples | Timing |
|-------|------|----------|--------|
| **Primary** | Carries the narrative beat — one per viewport moment | Hero object entrance, chapter title reveal, key stat disclosure | First in sequence; longest duration (400–800ms) |
| **Secondary** | Supports primary — context, depth, related elements | Supporting copy fade, ambient depth shift, icon accent | Stagger 50–120ms after primary (200–500ms) |
| **Ambient** | Atmosphere without competing for focus | Subtle parallax on background layer, soft glow pulse, grain drift | Continuous or looped; opacity ≤40%; never blocks reading |

**Rules**:

- Never run two **primary** motions in the same viewport beat
- Secondary stagger uses consistent rhythm (e.g. 80ms) across the page
- Ambient motion pauses or simplifies under `prefers-reduced-motion`

---

## Scroll Narrative Patterns

### Chapter progression

Map scroll to story beats from **teknovo-ux-architecture** chapter map:

```text
Chapter 1 (Opening) → Chapter 2 (Transformation) → … → Chapter N (Action)
```

Each chapter boundary requires a defined transition (see Transition Language Catalog).

### Pinned sections

Use when a beat needs extended scroll distance to complete a transformation:

- Pin duration proportional to content weight (typically 100–300vh)
- Progress drives animation 0→1 via scroll progress (not time)
- Release pin with intentional handoff to next chapter
- Mobile: reduce pin duration or replace with shorter progress reveal

### Progress-driven reveals

| Pattern | Use | Avoid |
|---------|-----|-------|
| Scrub-linked opacity/translate | Data reveal, timeline progression | Scrub without information change |
| Sticky header morph | Chapter title change | Sticky for decoration only |
| Horizontal scroll section | Portfolio, journey steps | Horizontal without narrative purpose |
| Scale-on-scroll focal object | Career path, engineering concept | Scale without story beat |

---

## Transition Language Catalog

Consistent spatial language builds immersion. Pick one dominant language per page; mix only when chapters demand contrast.

| Transition | Spatial metaphor | Best for | Duration | Easing |
|------------|------------------|----------|----------|--------|
| **Spatial slide** | Next chapter enters from narrative direction (up = future, left = progression) | Linear story flow | 500–700ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Depth push** | Current layer recedes (scale 1→0.95, blur +2px); next advances | Immersive 3D scenes | 600–900ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Crossfade with purpose** | Overlap during content semantic shift (old topic out, new in) | Topic pivot, tone change | 400–600ms | `ease-out` opacity; no simultaneous unrelated motion |
| **Morph** | Shared element persists and transforms (shape, position, scale) | Continuity object (logo, device, career icon) | 700–1000ms | Custom spring **without bounce** (damping ≥ 0.8) |

**Forbidden transitions**: random fade-only between every section; bounce overshoot; spin-in icons.

---

## Timing and Rhythm Guidelines

### Durations

| Context | Range | Notes |
|---------|-------|-------|
| Micro-feedback (hover, focus) | 150–250ms | ERP buttons, links |
| UI state change | 200–350ms | Expand/collapse, tab switch |
| Section entrance | 400–700ms | Viewport-triggered |
| Chapter transition | 500–900ms | Scroll-linked handoff |
| Page load sequence | 800–1500ms total | Staggered primary → secondary |

### Easing

| Type | Curve | Use |
|------|-------|-----|
| Enter | `cubic-bezier(0.22, 1, 0.36, 1)` | Elements arriving |
| Exit | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |
| Standard | `cubic-bezier(0.4, 0, 0.2, 1)` | ERP functional motion |

**Never use**: `bounce`, `elastic`, spring with visible overshoot on marketing surfaces.

### Stagger rhythm

- Consistent stagger interval per page: 60ms, 80ms, or 100ms — pick one
- Max stagger chain: 8 items; beyond that, group into waves

---

## Technology Selection Guide

| Need | Primary | Secondary | Notes |
|------|---------|-----------|-------|
| React UI motion, layout, gestures | **Motion.dev** | Framer Motion | Prefer Motion.dev for new Teknovo public surfaces |
| Complex scroll timeline, 3D camera | **GSAP + ScrollTrigger** | — | Pair with R3F scenes |
| React-only project already on Framer | Framer Motion | Motion.dev migration later | Document choice in review |
| Smooth scroll feel | **Lenis** | Native scroll | Optional; must not break accessibility scroll |
| ERP micro-interactions | CSS transitions / Motion.dev | — | No Lenis, no ScrollTrigger on data tables |

**Pairing rules**:

- Lenis + GSAP ScrollTrigger: sync scroll progress explicitly
- Motion.dev + R3F: share scroll progress via single source (context or ref)
- Do not load GSAP + Framer Motion for the same element animations

---

## Accessibility

### prefers-reduced-motion

Every motion system must document a reduced variant:

| Full motion | Reduced fallback |
|-------------|------------------|
| Scroll-scrubbed reveal | Instant show at threshold or static layout |
| Parallax layers | Flat layout, no transform |
| Pinned scroll section | Normal scroll, content visible immediately |
| Looping ambient | Static or single frame |
| Page load stagger | Instant render or opacity-only once |

Implementation pattern:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Plus JS guard: skip ScrollTrigger/Lenis init when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

### WCAG motion guidelines

- No flashing > 3 times per second
- No motion that covers essential content without user control
- Pause/stop for auto-updating motion > 5 seconds where applicable
- Focus order unchanged by motion layout shifts

---

## Performance

| Technique | Guidance |
|-----------|----------|
| **60fps target** | Animate `transform` and `opacity` only where possible |
| **will-change** | Apply sparingly on active animating elements; remove after |
| **GPU layers** | `transform: translateZ(0)` or `will-change: transform` — avoid over-promotion |
| **Lazy animation init** | Defer ScrollTrigger/Lenis setup below fold or after idle |
| **Bundle budget** | Lazy-load GSAP plugins; code-split Motion.dev per route |
| **Mobile** | Reduce pin duration, particle count, parallax depth |

Review must note performance risk for scroll-jacking, multiple simultaneous timelines, or 3D + scroll coupling.

---

## Motion Quality Score — Weighted Rubric

Score each dimension 0–10. Weighted sum = Motion Quality Score (0–100).

| Dimension | Weight | 10 = | 0 = |
|-----------|--------|------|-----|
| **Motion Purpose** | 25% | Every animation maps to explain/guide/reveal/focus/immerse | Decoration-only or no purpose stated |
| **Motion Hierarchy** | 20% | Clear primary/secondary/ambient per beat | Everything same weight or random fade-in |
| **Scroll Narrative** | 20% | Chapter-linked scroll with defined handoffs | Static stack or disconnected sections |
| **Transition Language** | 15% | Consistent spatial language catalog | Random fades between all sections |
| **Accessibility** | 10% | Full reduced-motion plan per system | No fallback documented |
| **Performance** | 10% | 60fps strategy, lazy init, GPU plan | Scroll-jank risk ignored |

**Calculation**: `Score = Σ (dimension_score / 10 × weight × 100)`

**Pass threshold: 80.**

**Quick block**: ≥3 dimensions scored ≤4 → automatic score ≤59.

**Auto-reject** (caps at 79): bounce, infinite spin, random fade-in everywhere, parallax overuse, motion without information value — see [SKILL.md](SKILL.md).

---

## Example Review Output

```markdown
# Motion Design Review — SMK Teknovo Landing

## Verdict
PASS

## Motion Quality Score
**Score**: 86 (Pass threshold: 80)

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Motion Purpose | 25% | 9 | Each chapter reveals workforce beat |
| Motion Hierarchy | 20% | 8 | Primary hero lathe object; secondary copy stagger |
| Scroll Narrative | 20% | 9 | 5 chapters with pinned transformation scene |
| Transition Language | 15% | 8 | Depth push between chapters 2–3 |
| Accessibility | 10% | 8 | Reduced motion: static chapters, no pin |
| Performance | 10% | 7 | Lazy ScrollTrigger; mobile shorter pin |

## Motion Narrative
- Ch1: Lathe assembly explains engineering craft (primary)
- Ch2: Object morphs to career paths (morph transition)
- Ch3: Industry cards reveal on scrub (progress-driven)
- Ch4: Student journey horizontal scroll (pinned)
- Ch5: CTA scale-in on enter (primary)

## Scroll Narrative
- Lenis smooth scroll; GSAP ScrollTrigger progress 0–1 per chapter
- Pin: Chapter 2 transformation (200vh desktop, 120vh mobile)

## Transition Strategy
- Ch1→Ch2: depth push (700ms, cubic-bezier(0.16, 1, 0.3, 1))
- Ch2→Ch3: spatial slide up
- Ch3→Ch4: crossfade with shared icon morph
- Ch4→Ch5: spatial slide left (progression metaphor)

## Required Motion Systems
- [x] Page Load Motion — staggered hero layers 900ms total
- [x] Scroll Motion — chapter scrub + pin
- [x] Hover Motion — card depth lift 200ms
- [x] Section Transition Motion — catalog above

## Accessibility
- prefers-reduced-motion: instant chapter layout, no pin, no parallax

## Performance Notes
- ScrollTrigger lazy init after hero paint
- will-change on pinned object only during active pin
```

---

## Anti-Patterns with Examples

| Anti-pattern | Example | Fix |
|--------------|---------|-----|
| Random fade-in everywhere | Every section `opacity 0→1` on scroll with no stagger hierarchy | Assign primary/secondary; vary entrance axis |
| Bounce animations | `ease: bounceOut` on CTA | Use enter easing without overshoot |
| Infinite spinning | Decorative gear icons rotating continuously | Static icon or single 360° on hover only |
| Parallax overuse | 5 layers moving at different speeds on text-heavy section | Max 2 depth layers; text on stable plane |
| Motion without value | Animated gradient background with no narrative tie | Tie motion to chapter beat or remove |
| Static public hero | Image + headline, no load or scroll motion | Page load sequence + scroll-linked reveal |
| ERP scroll-jacking | Pinning on finance data table | Functional row highlight only |
| Competing primaries | Hero title and hero image both scale-in 800ms simultaneously | Sequence: image primary, title secondary +80ms |

---

## Orchestrator Integration

**Chain position** ( **teknovo-auto-orchestrator** ):

```text
Product Designer
  → Motion Design Review     ← teknovo-motion-designer (this skill)
  → 3D Experience Review     ← teknovo-3d-experience-architect
  → UX Architecture
  → UI UX Review
  → Implementation
```

| Config file | Reference |
|-------------|-----------|
| `chain-map.yaml` | `motion-design-review` step |
| `execution-policy.yaml` | `motion_design_review` gate |
| Artifact | `docs/plans/*-motion-review.md` |
| Pass criteria | Verdict PASS + Motion Quality Score ≥80 |

ERP-only intents: PASS with **N/A** when no immersive surface — document in motion review artifact.

---

## Related Skills

- [SKILL.md](SKILL.md) — agent gate instructions
- **teknovo-design-system** — tokens and approved motion stack
- **teknovo-creative-director** — narrative and scroll experience
- **teknovo-ux-architecture** — upstream chapter map
- **teknovo-ai-ish-review** — post-build Visual Originality (motion = 15%)
- **teknovo-auto-orchestrator** — workflow enforcement
