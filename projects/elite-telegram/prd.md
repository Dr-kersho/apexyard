# PRD: Elite Telegram

**Status**: Draft — In Review  
**Author**: Mariam (Product Manager)  
**Created**: 2026-05-24  
**Last Updated**: 2026-05-24  
**Source**: `projects/elite-telegram/Elite_Telegram_PRD.md` v1.0  
**Stakeholders**: Mazen (Founder & CFO), Adam/Youssef (Partner — Client Relations)

---

## Overview

### Problem Statement

Elite Telegram has grown to 5,200+ channel followers and $2M+ in exchange volume through word-of-mouth, but the business runs entirely on Mazen's manual DMs. Client data lives in chat history, rates are calculated ad hoc, profit margins are opaque, and 80%+ of interactions require human attention. This caps revenue (~$1,000/month today) and blocks scaling across exchange, jobs, wholesaling, and financial services.

### Target User

**Primary**: Egyptian freelancers and remote workers (cold callers, VAs, developers) who receive USD via Payoneer, Wise, PayPal, or ACH and need fast, trusted USD→EGP settlement via InstaPay.

**Secondary**: Recruiters posting remote jobs to the Elite community; acquisition managers for the wholesaling vertical; existing clients as upsell targets for virtual card and training.

### Goals

1. **Automate exchange operations** — AI agent handles ≥80% of client DMs within 30 days of MVP launch.
2. **Centralize client intelligence** — 100% of active clients (300–400 DMs + new leads) profiled in CRM within 60 days.
3. **Improve margin capture** — Live OKX rate + automated profit calc on every transaction; target $10K/month revenue within 6 months.
4. **Preserve community trust** — Franco Arabic voice, human escalation for high-value/dispute cases, no exposure of internal trader margins.

### Non-Goals (Out of Scope for MVP)

- Virtual credit card service (Phase 6 — Month 2–3)
- Paid cold-calling training product (Phase 7 — Month 3)
- Job marketplace monetization (featured listings, subscriptions — Phase 4)
- Full real estate wholesaling CRM and deal pipeline (parallel business track; separate scope)
- Lead Investors partnership restructure tooling
- Native mobile app or Telegram Mini App (bot + Airtable + Make.com stack only for v1)
- Multi-trader expansion beyond Superfast and Jo
- Automated Payoneer/Wise payment initiation (clients still send manually)

### Success Metrics

| Metric | Baseline | Target (90 days) | How Measured |
|--------|----------|------------------|--------------|
| Monthly exchange revenue | ~$1,000 USD | $10,000 USD (6 mo) | Airtable transaction profit rollup |
| AI-handled interactions | 0% | 80% | Bot vs Mazen escalation ratio |
| CRM client coverage | 0% | 100% of active DMs | Airtable Client Profile count |
| Channel daily views | ~500 | 2,000 | Telegram channel analytics |
| First wholesaling deal | — | Closed within 30 days | Manual deal tracker (out of MVP) |
| First paid job listing | — | Within 45 days | Manual (Phase 4) |

---

## MVP Scope Cut

### P0 — Must ship (Weeks 1–3): Exchange Operating System

Core thesis: **automate the money-making loop first** — rate inquiry → onboarding → transaction → CRM record → profit calc.

| ID | Capability | Rationale |
|----|------------|-----------|
| P0-1 | Airtable CRM — Client Profile + Transaction tables (all P0 fields) | Single source of truth; enables LTV, dormancy, segmentation |
| P0-2 | Telegram bot — webhook receiver + outbound replies | Client-facing interface |
| P0-3 | New-client onboarding flow (9 questions, inline buttons) | Captures profile data; +0.25 EGP welcome bonus |
| P0-4 | Live rate calculator — OKX USDT/EGP feed (60s) + Mazen manual override | Accurate quotes; margin protection |
| P0-5 | Claude AI agent — Elite system prompt, Franco Arabic voice, escalation rules | Replaces 80% of Mazen DMs |
| P0-6 | Transaction recording — auto-calc fees, divisors, USDT, profit, margin % | Business intelligence |
| P0-7 | Make.com (or equivalent) orchestration — Telegram ↔ Airtable ↔ Claude | Connects stack without custom infra |
| P0-8 | Mazen escalation path — notify on >$2K, disputes, low confidence | Trust + compliance safety valve |

### P1 — Should ship (Weeks 3–4): Data & Retention

| ID | Capability | Rationale |
|----|------------|-----------|
| P1-1 | Telegram JSON export analyzer — classify contacts, reconstruct transactions | Bulk import 300–400 existing clients |
| P1-2 | Existing-client profile update broadcast + bot re-onboarding | CRM completeness |
| P1-3 | Client segments (VIP, Dormant 30/60/90, Competitor Shopper, etc.) | Targeted re-engagement |
| P1-4 | Dormant client re-engagement messages (AI-generated, Mazen-approved templates) | Revenue recovery |
| P1-5 | Post-transaction channel feedback request | Social proof loop |
| P1-6 | End-of-day batch tracking (Superfast / Jo) | Settlement reconciliation |

### Later — Backlog (Month 2+)

| ID | Capability | Phase |
|----|------------|-------|
| L-1 | Channel reactivation content calendar (7-day plan) | Phase 4 |
| L-2 | Job marketplace — free cap + featured paid listings | Phase 4 |
| L-3 | Wholesaling lead CRM + acquisition manager workflow | Phase 5 |
| L-4 | Virtual credit card service | Phase 6 |
| L-5 | Paid cold-calling training sessions | Phase 7 |
| L-6 | Email list capture (secondary channel) | Risk mitigation |
| L-7 | Birthday / ambassador marketing automations | P2 CRM fields |

---

## User Stories

### US-1: Rate inquiry (existing or new client)

> As a freelancer, I want to ask the bot for today's Payoneer rate in Franco Arabic, so that I can decide whether to exchange now.

**Acceptance Criteria**:

- [ ] Bot responds within 30 seconds with live OKX-derived rate (or Mazen override if set)
- [ ] Response uses Elite voice ("eh el a5bar ya king", fire/money emojis)
- [ ] New clients see +0.25 EGP welcome bonus mention on first rate quote
- [ ] Rate never exposes Superfast, Jo, or internal margin

### US-2: New client onboarding

> As a first-time client, I want to answer simple button questions in Telegram, so that Elite knows my profile before my first transfer.

**Acceptance Criteria**:

- [ ] Bot asks 9 onboarding questions one at a time with inline keyboard buttons
- [ ] Full name captured as free text (only non-button step)
- [ ] Each answer creates/updates Airtable Client Profile
- [ ] Flow ends with current rate + invitation to start first transaction
- [ ] Welcome bonus (+0.25 EGP) applied to quoted rate for new clients

### US-3: Guided transaction flow

> As a client sending USD, I want step-by-step guidance through amount → platform → InstaPay → confirmation, so that I know exactly what to do.

**Acceptance Criteria**:

- [ ] Bot asks "kam el amount?" and validates platform (Payoneer / Wise / PayPal / ACH)
- [ ] Platform fee auto-calculated ($4 flat below $400, 1% above for Payoneer)
- [ ] Bot collects InstaPay phone and confirms EGP payout amount
- [ ] On screenshot/confirmation, transaction record created in Airtable with status Pending → Confirmed → Complete
- [ ] Post-completion: "Done - hayewsalak halan" + channel feedback ask

### US-4: Mazen escalation

> As Mazen, I want high-risk conversations routed to me immediately, so that I never lose trust on big deals or disputes.

**Acceptance Criteria**:

- [ ] Auto-escalate: transactions >$2,000 USD
- [ ] Auto-escalate: payment disputes, missing funds, competitor edge cases agent is unsure about
- [ ] Escalation sends Mazen a Telegram notification with chat context + client Airtable link
- [ ] Bot tells client human follow-up is coming (no dead air)

### US-5: Profit visibility (internal)

> As Mazen, I want every transaction to show profit in EGP and margin % automatically, so that I know if I'm underpricing.

**Acceptance Criteria**:

- [ ] Transaction table auto-calculates: platform fee, net USD, USDT (motion divisor 1.008–1.010), EGP paid, EGP received, profit, margin %
- [ ] Trader field: Superfast or Jo; settlement method recorded
- [ ] Rate calculator supports manual override without breaking historical records

### US-6: Bulk client import from chat history

> As Mazen, I want to import 300–400 existing Telegram chats into the CRM, so that I stop relying on memory.

**Acceptance Criteria**:

- [ ] Script accepts Telegram desktop JSON export
- [ ] Detects: bank screenshots, InstaPay numbers, language, job-seeker context, competitor mentions, referrals
- [ ] Outputs Airtable-ready CSV or API bulk create
- [ ] Flags unanswered chats and >6h reply delays
- [ ] Estimates LTV and last contact date where inferable

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| OKX API down | Fall back to last cached rate; Mazen manual override; bot discloses "rate updated manually" |
| Client sends amount >$2,000 | Bot quotes rate but escalates before confirming; Mazen completes |
| Client compares competitor rate | Agent uses retention script; may offer improved rate within policy; never reveals margin |
| Duplicate InstaPay / returning client | Match by Telegram user ID; update existing profile, skip full onboarding |
| Client asks about jobs / wholesaling / virtual card | Agent acknowledges vertical, captures intent tag; exchange flow unchanged for MVP |
| Wise/PayPal fee structure differs from Payoneer | Calculator applies correct fee rules per platform (define in tech design) |

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1 | Telegram bot via BotFather with webhook mode | Must | P0 |
| FR-2 | Airtable base: Clients + Transactions with P0 fields | Must | Linked records |
| FR-3 | OKX public API USDT/EGP poll every 60s | Must | Cache + override |
| FR-4 | Claude Sonnet agent with Elite system prompt | Must | Escalation rules embedded |
| FR-5 | Onboarding flow — 9 questions, inline buttons | Must | See §7.2 source PRD |
| FR-6 | Transaction fee engine — Payoneer $4/<$400, 1%/>$400 | Must | Extend per platform in tech design |
| FR-7 | Conversion divisor selector — 1.008 / 1.009 / 1.010 | Must | Per trader |
| FR-8 | Make.com scenarios: message in → AI → reply out → Airtable write | Must | Or n8n/self-hosted if cost-driven |
| FR-9 | Mazen escalation notifications | Must | Telegram admin chat |
| FR-10 | Chat export analysis script | Should | P1 |
| FR-11 | Client segment views in Airtable | Should | VIP, Dormant, etc. |
| FR-12 | Dormant re-engagement campaign templates | Should | AI-drafted, Mazen-triggered |
| FR-13 | Job post monetization | Could | Later |
| FR-14 | Wholesaling CRM | Could | Later — parallel track |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Bot reply latency (excl. AI) | < 3s p95 |
| Performance | AI response generation | < 15s p95 |
| Security | Bot token, Claude key, Airtable PAT | Env vars only; never in repo |
| Security | Client PII (InstaPay, email) | Airtable access restricted to Mazen |
| Reliability | Rate feed fallback | Cached rate + manual override |
| Compliance | Currency exchange in Egypt | Legal review before public automation scale |
| Trust | Agent must not impersonate beyond Mazen-approved voice | System prompt + escalation |

---

## Design

### User Flow — New Client Exchange

```
[Client opens bot / sends message]
        |
        v
[AI greeting — Franco Arabic + welcome bonus]
        |
        +---> [New client] --> [9-step onboarding] --> [Airtable profile created]
        |
        +---> [Returning client] --> [Lookup by Telegram ID]
        |
        v
[Rate quote — live OKX + bonus if new]
        |
        v
[Transaction flow: amount → platform → InstaPay → confirm]
        |
        +---> [>$2K or dispute] --> [Escalate to Mazen]
        |
        v
[Airtable transaction record — profit calc]
        |
        v
[Confirmation + channel feedback ask]
```

### Wireframes / Mockups

_TBD — bot UX is conversational; inline keyboard layouts documented in tech design._

---

## Technical Notes

### Dependencies

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| Telegram Bot API | External | Ready | Mazen (BotFather) |
| Airtable | External | Needs base setup | Mazen |
| Make.com | External | Needs account + scenarios | Mazen |
| Claude API (Sonnet) | External | Needs API key | Mazen |
| OKX Public API | External | Ready | Engineering |
| App repo `Dr-kersho/elite-telegram` | Internal | **Not created** | Platform |
| Mercury / InstaPay | External | Operational | Mazen |

### Technical Constraints

- v1 stack is **no-code/low-code first** (Make.com + Airtable) per source PRD; app repo holds AI prompt, export analyzer, rate service, and documentation.
- Telegram is sole client channel for MVP; no web dashboard required for launch.
- Internal trader names (Superfast, Jo) and margin logic must never leak to client-facing agent output.
- Chat export processing runs locally (privacy — full DM history stays off cloud except structured CRM fields).

### Recommended App Repo Layout (when created)

```
elite-telegram/
├── prompts/elite-system.md      # Claude agent system prompt
├── scripts/import-telegram-json/ # P1 bulk CRM import
├── services/rate-calculator/     # OKX poll + override API (optional if Make-only)
├── docs/CONTEXT.md
└── .env.example
```

---

## Launch Plan

### Rollout Strategy

- [x] ~~Beta~~ — Existing 300–400 clients *are* the beta community
- [x] Phased rollout
  1. **Week 1–2**: Internal — Mazen tests bot + rate calc with fake chats
  2. **Week 2–3**: New clients only — AI onboarding live
  3. **Week 3–4**: Broadcast to existing clients — profile update campaign
  4. **Week 4+**: Full AI handling with Mazen escalation

---

## Open Questions

| Question | Owner | Status | Notes |
|----------|-------|--------|-------|
| Make.com vs self-hosted n8n/webhook service? | Tech Lead + Mazen | Open | Cost vs control |
| Wise / PayPal / ACH fee rules — exact formulas? | Mazen | Open | PRD specifies Payoneer only in detail |
| Airtable vs migrate to XPORT CRM later? | Mazen + Ahmed | Open | xport-crm in same portfolio |
| Dedicated ticket prefix (ELT?) vs GH? | PM | Open | Registry currently GH |
| Legal sign-off for automated exchange quotes in Egypt? | Mazen + legal | Open | Risk §14 |
| Adam partnership written agreement before wholesaling? | Mazen + Adam | Open | Risk §14 |
| Bot hosted where? (Vercel serverless, Railway, VPS) | Tech Lead | Open | Webhook latency |
| Will Mazen review AI replies before send initially? | Mazen | Open | Trust ramp |

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Source PRD imported | 2026-05-24 | Done |
| Normalized PRD + MVP cut | 2026-05-24 | Done |
| PRD approved (Mazen) | 2026-05-31 | Pending |
| App repo created + handover | 2026-05-31 | Pending |
| Phase 1 — Foundation live | 2026-06-07 | Pending |
| Phase 2 — AI agent live | 2026-06-14 | Pending |
| Phase 3 — CRM import complete | 2026-06-21 | Pending |
| New-client AI automation GA | 2026-06-28 | Pending |

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | Mariam | 2026-05-24 | Author |
| Founder / CEO | Mazen | | Pending |
| Partner (Client Relations) | Adam | | Pending |
| Tech Lead | Ahmed | | Pending |
