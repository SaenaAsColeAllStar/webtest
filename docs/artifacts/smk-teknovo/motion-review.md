# Motion Design Review — SMK Teknovo Portal

**Date:** 2026-06-20 (Phase 2 update)  
**Gate:** Motion Designer  
**Verdict:** PASS  
**Motion Quality Score:** 84 / 100

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
- Industry program lanes: border glow on hover

### 4. Section Transition Motion
- Story → Transformation: camera pull-back + clip-path wipe
- Transformation → Industry: 3D object stagger orbit enter (0.15s delay)
- Industry → Student Journey: timeline progress scrub + milestone reveal
- Student → Career: flowing river layout with scroll stagger
- Cross-chapter: shared dark canvas — no white flash

## Scroll Narrative Map (Phase 2 Complete)

| Scroll % | Chapter | Motion Beat |
|----------|---------|-------------|
| 0–15% | Story | Camera close on core node |
| 15–30% | Story | Network connections animate |
| 30–45% | Transformation | Split reveal wipe |
| 45–60% | Industry | TKJ/RPL/DKV objects stagger orbit |
| 60–80% | Student Journey | Timeline progress scrub, milestone light-up |
| 80–100% | Career Journey | Career flow stagger, data narrative reveal |

## Phase 2 Chapter Motion Specs

### Industry (#industry)
- ScrollTrigger scrub: program lanes fade-up stagger (0.15s)
- 3D objects: server rack → code brackets → pen tool sequential opacity
- Transition from Transformation: shared canvas continuity, no flash

### Student Journey (#student-journey)
- Vertical timeline progress bar: scaleY 0→1 scrubbed
- Milestone items: alternating x-offset reveal on scroll
- 3D path curve: milestone spheres light up progressively

### Career Journey (#career-journey)
- River layout: left-border flow with node dots (NOT KPI grid)
- Career paths: stagger opacity + x translate on scroll
- Narrative block: delayed fade-in for alumni story

## Reduced Motion Fallback

`prefers-reduced-motion: reduce` → disable Lenis, instant section visibility, static 3D frame, no scrub animations

## Scoring Rubric (Phase 2)

| Dimension | Score | Notes |
|-----------|-------|-------|
| Purposeful motion | 9/10 | All motion explains hierarchy and journey |
| Scroll narrative | 9/10 | 5-chapter continuous scroll story |
| Continuity | 8/10 | Shared canvas, section-aware 3D visibility |
| Rhythm | 8/10 | Stagger timing consistent across chapters |
| Performance | 8/10 | RAF-based, section-scoped 3D activation |
| Transitions | 9/10 | Industry→Journey→Career handoffs smooth |

**Weighted Score: 84** — PASS (≥80)
