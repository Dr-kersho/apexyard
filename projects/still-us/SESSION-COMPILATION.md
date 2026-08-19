# Still Us — Full Session Compilation

**Compiled**: 2026-08-17
**Purpose**: Single reference document to compare this project's business case against other opportunities. Contains the full decision trail — idea → validation → market research → PRD v2 → technical design → architecture review — plus a plain-language summary at the top for fast comparison.

**Repo**: `Dr-kersho/still-us` (private — owner-created)
**Portfolio status**: `planning` in `apexyard.projects.yaml`
**Tracking ticket**: [Dr-kersho/apexyard#38](https://github.com/Dr-kersho/apexyard/issues/38)

---

## TL;DR — for comparing against another project

**What it is.** A mobile app (iOS + Android) for couples with a baby aged 0–18 months. Three layers: free baby tracking with real-time two-parent sync, a paid AI "companion" avatar that ages alongside the real child, and a paid couple-relationship layer that nudges partners to stay emotionally connected. The name and entire brand thesis: *"Two in three couples say their relationship got worse after the baby. We built an app about that."*

**Why it might make money.**
- Real, large, growing market: parenting apps are $1.1–1.9B in 2026, heading to $3.5–5.4B by 2034–35 (7.6–13.4% CAGR)
- Real, well-documented pain: 67–90% of couples report relationship decline in exactly the age window this targets — one of the most replicated findings in relationship psychology
- A genuinely open gap: no competitor combines baby tracking + couple-relationship wellness. Verified by live search, not assumption
- Comparable products prove people pay: OurFamilyWizard sustains $220–600/family/year; Cozi's free-to-paid conversion has run for two decades
- Planned pricing: free tier for tracking (acquisition) + £6.99/mo or £69/yr family tier (the real product)

**Why it might not — the honest risks.**
- **Capital is already moving into adjacent territory.** Nanit raised $50M in Dec 2025 specifically to build "AI Parenting Intelligence." Huckleberry has $16M. If either pivots into relationship features, the moat narrows fast.
- **Cost structure is unresolved and could be brutal.** At 100k families logging ~10 events/day, naive architecture is ~1M LLM calls/day before advice, tasks, and nudges — against a £6.99/month price point. This was flagged as possibly *existential* by the architecture review and is not yet modelled.
- **Regulatory exposure is real and high-stakes.** Child data (COPPA) + partner biological/mood data (GDPR Article 9 special category) in one system is a hard combination. A DPIA is very likely mandatory. Legal review is on the critical path and currently blocking.
- **The core privacy mechanism, as first designed, didn't work.** An independent architecture review found that the "safe" way the app was going to tell one partner about the other's mood actually leaked that exact private information through a predictable pattern. It's fixable (see below) but shows how easy it is to get subtle details wrong in this space — and getting it wrong is a regulatory and trust disaster, not just a bug.
- **This is a hard build, not a weekend MVP.** Full technical design plus an independent architecture review surfaced 9 blocking engineering issues before Build can even start. Estimated 3–5 days of design rework alone, then a multi-month build (UK launch not modelled before ~Feb 2027 in the current timeline).
- **No absent-parent population size has been found.** This is a named gap in the PRD — nobody has quantified how many parents this even applies to. That's the first question any investor will ask, and it's currently unanswered.

**Time-to-revenue, as currently planned:** ~6 months to UK beta, ~7–8 months to UK launch, UAE launch ~2 months after that. That is *if* the repo exists, the 9 architecture blockers get fixed, legal review clears, and a small team executes without major slippage — none of which has started yet.

**Bottom line for "which project makes money faster."** This is a real opportunity with genuine differentiation and a well-evidenced human problem behind it — but it is a **capital- and time-intensive build** (mobile app, AI infra, regulatory review, ongoing LLM costs) with a **long runway before first revenue** and a **cost model that isn't proven to work at the target price point yet**. If the comparison project can generate revenue faster with less regulatory and infrastructure risk, that is a legitimate reason to prioritise it first and treat Still Us as the second move, not necessarily the first.

---

## Table of contents

1. [Session narrative — how we got here](#session-narrative)
2. [IDEA-002 — original capture](#idea-002)
3. [Validation — GREEN verdict](#validation)
4. [Market research — full report](#market-research)
5. [PRD v2 — full product requirements](#prd)
6. [Technical design — full architecture](#technical-design)
7. [Architecture review — full independent review](#architecture-review)
8. [Current state and what's blocking](#current-state)

---

<a name="session-narrative"></a>
## 1. Session narrative — how we got here

1. **Idea captured** (`/idea`) — a co-parenting app concept with AI personas for mum, dad, and baby, syncing tasks and milestones with live notifications between parents.
2. **Validated** (`/validate-idea`) — five-question gate (target user, current alternative, smallest testable version, kill criteria, build/buy/rent). Verdict: **GREEN**.
3. **PRD v1 written** (`/write-spec`) — full PRD with three layers ordered Baby → Co-parenting → Couple.
4. **Market research requested** — "before this step, is there a market need for this, make a full market research." A product-analyst-style research pass (live web search, since the framework's automated deep-research agent hit a session limit) covered market size, competitor landscape, funding, validated pain points, monetisation, gap analysis, and UAE market fit.
5. **Research findings inverted a key assumption.** The AI baby avatar — treated as the primary moat in v1 — turned out to be commodity (6+ apps already sell it under $20). The real, uncontested gap was the couple-relationship layer, evidenced by the 67–90% relationship-decline statistic.
6. **PRD amended to v2** — 8 amendments: couple layer promoted to lead position and to `Must` priority, avatar repositioned as "companion not generator," new Competitive Response section (Nanit, Huckleberry), new per-family Pricing section, absent-parent population flagged as an open research gap, UK-first launch sequencing with UAE gated on cultural research, timeline rebaselined.
7. **Project onboarded into the portfolio** — named **Still Us**, registered in `apexyard.projects.yaml` as `planning`, artefacts moved into `projects/still-us/`. GitHub repo creation was attempted but blocked (session's GitHub access is scoped to the ops repo only) — **repo creation is an owner action still pending**.
8. **Technical design written** — system architecture, data model, module decomposition, decision points requiring formal AgDRs before being settled.
9. **Independent architecture review requested and completed** — Head of Engineering persona reviewed the design against the PRD, the market research, and the portfolio's engineering standards. **Verdict: REQUEST CHANGES**, with 9 blocking findings and 12 non-blocking findings. Full text in §7 below.
10. **This compilation requested** — "I need a .md file of the whole chat and project as I need to compare with project to start on that will actually be lucrative as I need money really."

---

<a name="idea-002"></a>
## 2. IDEA-002 — original capture

**Category:** New Product
**Submitter:** Cursor
**Date:** 2026-06-03
**Status:** SPECCED (advanced from NEW after PRD v2)

> A co-parenting app with AI personas for mum, dad, and baby — syncing parenting tasks, milestone advice, and live child-care updates between parents in real time, so wherever either parent is, both feel present.

Original user framing (verbatim, lightly summarised from the source prompt): an app with a mum interface and a dad interface for kids aged 0 and up, where parents upload their and the baby's photos and an AI version of the baby is created, plus separate AI interfaces for mum and dad — the mum's AI gives parenting advice and shows milestone steps; the dad's AI gets notified and has his own tasks; the mum gets notified about the dad's tasks too, so wherever and whenever the parents are, if one parent has the child, it's like the other parent does too, via live notification.

The idea evolved through conversation to add the couple-relationship layer: biological cycle logging, and a male AI persona that nudges the dad to reach out romantically to the mum so the couple remembers they are partners, not just co-parents.

---

<a name="validation"></a>
## 3. Validation — GREEN verdict

**Date**: 2026-06-03 · **Verdict**: **GREEN**

### Q1. Target user
First-time parents of a 0–18-month-old where one parent works away from home or travels regularly — the parent who is physically absent but wants to feel present in their child's day and maintain their connection as a partner, not just a co-parent.

### Q2. Current alternative
A patchwork today: TinyPal / Onoco for activity tracking with basic partner sync, Huckleberry for sleep coaching, WhatsApp/voice notes for real-time co-presence. No identified app offers AI personas per family member or an aging baby avatar. Closest pre-launch threats at the time: Trove and Kidli (named in The Atlantic, Sept 2025).

### Q3. Smallest version
A WhatsApp/Telegram bot where one parent logs a feed or sleep event, and the other instantly receives a message in the baby's AI voice — e.g. *"I just had 120ml and I'm feeling sleepy 😴 — Dad, set up the cot."* Single persona, single data type, two parents connected. The baby avatar ages in real time, driven by DOB and milestone data.

### Q4. Kill criteria
**Kill signal:** If retention data at 4–6 weeks shows parents messaging each other *less* than before using the app — i.e. the AI mediates communication instead of catalysing it. Measurable via direct parent-to-parent message volume vs. week-1 baseline.

**Inverse signal (the core bet):** The male AI avatar nudges the dad — "she hasn't heard from you in 48 hours" — so the mum receives something that feels like her partner, not an algorithm.

### Q5. Build / buy / rent
**BUILD.** The moat is emotional design, not technology: aging AI baby persona, real-time co-presence loop, couple relationship layer tied to biological cycles. No single competitor combines all three.

### Read-out
Market gap confirmed by external search. Target user concrete. Kill criterion measurable. Differentiator emotional rather than infrastructural — harder to copy than a feature list.

---

<a name="market-research"></a>
## 4. Market research — full report

**Date**: 2026-08-17 · **Verdict**: **Real market need — but the moat is not where the PRD originally assumed.**

### Executive summary

The market need is real and quantified. The parenting-app market is growing at 7.6–13.4% CAGR toward $3.5–5.4B by 2034–35, capital is actively flowing into AI-powered parenting (Nanit's $50M in Dec 2025), and the couple-relationship problem this app targets is one of the best-documented findings in relationship psychology — **67% of couples report declining relationship satisfaction after a baby, with some studies putting it as high as 90%.**

However, this research changed one core assumption from the original validation. **The AI baby avatar is not a differentiator — that space is already crowded.** At least six standalone apps generate AI baby faces today, several with age progression, priced at $9.99–19.99 one-time. What none of them do is tie the avatar to a real child's live data and age it alongside the actual baby.

The genuinely uncontested ground is the **couple-relationship layer inside a parenting app**. No competitor found addresses relationship maintenance between partners as part of a baby-tracking product.

### A. Market size

| Metric | Figure |
|--------|--------|
| Parenting apps market, 2026 | $1.14B – $1.93B (estimates vary by methodology) |
| Projected 2035 | $3.53B @ 13.43% CAGR |
| Alternative projection, 2034 | $5.4B @ 7.6% CAGR |
| Parents using a parenting app weekly (children under 10) | 72% |
| Millennial parents using digital tools for health tracking/scheduling | 68% |

All sources agree on double-digit or near-double-digit growth; absolute figures vary because firms define "parenting app" differently.

### B. Competitor landscape

**Baby tracking**

| App | Funding | Model | Notes |
|-----|---------|-------|-------|
| Huckleberry | $16M total; $12.5M led by Morningside Ventures | Freemium + subscription | AI sleep coaching. a16z-backed. |
| Nanit | **$50M growth round, Dec 2025** | Hardware + subscription | Explicitly building an "AI-powered Parenting Intelligence System". Best-funded direct threat. |
| Cradlewise | a16z-backed | Hardware + app | Smart bassinet with AI sleep detection. |
| Onoco | £300K+ crowdfunding (London) | Freemium | Real-time two-parent sync — closest existing analog to the co-presence layer. |
| TinyPal | Not disclosed | Freemium | Sleep/feeding/mood tracking with AI features and shared parent access. |
| Glow Baby / Sprout / BabyConnect | Various | Freemium | Established trackers, basic partner sharing, no AI persona layer. |
| **Wren: Baby Log for Two** (found later, during naming search) | — | Paid app | Two-parent baby log, iCloud-synced, no server, no AI voice layer. Direct competitor on the co-presence mechanic specifically. |

**Co-parenting coordination**

| App | Pricing | Notes |
|-----|---------|-------|
| OurFamilyWizard | $110–$299.88/yr **per parent** → **$220–$599.76 per family/yr** | Built for separated/divorced parents. Proves families will pay premium prices for co-parenting coordination — but in a legal-urgency context that doesn't apply here. |
| TalkingParents | Subscription | Same separated-parent segment. |
| Cozi | Free; $29.99/yr premium | General family organiser, not baby-specific. |

**AI baby avatar — crowded, contrary to prior assumption**

| App | Pricing | Capability |
|-----|---------|------------|
| SeeYourBabyAI | $9.99 standard / $19.99 HD, one-time | 8 baby images per session from parent photos |
| Overchat AI | Freemium | Widest age range: baby → toddler → child → teenager |
| Vidnoz | Freemium | Age progression 1–6 years, expression control |
| FutureBaby | Free (iOS) | Gender, age, skin-tone controls. Weak on mixed-race couples. |
| AgeMyBaby | Paid | "See your baby at any age from one photo" |
| BabyVideo.ai | Paid | Baby age-progression video generation |

**What none of them do:** tie the avatar to a real, living child's actual data; age it in sync with the real child week by week; give the avatar a voice narrating real events to a real second parent.

**Couple relationship wellness inside a parenting app: no competitor found.** Relationship apps (Paired, Lasting, Gottman Card Decks) exist separately; parenting apps exist separately. Nothing bridges them.

### C. Funding landscape post-2023

- Nanit — $50M growth round, December 2025 (Springcoast Partners, Upfront Ventures, JVP), explicitly for "Parenting Intelligence"
- Huckleberry — $12.5M led by Morningside Ventures ($16M total)
- a16z made a coordinated push into AI parenting in November 2024 (Cradlewise, Nanit, Huckleberry)
- Trove and Kidli — named in The Atlantic (Sept 2025) as forthcoming; direction unconfirmed

Capital is validating the "AI + parenting" category — good for narrative, bad for competitive runway, since incumbents are now funded to build toward this exact space.

### D. Validated pain points

| Finding | Figure |
|---------|--------|
| Couples reporting declining relationship satisfaction post-baby | **67%** (Gottman Institute) |
| Alternative study finding | up to **90%** |
| First-time mothers with moderate decline | **~80%** |
| Fathers with moderate decline | **51%** (49% milder) |
| Timing of steepest decline | Pregnancy → 12 months postpartum — abrupt and significant |
| First-time fathers | Steeper decline than second-time fathers in first 2 years |

The three research-identified protective behaviours — **sharing the load equitably, turning toward each other, maintaining fondness and appreciation** — map almost exactly onto the product's three layers, independently corroborating the product design.

**The absent-parent problem is NOT quantified.** No source found for how many parents regularly work away from home / travel / do night shifts. **Flagged as a research gap that must close before any funding conversation.**

### E. Monetization

| Signal | Data |
|--------|------|
| Dominant model in category | Freemium + subscription |
| Co-parenting premium ceiling | OurFamilyWizard sustains $220–$600/family/yr |
| Family organiser floor | Cozi premium at $29.99/yr |
| AI baby avatar novelty pricing | $9.99–$19.99 one-time |
| MENA regional preference | Free-plus-subscription, cost-sensitive |

**Recommendation:** free tracking layer, paid AI/couple layer at ~£6.99/mo or £69/yr per family (not per parent).

### F. Gap analysis — what is actually novel

| Element | Novel? |
|---------|--------|
| Baby activity tracking | No — commodity |
| Two-parent real-time sync | No — Onoco, TinyPal, Wren ship this |
| AI parenting advice | Partly — contested by Huckleberry, Nanit's $50M |
| AI baby avatar (novelty generation) | No — 6+ apps, commodity |
| Avatar tied to real child data, aging in sync | **Yes** |
| Baby-voice narration of real events to the other parent | **Yes** |
| **Couple relationship layer inside a parenting app** | **Yes — strongest, no competitor found** |
| Biological cycle logging informing nudge timing | Yes — also highest privacy risk |

### G. UAE market assessment

| Factor | Finding |
|--------|---------|
| CAGR | 8.88% — above global average |
| Global market share | 0.61% — small in absolute terms |
| Consumer behaviour | Mobile-first, cost-sensitive, prefers free-plus-subscription |
| Language | Arabic strongly preferred |
| Precedent | A UAE AI parental-coaching app piloted in 2024 reached 200,000+ families |

**Verdict on UAE:** good launch market, but the couple layer (biological cycle tracking, AI romantic prompts) needs cultural tone tuning before GCC launch. UK should lead.

### Verdict

There is a real market need, better evidenced than originally assumed — but the correction is on the moat: the AI baby avatar is **not** differentiating, and AI parenting advice is contested by better-funded incumbents. The couple-relationship layer is the uncontested ground. **Proceed — but lead with the couple layer as the strategic wedge, treat baby tracking as free table stakes for acquisition, and reposition the avatar as a living companion rather than a generator.**

### Recommended PRD amendments (applied in v2)

1. Reorder the layer narrative to lead with the couple/relationship problem
2. Reposition the avatar against novelty generators
3. Add a competitive-response section (Nanit, Huckleberry)
4. Revise pricing to per-family, not per-parent
5. Add a research task to quantify the absent-parent population
6. Flag the couple layer for cultural review before UAE launch; UK-first sequencing

---

<a name="prd"></a>
## 5. PRD v2 — full product requirements

**Full source**: `projects/still-us/prd.md`. Reproduced in full below for reference — this is the current, amended version.

### Problem Statement

**Between 67% and 90% of couples report a decline in relationship satisfaction after their first baby.** The decline is sharpest between pregnancy and 12 months postpartum. Roughly 80% of first-time mothers and 51% of fathers experience a moderate drop. This is close to the default outcome of having a child.

The research names what protects couples who *don't* decline: sharing the load equitably, turning toward each other, and maintaining fondness. These are hard to sustain when one parent is physically absent. Today the problem is split across three product categories that don't know each other exist: baby trackers, co-parenting coordinators (built for separated parents), and relationship apps. No product bridges them.

**This product is one app that holds all three — a baby tracker that is secretly a relationship-preservation tool, tied together by AI personas that feel alive.**

### Target User

- **Primary — The Absent Parent** (typically the dad): first-time parent of a 0–18mo child who travels/works away/works long shifts
- **Secondary — The Present Parent** (typically the mum): carries the primary caregiving load, wants practical AI advice and genuine partner engagement
- **Tertiary — Expectant & new couples (pre-birth, 0–3mo)**: highest-anxiety window, best acquisition timing

### Goals (ordered by strategic weight, v2)

1. **Communication lift (PRIMARY)** — inter-parent messages up vs. week-1 baseline at 6 weeks; below baseline = kill signal
2. Couple layer activation — ≥40% of couples within 14 days
3. Co-presence — ≥80% of absent parents view live state daily within 30 days
4. Advice engagement — ≥60% daily action rate
5. Avatar engagement — ≥70% weekly open rate

### Non-Goals

Medical/clinical diagnosis, social/community features, multi-child support (V1), third-party wearable integrations (V1), separated-parent co-parenting (explicitly out of scope — different product), web app (mobile only at launch).

### Success Metrics

| Metric | Target |
|--------|--------|
| **6-week inter-parent message volume vs. week 1 (PRIMARY)** | **≥ +20%** |
| Couple layer activation (day 14) | ≥ 40% of couples |
| D30 absent-parent daily active rate | ≥ 80% |
| Advice action rate | ≥ 60% daily |
| Avatar weekly open rate | ≥ 70% of users |
| Free → Family conversion | ≥ 8% by day 30 |
| App Store rating | ≥ 4.5 ★ |
| D90 couple retention | ≥ 55% |

### Product Architecture — Three Layers (strategic order, v2)

**Layer 1 (strategic) — The Couple Layer.** Daily 3-tap mood/energy check-in (opt-in); AI times partner nudges, never during a logged low-energy phase; the absent parent's "partner avatar" sends warm, non-baby-related romantic prompts; present parent receives them attributed to their real partner. Full biological-cycle logging deferred to V1.1.

**Layer 2 (strategic) — The Baby Persona, a companion not a generator.** AI avatar from parent photos, explicitly positioned against the six commodity novelty-generator apps (persistent companion vs. one-shot render; tied to real DOB/milestones vs. hypothetical child; narrates real events vs. silent; subscription vs. one-time). Ages automatically at developmental stages; speaks in baby's voice.

**Layer 3 (strategic) — The Co-parenting Loop, free and the acquisition surface.** Commoditised (Onoco, TinyPal, Wren ship this) — given away free. Real-time event logging, instant notification to the absent parent, role-differentiated task lists, shared timeline.

**Build order is the reverse of narrative order:** tracking + avatar ship first to build the habit and data; couple layer ships in V1 (not deferred) because it's the differentiator; full biological-cycle logging is V1.1.

### User Stories (6, with full acceptance criteria in the source doc)

1. **US-1** Baby Avatar Creation — generate within 60s, illustrated not photoreal, updates at age milestones
2. **US-2** Live Co-presence Notification — <5s delivery, baby-voice copy, reaction loop
3. **US-3** AI Parenting Advice — age/context-aware, explicitly non-medical, "share with partner" handoff
4. **US-4** Absent Parent Task List — daily AI-generated, small remote actions, 24h escalation
5. **US-5** Couple Layer (the defining story) — daily check-in, suppressed nudges on low-energy days, one nudge/day max, independently disableable, data stored separately
6. **US-6** Avatar Aging and Milestone Celebration — automatic + milestone-triggered updates, "look back" timeline

### Requirements (highlights)

17 functional requirements. **FR-9 and FR-10 (the couple layer's check-in and nudge engine) were promoted from Should to Must in v2** — "without this the product is just another tracker." Non-functional requirements include push latency <5s p99, end-to-end encryption for photos and couple data, GDPR+COPPA compliance with independent right-to-deletion per data class, WCAG 2.1 AA, 99.9% uptime, 100k concurrent families at launch scale.

### Competitive Response (new in v2)

- **Nanit ($50M, Dec 2025):** assume they ship excellent AI advice within 12 months. Structural counter: Nanit is hardware-anchored (camera in the cot) — unlikely to pivot into relationship wellness because it doesn't sell more cameras.
- **Huckleberry ($16M):** software-only, freer to move, but their brand is sleep — relationship wellness is off-brand for them.
- **Honest summary:** the moat is not technical, it's categorical — the only product treating the couple relationship as a first-class object inside a baby app. Not defensible forever. **Ship the couple layer in V1.**

### Pricing (new in v2)

**Per-family, not per-parent.** Free tier: full tracking + sync. **Family tier: £6.99/mo or £69/yr** — AI advice, aging avatar, couple layer, milestone celebrations. Explicitly rejects OurFamilyWizard's per-parent model as contradicting the product's own "you are a unit" thesis.

### Launch Plan

UK closed beta (50 couples) → open beta (500 couples) → **UK launch** (iOS+Android, English) → UAE market/cultural research → **UAE launch** (Arabic, culturally tuned couple layer). UK-first sequencing added in v2 specifically because the couple layer needs GCC tone tuning before it's safe to ship there.

### Open Questions (highlights)

- **Absent-parent population size — HIGH priority, unresolved.** First question any investor asks.
- Avatar model spike required (uncanny-valley risk)
- COPPA + GDPR legal review — **blocking**, not yet started
- Couple layer separation on divorce/breakup — no owner yet

### Timeline (rebaselined 2026-08-17)

| Milestone | Target |
|---|---|
| PRD v2 Approved | 2026-08-24 |
| Absent-parent research | 2026-08-31 |
| Avatar spike | 2026-09-07 |
| Tech design complete | 2026-09-14 |
| Legal (COPPA/GDPR) review | 2026-09-21 — blocks beta |
| Beta build | 2026-11-16 |
| Closed beta | 2026-11-30 |
| Open beta | 2027-01-11 |
| **UK Launch** | **2027-02-15** |
| **UAE Launch** | **2027-04-15** |

*(Note: these dates predate the architecture review's findings below, which will push the tech-design-complete and legal-review dates out further.)*

---

<a name="technical-design"></a>
## 6. Technical design — full architecture

**Full source**: `projects/still-us/technical-design.md`, authored by the Tech Lead persona, status Draft pending review (now reviewed — see §7).

### System shape

Two human actors (present parent, absent parent), one backend, three external service classes (image-gen API, LLM API, push notification service).

### Backend decomposition — four modules, deployed as a modular monolith initially

1. **Core API** — system of record for families, parents, children, care events, timeline. Enforces family-membership authorisation on every read/write.
2. **Notification fan-out** — consumes domain events, resolves recipient, generates copy via the AI gateway, dispatches push. Async and queued so a slow AI call never blocks the write path.
3. **AI gateway** — single chokepoint for every model call (vendor swap, prompt versioning, cost tracking, safety filtering all live here).
4. **Nudge scheduler** — owns the couple layer. Suppression rules are **domain logic, not prompt logic**: never nudge on a logged low-energy day, max one nudge/24h, 5+ consecutive low-energy days triggers a mental-health signpost instead. "A mistimed romantic nudge to an exhausted or struggling parent is worse than no product at all."

### Mobile architecture

Clean architecture (domain / application / infrastructure / ui), matching the portfolio's standing handbook. Offline-first write path: local write + optimistic UI, queued sync with idempotency keys, care events modelled as an append-only event log (last-write-wins is claimed safe for point-in-time facts — **the architecture review found this claim overstated; see §7 finding B4**).

### Data partitioning — the security-critical section

Three data classes with different handling regimes:

| Class | Contents | Who can read |
|---|---|---|
| **A — Child** | Care events, milestones, photos, avatar renders | Both parents |
| **B — Co-parenting** | Tasks, messages, timeline | Both parents |
| **C — Couple/biological** | Mood/energy check-ins, cycle data (V1.1), nudge history | **Only the parent who logged it — partner never sees raw data** |

The original design: the nudge scheduler reads class C and emits only a boolean eligibility signal outward, so "a parent's raw mood data is never exposed to their partner, through any surface, ever." **The architecture review found this guarantee does not actually hold as designed — see §7 finding B1, the single most important finding in the review.**

### Avatar generation

Illustrated (not photorealistic) style — deliberate uncanny-valley avoidance *and* the strongest visual differentiator from the six commodity photo-generator apps found in market research. Renders cached per (family, age band), generated ahead of the child reaching each band. Regeneration capped at 3 attempts.

### Eight decision points (DPs) deliberately left undecided in the design, each requiring a formal AgDR

| ID | Decision | Status |
|---|---|---|
| DP-1 | Cross-platform mobile framework (React Native/Expo recommended) | Undecided |
| DP-2 | Avatar image-generation model | Undecided — spike required |
| DP-3 | LLM vendor (baby voice, advice, nudges) | Undecided |
| DP-4 | API style (REST/GraphQL/tRPC) | Undecided |
| DP-5 | Live channel transport (WebSocket/SSE/vendor) | Undecided |
| DP-6 | Primary datastore + class-C partition mechanism | Undecided — Security Auditor must be involved from the start |
| DP-7 | Backend hosting/deploy model | Undecided |
| DP-8 | Auth and family-membership model | Undecided |

### Pre-Build checklist (as originally written — now superseded by the review's findings)

Solution Architect review; Security sign-off on the data partitioning; avatar spike completed; AgDRs for DP-1/4/6/8; repo created (blocked, owner action); sprint tickets filed starting with a walking skeleton.

---

<a name="architecture-review"></a>
## 7. Architecture review — full independent review

**Reviewer**: Head of Engineering persona (independent from the design's author)
**Reviewed against**: the technical design, the PRD v2, the market research, and the portfolio's clean-architecture and TypeScript handbooks

### Verdict: REQUEST CHANGES

*"This is a well-structured, intellectually honest document — better than most designs that reach this gate. I am not asking for a rewrite. But three of its load-bearing claims do not survive scrutiny, and one of them (§6) asserts the opposite of what the design actually delivers... Revision pass, re-review, then Build opens. I estimate 3–5 days of design work, not a restart."*

### Blocking findings (9)

**B1 — The "boolean-only boundary" for couple data does not close the privacy channel it claims to close; the absence of a nudge IS the disclosure.**
The suppression rule ("never nudge when either partner logged low energy") is itself a marketed feature. A partner who knows the rule and knows their own state can decode the other partner's private mood from a single missing notification with near-certainty. Worse, the 5-day escalation rule effectively broadcasts a possible postpartum-depression signal to the one person with no lawful right to that inference — GDPR Article 9 special-category data, inferred through a mechanism the product built on purpose. **Fix:** make nudge cadence statistically noisy even on eligible days (~60% fire rate, not 100%), and substitute a neutral message on suppressed days rather than silence, so the partner's observable experience never changes shape.

**B2 — Per-parent-key encryption doesn't protect against the likely breach path, and there's no retention policy or vendor data-processing story for the AI gateway or avatar photos.**
The scheduler must decrypt class-C data unattended, so per-parent keys mainly protect against a partial database dump, not application compromise (the more likely breach path for a startup). No retention policy exists for mood/cycle data. Nothing in the design forbids couple-layer context leaking into an LLM prompt sent to a third-party vendor. Baby photos also go to a third-party image-gen vendor with no stated position on training-data use, log retention, or international transfer. **Fix:** compute a coarse eligibility signal at check-in time (ideally on-device) so the server rarely if ever holds raw mood data; add explicit retention limits; add a typed, enforced contract that prevents class-C data from reaching AI prompts or logs.

**B3 — The 5-second push-latency budget is arithmetically wrong (sums typical latencies against a p99 target), and the stated "fallback on timeout" mitigation makes the worst case worse, not better.**
Real p99 LLM latency alone can exceed the whole budget. The timeout-then-fallback design means the slowest requests wait out the full timeout *before* the faster fallback path even starts. **Fix:** dispatch a template-based notification instantly and unconditionally (~300-500ms), run the LLM concurrently, and enrich the in-app content afterward — removing the AI vendor from the critical path entirely. This was also the reviewer's recommended answer to one of the tech design's own open questions.

**B4 — "Care events are append-only facts with no merge conflicts" is false; found five real counterexamples, one of them dangerous.**
Edits/corrections, start/stop interval events (sleep sessions), one-time milestone claims, and mutable task state all need real conflict handling. The dangerous one: if a parent logs "low energy" offline and "fine" online, naive last-write-wins sync could pick the wrong state and cause the system to send a romantic nudge to a parent who is actually struggling — the exact harm the couple-layer rules exist to prevent, caused by the sync layer instead.

**B5 — Module decomposition is missing three components the PRD marks as Must-have (avatar/media pipeline, advice engine, consent/data-rights orchestration), and contains an internal contradiction with the data-partitioning section.**

**B6 — No abuse-case modelling at all.** The design only considers an external attacker. The more likely adversary is a partner inside the family — and as designed, the product can manufacture and deliver a real signal about a victim's mood to a controlling partner, with no silent opt-out. Flagged as needing a dedicated safety review as its own gate, alongside security sign-off.

**B7 — No observability design, and the obvious naive implementation would leak protected couple data into logs/error reports on day one** (e.g. a log line reading `eligible=false reason=partner_low_energy`).

**B8 — No remote kill switch.** App Store review takes 2 days to 2 weeks; if the couple layer misfires in beta, there's currently no way to fix or disable it faster than a full release cycle.

**B9 — The 8 decision points are missing at least 4 real decisions** (modular-monolith-vs-split, event-sourcing model, notification content topology, avatar vendor's data-processing posture), and the sequencing of legal review vs. schema design is contradictory — legal review needs to inform the schema, not follow it.

### Non-blocking findings (12, summarised)

Timezone handling for nudge streaks; making the eligibility function pure/testable; restricting eligibility inputs to a closed, non-AI-derived set; adding a "pause everything" safety mode; splitting client/server eligibility evaluation explicitly; a real testing strategy (property-based tests, tone regression suite per locale); **a cost model — flagged as possibly existential** (~1M LLM calls/day at 100k families against a £6.99/month price point, with the free/paid cost boundary currently undefined); accessibility architecture for the avatar and voice notes; the Arabic-language AI surface roughly doubling the evaluation burden; missing CI/CD, migration, and rollback planning; missing output moderation and a note that condition-specific guidance may trigger medical-device regulation (MHRA/EU MDR); push notification lifecycle gaps (quiet hours, token rotation, denied permissions).

### What the design got right (reviewer's own words, selected)

- *"§4.4 is the best thinking in the document... 'A mistimed romantic nudge to an exhausted or struggling parent is worse than no product at all' is the sentence that should govern this product."*
- *"Refusing to decide things in a design doc... Most tech designs launder eight decisions into declarative prose and nobody notices for a year. This one names them."*
- *"Modular monolith with named module boundaries. Right call, right reasoning... Holding that line pre-PMF is harder than it looks."*
- *"Push primary, socket as enhancement... correctly justified from the product promise rather than from engineering preference."*
- Illustrated (not photorealistic) avatar style, justified from the market research's commodity finding rather than taste
- Naming a walking skeleton as the first sprint
- Strong traceability — nearly every design position cites its PRD or market-research source

### Reviewer's direct answers to the design's own open questions

- **Modular monolith vs. split now?** Keep the monolith, but deploy as two process types (web + worker) from day one, and write an explicit numeric trigger for when to extract later.
- **Is the boolean-only boundary sufficient?** No — go further: run the scheduler fully inside the class-C trust boundary AND make nudge cadence statistically independent of eligibility (fixes both the data boundary and the inference boundary).
- **Share the domain layer between mobile and backend, or duplicate?** Share it as a narrow, versioned package containing only pure domain logic — the safety-critical nudge rule is too important to risk two implementations drifting apart.
- **Template fallback on timeout, or ship template instantly and enrich after?** Ship instantly and enrich after — "This is the right call and it is not close." Removes the AI vendor from the latency path, the cost path, and much of the vendor-data-exposure risk simultaneously.

### Recommended path to approval

Revise the data-partitioning and latency sections first (the two most severe findings), fix the sync-conflict claim, add the missing modules, add the missing sections (abuse cases, observability/redaction, kill switch, cost model, testing strategy). Then route the revised data-partitioning section to the Security Auditor **with a formal threat model attached**, not prose alone — "I don't want a sign-off on prose."

---

<a name="current-state"></a>
## 8. Current state and what's blocking

| Gate | Status |
|---|---|
| Idea captured, validated GREEN | ✅ Done |
| Market research | ✅ Done |
| PRD v2 (amended per research) | ✅ Done, pending Head of Product sign-off |
| Project registered in portfolio | ✅ Done (`still-us`, status `planning`) |
| **GitHub repo created** | ⛔ **Blocked — requires owner action** (this session's GitHub access is scoped to the ops repo only) |
| Technical design | ✅ Written |
| Architecture review | ✅ Done — **REQUEST CHANGES**, 9 blocking findings |
| Design revision | ⏳ Not started — estimated 3–5 days |
| Security/legal sign-off (COPPA/GDPR, data partitioning) | ⛔ Not started — blocking |
| Absent-parent population research | ⛔ Not started — flagged high priority |
| Avatar model spike | ⛔ Not started |
| Sprint tickets / Build | 🔒 Gated behind all of the above |

### Immediate next actions, in order

1. **Owner creates the `still-us` GitHub repo** (private) — nothing downstream can proceed without it
2. Revise the technical design per the 9 blocking findings (Tech Lead)
3. Close the absent-parent population research gap (needed for any investor conversation)
4. Run the avatar-generation model spike
5. Security Auditor review of the revised data-partitioning design, with a formal threat model
6. Legal review scoping (COPPA + GDPR + DPIA)
7. File sprint tickets, starting with a walking skeleton
8. Only then: first line of production code

### For the comparison decision

The project has a strong, evidence-backed *thesis* and a real market gap — that part of the diligence is done and it holds up. What's unresolved is **execution cost and time-to-revenue**: the cost model is unproven at the target price point, the privacy architecture needed a rework after independent review, legal review hasn't started, and no code has been written yet. If the comparison project has a shorter, cheaper, lower-regulatory-risk path to first revenue, that is a legitimate and rational reason to sequence it first.
