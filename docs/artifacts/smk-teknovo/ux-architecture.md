# UX Architecture — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-21  
**Gate:** UX Architecture  
**PRD Baseline:** V2.1  
**Phase 3 Status:** ✅ Complete

## UX Goal

A first-time visitor should understand the platform story in under 60 seconds, with the chapter sequence doing the explanatory work. The homepage must behave like a cinematic narrative spine, not a stack of unrelated sections.

## Information Architecture

```text
Homepage (immersive narrative spine)
├── 1. Future Starts Here
├── 2. Industry Challenge
├── 3. Teknik Mesin
├── 4. Usaha Layanan Wisata
├── 5. Industry Alignment
├── 6. Student Transformation
├── 7. Achievements
└── 8. PPDB

Support / secondary public routes
├── /ppdb/
├── /berita/
├── legacy program routes (interim only)
└── /portal/*
```

## Chapter Flow Rules

1. The homepage must preserve the PRD V2 order exactly.
2. Support sections such as FAQ, contact, and route-level detail may exist, but they must not interrupt the primary eight-chapter spine.
3. `Teknik Mesin` and `ULW` must appear before ecosystem, transformation, and achievements.
4. Legacy `TKJ / RPL / DKV` routes cannot be reintroduced as homepage chapters.

## Scroll Architecture

| Chapter | Primary UX job | Motion / 3D expectation |
|---------|----------------|-------------------------|
| Future Starts Here | Establish identity fast | Strong opening scene, high clarity |
| Industry Challenge | Build urgency and relevance | Evidence-led motion, controlled pacing |
| Teknik Mesin | Give tangible program confidence | High-value spatial storytelling |
| Usaha Layanan Wisata | Broaden aspiration through service excellence | Distinct but equally premium scene treatment |
| Industry Alignment | Connect programs to partners and pathways | Network logic and relation cues |
| Student Transformation | Humanize the journey | Progression-focused pacing |
| Achievements | Provide trust and proof | Editorial emphasis, low visual noise |
| PPDB | Convert without confusion | Reduced complexity, one dominant action |

## Navigation Model

| Element | Behavior |
|---------|----------|
| Primary nav | Minimal persistent navigation with chapter awareness |
| Scroll progress | Recommended for chapter orientation |
| Chapter jump | Optional, but must respect the story order |
| Portal entry | Secondary utility path, not primary homepage CTA |
| Mobile nav | Simplified overlay with PPDB visibility retained |

## 60-Second Comprehension Test

The UX passes only if a new visitor can quickly answer:

- What is Teknovo?
- Why does industry need this kind of school?
- What are the two flagship pathways?
- How do students transform here?
- What should I do next?

If those answers are not clear within the first minute, the UX architecture has failed even if the visuals are attractive.

## Accessibility and Reduced Motion

- Reduced-motion users must still experience the same chapter order and meaning.
- Chapter transitions must remain understandable without scroll scrubbing.
- Copy must stay readable without dependency on WebGL.
- PPDB must remain easy to reach on both desktop and mobile.

## Legacy / Interim Mapping

| Existing Structure | PRD V2 Status | UX Action |
|-------------------|---------------|-----------|
| `Story` | Interim | Remap to `Future Starts Here` |
| `Transformation` | Interim | Move to chapter 6 |
| `Industry` centered on `TKJ / RPL / DKV` | Legacy | Replace with chapters 3, 4, and 5 |
| `Proof` | Interim | Reframe as `Achievements` |
| FAQ / Contact as visible homepage chapters | Secondary only | Move below or outside the main eight-chapter spine |

## Route Architecture Guidance

- The immersive homepage remains the main narrative surface.
- `PPDB` remains the primary conversion destination.
- Legacy program routes may remain accessible temporarily, but they should be labeled and treated as interim until new `Teknik Mesin` and `ULW` route strategies are implemented.
- Portal entry routes remain operational and separate from the marketing narrative.

## Verdict

The UX architecture is now aligned to PRD V2 and explicitly blocks contradictory chapter sequencing. Phase 2 implementation should start from this eight-chapter structure, not from the old `Story -> Transformation -> Industry -> Student -> Career -> Proof -> Action` flow.
