# PRD: Season offer PDF download (PGM-EXP-2026-SA)

**Status**: In Development  
**Author**: Mariam (Product Manager)  
**Created**: 2026-05-25  
**Last Updated**: 2026-05-25  
**Project**: pgm-export-website · Offer ref PGM-EXP-2026-SA

---

## Overview

### Problem Statement

KSA B2B buyers expect a downloadable offer pack they can forward to finance and category teams. The site previously only exposed a mailto-based quote seam — no static artifact matching the commercial offer reference printed on the hero kicker.

### Target User

**Primary**: KSA wholesale / supermarket buyer evaluating Season 2026–2027 programmes.  
**Secondary**: PGM sales rep sharing a link + PDF in one email.

### Goals

1. One-click download of `PGM-EXP-2026-SA.pdf` from hero and export page.
2. Filename and offer ref stay aligned with `commercial-offer.ts` (single source of truth).
3. Regenerate PDF when main commercial routes change (documented script, not manual export).

### Non-Goals (Out of Scope — v1)

- Server-side PDF generation on each request
- Buyer-specific priced PDFs (volume tiers, private label)
- Arabic PDF (see `prd-arabic-rtl.md`)
- E-signature or gated download (email capture)

### Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| PDF reachable in production | `/offers/PGM-EXP-2026-SA.pdf` returns 200 | Deploy smoke |
| CTA visibility | Download on home hero + export CTA block | QA checklist |
| Regeneration documented | `npm run generate-offer-pdf` in README | Docs review |

---

## User Stories

### US-1: Download from home

> As a buyer landing on the site, I want to download the season offer PDF, so that I can review terms offline.

**Acceptance Criteria**:

- [x] Hero (non-compact) shows “Download season offer (PDF)” alongside product and quote CTAs
- [x] Link uses `download` attribute with filename `PGM-EXP-2026-SA.pdf`
- [x] Static file served from `/offers/PGM-EXP-2026-SA.pdf`

### US-2: Download from export page

> As a buyer reading commercial terms, I want an inline link and prominent CTA, so that I can save the full pack.

**Acceptance Criteria**:

- [x] Commercial terms section references inline download link
- [x] Bottom CTA row pairs PDF download + “Request quote”

### US-3: Maintainable generation

> As engineering, I want to regenerate the PDF when copy changes, so that production stays in sync.

**Acceptance Criteria**:

- [x] `npm run generate-offer-pdf` writes to `public/offers/PGM-EXP-2026-SA.pdf`
- [x] Script captures main routes: home, products index, export, about, contact
- [ ] CI note or pre-deploy checklist to run generator when commercial pages change

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-1 | `src/lib/offer-download.ts` constants | Must | Done |
| FR-2 | `OfferDownloadLink` component | Must | Done |
| FR-3 | Static PDF in `public/offers/` | Must | Generate at build/prep |
| FR-4 | Hero + export placements | Must | Done |
| FR-5 | Optional: footer link | Could | Open |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | PDF served as static asset | CDN cacheable |
| Size | Main-offer PDF reasonable for email attach | < 5 MB |
| Accessibility | Link text describes format | “Download season offer (PDF)” |

---

## Technical Notes

### Generation workflow

```bash
cd "/Users/apple/Documents/PGM export website"
npm run dev          # or npm run start after build
npm run generate-offer-pdf
git add public/offers/PGM-EXP-2026-SA.pdf
```

Requires Playwright + running server on `PDF_BASE_URL` (default `http://localhost:3020`).

### Future

- Replace screenshot-PDF with designed export from master `.docx` when PGM supplies template
- Add `Content-Disposition` filename via Next route if `download` attribute insufficient on some mobile browsers

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Replace web-capture PDF with Word-exported master? | PGM | Open |
| Include product detail pages in buyer PDF? | PM | Default: main routes only |

---

## Approvals

| Role | Status |
|------|--------|
| Product Manager | Author |
| Engineering | Implemented (pending PDF asset commit) |
