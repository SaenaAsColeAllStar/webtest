# UI UX Layout Contract Review — SMK Teknovo Immersive Experience Platform

**Date:** 2026-06-20  
**Gate:** UI UX Review  
**PRD Baseline:** V2  
**Verdict:** PASS WITH REBUILD REQUIREMENTS

## Public Surface Contract

The public homepage must now be reviewed against the PRD V2 chapter contract, not the legacy chapter implementation.

```text
Immersive Homepage
├── Minimal Navigation
├── Chapter Progress / Orientation
├── Eight-Chapter Narrative Spine
│   ├── Future Starts Here
│   ├── Why Industry Needs Skilled Workers
│   ├── Teknik Mesin
│   ├── Usaha Layanan Wisata
│   ├── Industry Ecosystem
│   ├── Student Transformation
│   ├── Achievements
│   └── PPDB
└── Optional support layer below the core spine
```

## Review Result

The contract itself is now aligned, but the current implementation still contains legacy chapter mapping. That means the **review framework passes**, while the **implemented homepage remains interim** until rebuilt.

## Pass Conditions for Future Implementation

- No hero-banner fallback.
- No KPI-led homepage proof pattern.
- No feature grid as the core narrative structure.
- No dashboard-style layout on public surfaces.
- Clear chapter sequencing that matches PRD V2 exactly.
- `Teknik Mesin` and `ULW` appear as the central middle-act chapters.
- PPDB remains the dominant conversion destination.

## Current Interim / Legacy Status

| Existing Implemented Area | Status |
|---------------------------|--------|
| `Story` / `Transformation` / `Proof` structure | Interim and remappable |
| `Industry` chapter built around `TKJ / RPL / DKV` | Legacy and misaligned |
| Legacy program-detail pages for `TKJ / RPL / DKV` | Secondary support only |
| Existing support-route framing | Potentially reusable if relabeled and re-sequenced |

## Support Route Guidance

- `PPDB` can remain an immersive conversion route.
- `Berita` can remain editorial support.
- Legacy program routes may continue temporarily, but they should not dictate the homepage story.
- Portal routes remain operational and separate from the public narrative contract.

## Five-State Guidance

For future chapter rebuilds, public surfaces should still account for:

- Loading,
- Success,
- Error,
- Empty where relevant,
- Reduced-motion or limited-device fallback as the closest equivalent to a capability state.

## Verdict

The UI/UX contract is now suitable for PRD V2 implementation, but it explicitly marks the current homepage chapter system as **interim**. Phase 2 should rebuild against this updated contract rather than polish the legacy chapter structure further.
