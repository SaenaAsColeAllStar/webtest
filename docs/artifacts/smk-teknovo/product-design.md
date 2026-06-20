# Product Design Analysis — SMK Teknovo Immersive Portal

**Date:** 2026-06-20  
**Gate:** Product Designer

## Four Goals Matrix

| Chapter | Emotional | Visual | Conversion | Storytelling |
|---------|-----------|--------|------------|--------------|
| **Story** | Curiosity, ambition | 3D network focal, headline dominant | Believe "this school is different" | Workforce ecosystem positioning |
| **Transformation** | Confidence, hope | Split before/after luminance | Consider SMK vs SMA path | Learner → professional arc |
| **Industry** | Excitement, relevance | Three 3D industry objects | Click program detail / PPDB | TKJ · RPL · DKV alignment |
| **Student Journey** | Belonging, clarity | Timeline motion path | Explore facilities/labs | Day-in-life learning |
| **Career Journey** | Pride, trust | Flowing outcome data | Trust employability | Alumni + mitra proof |
| **Proof** | Trust, validation | Editorial credentials | Reduce enrollment doubt | Accreditation + achievements |
| **Action** | Urgency, readiness | Single CTA focal | **Daftar PPDB** | Enrollment call-to-action |
| **FAQ** | Relief, clarity | Accordion reveal | Remove blockers | Answer parent questions |
| **Kontak** | Accessibility | Form + contact info | Submit inquiry | Human connection |

## User Flow (Public)

```text
Land → Story (3D) → scroll chapters → Action (PPDB) → /ppdb/
Alt: Nav → Program detail → PPDB
Alt: Nav → Portal dropdown → portal/*.html
```

≤5 clicks to PPDB from any entry point.

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| PPDB click-through | +20% vs static baseline | Analytics event on CTA |
| Scroll depth | ≥60% reach Action chapter | Scroll tracking |
| Bounce rate | <40% | Analytics |
| LCP | <2.5s | Lighthouse |

## Page Purpose

| Route | Purpose | Primary User | Outcome |
|-------|---------|--------------|---------|
| `/` | Immersive workforce story | Calon siswa, orang tua | PPDB intent |
| `/ppdb/` | Registration funnel | Calon siswa | Submit application |
| `/program/*` | Program detail | Calon siswa | Program selection |
| `/portal/*` | ERP entry | Siswa, guru, ortu | Login (future) |
