# Design System Notes — SMK Teknovo Immersive

**Date:** 2026-06-20  
**Gate:** Design System

## Public Immersive Tokens

```css
--color-deep-space: #0A0A0F;
--color-surface-1: #14141F;
--color-surface-2: #1E1E2E;
--color-accent-electric: #6366F1;
--color-accent-cyan: #22D3EE;
--color-text-primary: #F8FAFC;
--color-text-secondary: #94A3B8;
```

## Typography

| Role | Font | Size |
|------|------|------|
| Display | Geist | 72–96px |
| H1 | Geist | 56px |
| H2 | Geist | 40px |
| Body | Inter | 18px |
| Caption | Inter | 14px |

## Motion Tokens

```css
--motion-duration-fast: 200ms;
--motion-duration-base: 400ms;
--motion-duration-slow: 800ms;
--motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

## 3D Stack

| Library | Use |
|---------|-----|
| three | Core rendering |
| @react-three/fiber | React integration |
| @react-three/drei | Float, Stars, Line, Environment |
| gsap + ScrollTrigger | Camera scrub, DOM timelines |
| lenis | Smooth scroll |
| motion/react | Component enter/exit |

## Icons

- @phosphor-icons/react — no Lucide, Font Awesome, Bootstrap

## Forbidden

- Lucide, Font Awesome, Bootstrap, MUI, Ant Design
- Gradient hero backgrounds (decorative)
- Fully rounded card walls (ERP pattern on public)
