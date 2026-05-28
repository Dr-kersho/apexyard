# PRD: Sarraf OS

**Status**: Draft — In Review  
**Author**: Hanan (Product Analyst) + Mariam (PM)  
**Created**: 2026-05-24  
**Last Updated**: 2026-05-24  
**Related**: [Elite Telegram PRD](../elite-telegram/prd.md) (customer #1 / exchange ops)  
**Technical design**: [technical-design.md](./technical-design.md)

---

## Overview

### Problem Statement

Thousands of independent operators run informal USD→local currency exchange businesses on Telegram — exactly like Mazen (Elite Telegram). They quote rates in DMs, chase screenshots, disburse via InstaPay/local rails, and retain clients through personal trust. Revenue is capped because **the operator is the product**: 80%+ of time is spent in chat, with no CRM, no margin visibility, and no way to scale without cloning themselves.

No vertical software exists for this job. DIY stacks (Make + Airtable + Claude) are fragile, expensive, and not exchange-aware. Generic chatbots lack OKX rate feeds, Payoneer fee math, Franco Arabic voice, and escalation rules.

**Sarraf OS** sells the operating system — bot, rate engine, CRM, AI agent — as a **B2B subscription** so operators like Mazen can launch in 24 hours and scale without hiring developers.

### Target User

**Primary — The Telegram Operator (buyer / subscriber)**  
Solo founder or 2–3 person team running a Telegram-based currency exchange. 500–10K channel followers, $500K–$5M annual volume, $500–$5K/mo revenue today. Egypt/MENA/diaspora corridors first. Trust-based, word-of-mouth growth, manual DMs today.

**Secondary — End client (operator's customer)**  
Freelancers receiving USD via Payoneer/Wise/PayPal — **not** Sarraf OS buyers. They interact with the operator's white-label bot; they never see "Sarraf OS" unless disclosed.

**Customer #0 (internal)**  
Mazen / Elite Telegram — free lifetime Pro tenant for case study + 3 warm operator intros.

### Goals

1. **Validate B2B demand** — Operator #2 live on platform within 30 days of MVP tenant refactor.
2. **Reach $70K ARR** within 18 months (50–150 paying operators at $79–199/mo blended).
3. **Time-to-live ≤ 24 hours** — New subscriber: signup → BotFather token → configured bot handling rate inquiries.
4. **Preserve operator trust** — Configurable AI voice; human escalation; no cross-tenant data leakage.

### Non-Goals (Out of Scope — v1 B2B)

- Licensing or operating exchange on behalf of subscribers (platform = software only)
- Consumer-facing Sarraf brand competing with operators
- WhatsApp / other channels (Telegram-only v1)
- Full KYC/AML compliance engine (disclaimers + operator responsibility)
- Marketplace connecting operators to each other's liquidity
- Venture-scale TAM expansion (jobs/wholesaling verticals) before operator #2 proves core loop

### Success Metrics

| Metric | Target (12 mo) | How Measured |
|--------|----------------|--------------|
| Paying operators | 30+ | Stripe/Paymob billing |
| Operator #2 live (non-Mazen) | 1 within 30 days of tenant MVP | Deployment + ≥20 real txs |
| Subscriber time-to-live | ≤ 24 hours p50 | Onboarding funnel timestamps |
| Operator retention (monthly) | ≥ 85% | Churn / active subs |
| MRR | $5K+ by month 12 | Billing |
| NPS (operators) | ≥ 40 | Quarterly survey |

---

## Product positioning

**Name:** Sarraf OS (صراف — money changer)  
**Tagline:** *Launch your AI-powered Telegram exchange bot in 24 hours.*

**Value prop:** Rates, CRM, transaction flow, and an AI that sounds like **you** — not a generic chatbot. Built for operators who run on trust, not apps.

**Differentiation:**

| Alternative | Sarraf OS |
|-------------|-----------|
| Manual DMs | Automated 80% of interactions |
| DIY Make+Airtable+Claude | Domain logic maintained; one deploy |
| Generic bot builders | OKX rates, fee engine, InstaPay flow, escalation |
| Licensed fintech apps | Community/trust model preserved |

---

## Pricing model

| Tier | USD/mo | EGP equiv. (~) | Includes |
|------|--------|----------------|----------|
| **Trial** | $0 | — | 14 days; 1 bot; 50 clients; rate engine; no AI |
| **Starter** | $79 | ~3,900 EGP | 1 bot; 500 clients; CRM; rate override; email support |
| **Pro** | $199 | ~9,800 EGP | + configurable AI voice; segments; import tool; priority support |
| **Scale** | $499+ | Custom | + API access; SLA; onboarding call; multi-seat |

**Add-on (optional v2):** $0.02 per completed transaction recorded above tier limit.

**Founder policy:** Mazen = lifetime Pro (case study + 3 intros). Operator #2 = 90-day free Pro pilot.

**Billing:** Stripe (global) + Paymob (Egypt) — v1 may Stripe-only.

---

## User Stories

### US-1: Operator signup

> As a new operator, I want to create an account and connect my Telegram bot token, so that Sarraf OS receives my client messages.

**Acceptance Criteria**:

- [ ] Email + password or magic link signup
- [ ] Paste BotFather token; validated via Telegram `getMe`
- [ ] Webhook registered automatically to Sarraf-hosted URL with tenant-scoped secret
- [ ] Operator sees "bot connected" within 5 minutes

### US-2: Configure my voice (critical for B2B)

> As an operator, I want to customize greeting phrases, emoji style, and language mix, so that the AI sounds like my brand — not another operator.

**Acceptance Criteria**:

- [ ] Dashboard: persona name, greeting templates, key phrases (Franco/Arabic/English)
- [ ] System prompt assembled from template + operator config (not hardcoded Mazen)
- [ ] Preview chat in dashboard before publish
- [ ] Default templates provided (operator can start from "Sarraf default" or clone Elite-style)

### US-3: Configure rates and fees

> As an operator, I want to set my spread, welcome bonus, and platform fee rules, so that quotes and profit calc match my business.

**Acceptance Criteria**:

- [ ] Spread (EGP below OKX sell rate)
- [ ] Welcome bonus for new clients (optional)
- [ ] Payoneer/Wise/PayPal fee rules (editable)
- [ ] Manual rate override toggle
- [ ] Internal trader names never exposed to end clients

### US-4: Operator dashboard — clients & revenue

> As an operator, I want to see all clients, transactions, and profit, so that I know if my business is healthy.

**Acceptance Criteria**:

- [ ] Client list with tier, LTV, last activity
- [ ] Transaction list with margin % and status
- [ ] Summary: volume, profit (7d / 30d)
- [ ] Export CSV

### US-5: End client — unchanged experience

> As an operator's client, I want the same Telegram DM experience (onboarding, rate, transfer), so that trust is preserved.

**Acceptance Criteria**:

- [ ] 9-step onboarding (configurable question set v2; fixed v1)
- [ ] `/transfer` flow works per tenant config
- [ ] Escalation to operator's Telegram ID (not Mazen's)

### US-6: Billing and plan limits

> As Sarraf OS, I want to enforce plan limits and bill monthly, so that the business is sustainable.

**Acceptance Criteria**:

- [ ] Stripe subscription on signup (post-trial)
- [ ] Soft limit warnings at 80% client cap
- [ ] Graceful degrade or upgrade prompt at limit (not hard lock mid-transaction)

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1 | Multi-tenant data isolation (`tenant_id` on all rows) | Must | See technical-design |
| FR-2 | Operator auth + dashboard (web) | Must | v1 minimal |
| FR-3 | Per-tenant Telegram webhook routing | Must | `/webhook/telegram/:tenantSlug` |
| FR-4 | Configurable AI system prompt builder | Must | Blocker for operator #2 |
| FR-5 | Per-tenant rate/spread/fee config | Must | |
| FR-6 | Per-tenant escalation target (operator chat ID) | Must | |
| FR-7 | Postgres CRM (clients, transactions) | Must | Replace Airtable as SoT |
| FR-8 | Stripe billing + plan tiers | Must | |
| FR-9 | Self-serve onboarding wizard | Should | Can be concierge for #2 |
| FR-10 | Telegram JSON import per tenant | Should | From elite-telegram script |
| FR-11 | White-label bot name/description helper | Could | BotFather instructions |
| FR-12 | Paymob for EGP billing | Could | Egypt operators |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Security | Zero cross-tenant data access | Enforced at DB + API layer |
| Security | Bot tokens encrypted at rest | AES-256 or KMS |
| Performance | Webhook response | < 3s p95 (Telegram timeout) |
| Availability | Platform uptime | 99.5% (v1) |
| Compliance | Platform liability | Operator is merchant; ToS disclaimers |

---

## Tenant configuration model (product)

Each subscriber gets a **Tenant** with:

| Config area | Examples | Editable in dashboard |
|-------------|----------|----------------------|
| **Brand voice** | Greeting, "king" vs custom, emoji level, Franco phrases | Yes |
| **Rates** | Spread, welcome bonus, manual override | Yes |
| **Fees** | Payoneer $4/&lt;$400, Wise %, etc. | Yes |
| **Escalation** | Operator Telegram ID, $ threshold | Yes |
| **Bot** | Token (encrypted), webhook status | Yes |
| **Plan** | Starter / Pro / limits | Billing portal |

**Not configurable v1:** OKX feed source, core transaction state machine, escalation marker semantics.

---

## Roadmap

| Phase | Scope | Duration |
|-------|-------|----------|
| **0** | Mazen on single-tenant MVP (elite-telegram) | Done |
| **1** | Tenant model + Postgres + configurable voice | 3–4 weeks |
| **2** | Operator dashboard (clients, txs, config) | 2–3 weeks |
| **3** | Operator #2 concierge pilot | 2 weeks |
| **4** | Stripe billing + self-serve signup | 2–3 weeks |
| **5** | Public launch + Mazen case study | Ongoing |

---

## Go-to-market

1. **Case study:** Mazen — before/after metrics (DM time, margin visibility)
2. **Warm intros:** 3 operators from Mazen's network (non-competing corridors)
3. **90-day free Pro** for operator #2
4. **Content:** "How I automated my Telegram exchange" (AR/EN)
5. **Landing page:** sarraf.os or similar — waitlist + demo video

---

## Risks

| Risk | Mitigation |
|------|------------|
| Regulatory (exchange software) | Platform ≠ money transmitter; operator ToS; legal review |
| Small TAM | Bootstrap; niche profitability; expand corridors later |
| Mazen voice hardcoded in code | Phase 1 priority: configurable prompt |
| Telegram API changes | Abstract bot layer; monitor Bot API changelog |
| Operator churn after setup | Concierge onboarding; ROI dashboard |

---

## Open Questions

| Question | Owner | Status |
|----------|-------|--------|
| Separate repo `sarraf-os` vs rename `elite-telegram`? | Khalid | Open — recommend same repo, product rename at v0.2 |
| Domain / brand: sarraf.os, sarraf.io? | Mazen + PM | Open |
| Stripe vs Paymob first for Egypt operators? | PM | Open — Stripe first |
| Operator #2 identity / intro timeline? | Mazen | Open |

---

## Approvals

| Role | Name | Status |
|------|------|--------|
| Product Analyst | Hanan | Author |
| Product Manager | Mariam | Draft |
| Founder (customer #1) | Mazen | Pending |
| Head of Engineering | Khalid | Pending |
| Head of Product | Omar | Pending |
