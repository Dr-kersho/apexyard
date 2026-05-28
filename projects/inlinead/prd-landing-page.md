# INLINE AD — Marketing Landing Page (Brands + Gyms)

**Status**: Draft  
**Author**: Mariam (Product Manager)  
**Created**: 2026-05-26  
**Source**: INLINEAD_Business_Plan_v4_0.docx  

---

## Overview

### Problem Statement

INLINE AD is pre-launch with **0 signed brands** and **2 Uphill branches secured** (3 screens). Sales today depends on direct outreach (2–6 week B2B cycles, 5–7 touchpoints). There is no single public URL where:

1. **Brands** (supplements & sports nutrition first) can understand the offer, see proof points, and submit qualified interest without a cold call.
2. **Gym owners** can apply to join the network with zero hardware cost and revenue share.

A focused landing page reduces friction at the top of both funnels and gives sales a trackable link for campaigns, WhatsApp, and pitch decks.

### Target Users

| Audience | Who | Job to be done |
|----------|-----|----------------|
| **Primary — Brand marketer / founder** | Alexandria-area brands with meaningful ad spend; supplements first | “Is in-gym QR-tracked media worth it vs OOH/social?” → request a conversation |
| **Primary — Gym owner / ops manager** | Premium gyms (EGP 1K–2.5K membership), Alexandria | “Can I earn ≥5K EGP/month passive with no capex?” → apply to partner |
| **Secondary — INLINE AD sales** | Ahmed / ops | Qualify inbound, route to CRM, follow up within 48h |

### Goals

1. **Capture qualified leads** — ≥80% of submissions include contact + budget/scale signals needed for first call.
2. **Explain the wedge in <60 seconds** — visitor understands: screens in premium gyms, 4PM–12AM, QR-tracked performance — not a price list.
3. **Split intent cleanly** — brand vs gym paths with no wrong-form confusion.
4. **Concept-only positioning** — explain *what* INLINE AD is and *how* it works; **no public pricing or package tiers** on the page (sales discusses numbers on the call).
5. **Support Arabic + English** — Alexandria B2B buyers expect Arabic; brands may prefer English (bilingual UI or toggle).

### Non-Goals (Out of Scope — v1)

- Self-serve checkout / Paymob payment on the landing page (dashboard handles 30/70 later).
- Brand campaign dashboard, creative upload, or live reporting.
- Gym contract signing, screen install scheduling, or uptime portal.
- Cairo / licensing story (mention “Alexandria first” only).
- Category exclusivity, pilot tiers, or dynamic pricing engine.
- Blog, careers, or full marketing site.

### Success Metrics

| Metric | Target (90 days post-launch) | How measured |
|--------|------------------------------|--------------|
| Brand form submissions | ≥15/month | Form backend + tagged `lead_type=brand` |
| Gym applications | ≥8/month | Form backend + tagged `lead_type=gym` |
| Qualified brand rate | ≥50% meet budget ≥30K/mo | Sales disposition on first call |
| Time to first contact | Median <48h | CRM / manual log |
| Bounce on hero | <55% | Analytics (Plausible / GA4) |
| Mobile completion rate | ≥70% of desktop | Form analytics |

---

## Positioning & Page Narrative

### One-liner (hero)

**English:** Egypt’s first performance-tracked in-gym ad network — your brand on premium gym screens, measured by QR and redemptions.  
**Arabic (suggested):** أول شبكة إعلانات داخل الصالات الرياضية في مصر — أداء يُقاس بالـ QR والخصومات.

### Proof points (above the fold or trust band)

- **369** gyms in Alexandria market; **no confirmed direct competitor** post-Adzily stall.
- **Uphill Alexandria** — 2 branches, 3 screens (social proof once logo rights secured).
- **EGP 12.7B** OOH market; DOOH growing share.
- **Flexible packages** — scoped to your campaign on a sales call (no prices on site).
- **Operating window 4PM–12AM** — peak member traffic.
- **Gym owners:** revenue share, **zero hardware cost**, weekly payout tied to verified uptime.

### Page structure (single URL, two funnels)

```
[Nav: Logo | For Brands | For Gyms | عربي/EN]
        |
        v
[Hero + dual CTA: "Advertise in gyms" | "Partner your gym"]
        |
        +---> #brands ──► Value props ──► How it works ──► Brand form
        |
        +---> #gyms  ──► Gym value props ──► Payout explainer ──► Requirements ──► Gym form
        |
[Footer: contact, legal placeholder, social]
```

Sticky nav anchors scroll to `#brands` and `#gyms`. Hero CTAs pre-select the correct form section.

### What to show instead of pricing

| Block | Content (concept only) |
|-------|------------------------|
| **What** | Video ads on screens inside premium Alexandria gyms |
| **When** | Peak hours (4PM–12AM) when members are on the floor |
| **Proof** | QR scans + discount-code redemptions — performance you can track |
| **For brands** | Reach members in workout mode; INLINE runs activations (not gym staff) |
| **For gyms** | Revenue share, no hardware cost, verified uptime |
| **Next step** | Form → “We’ll share options on a call” / optional media kit |

No EGP amounts, tier names (Starter/FOCUS/Network), or revenue-share percentages on the public page.

---

## User Stories

### US-1: Brand discovers and requests contact

> As a **brand marketing manager**, I want to **understand the concept and submit my details**, so that **INLINE AD can pitch me on a call**.

**Acceptance criteria**

- [ ] I can reach the brand form in ≤2 clicks from any entry (hero or nav).
- [ ] I understand the concept (in-gym screens, peak hours, QR-tracked performance) without seeing EGP figures — pricing is “discussed with our team.”
- [ ] Form validates required fields before submit; I get on-screen confirmation (no dead submit).
- [ ] I receive expectation copy: “We respond within 2 business days.”
- [ ] Submission is stored and sales gets email/Slack notification.

### US-2: Gym owner applies to the network

> As a **gym owner**, I want to **apply without installing hardware**, so that **I can earn revenue share if I qualify**.

**Acceptance criteria**

- [ ] Separate gym form — not mixed with brand fields.
- [ ] Copy states: premium positioning, Alexandria, peak hours 4PM–12AM, compliance threshold **≥5,000 EGP/month per gym** at scale (honest: “payout grows with stacked brands”).
- [ ] I can declare branches, screens, membership tier, and contact info.
- [ ] Submission tagged `lead_type=gym` for ops review.

### US-3: Sales uses one link in outreach

> As **sales**, I want **UTM-tagged URLs and lead source**, so that **I know which campaign drove the lead**.

**Acceptance criteria**

- [ ] UTM params persist to hidden fields or metadata on submit.
- [ ] Optional `?intent=brand` or `?intent=gym` scrolls and highlights the right section.

### US-4: Mobile-first Alexandria buyer

> As a **prospect on mobile**, I want to **complete the form on WhatsApp-era devices**, so that **I don’t abandon mid-flow**.

**Acceptance criteria**

- [ ] Forms usable at 360px width; tel input opens phone keyboard.
- [ ] LCP target <2.5s on 4G (static-first implementation).

---

## Form Specifications

### Brand lead form (`lead_type: brand`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Company / brand name | text | Yes | |
| Contact name | text | Yes | |
| Work email | email | Yes | Block free-only domains optional (v2) |
| Phone (WhatsApp) | tel | Yes | Egypt +20 validation |
| Product category | select | Yes | Supplements, Sports nutrition, Fitness apparel, F&B, Other |
| Monthly marketing budget | select | Yes | `<30K`, `30–50K`, `50–100K`, `100K+` EGP — **flag &lt;30K as low fit** |
| Interest level | select | No | Exploring / Ready this quarter / Not sure |
| Campaign goal | checkboxes | No | Awareness, QR traffic, Code redemptions, Product launch |
| Preferred start month | month | No | |
| Message | textarea | No | Max 500 chars |
| How did you hear about us? | select | No | Referral, Gym, LinkedIn, Event, Other |
| Language | hidden/auto | — | From site toggle |
| UTM source/medium/campaign | hidden | — | From URL |
| Consent | checkbox | Yes | “INLINE AD may contact me about advertising.” GDPR-style short notice |

**Post-submit:** Thank-you state + optional “Book a call” Calendly link (v1.1).

### Gym partner form (`lead_type: gym`)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Gym name | text | Yes | |
| Number of branches in Alexandria | number | Yes | min 1 |
| Address / area | text | Yes | e.g. Smouha, San Stefano |
| Contact name & role | text | Yes | Owner / Manager |
| Email | email | Yes | |
| Phone (WhatsApp) | tel | Yes | |
| Approx. monthly members | select | Yes | `<200`, `200–500`, `500+` |
| Membership price band | select | Yes | `<1000`, `1000–2500`, `2500+` EGP |
| Screens available or willing to host | number | No | Default “INLINE provides screens” if 0 |
| Peak busy hours | text | No | Prefill hint: 4PM–12AM |
| Existing on-site ads? | select | No | None / Posters / TVs / Other |
| Message | textarea | No | |
| Consent | checkbox | Yes | Partnership inquiry, not a binding contract |

**Post-submit:** “We review applications weekly” — sets expectation; ops qualifies before site visit.

---

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Single-page marketing site with `#brands` and `#gyms` sections | Must |
| FR-2 | Two independent forms with distinct field sets and backend tagging | Must |
| FR-3 | Server-side or edge handler stores submissions (not email-only) | Must |
| FR-4 | Email notification to sales on each submission | Must |
| FR-5 | Client + server validation on required fields | Must |
| FR-6 | Arabic/English content (toggle or parallel strings) | Should |
| FR-7 | **No pricing** on page — concept, process, and outcomes only; optional “Request media kit” CTA | Must |
| FR-8 | Basic analytics (page views, form start, form complete) | Should |
| FR-9 | Spam protection (honeypot + rate limit or Turnstile) | Must |
| FR-10 | `robots.txt` + meta for SEO; OG image for link previews | Should |

### Non-functional

| Category | Requirement |
|----------|-------------|
| Performance | Static HTML or SSG; hero image WebP; <100KB critical CSS |
| Security | HTTPS; no secrets in client; sanitize inputs; store PII encrypted at rest if DB |
| Accessibility | WCAG 2.1 AA — labels, focus order, contrast, Arabic RTL layout |
| Privacy | Privacy note + consent checkbox; align with future GDPR/ePrivacy audit |
| Hosting | Netlify / Vercel / Cloudflare Pages — matches portfolio golden path |

---

## Recommended Technical Approach (for Tech Lead)

**MVP stack (fastest path, aligns with plan’s Supabase mention):**

| Layer | Suggestion |
|-------|------------|
| Frontend | Static HTML + CSS (Pretext/gstack) **or** Next.js single page |
| Forms | POST → Supabase `leads` table **or** Netlify Forms / Formspree for day-1 |
| Notifications | Supabase Edge Function → email (Resend) + optional WhatsApp webhook |
| CRM | Export view in Supabase; later sync to Notion/HubSpot |

**`leads` table (minimal):**

```sql
id, created_at, lead_type, payload jsonb, utm jsonb, status enum('new','contacted','qualified','lost')
```

---

## Design Notes (handoff to Nour / Iman)

- **Aesthetic:** Premium fitness — dark or high-contrast, not “startup purple.” Think gym floor + data (QR / performance).
- **Typography:** Strong Arabic pairing (e.g. IBM Plex Sans Arabic + Latin display).
- **Imagery:** Real gym screen mockups; Uphill logo only with permission.
- **CTAs:** “Get media kit” (brand) vs “Apply as a partner gym” (gym) — verb difference reduces mis-clicks.

---

## Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| User submits both forms | Allowed; sales dedupes by phone/email |
| Budget &lt;30K brand | Accept but tag `fit:low`; auto-reply sets expectations |
| Gym outside Alexandria | Accept with tag `geo:outside_alex` — sales explains expansion timeline |
| Duplicate rapid submits | Rate limit; show “already received” |
| Arabic RTL + English LTR mix | `dir` toggles on `<html>`; forms mirror correctly |
| Spam bot | Honeypot silent fail |

---

## Launch Checklist

- [ ] Domain: `inlinead.eg` or similar (confirm with Ahmed)
- [ ] Logo + Uphill partnership mention approved
- [ ] Sales notification inbox + 48h SLA documented
- [ ] Privacy policy stub linked in footer
- [ ] WhatsApp click-to-chat optional in header
- [ ] Link added to pitch deck and Uphill co-marketing

---

## Decisions (locked)

| Topic | Decision |
|-------|----------|
| **Public pricing** | **No** — concept and value only; packages and EGP discussed on sales call. |

## Open Questions (need CEO / sales input)

1. **Calendly** — book calls on thank-you page v1 or v1.1?
2. **Media kit PDF** — gated download (email) vs public?
3. **English-only brands** — default locale from browser or always Arabic first?
4. **Repo home** — new `inlinead-website` repo vs folder in existing project?

---

## Suggested Implementation Phases

| Phase | Scope | Est. |
|-------|--------|------|
| **P0** | Static landing + both forms + email notify | 3–5 days |
| **P1** | Supabase leads table + admin view + UTM | 2 days |
| **P2** | AR/EN toggle, Calendly, media kit download | 2–3 days |
| **P3** | Case study section when Brand 1 is live | 1 day |

---

*Next step: Head of Product approval → UX wireframe → Tech design → `/feature` ticket in product repo.*
