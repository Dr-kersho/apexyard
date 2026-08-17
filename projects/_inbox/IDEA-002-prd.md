<!-- Source: ApexYard · templates/prd.md · github.com/me2resh/apexyard · MIT -->

# PRD: AI Parental Co-Presence — Mum, Dad & Baby Interfaces

**Status**: Draft (v2 — amended post-market-research)
**Author**: Mariam (Product Manager)
**Created**: 2026-06-03
**Last Updated**: 2026-08-17
**IDEA ref**: IDEA-002
**Validation**: GREEN — `projects/_inbox/validation/IDEA-002-validation.md`
**Market research**: `projects/_inbox/IDEA-002-market-research.md`

> **v2 revision note.** Market research (2026-08-17) confirmed the need but relocated the moat. The AI baby avatar is commodity — six-plus apps ship it for under $20 — and AI parenting advice is contested by better-funded incumbents (Nanit raised $50M in Dec 2025 explicitly for "Parenting Intelligence"). The uncontested ground is the **couple-relationship layer**, which no parenting app addresses despite 67–90% of couples reporting relationship decline in exactly this window. This revision reorders the product narrative accordingly, repositions the avatar, adds a competitive-response section, and switches to per-family pricing.

---

## Overview

### Problem Statement

**Between 67% and 90% of couples report a decline in relationship satisfaction after their first baby.** The decline is sharpest between pregnancy and 12 months postpartum — abrupt, significant, and well replicated across the transition-to-parenthood literature. Roughly 80% of first-time mothers and 51% of fathers experience a moderate drop. This is not a niche problem; it is close to the default outcome of having a child.

The research also names what protects the couples who *don't* decline: **sharing the load equitably, turning toward each other, and maintaining fondness and appreciation.** Those three behaviours are hard to sustain precisely when one parent is physically absent — travelling for work, on a night shift, or simply out of the house all day. The absent parent goes invisible to the child's day. The present parent carries the mental load alone. Conversations become logistics handoffs. And nothing in either parent's phone is doing anything about it.

Today the problem is split across three separate product categories that don't know each other exist: baby trackers (Huckleberry, Onoco), co-parenting coordinators (built for *separated* parents, not intact couples), and relationship apps (Paired, Lasting). No product bridges them.

**This product is one app that holds all three — a baby tracker that is secretly a relationship-preservation tool, tied together by AI personas that feel alive.**

---

### Target User

**Primary — The Absent Parent (typically the dad)**
A first-time parent of a child aged 0–18 months who works away from home, travels regularly, or works long shifts. They want to feel present in their child's day without constant phone calls that interrupt both parties. They want their partner to feel like they're still invested — not just informed.

**Secondary — The Present Parent (typically the mum)**
The parent carrying the primary caregiving load at home. They need practical AI-driven advice matched to their baby's exact age and current state. They want their partner to actually engage — not just receive notifications passively. And they want to remember, beneath the exhaustion, that they're still in a relationship.

**Tertiary — Expectant & new couples (pre-birth, 0–3 months)**
The highest-anxiety window. Couples who start using the app before birth will build habits that carry them through the hardest first months. Early acquisition here drives lifetime retention.

---

### Goals

Ordered by strategic weight (v2) — the relationship goals lead because they are the product's reason to exist.

1. **Communication lift (PRIMARY)**: measurable increase in direct parent-to-parent messages compared to week 1 baseline at the 6-week mark. This is the kill criterion inverted — if the app *reduces* inter-parent communication, the product has failed regardless of every other metric.
2. **Couple layer activation**: ≥ 40% of couples activate the partner-nudge feature within 14 days of onboarding
3. **Co-presence**: ≥ 80% of absent parents view their child's live state at least once per day within 30 days of onboarding
4. **Advice engagement**: ≥ 60% of present parents act on at least one AI advice nudge per day (tap "done", log a response, or share with partner)
5. **Avatar engagement**: ≥ 70% of users open the baby avatar view at least 3 times per week in the first month

---

### Non-Goals (Out of Scope)

- **Medical diagnosis or clinical advice** — the AI gives developmental guidance, not medical recommendations. "Your baby may be going through a sleep regression" is in scope; "your baby has colic, try X medication" is not.
- **Social / community features** — no public profiles, no parent forums, no sharing outside the family unit in V1. This is an intimate family tool.
- **Multi-child support in V1** — designed for one baby. Second-child support is a V2 consideration once the core loop is validated.
- **Third-party integrations (health apps, wearables)** in V1 — data comes from parent-logged entries only. Wearable sync is a V2 infrastructure decision.
- **Divorce / separated co-parenting** — the couple layer assumes an intact romantic relationship. The separated-parent use case (OurFamilyWizard territory) is explicitly out of scope.
- **Web app** — mobile only (iOS + Android) at launch. A web companion is future scope.

---

### Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| **6-week inter-parent message volume vs. week 1 (PRIMARY)** | **≥ +20%** | In-app message count per couple. **Below baseline = kill signal.** |
| **Couple layer activation (day 14)** | ≥ 40% of couples | Feature flag on first partner nudge sent |
| D30 absent-parent daily active rate | ≥ 80% | App analytics — absent-parent session on child's live state |
| Advice action rate (present parent) | ≥ 60% daily | Tap events on advice nudge CTA |
| Avatar weekly open rate | ≥ 70% of users | Avatar screen view events, 3×/week |
| Free → Family conversion | ≥ 8% by day 30 | Subscription events |
| App Store rating | ≥ 4.5 ★ | iOS App Store + Google Play rating at 90 days |
| D90 couple retention | ≥ 55% | Both parents active at day 90 |

---

## Product Architecture — Three Layers

> **Ordering note (v2).** These layers are presented in order of *strategic weight*, not build order. The couple layer leads because it is the least contested and best evidenced. Build order is the reverse — baby tracking ships first as the acquisition surface. See § "Build order vs. narrative order" below.

### Layer 1 (strategic): The Couple Layer

**The layer no competitor has.** A relationship-wellness module running parallel to the baby tracking, targeting the 67–90% relationship decline directly.

- Both parents log their own energy / mood state (optional, consent-gated, 3-tap daily check-in). Full biological-cycle logging is a V1.1 extension.
- The AI uses both partners' states to time couple-connection nudges intelligently — never pushing a romantic prompt when either partner is in a logged low-energy phase
- The absent parent's AI persona (the "partner avatar") flirts, checks in, and prompts small romantic gestures: *"She hasn't heard from you today — send her something that isn't about the baby"*
- The present parent receives these as notifications that feel like they're from their partner, not an algorithm
- Maps directly onto the three clinically-identified protective behaviours: equitable load-sharing (Layer 3), turning toward each other (Layer 1), maintaining fondness (Layer 1)
- The goal: parents remember they are a couple first, parents second

### Layer 2 (strategic): The Baby Persona — a companion, not a generator

An AI avatar built from the parents' uploaded photos that **grows alongside the real child**.

**Explicit positioning against the commodity.** Six-plus apps (SeeYourBabyAI, Overchat, Vidnoz, FutureBaby, AgeMyBaby, BabyVideo.ai) already generate AI baby faces for $9.99–19.99, several with wider age ranges than this product. **We are not competing with those.** Those are one-shot novelty renders answering *"what might our baby look like?"*. This is a persistent companion answering *"how is my baby right now, and how have they grown?"* — tied to a real child's real date of birth and real logged milestones.

The distinction must be enforced in every piece of copy, or the app gets shelved next to the novelty generators.

| Novelty generators | This product |
|---|---|
| One-shot render | Persistent companion |
| Hypothetical future child | Your actual living child |
| Fixed image | Ages in sync with real DOB + milestone data |
| Silent | Narrates real care events in the baby's voice |
| $9.99 one-time | Part of an ongoing family subscription |

- Generated from: mum photo + dad photo + optional baby photo (or from combined parent features pre-birth)
- Ages in real time: appearance, vocabulary, and personality shift week by week from the child's DOB and logged milestones. A 6-week-old avatar looks and sounds different from a 9-month-old.
- Speaks in the baby's voice: feeds, sleep events, and milestones narrated as first-person baby messages ("I just had 120ml and I'm feeling sleepy 😴 — Dad, I need you to set up the cot")
- Both parents see the same avatar but receive different messages tailored to their role

### Layer 3 (strategic): The Co-parenting Loop — free, and the acquisition surface

Real-time synchronisation of the child's state between both parents. **Commoditised — Onoco and TinyPal ship this today, so it is free in our product.** Its job is acquisition and daily habit, not revenue.

- The present parent logs events (feed, sleep, nappy, mood, milestone)
- The absent parent receives an instant notification in the baby's voice
- Role-differentiated task lists: present parent sees advice-driven next steps; absent parent sees engagement tasks ("send a voice note", "read the bedtime story tonight")
- Both parents see the same timeline of the baby's day — eliminating "catch me up" conversations
- Delivers the equitable-load-sharing protective behaviour that the relationship research identifies

### Build order vs. narrative order

| Phase | Build | Why |
|---|---|---|
| V1 | Layer 3 (tracking + co-presence) → Layer 2 (avatar) | Establishes daily habit and the data the other layers need |
| V1 | Layer 1 (couple check-in + nudges), opt-in | Ships in V1 — it is the differentiator, not a follow-on |
| V1.1 | Full biological-cycle logging | Higher privacy sensitivity; ship after the simpler mood check-in proves the nudge timing works |

The narrative leads with the couple layer. The build leads with tracking. Both are correct — do not let the build order leak into the positioning.

---

## User Stories

### US-1: Baby Avatar Creation

> As a new parent, I want to create an AI avatar of my baby from mine and my partner's photos, so that we have a living, evolving visual representation of our family that we both feel emotionally connected to.

**Acceptance Criteria**:

- [ ] Parent can upload their own photo and invite partner to upload theirs
- [ ] System generates a baby avatar within 60 seconds of both photos being submitted
- [ ] Avatar is visually distinct (not a literal face merge — a warm, illustrated persona)
- [ ] Avatar appearance updates automatically at key age milestones (newborn → 3m → 6m → 9m → 12m → 18m)
- [ ] Both parents see the same avatar in their respective interfaces
- [ ] Pre-birth parents can generate an avatar from parent photos alone; it updates when a baby photo is added

---

### US-2: Live Co-presence Notification (Present → Absent Parent)

> As the absent parent, I want to receive a real-time notification in my baby's voice every time my partner logs a care event, so that I feel present in my child's day without interrupting my partner with phone calls.

**Acceptance Criteria**:

- [ ] Notification arrives within 5 seconds of the present parent logging an event
- [ ] Notification text is generated in the baby's voice, matching the event type (feed, sleep, nappy, mood, milestone)
- [ ] Notification includes the baby avatar image at the current age
- [ ] Tapping the notification opens the baby's live state screen
- [ ] Absent parent can react with an emoji or a voice note; the present parent is notified of the reaction

---

### US-3: AI Parenting Advice (Present Parent)

> As the present parent, I want to receive AI-generated advice matched to my baby's exact age, current state, and recent activity log, so that I have a trusted guide through the hardest moments without having to search for answers.

**Acceptance Criteria**:

- [ ] Advice is contextualised to the baby's exact age in weeks, not just months
- [ ] Advice references recent log data (e.g. "You've logged 3 short naps today — this is typical for a sleep regression at this age")
- [ ] Advice is marked clearly as developmental guidance, not medical advice; links to "speak to your health visitor" when appropriate
- [ ] Parent can mark advice as "done", "not applicable", or "share with partner"
- [ ] "Share with partner" sends the advice to the absent parent's task list

---

### US-4: Absent Parent Task List

> As the absent parent, I want a personalised task list of small, meaningful actions I can take from anywhere, so that I stay engaged and my partner sees that I'm contributing even when I'm not physically present.

**Acceptance Criteria**:

- [ ] Task list is generated daily by the AI based on the baby's current state and the absent parent's logged availability
- [ ] Tasks are small and actionable remotely: send a voice note, read a bedtime story over video, write a message to read at bath time
- [ ] Completing a task notifies the present parent in real time
- [ ] Incomplete tasks carry forward and escalate with a gentle nudge after 24 hours
- [ ] Present parent can assign a custom task to the absent parent

---

### US-5: Couple Layer — Daily Check-in and Partner Nudges

> As a parent who is exhausted and losing touch with my partner, I want the app to help me remember to be a partner — not just a co-parent — by sending me prompts to connect romantically at the right moment, so that my relationship doesn't silently deteriorate during the hardest year.

**This is the product's defining user story (v2).** It targets the 67–90% relationship-decline statistic directly and is the one thing no competitor offers. Scope for V1 is the 3-tap mood check-in; full biological-cycle logging follows in V1.1.

**Acceptance Criteria**:

- [ ] Both parents can opt in to a daily 3-tap energy / mood check-in (optional, always skippable)
- [ ] The AI uses both parents' logged states to time romantic nudges; it does not prompt when either parent is in a logged low-energy state
- [ ] The absent parent's partner avatar sends one nudge per day maximum: a flirtatious or romantic prompt that does not mention the baby
- [ ] The present parent receives the nudge as a warm notification attributed to their partner ("A message from [name]")
- [ ] Both parents can disable the couple layer at any time without affecting the baby tracking layer
- [ ] All couple-layer data is stored separately from baby data and is not shared with any third party

---

### US-6: Avatar Aging and Milestone Celebration

> As a parent, I want to see my baby avatar evolve visually and verbally as my real baby grows, so that the app feels like a living record of my child's first years rather than a static tracker.

**Acceptance Criteria**:

- [ ] Avatar appearance and vocabulary update automatically at each developmental stage (newborn, 3m, 6m, 9m, 12m, 18m+)
- [ ] When a milestone is logged (first smile, first word, first steps), both parents receive a special celebration notification with an aged avatar moment
- [ ] Past avatar states are preserved in a timeline ("look back" feature — scroll back to see the 3-month avatar)
- [ ] Avatar personality traits are seeded from the parents' own photos and optionally from a short personality quiz on setup

---

### Edge Cases

| Scenario | Expected Behaviour |
|----------|--------------------|
| Only one parent has the app | App works in single-parent mode; co-presence features are dormant until partner joins; onboarding prompts partner invite |
| Partner invite declined | App continues as a solo baby tracker with AI advice; couple layer remains dormant |
| Baby photo uploaded differs dramatically from generated avatar | Parent can regenerate the avatar up to 3 times; after that, submit a support request |
| Both parents are the "present parent" (both home) | App detects no absent-parent session and switches to shared-timeline mode; task lists merge |
| Parent logs no events for 48+ hours | App sends a gentle re-engagement prompt; does not assume anything is wrong |
| Baby passes 18 months | App extends gracefully; avatar continues aging; advice layer shifts to toddler content |
| Couple layer triggers during a sensitive period (e.g. postpartum depression flag) | App detects repeated low-energy logging over 5+ consecutive days and replaces couple nudges with a signpost to mental health resources |

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1 | Photo-based AI baby avatar generation from two parent photos | Must | Core emotional hook |
| FR-2 | Avatar ages automatically at developmental stage milestones | Must | Retention mechanic |
| FR-3 | Real-time care event logging (feed, sleep, nappy, mood, milestone) | Must | Data foundation for all AI layers |
| FR-4 | Push notification to absent parent within 5s of event log | Must | Co-presence core |
| FR-5 | Notifications written in baby's AI voice, age-appropriate | Must | Differentiator |
| FR-6 | Role-differentiated interfaces (present parent vs. absent parent) | Must | UX architecture |
| FR-7 | AI parenting advice engine — age + context aware | Must | Value for present parent |
| FR-8 | Absent parent task list, AI-generated daily | Must | Engagement for absent parent |
| FR-9 | Couple layer — opt-in daily mood / energy check-in (3-tap) | **Must** | **The differentiator. Promoted from Should in v2.** Full biological-cycle logging deferred to V1.1. |
| FR-10 | Partner nudge engine — timed romantic prompts | **Must** | **Promoted from Should in v2.** Requires FR-9 data. Without this the product is just another tracker. |
| FR-9b | Full biological-cycle logging | Could (V1.1) | Higher privacy sensitivity — ship after FR-9/FR-10 prove nudge timing works |
| FR-11 | Milestone celebration notifications with avatar moment | Should | Retention + delight |
| FR-12 | Look-back timeline of past avatar states | Should | Emotional stickiness |
| FR-13 | Partner invite flow (SMS / link) | Must | Growth mechanic |
| FR-14 | Voice note recording and playback between parents | Should | Intimacy layer |
| FR-15 | Offline mode — log events without connectivity; sync when back | Should | Reliability |
| FR-16 | Data export — full history as PDF/CSV on request | Could | GDPR compliance + trust |
| FR-17 | Multi-language support (Arabic, English at launch) | Should | Target market |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Push notification delivery latency | < 5 seconds p99 |
| Performance | Avatar generation time (initial) | < 60 seconds |
| Performance | App cold-start time | < 2 seconds on mid-range device |
| Security | All baby photos and personal data | End-to-end encrypted at rest and in transit |
| Security | Couple-layer data (biological cycles) | Stored in a separate, access-controlled data partition |
| Privacy | GDPR + COPPA compliance (child data) | Full right-to-deletion; no advertising use of baby data |
| Accessibility | WCAG 2.1 AA | Screen reader support for all core flows |
| Reliability | Uptime | 99.9% monthly |
| Scalability | Notification throughput | Handle 100k concurrent families at launch target |
| Platform | iOS minimum version | iOS 16+ |
| Platform | Android minimum version | Android 10+ |

---

## Design

### User Flow — Onboarding

```
[Download app]
      |
      v
[Sign up — name, email, baby's DOB (or due date)]
      |
      v
[Upload your photo]
      |
      v
[Invite partner — SMS link]
      |
      +---> [Partner joins + uploads their photo]
      |           |
      |           v
      |     [Baby avatar generated — both parents see it]
      |
      +---> [Partner skips — solo mode activated]
      |
      v
[Role selection — "I'm with the baby now" / "I'm away"]
      |
      v
[Personalisation — baby name, due date / birth date confirmed]
      |
      v
[First advice card delivered — age-appropriate]
      |
      v
[Home screen — baby avatar live state]
```

### User Flow — Care Event (Present Parent → Absent Parent)

```
[Present parent taps + Log Event]
      |
      v
[Select type: Feed / Sleep / Nappy / Mood / Milestone]
      |
      v
[Enter details — quantity, duration, notes (optional)]
      |
      v
[AI generates baby-voice notification copy]
      |
      v
[Push notification → Absent parent]
      |
      v
[Absent parent taps notification]
      |
      v
[Baby live state screen — avatar + recent events]
      |
      v
[Absent parent reacts: emoji / voice note / task complete]
      |
      v
[Present parent receives reaction notification]
```

### User Flow — Couple Layer

```
[Daily check-in prompt — "How are you feeling today?"]
      |
      v
[Parent logs energy/mood — 3-tap scale]
      |
      v
[AI reads both partners' logged states]
      |
      +---> [Both parents in good state → partner nudge eligible]
      |           |
      |           v
      |     [Absent parent receives: "A message from [name]" — romantic prompt]
      |           |
      |           v
      |     [Absent parent acts: sends voice note / message]
      |           |
      |           v
      |     [Present parent receives notification attributed to partner]
      |
      +---> [Either parent in low state → nudge suppressed]
      |
      +---> [5+ consecutive low-energy days → mental health signpost shown]
```

### Wireframes / Mockups

_To be authored by Iman (UX Designer) and Nour (UI Designer) in the design phase. Key screens: Home (baby avatar live state), Log Event, Baby Timeline, Partner Notification, Absent Parent Task List, Couple Check-in._

---

## Technical Notes

### Dependencies

| Dependency | Type | Status | Owner |
|------------|------|--------|-------|
| AI image generation API (avatar creation + aging) | External | To be decided — AgDR required | Tech Lead |
| AI language model (baby voice, advice engine, couple nudges) | External | To be decided — AgDR required | Tech Lead |
| Push notification service (FCM + APNs) | External | Standard — Firebase recommended | Backend |
| Real-time sync (WebSocket or similar) | Internal | Architecture decision required | Tech Lead |
| Photo storage (encrypted) | External / Internal | S3-equivalent with encryption at rest | Backend |
| Biological cycle + health data store | Internal | Separate partition — data governance decision | Backend + Security |

### Technical Constraints

- Baby photos and couple-layer data are **highly sensitive** — encryption at rest and in transit is non-negotiable; a security review is required before any data architecture goes to build
- Avatar generation latency must be managed with optimistic UI (show a generating state; don't block onboarding)
- Push notification reliability at scale is a first-class engineering concern — a missed "your baby just woke up" notification breaks the core promise
- COPPA applies: the app processes data related to children under 13; consent flows and data handling must be reviewed by legal before launch
- GDPR applies (UK/EU launch): right-to-deletion must cover all three data layers (baby, co-parenting, couple) independently

---

## Competitive Response

The market research identified two funded incumbents building toward this space. The PRD needs a stated answer to each, not a hope that they stay away.

### Threat 1 — Nanit ($50M growth round, Dec 2025)

Nanit is explicitly building an "AI-powered Parenting Intelligence System" with Springcoast Partners, Upfront Ventures, and JVP behind it. **Assume they ship excellent AI parenting advice within 12 months.**

| Our exposure | Response |
|---|---|
| Our AI advice layer becomes commodity | Accept it. Advice was never the moat — do not over-invest in out-advising a $50M competitor. |
| They add two-parent sync | Likely. Also not our moat. |
| They add a couple-relationship layer | **This is the real risk.** Mitigate by shipping the couple layer in V1, not V2, and by building the emotional-tone quality that is hard to clone quickly. |

**Structural advantage.** Nanit is a hardware company — their AI is anchored to camera data from the cot. That anchors them to the *nursery*, not the *relationship*. A hardware-first company is unlikely to pivot into partner-relationship wellness, because it does not sell more cameras. Our software-only, relationship-first position is defensible against them specifically.

### Threat 2 — Huckleberry ($16M, a16z-backed)

Strongest current AI-advice product (SweetSpot sleep predictions). Software-only, so structurally freer to move than Nanit.

**Response.** Same conclusion: do not compete on advice quality. Compete on the layer they have no reason to build — Huckleberry's entire brand is sleep, and relationship wellness is off-brand for them.

### Threat 3 — the novelty avatar apps

Not a competitive threat but a **positioning threat** — being mistaken for one. Mitigated by the copy discipline in Layer 2 above.

### The honest summary

Our moat is not technical; it is **categorical**. We are the only product treating the parent-couple relationship as a first-class object inside a baby app. That position is available today and defensible for as long as the incumbents stay anchored to their existing categories (hardware, sleep). It is not defensible forever. **Ship the couple layer in V1.**

---

## Pricing

**Model: per-family subscription. Not per-parent.**

| Tier | Price | Contents |
|---|---|---|
| **Free** | £0 | Full baby tracking, two-parent real-time sync, baby timeline, basic notifications |
| **Family** | **£6.99/month or £69/year** | AI parenting advice engine, aging baby avatar with voice, couple layer (check-ins + partner nudges), milestone celebrations, look-back timeline |

**Rationale.**

- The tracking layer is given away because competitors give it away. Charging for it loses the acquisition race before it starts.
- £69/year sits above Cozi's £29.99 floor and far below OurFamilyWizard's £220–£600/family ceiling. Comfortable, defensible middle.
- **Explicitly not per-parent.** OurFamilyWizard's per-parent model works because separated parents are adversarial and each needs independent legal records. Our users are a unit — charging them twice contradicts the product's entire thesis. Per-family pricing *is* the positioning.
- MENA regional research shows a strong preference for free-plus-subscription with cost sensitivity, which this structure matches.

**Open**: whether the couple layer is bundled into Family (recommended — it is the differentiator, hiding it behind a higher tier suppresses the thing we most need adopted) or split into a premium tier. Recommendation: **bundle it.**

---

## Launch Plan

### Rollout Strategy

- [ ] **Closed beta** — 50 UK couples recruited via parenting communities (Mumsnet, Instagram parenting accounts); qualitative feedback on couple-layer tone and avatar emotional resonance
- [ ] **Open beta (TestFlight / Play internal testing)** — 500 UK couples; quantitative validation of the 6-week inter-parent communication lift (the primary kill criterion) and couple-layer activation rate
- [ ] **UK launch** — iOS + Android, English only. **UK leads.**
- [ ] **UAE market research** — local user research on couple-layer tone before any GCC launch (see § Cultural Adaptation)
- [ ] **UAE launch** — English + Arabic, culturally tuned couple layer

**Sequencing changed in v2.** The original plan launched UK and UAE together. Market research flagged that the couple layer — biological cycle tracking and AI-generated romantic prompts between spouses — will land differently in the GCC than in the UK. Launching both simultaneously risks a tone misfire in the more culturally sensitive market before the feature is proven anywhere. UK first, UAE second, with a dedicated tuning cycle between.

### Cultural Adaptation (UAE / GCC)

The UAE remains an attractive market — 8.88% CAGR (above global average), very high smartphone penetration, significant GCC disposable income, strong cultural family focus, and a proven channel (a UAE company piloted an AI parental-coaching app in 2024 reaching 200,000+ families).

Requirements before GCC launch:

- [ ] Arabic localisation — not optional, a launch requirement
- [ ] Couple-layer tone review with local user research — romantic prompt phrasing, opt-in framing, default-off vs. default-on
- [ ] Content alignment review against cultural and religious values
- [ ] Confirm biological-cycle logging is acceptable, or ship GCC with the mood-check-in variant only
- [ ] Couple layer must be independently disableable without affecting baby tracking (already an AC in US-5)

### Go-to-Market

- **Acquisition hook**: the avatar creation flow is the shareable moment. Build a share-to-Instagram/WhatsApp moment into generation — but frame the share as "meet our baby's companion", never "see what our baby looks like", to avoid the novelty-generator association.
- **Retention hook**: avatar aging milestone moments are push-worthy events that bring lapsed users back.
- **Referral mechanic**: the partner invite is the built-in referral loop — every present parent onboarded is a distribution event for one absent parent.
- **Narrative hook (new in v2)**: the 67% statistic is the marketing headline. *"Two in three couples say their relationship got worse after the baby. We built an app about that."* That framing differentiates instantly from every baby tracker on the store.

---

## Open Questions

| Question | Owner | Status | Resolution |
|----------|-------|--------|------------|
| **How large is the absent-parent population?** No source found quantifying parents who regularly work away from home / travel / do night shifts. | Product Analyst | **Open — research task, HIGH priority** | This is the first question any investor will ask. Close it before a funding conversation. Sources to try: ONS labour-force data (UK shift work + business travel), GCC expatriate-worker statistics, parental-leave studies. |
| Which AI image model produces the most emotionally resonant baby avatar without crossing into uncanny valley? | Tech Lead | Open — spike required | Spike: test Stable Diffusion, DALL-E, Midjourney API on 20 parent photo pairs |
| What is the right cadence for avatar aging updates — automatic on DOB milestone vs. triggered by parent confirming the milestone? | Product | Open | Recommendation: automatic on DOB + parent can trigger early if milestone reached |
| Should the couple layer be a separate subscription tier or bundled? | Head of Product | **Resolved (v2)** | **Bundled into the Family tier.** It is the differentiator — hiding it behind a higher tier suppresses adoption of the one feature that defines the product. |
| What is the minimum viable couple-layer feature for V1 — full biological cycle logging or just a daily mood check-in? | Product | **Resolved (v2)** | Daily 3-tap mood check-in in V1; full cycle logging in V1.1 once nudge timing is proven and the privacy model is reviewed. |
| COPPA + GDPR legal review — who owns this and what is the timeline? | Head of Product / Legal | Open — **blocking** | Must be resolved before beta. Child data + partner biological data in one app is the highest-risk combination in the product. |
| Will the couple layer's tone work in the GCC? | Product + local research | **Open — blocks UAE launch only** | Dedicated UAE user-research cycle after UK launch. UK launch is not blocked by this. |
| What happens to the baby avatar and data if a couple separates? | Product + Legal | Open | Data portability and account split flow required |
| What is our answer when Nanit ships AI parenting advice? | Head of Product | **Resolved (v2)** | Do not compete on advice. See § Competitive Response — our position is categorical (relationship-first), not technical. |

---

## Timeline

**Rebaselined 2026-08-17** — the v1 timeline assumed a June start that has passed. Dates below run from PRD v2 approval.

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD v2 Approved | 2026-08-24 | Pending |
| Absent-parent population research | 2026-08-31 | Not started |
| Avatar Generation Spike | 2026-09-07 | Not started |
| Tech Design Complete | 2026-09-14 | Not started |
| Backend Architecture AgDR | 2026-09-14 | Not started |
| COPPA + GDPR legal review | 2026-09-21 | Not started — **blocks beta** |
| UX Flows + Wireframes | 2026-09-21 | Not started |
| UI Design (key screens) | 2026-09-28 | Not started |
| Beta Build (tracking + co-presence + avatar + couple layer) | 2026-11-16 | Not started |
| Closed Beta (50 UK couples) | 2026-11-30 | Not started |
| Open Beta (500 UK couples) | 2027-01-11 | Not started |
| App Store Submission | 2027-02-01 | Not started |
| UK Launch (iOS + Android) | 2027-02-15 | Not started |
| UAE research + Arabic localisation | 2027-03-15 | Not started |
| UAE Launch | 2027-04-15 | Not started |

**Note on beta scope.** The v1 timeline had "Beta Build (Layer 1 + 2 only)", which under the old numbering excluded the couple layer. That is now wrong — the couple layer ships in the beta, because the primary success metric (6-week inter-parent communication lift) cannot be measured without it.

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | Mariam | 2026-08-17 | Author (v2) |
| Product Analyst | Hanan | 2026-08-17 | Market research complete |
| Head of Product | Omar | | Pending |
| Tech Lead | Hisham | | Pending |
| Head of Design | Maha | | Pending |
| Security (COPPA/GDPR review) | Faisal | | Pending |

---

## v2 Change Log

| # | Amendment | Driver |
|---|---|---|
| 1 | Problem statement now leads with the 67–90% relationship-decline statistic; layer narrative reordered so the couple layer is Layer 1 | Market research: couple layer is the only uncontested ground |
| 2 | Avatar repositioned as "companion, not generator" with an explicit comparison table vs. the six novelty apps | Market research: avatar generation is commodity at $9.99–19.99 |
| 3 | New § Competitive Response covering Nanit ($50M), Huckleberry ($16M), and the novelty apps | Market research: funded incumbents building adjacent |
| 4 | New § Pricing — per-family £6.99/mo or £69/yr; tracking layer free | Market research: OurFamilyWizard per-parent model contradicts our thesis |
| 5 | Absent-parent population added as a HIGH-priority open research task | Market research: no source found; first question an investor asks |
| 6 | UK-first launch sequencing; new § Cultural Adaptation gating UAE | Market research: couple layer needs GCC tone tuning before launch |
| 7 | FR-9 / FR-10 (couple layer) promoted Should → Must; goals and success metrics reordered | Consequence of #1 — the differentiator cannot be optional |
| 8 | Timeline rebaselined from Aug 2026; beta scope now includes the couple layer | v1 dates had passed; primary metric is unmeasurable without the couple layer |
