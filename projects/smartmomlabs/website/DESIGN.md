---
name: blendavit
description: SFDA-registered tasteless multivitamin for parents — KSA, Arabic-first
colors:
  bg: "#e4f0ef"
  bg-soft: "#f6fbfb"
  bg-card: "#ffffff"
  text: "#3d2e1f"
  text-muted: "#5c5348"
  accent: "#2f4a38"
  accent-light: "#4a6b55"
  gold: "#9a7332"
  gold-light: "#c4a062"
  border: "rgba(61, 46, 31, 0.1)"
typography:
  display:
    fontFamily: "\"Source Serif 4\", Georgia, serif"
    fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "\"Albert Sans\", system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "\"Albert Sans\", system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "10px"
  md: "16px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-gold:
    backgroundColor: "{colors.gold-light}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
  button-secondary:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "15px 30px"
---

## Overview

**Creative north star:** Luna & Eve's cooperation-free story, localized for KSA — calm clinical trust with family warmth, led by **mealtime proof** (stir into food they already eat) plus **real pack photography** on product surfaces.

Mood: assured, readable, premium DTC supplement (not UK pastel clone, not multi-SKU hub). Mint-tinted surfaces echo pack art; forest green and bronze gold carry action and wordmark emphasis. Layout: trust strip → bold headline → lifestyle hero → product duo → evidence → comparison → photo-led steps.

**Imagery policy (2026-06):** Hero and steps use **interim AI lifestyle** assets (`hero-stir-yoghurt.png`, `usage-*`). Ship for MVP/waitlist; swap for owned GCC photography before launch. Pack shots (`WhatsApp_Image_*`) stay on product cards and PDP only. Never ship AI assets with wrong or invented branding.

Anti-references for agents: identical icon+heading cards, hero metric bands, gradient text, glass cards, all-caps section eyebrows on every block, double-layer lifestyle-on-lifestyle heroes.

## Colors

| Role | Token | Use |
|------|-------|-----|
| Page | `bg` #e4f0ef | Body wash (pack mint) |
| Section alt | `bg-soft` #f6fbfb | Alternating sections |
| Surface | `bg-card` #ffffff | Cards, panels, nav bleed |
| Ink | `text` #3d2e1f | Headings, body |
| Muted | `text-muted` #5c5348 | Supporting copy (≥4.5:1 on bg) |
| Accent | `accent` #2f4a38 | CTAs, icons, promo bar |
| CTA gold | `gold` / `gold-light` | Primary reserve buttons |

Strategy: **Committed restrained** — mint field + green accent ≤15%, gold for conversion moments only.

## Typography

- **Display (LTR):** Source Serif 4 — wordmark, h1–h2, pull quotes.
- **Display (RTL):** El Messiri — Arabic headings.
- **Body (LTR):** Albert Sans — UI, body, tables, FAQ.
- **Body (RTL):** Tajawal — Arabic UI and tables (not IBM Plex; reflex-reject lane).
- **Scale:** h1 clamp max 3.75rem; body 17px / 1.65; trust labels 0.72rem bold.
- Use `text-wrap: balance` on headings; `pretty` on long FAQ answers.

## Elevation

Single shadow vocabulary: `0 16px 48px rgba(47, 74, 56, 0.1)` on product cards, hero frame, step photos, reserve panel. No layered glass; depth via white cards on mint field.

## Imagery

| Asset | Path | Use |
|-------|------|-----|
| Hero stir | `assets/images/hero-stir-yoghurt.png` | Hero lifestyle (4:3), no pack in frame |
| Step mix | `assets/images/usage-stir-yoghurt.png` | How-it-works step 2 |
| Step oats | `assets/images/usage-oats-bowl.png` | Steps 1 & 3 (crop: sachets vs bowl) |
| Pack Kids | `assets/images/WhatsApp_Image_*-0ef57a1c-*.png` | Product duo, PDP Kids |
| Pack Toddlers | `assets/images/WhatsApp_Image_*__1_-311c9c0f-*.png` | Product duo, PDP Toddlers |

Hero grammar: **one lifestyle scene** + UI age badge. Product grammar: **owned pack photography** on cards only.

## Components

- **Promo bar:** Full-width `accent`, white text.
- **Nav:** Sticky, blurred mint; `.nav-links a:not(.btn)` preserves button contrast.
- **Trust strip:** 5-column grid; packaging stamp system v2 (`assets/icons/trust/stamp-*.svg`, `.trust-stamp` 72px) — shared double-ring (forest + gold), mint inner fill, arc microtype (`textPath`). Sugar: 0g + cube cluster + ban ring; SFDA: scalloped REGISTERED / مسجّل arcs; sachet: foil 1g + neutral slash badge; nutrients: 12-dot grid + gold Fe chip; halal: shield + crescent + حلال. Behance refs: Up, VitaTurm. Preview: `previews/trust-stamps-preview.html`. No SFDA authority logo.
- **Hero:** `.hero-visual` 4:3, `.hero-scene` full-bleed cover, `.age-badge` top-end overlay.
- **Product card:** Pack image 4:3, body stack, full-width primary button.
- **Steps:** 3-column grid; `.step-photo` 4:3 cards above numbered labels.
- **Evidence row:** Serif quote mark + stagger offset on even rows (desktop).
- **Variant tabs / market buttons:** 2px border; active = accent fill or tint.
- **Compare table:** Row headers `th scope="row"` for a11y.

Focus: visible 2px accent outline on interactive elements.

## Do's and Don'ts

**Do**

- Lead with iron-in-sachet vs gummy comparison.
- Keep SFDA + halal + 0g sugar in above-fold trust.
- Use real pack photography on product duo and PDP.
- Use mealtime stir imagery to prove "invisible in food."
- Write reserve/waitlist copy for parents, not developers.

**Don't**

- Reintroduce Cormorant Garamond + DM Sans pair.
- Stack two lifestyle photos in the hero (scene + lifestyle pack).
- Use AI images with wrong brand text (e.g. BLENDAVITE).
- Use em dashes in marketing copy.
- Show Shopify setup instructions on the storefront.
- Invent paediatrician quotes without signed advisors.
- Add numbered 01/02/03 section eyebrows.
