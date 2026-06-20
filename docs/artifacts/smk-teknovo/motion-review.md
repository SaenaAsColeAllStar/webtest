# Motion Design Review — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-21  
**Gate:** Motion Designer  
**PRD Baseline:** V2.1  
**Verdict:** PASS  
**Motion Quality Score:** 91 / 100

## Design Order Gate (V2.1)

Motion work is **second** in the V2.1 design order:

**Story First → Motion Second → 3D Third → Technology Last**

Motion must not be designed in isolation from story, and 3D scene motion must not begin until this motion review passes. All chapter transitions below assume approved story and brand artifacts from Phase 3 tasks 3.1–3.4.

## Motion Narrative

Motion must make the chapter journey feel like a single cinematic argument:

1. the future begins here,
2. industry challenge is urgent,
3. Teknik Mesin is tangible and engineered,
4. ULW is human, polished, and professional,
5. industry alignment is connected,
6. students transform,
7. achievements are earned,
8. PPDB is the natural next step.

## Required Motion Systems

### 1. Page Load Motion

- Layered reveal of label, headline, supporting copy, and first action.
- Opening scene should enter with restraint, not spectacle.
- Initial motion must clarify hierarchy within the first seconds.
- Primary message **Belajar. Berkarya. Siap Industri.** must be readable before scroll.

### 2. Scroll Motion

- Scroll is the narrative driver for all eight chapters.
- Camera or layout progression should shift the visitor from worldview to evidence to action.
- Each chapter must feel like a handoff, not an isolated reveal.

### 3. Hover Motion

- Hover is for emphasis and focus only.
- CTA and navigation interactions should feel precise and premium.
- Program-linked moments may use subtle state-lift, but never playful bounce.

### 4. Section Transition Motion

- Every chapter boundary must have a defined transition language.
- Transitions should shift spatial meaning, not just opacity.
- Shared easing and timing must preserve continuity from chapter 1 through chapter 8.

## Scroll Narrative Map — PRD V2.1

| Chapter | Motion communicates | Transition intent |
|---------|---------------------|-------------------|
| 1. Future Starts Here | A future is opening in front of the visitor | Controlled reveal into a strong focal opening |
| 2. Industry Challenge | Demand and urgency are rising | Tightening pace and evidence-driven motion |
| 3. Teknik Mesin | Precision, fabrication, disciplined craft | Heavier, more mechanical movement language |
| 4. Usaha Layanan Wisata | Human-facing excellence and service flow | Softer but still professional movement language |
| 5. Industry Alignment | Everything is connected | Networked motion and relational choreography |
| 6. Student Transformation | Growth and readiness | Sequential progression with confidence-building rhythm |
| 7. Achievements | Proof is earned, not claimed | Editorial reveal with restrained emphasis |
| 8. PPDB | Action is clear and immediate | Focus compression toward one dominant next step |

## Transition Strategy

| Boundary | Transition strategy |
|----------|---------------------|
| 1 → 2 | From wonder to urgency; shift from aspirational reveal into evidence-led motion |
| 2 → 3 | Move from macro demand into hands-on industrial specificity |
| 3 → 4 | Contrast engineering precision with polished human-service professionalism |
| 4 → 5 | Expand from two flagship paths into a connected alignment view |
| 5 → 6 | Pull the visitor from system-level understanding back into personal transformation |
| 6 → 7 | Shift from emotional growth into credible proof |
| 7 → 8 | Reduce visual complexity so conversion feels focused and inevitable |

## 3D Motion Handoff (Motion before 3D)

Before 3D scene implementation in Phase 4:

| Chapter | Motion defines | 3D inherits |
|---------|----------------|-------------|
| Future Starts Here | Reveal pacing, focal pull-back | Camera entry timing only |
| Industry Challenge | Evidence rhythm, kinetic typography | Minimal or no WebGL |
| Teknik Mesin | Mechanical weight, deliberate cadence | CNC + gear spatial motion |
| Usaha Layanan Wisata | Service flow, corridor glide | Airport + hotel hallway choreography |
| Industry Alignment | Network expansion | Connector animation only |
| Student Transformation | Progression beats | Optional subtle depth |
| Achievements | Editorial reveal | DOM-first |
| PPDB | Focus compression | No WebGL |

## Reduced-Motion Strategy

`prefers-reduced-motion: reduce` must:

- disable scroll scrubbing and nonessential camera travel,
- preserve chapter order and visual hierarchy,
- replace animated transitions with instant but intentional state changes,
- keep PPDB emphasis through layout, contrast, and copy rather than animation.

## Legacy Motion Status

| Existing Motion Pattern | Status under PRD V2.1 |
|-------------------------|------------------------|
| `Story → Transformation → Industry` built around old sequence | Interim only |
| `Industry` motion mapped to `TKJ / RPL / DKV` objects | Legacy and blocked from further expansion |
| `Proof → Action` handoff | Reusable with relabeling into `Achievements → PPDB` |

## Score Breakdown

| Dimension | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Motion Purpose | 25% | 9/10 | Motion clearly advances V2.1 chapter logic |
| Motion Hierarchy | 20% | 9/10 | Strong focus on one dominant beat at a time |
| Scroll Narrative | 20% | 9/10 | Eight-chapter narrative is coherent and cinematic |
| Transition Language | 15% | 9/10 | Boundaries have distinct intent with V2.1 names |
| Design Order Compliance | 10% | 10/10 | Story → Motion → 3D gate explicit |
| Accessibility | 5% | 10/10 | Reduced-motion path is explicit |
| Performance | 5% | 8.5/10 | Requires disciplined implementation, but direction is sound |

## Verdict

Motion planning passes the PRD V2.1 bar and clears the `>= 80` gate. Phase 4 implementation should rebuild motion against the new chapter order only; expanding legacy `TKJ / RPL / DKV` motion patterns would be misaligned. 3D scene work may proceed after this motion gate.
