# PRD: Arabic / RTL experience for KSA buyers

**Status**: In progress (v1 shipped 2026-05-25 — pending PGM copy sign-off)  
**Author**: Mariam (Product Manager)  
**Created**: 2026-05-25  
**Last Updated**: 2026-05-25  
**Project**: pgm-export-website · Offer ref PGM-EXP-2026-SA

---

## Overview

### Problem Statement

Saudi supermarket and wholesale buyers often review export offers in Arabic. The current site is English-only (`lang="en"`, LTR layout). That creates friction for procurement teams who share materials internally in Arabic and expect mirrored navigation and readable commercial terms without switching mental models.

### Target User

**Primary**: KSA procurement manager or category buyer evaluating Egyptian produce programmes for Season 2026–2027.  
**Secondary**: PGM sales staff sharing the site link in bilingual email threads.

### Goals

1. Arabic-speaking buyers can browse core commercial pages without English-only blockers.
2. Layout, navigation, and CTAs behave correctly in RTL (mirrored header, aligned text, logical tab order).
3. Offer reference PGM-EXP-2026-SA remains consistent across EN/AR surfaces.

### Non-Goals (Out of Scope — v1)

- Full CMS or translator workflow for every product detail paragraph
- Automatic machine translation of all 16 product pages at launch
- Arabic PDF generation from the Word master (separate track — see offer doc owner)
- Locale-specific pricing or Incoterms variants
- CRM / quote form field labels in Arabic until Resend + Turnstile copy is reviewed

### Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Arabic route availability | `/ar` serves home, export, contact | Manual QA + CI smoke |
| RTL layout regressions | 0 P1 visual bugs on `/ar/*` | Design review + `/impeccable audit` |
| Buyer share readiness | Stakeholder sign-off on AR export + contact | PM checklist |

---

## User Stories

### US-1: Language switcher

> As a KSA buyer, I want to switch between English and Arabic, so that I can read the site in my preferred language.

**Acceptance Criteria**:

- [x] Header shows EN | AR toggle on all public routes (except `craft-preview`)
- [x] Switching preserves current page where translation exists (e.g. `/export` ↔ `/ar/export`)
- [x] Default remains English; no geo-IP auto-redirect in v1
- [x] `html` gets `lang="ar"` and `dir="rtl"` on Arabic routes

### US-2: Priority Arabic pages

> As a buyer, I want Arabic versions of the pages I need to approve a programme, so that I can circulate them internally.

**Acceptance Criteria**:

- [x] **Must (v1)**: `/ar`, `/ar/export`, `/ar/contact`
- [x] **Should (v1)**: `/ar/products` (catalogue index only — product names may stay Latin botanically)
- [ ] **Could (v1.1)**: `/ar/about`, selected `/ar/products/[slug]` for top 6 lines
- [ ] Commercial terms on `/ar/export` match approved Arabic copy from offer doc owner (not machine-translated)

### US-3: RTL navigation and CTAs

> As an Arabic reader, I want navigation and buttons to mirror correctly, so that the site feels native.

**Acceptance Criteria**:

- [ ] Site header logo stays leading; nav order mirrors; mobile menu opens from logical edge
- [ ] Product dropdown and skip link remain keyboard-accessible in RTL
- [ ] Primary/secondary buttons and step lists use logical properties (`ms`/`me`, `text-start`)
- [ ] Hero and footer on-dark surfaces pass contrast in RTL

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1 | Next.js App Router locale segment `/ar` | Must | Prefer `[locale]` layout wrapper |
| FR-2 | Structured copy module `src/data/messages/ar.ts` or JSON | Must | No inline JSX strings for AR |
| FR-3 | Language switcher component in `SiteHeader` | Must | |
| FR-4 | Arabic export page with approved commercial terms | Must | Block on copy from PGM |
| FR-5 | Arabic contact / quote labels | Must | Form validation messages included |
| FR-6 | Product detail pages in Arabic | Could | Defer to v1.1 |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | No duplicate font payload explosion | Subset Arabic + Latin via `next/font` |
| Accessibility | WCAG 2.1 AA in RTL | Logical focus order, `lang` attribute |
| SEO | `hreflang` alternates EN/AR | `en`, `ar-SA` on paired routes |

---

## Design

### User Flow

```
[Land on pgmexport.com]
    |
    v
[Header: EN | AR]
    |
    +-- EN --> existing routes
    |
    +-- AR --> /ar/* (RTL shell)
              |
              v
         [Export + PDF download + Contact quote]
```

### Wireframes / Mockups

- Reuse DESIGN.md tokens; add `--dir` aware spacing notes
- Design review required before merge (UI PR gate)

---

## Technical Notes

### Dependencies

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| Approved Arabic commercial copy | External | **Blocked** | PGM / user |
| Source Serif/Sans Arabic subsets | Internal | Ready | Engineering |
| Offer PDF Arabic version | External | Not in scope v1 | PGM |

### Technical Constraints

- Keep catalogue slugs Latin for URLs (`/ar/products/mango` not translated slug)
- Quote form API (`/contact`) can stay single endpoint; labels/errors localized client-side
- Impeccable RTL guidance: `reference/harden.md` § RTL

---

## Launch Plan

### Rollout Strategy

- [x] Phased rollout — `/ar/export` + `/ar/contact` first behind PR
- [ ] Full `/ar` home after copy sign-off
- [ ] Beta with one KSA buyer contact before announcing

---

## Open Questions

| Question | Owner | Status | Resolution |
|----------|-------|--------|------------|
| Who provides authoritative Arabic commercial terms? | PGM | Open | |
| Product names: transliteration vs Arabic common names? | PM + PGM | Open | |
| Separate `PGM-EXP-2026-SA-ar.pdf` or bilingual PDF? | PM | Open | |

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approved | 2026-05-28 | Draft |
| Arabic copy received | TBD | Blocked |
| Dev Complete (v1 scope) | TBD | |
| Design + QA RTL pass | TBD | |
| Launch `/ar` core | TBD | |

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | Mariam | 2026-05-25 | Author |
| Head of Product | | | Pending |
| Tech Lead | | | Pending |
| Head of Design | | | Pending |
