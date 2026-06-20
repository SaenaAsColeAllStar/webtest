# Design System Notes — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-20  
**Gate:** Design System  
**PRD Baseline:** V2

## System Role

These notes define the visual and interaction system that should support the PRD V2 narrative. The system must feel premium, restrained, and cinematic enough to support a **Digital Experience Platform**, while staying credible for a school brand.

## Visual Principles

- Editorial hierarchy over component noise.
- One focal idea per viewport.
- Dark-forward premium surfaces with disciplined accents.
- Spatial depth used to support meaning, not to show off tooling.
- Consistent craft across `Future Starts Here`, `Teknik Mesin`, `ULW`, and PPDB.

## Public Immersive Tokens

```css
--color-deep-space: #0A0A0F;
--color-surface-1: #14141F;
--color-surface-2: #1E1E2E;
--color-accent-electric: #6366F1;
--color-accent-cyan: #22D3EE;
--color-text-primary: #F8FAFC;
--color-text-secondary: #94A3B8;
--color-divider-soft: rgba(255, 255, 255, 0.08);
```

## Typography

| Role | Font | Notes |
|------|------|-------|
| Display | Geist | Use for strong chapter-led headlines only |
| Heading | Geist | Maintain premium editorial rhythm |
| Body | Inter | Keep readable and calm |
| Microcopy | Inter | Use for labels, metadata, and evidence details |

## Motion Tokens

```css
--motion-duration-fast: 200ms;
--motion-duration-base: 400ms;
--motion-duration-slow: 800ms;
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

## 3D Stack and Usage

| Library | Role |
|---------|------|
| `three` | Core rendering |
| `@react-three/fiber` | Scene integration |
| `@react-three/drei` | Camera and helper utilities |
| `gsap + ScrollTrigger` | Scroll-linked scene choreography |
| `motion/react` | DOM-layer motion and handoff |
| `lenis` | Optional smooth scroll where cinematic pacing benefits |

## Scene Identity Notes

| Chapter Type | System Guidance |
|--------------|-----------------|
| Future Starts Here | Highest spatial emphasis, strongest visual focal point |
| Teknik Mesin | Industrial materiality, precision, mechanical restraint |
| ULW | Service elegance, human polish, professional warmth |
| Achievements | DOM-first editorial proof, minimal 3D support |
| PPDB | Conversion-first, lowest decorative complexity |

## Brand Consistency Checks

The design system should help maintain `Brand Consistency >= 90` by ensuring:

- positioning copy and visual tone stay aligned,
- `Teknik Mesin` and `ULW` have distinct visual identities,
- legacy `TKJ / RPL / DKV` cues do not leak into the main narrative,
- PPDB remains clear and premium instead of banner-like.

## Forbidden

- Lucide, Font Awesome, Bootstrap, MUI, Ant Design.
- Decorative gradient heroes.
- Generic card walls and SaaS-like feature blocks.
- Visual reuse that makes `Teknik Mesin` and `ULW` feel like the same chapter with different text.
- ERP layout patterns on public story surfaces.

## Interim Guidance

- Existing tokens remain technically usable as the transition layer.
- Existing public visuals tied to `TKJ / RPL / DKV` should be treated as temporary references, not final design language.
- Future Tailwind migration must preserve these narrative constraints rather than flatten them into template utility output.
