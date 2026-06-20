# Motion Design Review — SMK Teknovo Portal

**Date:** 2026-06-20 (Phase 3 update)  
**Gate:** Motion Designer  
**Verdict:** PASS  
**Motion Quality Score:** 86 / 100

## Motion Systems Defined

### 1. Page Load Motion
- Stagger reveal: badge → headline → subcopy → CTA (GSAP timeline, 0.6s total)
- 3D scene fade-in with scale 0.95→1.0
- Loading bar dismiss with opacity fade

### 2. Scroll Motion
- Lenis smooth scroll (duration 1.2, lerp 0.1)
- GSAP ScrollTrigger scrub on 3D camera (Story 0–30%)
- Chapter enter: Motion.dev `whileInView` opacity + y translate
- Scroll progress bar (top, 2px electric accent)

### 3. Hover Motion
- Nav links: underline width 0→100%
- CTA buttons: subtle scale 1→1.02 + glow
- Industry objects: emissive intensity increase on scroll enter
- FAQ accordion icon rotate 180° on open

### 4. Section Transition Motion
- Story → Transformation: camera pull-back + clip-path wipe
- Transformation → Industry: 3D object stagger orbit enter (0.15s delay)
- Industry → Student Journey: timeline progress scrub + milestone reveal
- Student → Career: flowing river layout with scroll stagger
- Career → Proof: editorial timeline scrub reveal + trophy 3D float
- Proof → Action: radial glow scrub + immersive panel enter
- Action → FAQ: centered content fade, accordion purposeful height
- FAQ → Kontak: staggered contact cards + form slide-up
- Cross-chapter: shared dark canvas — no white flash

## Scroll Narrative Map (Phase 3 Complete)

| Scroll % | Chapter | Motion Beat |
|----------|---------|-------------|
| 0–12% | Story | Camera close on core node |
| 12–25% | Transformation | Split reveal wipe |
| 25–40% | Industry | TKJ/RPL/DKV objects stagger orbit |
| 40–55% | Student Journey | Timeline progress scrub |
| 55–68% | Career Journey | Career flow stagger |
| 68–78% | Proof | Achievement timeline scrub, trophy 3D |
| 78–86% | Action | Glow pulse, PPDB panel reveal |
| 86–93% | FAQ | Accordion expand/collapse |
| 93–100% | Kontak | Contact cards stagger, form focus |

## Phase 3 Chapter Motion Specs

### Proof (#proof)
- GSAP scrub: `.proof-entry` stagger fade-left on scroll
- Motion.dev: credential block delayed fade-in
- 3D: ProofScene3D trophy float + scroll-linked rotation

### Action (#action)
- Radial gradient glow scrub via GSAP (opacity + scale)
- Panel enter: Motion.dev y-translate 48px
- CTA subtle pulse glow (disabled under reduced-motion)

### FAQ (#faq)
- Single-open accordion: Motion.dev height auto + opacity
- Icon rotate transition on open state
- No carousel — purposeful expand communicates answer hierarchy

### Kontak (#kontak)
- Contact cards: stagger x-translate whileInView
- Form: y-translate enter, inline validation state transitions
- Success message focus for screen readers

## Reduced Motion Fallback

`prefers-reduced-motion: reduce` → disable Lenis, instant section visibility, static 3D frame, no scrub animations, no CTA pulse

## Scoring Rubric (Phase 3)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Purposeful motion | 9/10 | Conversion motion supports PPDB urgency |
| Scroll narrative | 9/10 | Full 9-chapter continuous scroll story |
| Continuity | 9/10 | Career→Proof→Action handoff smooth |
| Rhythm | 8/10 | FAQ/Kontak calmer pace after Action peak |
| Performance | 8/10 | DOM-first Action/FAQ/Kontak; Proof 3D minimal |
| Transitions | 9/10 | No jarring layout shifts between chapters |

**Weighted Score: 86** — PASS (≥80)
