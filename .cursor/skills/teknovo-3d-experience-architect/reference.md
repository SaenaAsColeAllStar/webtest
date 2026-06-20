# Teknovo 3D Experience Architect — Reference

Expanded spatial design standards, scoring rubric, R3F patterns, and review templates. Agent quick-reference: [SKILL.md](SKILL.md).

---

## Scene Composition Patterns

### Hero narrative scene

**Use**: Opening chapter — answers "why build future here?"

| Element | Assignment |
|---------|------------|
| L1 | Primary story object (e.g. lathe, robot arm, ecosystem hub) |
| L2 | Career/industry context labels or orbit nodes |
| L3 | Ground plane, soft fog — minimal |

**Camera**: Slow dolly-in on load; scroll begins orbit or focus shift to chapter 2 handoff.

**Anti-pattern**: Full-screen particle field behind headline — REJECT.

---

### Journey path

**Use**: Student journey, career progression, learning flow chapters.

| Element | Assignment |
|---------|------------|
| L1 | Path node or avatar at current beat |
| L2 | Upcoming milestones along spline/rail |
| L3 | Environment strip — school, workshop, industry |

**Camera**: Scroll-driven progress along path (GSAP ScrollTrigger + R3F state); node highlights on scrub.

**Anti-pattern**: Random floating icons along unrelated curve — REJECT.

---

### Ecosystem orbit

**Use**: School ecosystem visualization — departments, partners, industry links.

| Element | Assignment |
|---------|------------|
| L1 | Central hub (school / Teknovo core) |
| L2 | Orbiting satellites (programs, industries) |
| L3 | Connection arcs, subtle grid |

**Camera**: Constrained orbit around hub; hover/select focuses satellite.

**Anti-pattern**: Decorative sphere cluster with no labeled nodes — REJECT.

---

### Simulation viewport

**Use**: Industry simulation, mechanical demonstrations, technology visualization.

| Element | Assignment |
|---------|------------|
| L1 | Simulated mechanism or process object |
| L2 | Control labels, step indicators |
| L3 | Workshop environment frame |

**Camera**: Fixed viewport with optional constrained orbit; scroll drives simulation steps.

**Anti-pattern**: Generic "holographic" UI chrome without simulation state — REJECT.

---

## Camera Flow Patterns

| Pattern | Behavior | Best for | Sync with motion |
|---------|----------|----------|------------------|
| **Dolly** | Camera moves toward/away from L1 object | Hero reveal, emphasis beat | Page load + first scroll segment |
| **Orbit constrained** | Limited azimuth/elevation around focal object | Ecosystem, product showcase | Hover or slow auto-orbit ≤15°/s |
| **Scroll-driven camera** | Camera pose keyed to scroll progress 0→1 | Journey path, chapter transitions | **teknovo-motion-designer** scroll narrative |
| **Focus pull** | Depth of field or zoom isolates L1 | Beat change, detail reveal | Section transition motion |

**Rules**:

- One dominant camera pattern per chapter
- Camera never moves without narrative reason
- Handoff to next chapter documented (position, target, easing)
- Mobile: reduce orbit range; prefer dolly + static frames

---

## R3F + Drei Component Patterns

### Lazy Canvas mount

```tsx
// Mount Canvas after LCP-critical DOM paints
const Scene = dynamic(() => import('./HeroScene'), { ssr: false });
```

### Scene shell

```tsx
<Canvas
  dpr={[1, 1.5]}
  camera={{ position: [0, 2, 8], fov: 45 }}
  gl={{ antialias: true, powerPreference: 'high-performance' }}
>
  <Suspense fallback={null}>
    <Environment preset="warehouse" />
    <HeroObject />
  </Suspense>
</Canvas>
```

### Approved Drei helpers

| Helper | Use |
|--------|-----|
| `useGLTF` + `draco()` | Compressed models |
| `ScrollControls` / `useScroll` | Scroll-driven scenes |
| `OrbitControls` | Constrained exploration — `maxPolarAngle`, `enableZoom` limited |
| `Html` | Labels for L2 context — keep DOM for accessibility |
| `Instances` / `Merged` | Repeated geometry (trees, desks, nodes) |
| `Detailed` / `Lod` | Distance-based mesh swap |

### GSAP + R3F integration

- Drive camera `position` and `lookAt` via GSAP timeline scrubbed to ScrollTrigger
- Store mutable refs for Three.js objects; avoid React state per frame
- Pause/resume animation on `prefers-reduced-motion`

---

## Three.js Performance Optimization

| Technique | When | Target |
|-----------|------|--------|
| **LOD** | Complex L1 models | 3 levels; swap at distance thresholds |
| **Instancing** | Repeated L2/L3 objects | `InstancedMesh` for >10 copies |
| **Draco compression** | GLTF assets | <500KB per hero model where possible |
| **Texture budgets** | All materials | Max 2K desktop / 1K mobile per material set |
| **Lazy load** | Below-fold scenes | IntersectionObserver before Canvas mount |
| **Frame budget** | All scenes | ≤16.6ms desktop; ≤22ms mobile |
| **Shadows** | Sparingly | One key light shadow max on public pages |

### LCP strategy

1. Hero DOM (headline, CTA) paints first — no blocking Canvas
2. Defer R3F bundle via dynamic import
3. Placeholder gradient or L1 silhouette image until scene ready
4. Target LCP element: text or static poster — not WebGL canvas

---

## Mobile Degradation Strategy

| Tier | Condition | Behavior |
|------|-----------|----------|
| **Full** | Desktop, capable GPU | Full scene, scroll camera, particles ≤50 |
| **Reduced** | Mobile mid-tier | Simplified meshes, no shadows, particles off |
| **Static** | Low power / slow network | Poster image + CSS parallax; no Canvas |
| **Reduced motion** | `prefers-reduced-motion` | Static composed frame per chapter |

Document tier triggers in performance plan (viewport width, `navigator.hardwareConcurrency`, optional FPS probe).

---

## Accessibility

### Reduced motion 3D fallbacks

- Replace scroll-driven camera with static chapter frames
- Disable auto-orbit and particle systems
- Preserve narrative via DOM copy and illustrated stills

### Keyboard focus

- All interactive 3D hotspots have DOM equivalents (`Html` or parallel list)
- Tab order: skip decorative Canvas; focus actionable controls
- `aria-hidden="true"` on purely decorative WebGL when DOM alternative exists

### Motion safety

- No flashing >3Hz
- No rapid camera shake
- Limit FOV changes that could induce discomfort
- Provide pause control for auto-playing camera paths

---

## Scoring Rubric — 3D Experience Score (0–100)

**Pass threshold: 85.** Auto-reject patterns cap score at **84**.

| Dimension | Weight | 9–10 | 7–8 | 5–6 | 0–4 |
|-----------|--------|------|-----|-----|-----|
| **Narrative Value** | 30% | Every object maps to story beat | Most objects purposeful | Some decoration | "Looks cool" dominant |
| **Spatial Logic** | 25% | Clear L1/L2/L3; readable in 5s | Minor hierarchy blur | Competing focal points | Flat or chaotic depth |
| **Camera Flow** | 15% | Camera guides story; synced with motion | Good flow, minor handoff gaps | Camera moves without reason | Disorienting or static when motion required |
| **Performance** | 15% | 60/45fps plan, LCP <2.5s, mobile tiers | Minor gaps in plan | Heavy assets unaddressed | No plan; blocks LCP |
| **Accessibility** | 10% | Full fallback + keyboard path | Fallback specified | Partial | None |
| **User Focus** | 5% | One L1 per beat; guided attention | Mostly focused | Split attention | Noise competes with story |

**Calculation**: `Σ (dimension_score × weight × 10)` rounded to integer. Dimension scores are 0–10.

| Band | Score | Verdict |
|------|-------|---------|
| Spatial narrative | 85–100 | PASS |
| Weak spatial logic | 70–84 | REVISE |
| Decorative | 50–69 | BLOCK |
| Noise / forbidden | 0–49 | BLOCK |

---

## Example Review Template

```markdown
# 3D Experience Review — SMK Teknovo Landing

## Verdict
PASS

## 3D Experience Score
**Score**: 88 (Pass threshold: 85)

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Narrative Value | 30% | 9 | Lathe = engineering craft; orbit nodes = industries |
| Spatial Logic | 25% | 9 | Clear L1 lathe, L2 industry labels, L3 ground only |
| Camera Flow | 15% | 8 | Scroll dolly Ch1→Ch2; handoff documented |
| Performance | 15% | 8 | Draco model 420KB; lazy Canvas; mobile static poster |
| Accessibility | 10% | 9 | Reduced motion: poster sequence; keyboard industry list |
| User Focus | 5% | 9 | Single L1 per viewport beat |

## Scene Purpose & Narrative

### Scene 1 — Hero (Engineering Craft)
- **Purpose**: Establish hands-on engineering identity
- **Message**: Students build real skills on real machines
- **User Action**: Scroll to begin transformation
- **Story Outcome**: User understands workshop-first culture

### Scene 2 — Career Orbit
- **Purpose**: Map industries to school programs
- **Message**: Clear paths from school to workforce
- **User Action**: Hover/select orbit nodes
- **Story Outcome**: User sees career destinations

## Spatial Hierarchy Map
- L1: CNC lathe assembly (Ch1), career hub sphere (Ch2)
- L2: Industry label cards, program connectors
- L3: Concrete floor plane, ambient fog (opacity 0.15)

## Camera Flow
- Ch1: Dolly-in 8→5 units on load (900ms, sync motion review)
- Ch1→Ch2: Scroll-driven dolly + slight orbit (ScrollTrigger 0→1)
- Mobile: Static poster Ch1; simplified orbit Ch2 without scroll camera

## Performance Plan
- Desktop: 60fps target; LOD on lathe at 12 units
- Mobile: 45fps; static fallback <768px optional via network hint
- LCP: Headline + poster image; Canvas after `requestIdleCallback`

## Accessibility
- prefers-reduced-motion: CSS poster sequence, no Canvas
- Industry nodes duplicated in DOM list below scene

## Block Triggers
- [ ] None
```

---

## Anti-Patterns Catalog

| Anti-pattern | Example | Verdict | Fix |
|--------------|---------|---------|-----|
| Floating random spheres | 20 untextured spheres in hero | BLOCK | Replace with L1 story object |
| Decorative particles | Star field behind text | BLOCK | Remove or tie to data (e.g. network graph) |
| Random 3D background | Abstract blob mesh | BLOCK | L3 environment with narrative tie only |
| Futuristic nonsense | Holographic rings, cyber grids | BLOCK | Industry-specific recognizable objects |
| Decorative model without meaning | Generic robot / rocket | BLOCK | Map to school program or local industry |
| ERP decorative 3D | Canvas in finance dashboard | BLOCK | Remove Canvas; use charts |
| Camera without purpose | Continuous orbit on static copy | REVISE/BLOCK | Tie camera to scroll beats |
| LCP blocked by Canvas | Full-viewport WebGL on first paint | BLOCK | Lazy mount + poster |
| No mobile plan | Same mesh on all devices | REVISE | Document degradation tiers |
| Competing L1 objects | Two hero meshes same prominence | REVISE | Assign single L1 per beat |

---

## Orchestrator Integration

**Chain position** ( **teknovo-auto-orchestrator** ):

```text
Product Designer
  → Motion Design Review     ← teknovo-motion-designer
  → 3D Experience Review     ← teknovo-3d-experience-architect (this skill)
  → UX Architecture
  → Design System
  → UI UX Review
  → Implementation
```

| Config file | Reference |
|-------------|-----------|
| `chain-map.yaml` | `three-d-experience-review` step |
| `execution-policy.yaml` | `three_d_experience_review` gate |
| Artifact | `docs/plans/*-3d-review.md` |
| Pass criteria | Verdict PASS + 3D Experience Score ≥85 |

**Hard rule**: No public-facing implementation may bypass **teknovo-motion-designer** or **teknovo-3d-experience-architect**.

ERP-only intents: PASS with **N/A** when no 3D scope — document in 3d-review artifact.

---

## Related Skills

- [SKILL.md](SKILL.md) — agent gate instructions
- **teknovo-motion-designer** — upstream motion narrative and scroll triggers
- **teknovo-creative-director** — narrative beats and opening scene
- **teknovo-design-system** — R3F stack and spatial tokens
- **teknovo-ux-architecture** — downstream scroll IA
- **teknovo-ai-ish-review** — post-build Visual Originality
- **teknovo-auto-orchestrator** — workflow enforcement
