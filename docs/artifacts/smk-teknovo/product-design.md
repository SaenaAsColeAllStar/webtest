# Product Design Analysis — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-21  
**Gate:** Product Designer  
**PRD Baseline:** V2.1  
**Phase 3 Status:** ✅ Complete

## Product Goal

Design the public experience as a cinematic narrative that helps visitors understand SMK Teknovo as a **Future Workforce Academy** within 60 seconds, then move them toward PPDB with conviction rather than curiosity alone.

## Four Goals Matrix — PRD V2

| Chapter | Emotional Goal | Visual Goal | Conversion Goal | Storytelling Goal |
|---------|----------------|-------------|-----------------|-------------------|
| 1. Future Starts Here | Ambition and possibility | One commanding opening focal point with premium spatial depth | Make visitors believe Teknovo is different from a generic school | Introduce Teknovo as the birthplace of future professionals |
| 2. Industry Challenge | Urgency and relevance | Kinetic evidence, labor demand, and skill-gap storytelling | Shift the frame from school browsing to career preparation | Explain why this journey matters now |
| 3. Teknik Mesin | Respect, confidence, industrial aspiration | Mechanical precision, fabrication cues, strong material presence | Increase affinity toward flagship technical pathways | Show one pillar of real-world professional formation |
| 4. Usaha Layanan Wisata | Warm professionalism and human confidence | Hospitality polish, service rhythm, experiential framing | Expand belief that Teknovo prepares multiple future-facing professions | Show a second flagship path through service excellence |
| 5. Industry Alignment | Trust in real-world connection | Networked pathways between school, tools, partners, and outcomes | Deepen credibility before the later proof chapters | Show Teknovo as part of a connected workforce system |
| 6. Student Transformation | Hope and identity shift | Progression from learner to professional with visible growth beats | Help families imagine the transformation personally | Make the promise feel human and believable |
| 7. Achievements | Validation and earned trust | Selective proof spotlight with editorial hierarchy | Remove the last layer of enrollment doubt | Show evidence that the promise is already real |
| 8. PPDB | Readiness and momentum | Focused conversion space with minimal distraction | Drive the primary action to start PPDB | Turn belief into commitment |

## User Flow

```text
Landing
  -> Future Starts Here
  -> Industry Challenge
  -> Teknik Mesin / ULW
  -> Industry Alignment
  -> Student Transformation
  -> Achievements
  -> PPDB

Secondary paths:
Homepage -> legacy support route -> PPDB
Homepage -> support article / proof route -> PPDB
Homepage -> portal entry (secondary operational path)
```

## 60-Second Comprehension Goal

Within roughly 60 seconds, a first-time visitor should understand:

1. Teknovo is a **Digital Experience Platform** for a **Future Workforce Academy**.
2. Industry demand for skilled workers is the reason this story exists.
3. `Teknik Mesin` and `ULW` are the flagship narrative pillars.
4. Students are transformed into future professionals.
5. PPDB is the immediate next step.

## Page and Route Purpose

| Surface | Purpose | Primary User | Desired Outcome |
|---------|---------|--------------|-----------------|
| `/` | Primary immersive story | Prospective students and parents | Strong PPDB intent |
| `/ppdb/` | Enrollment conversion surface | Prospective students | Start or complete registration |
| Legacy `TKJ / RPL / DKV` routes | Secondary support / archive until rebuilt | Returning visitors | Preserve continuity without owning the homepage narrative |
| `/portal/*` | Operational entry | Students, teachers, parents | Reach portal access only |

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| PPDB click-through | Better than legacy baseline | CTA analytics |
| Scroll completion to chapter 8 | `>= 55%` qualified visitors | Scroll depth analytics |
| 60-second positioning comprehension | Users can identify positioning + flagship programs in testing | Qualitative validation |
| Brand Consistency | `>= 90` | Review gate |
| Visual Originality | `>= 85` | AI-ish review gate |

## Interim and Legacy Mapping

| Existing Implemented Section | PRD V2 Status | Product Guidance |
|-----------------------------|---------------|------------------|
| `Story` | Interim | Rebuild into `Future Starts Here` |
| `Transformation` | Interim reusable | Shift to `Student Transformation` |
| `Industry` built around `TKJ / RPL / DKV` | Legacy | Replace with `Teknik Mesin`, `ULW`, then `Industry Ecosystem` |
| `Proof` | Interim reusable | Reframe into `Achievements` |
| `Action` / PPDB | Reusable | Keep as the final conversion destination |

## Product Decisions

- The homepage is a belief-shaping experience first, not a content dump.
- `Teknik Mesin` and `ULW` are the two narrative pillars that now carry the middle of the story.
- Existing `TKJ / RPL / DKV` implementation remains historically useful but strategically legacy.
- Any future implementation should protect clarity and progression over density.

## Handoff Requirements

- Motion must communicate narrative progression chapter by chapter.
- 3D should be concentrated where it clarifies the opening worldview and the two flagship program scenes.
- UX architecture must preserve the eight-chapter order without reintroducing legacy sequencing.
