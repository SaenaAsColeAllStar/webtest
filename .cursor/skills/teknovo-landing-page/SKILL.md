---
name: teknovo-landing-page
description: >-
  Design, implement, and review Teknovo public immersive surfaces — cinematic
  scroll narrative, 3D hero scenes, motion storytelling, PPDB conversion funnel,
  performance budgets, SEO, and mobile experience. Use for marketing sites,
  workforce ecosystem portals, PPDB season pages, or public conversion surfaces.
---

# Teknovo Landing Page

**Scope**: Public immersive marketing surfaces — **not** authenticated ERP dashboards.

**Philosophy**: Teknovo = **future workforce ecosystem**. Visitors should feel: Innovation · Technology · Engineering · Professionalism · Future Careers.

**Not**: school brochure site · gov portal · WordPress theme · LMS landing · admin dashboard with marketing skin.

Strategic narrative → **teknovo-ux-architecture**. Tokens/motion/3D → **teknovo-design-system**. Visual gate → **teknovo-ai-ish-review** (Visual Originality ≥85).

Load **teknovo-brand-dna** and **teknovo-creative-director** before scene planning.

---

## Narrative Layer

Every landing page is a **story**, not a section list.

### Require

- Cinematic scroll experience · motion storytelling · school/workforce identity woven into chapters
- Human-centered copywriting tied to career outcomes
- Progressive discovery — user learns by scrolling, not scanning cards

### Forbidden wireframe

```text
Hero → Features → Testimonials → CTA   ❌ DEPRECATED
```

### Mandatory structure

```text
Story → Transformation → Industry Alignment → Student Journey → Career Journey → Proof → Action
```

Each beat is a **scroll chapter** with motion continuity — not a disconnected static block.

---

## Opening Scene (Replaces "Hero")

### Forbidden

- Background image hero · hero banner · hero with headline + CTA only
- 50/50 text/image split with stock photo
- "Selamat datang" / "Welcome to the Future of Education" generic headlines
- Lottie autoplay wallpaper

### Require

- **Interactive scene** — R3F/Three.js or motion-composed layered hierarchy
- **3D visual narrative** opening beat — answers "Why build your future here?"
- **Motion storytelling** — scroll or interaction reveals first story layer
- **Layered visual hierarchy** — Apple-level focal point, not competing elements

Document opening scene in Creative Direction Review before implementation.

---

## Chapter Sequence (Mandatory Order)

| # | Chapter | Purpose | Motion/3D |
|---|---------|---------|-------------|
| 0 | **Navbar** | Minimal wayfinding; Portal dropdown; PPDB path visible; mobile drawer | Subtle scroll shrink |
| 1 | **Story** | Future workforce ecosystem positioning — why Teknovo exists | Interactive 3D scene or layered motion composition |
| 2 | **Transformation** | From learner to industry-ready professional | Scroll-linked reveal, parallax depth |
| 3 | **Industry Alignment** | Partnerships, tools, engineering domains (TKJ, RPL, etc.) | 3D objects representing industries — each object narrates |
| 4 | **Student Journey** | Day-in-life, learning path, skills acquisition | Timeline motion, progressive disclosure |
| 5 | **Career Journey** | Outcomes, alumni paths, employability | Data motion (not KPI grid blocks) |
| 6 | **Proof** | Testimonials, achievements, accreditations — earned, not card-spam | Editorial layout, not 3-col testimonial grid |
| 7 | **Action** | PPDB / enrollment conversion | Single dominant CTA, urgency without banner cliché |
| 8 | **FAQ** | Accordion, purposeful answers | Viewport-triggered reveal |
| 9 | **Footer** | Contact, links, legal | Static anchor |

Optional inserts (creative-director approved only): News · Facilities — must integrate into scroll narrative, not break motion continuity.

---

## Scroll Experience

### Require

- Story chapters · progressive discovery · scene transitions · motion continuity
- Scroll progress indicator or chapter nav
- Parallax depth between layers (foreground/midground/background)
- Section transitions via Motion.dev or GSAP ScrollTrigger

### Avoid

- Disconnected static section stacking
- White ↔ gray alternation as sole visual rhythm
- Independent sections with no shared easing/timing language

---

## Typography & Tokens

See **teknovo-design-system** — public immersive palette, Geist display, volumetric depth.

---

## Technology Stack (Mandatory for Public)

| Layer | Library |
|-------|---------|
| 3D scenes | Three.js, React Three Fiber, @react-three/drei |
| UI motion | Motion.dev (motion/react) |
| Scroll narrative | GSAP + ScrollTrigger; Lenis optional |
| Base components | Custom scene components — not template hero blocks |
| Icons | Phosphor with tree-shaking |

---

## Buttons & Forms

- Primary actions: motion-enhanced hover states · one dominant CTA per chapter
- Form inputs: accessible labels · inline validation
- PPDB conversion: friction-minimized path from Action chapter

---

## Mobile UX

- Sticky bottom PPDB CTA when conversion season active (min 56px)
- Tap targets ≥44px
- 3D scenes degrade gracefully — simplified geometry or static narrative fallback
- `prefers-reduced-motion`: provide non-animated story path
- Story must remain coherent at 375px width

---

## Performance Budgets

| Metric | Target |
|--------|--------|
| Lighthouse | >90 mobile (3D surfaces); >95 static fallback path |
| LCP | <2.5s with 3D lazy-load strategy |
| CLS | <0.1 |
| INP | <200ms |

3D: lazy-load canvases · code-split R3F · Draco-compressed models · no blocking hero WebGL before first paint without skeleton.

---

## SEO & Analytics

Open Graph · JSON-LD · sitemap · robots.txt. Track: PPDB CTAs, Portal links, chapter scroll depth, program engagement.

---

## Accessibility (WCAG AA)

Contrast ≥4.5:1 · keyboard focus · `aria-label` on interactive 3D controls · reduced-motion path · no seizure-inducing motion.

---

## Strategic Review (Before Build)

Via **teknovo-ux-architecture** + orchestrator chain:

- [ ] Four goal artifacts per chapter (product-designer)
- [ ] Creative Direction APPROVE
- [ ] Motion Design Review PASS
- [ ] 3D Experience Review PASS (≥85)
- [ ] No forbidden hero/grid/KPI patterns
- [ ] Visual Originality Score ≥85 (**teknovo-ai-ish-review**)
- [ ] Real proof content — not placeholder stats

---

## Implementation Checklist

- [ ] Chapter sequence matches Story → … → Action structure
- [ ] Opening scene is interactive — not background image hero
- [ ] Motion continuity between chapters documented and implemented
- [ ] 3D objects mapped to story beats
- [ ] Mobile fallback + reduced-motion path
- [ ] Performance budgets met
- [ ] Phosphor icons only
- [ ] SEO meta + schema present
- [ ] Visual Originality ≥85

---

## References

- `docs/prd/ui-ux/landing-page-prd.md` (if exists)
- **teknovo-design-system** · **teknovo-creative-director** · **teknovo-auto-orchestrator**
- `.cursor/gates/taste/design-principles.md`
