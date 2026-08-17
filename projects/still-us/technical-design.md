# Technical Design — Still Us

**Status**: Draft — pending Solution Architect review
**Author**: Hisham (Tech Lead)
**Created**: 2026-08-17
**Ticket**: [#38](https://github.com/Dr-kersho/apexyard/issues/38)
**Source PRD**: `projects/still-us/prd.md` (v2)
**Market research**: `projects/still-us/market-research.md`

---

## 1. Purpose and scope

This document defines the technical architecture for **Still Us** — a cross-platform mobile app with three product layers (couple relationship, baby companion avatar, co-parenting sync), targeting UK launch followed by UAE.

**It does not decide everything.** Several choices carry real trade-offs and are recorded here as *decision points requiring an AgDR before Build opens* (§ 9). Per `.claude/rules/agdr-decisions.md`, a Tech Lead does not get to say "I'll use X" in a design doc and have that count as a decision — the alternatives and rationale get recorded properly, or the choice isn't made.

---

## 2. Constraints that shape everything

These come from the PRD and are non-negotiable inputs, not design choices.

| Constraint | Source | Architectural consequence |
|---|---|---|
| Push notification p99 < 5 s | PRD NFR | Rules out polling. Requires a push-first design with a real-time fallback channel. |
| Three data classes with different sensitivity: baby data, co-parenting data, **couple/biological data** | PRD NFR + security | Data partitioning is a first-class architectural concern, not a schema detail. See § 6. |
| COPPA applies (child data) + GDPR applies (UK/EU) | PRD constraints | Right-to-deletion must work independently per data class. Audit logging required. |
| Encryption at rest and in transit for photos and couple data | PRD NFR | Rules out any design that stores raw photos in an unencrypted bucket. |
| iOS 16+ / Android 10+, both stores, one codebase | PRD | Cross-platform framework. See DP-1. |
| Arabic localisation (RTL) for UAE | PRD | RTL support must be designed in from the first screen, not retrofitted. |
| Offline event logging with later sync | PRD FR-15 | Local-first write path with a sync reconciliation strategy. |
| 100k concurrent families at launch target | PRD NFR | Notification fan-out must not be a single-process bottleneck. |

---

## 3. System shape (C4 L1 — context)

```
                    ┌─────────────────────┐
                    │   Present parent    │
                    │   (mobile app)      │
                    └──────────┬──────────┘
                               │ logs care events
                               │ receives advice + partner nudges
                               ▼
        ┌──────────────────────────────────────────┐
        │              Still Us backend            │
        │                                          │
        │  ┌────────────┐  ┌──────────────────┐    │
        │  │  Core API  │  │ Notification fan │    │
        │  └────────────┘  └──────────────────┘    │
        │  ┌────────────┐  ┌──────────────────┐    │
        │  │ AI gateway │  │  Nudge scheduler │    │
        │  └────────────┘  └──────────────────┘    │
        └───┬──────────────┬───────────────┬───────┘
            │              │               │
            ▼              ▼               ▼
    ┌───────────────┐ ┌──────────┐ ┌──────────────┐
    │ Image-gen API │ │ LLM API  │ │ Push (APNs / │
    │ (avatar)      │ │ (voice,  │ │  FCM)        │
    │               │ │ advice,  │ │              │
    │               │ │ nudges)  │ │              │
    └───────────────┘ └──────────┘ └──────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Absent parent     │
                    │   (mobile app)      │
                    └─────────────────────┘
```

Two human actors, one backend, three external service classes. Deliberately boring — the product's novelty is in the AI prompting and the emotional design, not in exotic infrastructure. Infrastructure risk should be as close to zero as possible so the team's attention goes where the differentiation is.

---

## 4. Backend service decomposition (C4 L2 — containers)

Four logical services. **Deploy as a modular monolith initially** — the boundaries below are module boundaries, extractable later if load demands it. Splitting into microservices before product-market fit would add operational cost against no proven scaling need.

### 4.1 Core API

Owns families, parents, children, care events, and the timeline. The system of record.

- REST or GraphQL (see DP-4)
- Enforces the family-membership authorisation boundary on every read and write — a parent can only ever see their own family's data
- Emits domain events (`CareEventLogged`, `MilestoneReached`, `CheckInSubmitted`) that the other modules subscribe to

### 4.2 Notification fan-out

Consumes domain events, resolves which parent should be notified, calls the AI gateway for message copy, dispatches to APNs/FCM.

- Must be async and queued — a slow AI call must never block the care-event write
- **Critical design point**: the p99 < 5 s budget covers *event logged → push delivered*. An LLM call in that path costs 1–3 s. Budget breakdown: write 50 ms, queue 100 ms, LLM 2 s, push dispatch 500 ms, APNs/FCM delivery 1 s. It fits, but with little headroom.
- **Mitigation**: pre-generate a template bank of baby-voice phrasings per event type per age band, refreshed in the background. On LLM timeout (> 2.5 s), fall back to a template. The parent gets a warm on-brand message either way; only the variety degrades. **A missed notification breaks the core product promise — a slightly less novel sentence does not.**

### 4.3 AI gateway

Single chokepoint for every model call. Nothing else in the system talks to a model vendor directly.

Rationale: vendor swap becomes a one-module change; prompt versioning, cost tracking, rate limiting, content safety filtering, and the fallback-to-template logic all live in one testable place. Given DP-2 and DP-3 are both unresolved, an abstraction boundary here is not premature — it is the thing that lets those decisions be deferred safely.

### 4.4 Nudge scheduler

Owns the couple layer. Reads both partners' check-in states, applies the suppression rules, and emits at most one partner nudge per day.

Suppression rules (from PRD US-5 and the edge-case table) are **domain logic, not prompt logic** — they must be deterministic, unit-tested, and independent of the LLM:

- Never nudge when either partner logged a low-energy state
- Never more than one nudge per 24 h
- After 5+ consecutive low-energy days from one partner → suppress nudges entirely and surface the mental-health signpost
- Couple layer disabled → emit nothing, and the baby layers continue unaffected

This is the highest-stakes logic in the product. A mistimed romantic nudge to an exhausted or struggling parent is worse than no product at all. It gets deterministic rules and full test coverage; the LLM only phrases a nudge that the domain has *already decided* is appropriate to send.

---

## 5. Mobile application architecture

Follows the portfolio's clean-architecture handbook (`handbooks/architecture/clean-architecture-layers.md`) — dependencies point inward.

```
domain/          entities + invariants: Family, Parent, Child, CareEvent,
                 CheckIn, NudgeEligibility. No framework imports. No I/O.

application/     use cases: LogCareEvent, GenerateDailyTasks,
                 EvaluateNudgeEligibility, SyncOfflineQueue.
                 Depends on ports it owns, never on concrete adapters.

infrastructure/  API client, local database, push registration,
                 photo capture, secure storage, analytics.

ui/              screens and components. Talks to application via
                 view-models / hooks; never reaches into infrastructure.
```

**Why this matters more than usual here.** Nudge eligibility is domain logic that must behave identically on device and on the server (the client suppresses UI, the server suppresses dispatch). Keeping it in a framework-free domain layer is what makes it portable and testable in both places.

### Offline-first write path

1. Care event written to the local store immediately; UI updates optimistically
2. Event queued for sync with a client-generated UUID (idempotency key)
3. On connectivity, queue drains; server deduplicates on the UUID
4. Conflict policy: care events are **append-only facts**, so last-write-wins is safe. There is no merge semantics problem — two parents logging different feeds is two feeds, not a conflict.

This is the main reason the data model should treat care events as an immutable event log rather than mutable rows.

---

## 6. Data partitioning — the security-critical decision

The PRD requires couple/biological data to live in "a separate, access-controlled partition". This is the single highest-risk area in the product: **child data and partner intimate/biological data in one application** is a combination that will attract regulator attention and would be catastrophic in a breach.

Three data classes, three different handling regimes:

| Class | Contents | Store | Encryption | Deletion | Who can read |
|---|---|---|---|---|---|
| **A — Child** | Care events, milestones, baby photos, avatar renders | Primary DB + object storage | At rest + in transit; photos additionally encrypted with a per-family key | Independently deletable (COPPA/GDPR) | Both parents in the family |
| **B — Co-parenting** | Tasks, messages, reactions, timeline | Primary DB | At rest + in transit | Independently deletable | Both parents in the family |
| **C — Couple / biological** | Mood + energy check-ins, cycle data (V1.1), nudge history | **Separate logical store, separate credentials** | At rest + in transit, **per-parent key** | Independently deletable **without touching A or B** | **Only the parent who logged it.** The partner never reads raw class-C data. |

**The load-bearing rule:** the nudge scheduler reads class C and emits only a boolean eligibility signal. **A parent's raw mood or cycle data is never exposed to their partner, through any surface, ever.** The partner sees a nudge or does not see a nudge; they never learn why.

This is both a privacy requirement and a product requirement. If a partner could infer "she logged that she's exhausted", the check-in stops being honest and the entire couple layer's data becomes worthless.

**Consequences:**

- Class C gets its own schema/database with its own credentials — not a column on the parents table
- No join between class C and classes A/B in application code; the boundary is crossed only by the scheduler, only in one direction, only emitting a boolean
- Disabling the couple layer must drop class C data without affecting A or B (PRD US-5 AC)
- Audit logging on every class-C read

**This section requires Security Auditor (Hakim) sign-off before any schema is written.**

---

## 7. Real-time transport

| Path | Mechanism | Why |
|---|---|---|
| Care event → absent parent | **Push notification (APNs/FCM)** | Must arrive when the app is backgrounded or closed. This is the product promise. |
| Both apps foregrounded | Push + **live channel** (WebSocket or SSE) | Lower latency for the reaction/voice-note exchange, which is a conversational loop |
| App resumed from background | Timeline delta fetch | Cheaper and more reliable than replaying missed socket frames |

Push is the primary channel and the live channel is an enhancement — never the reverse. A design that depends on a socket being open fails exactly when the product matters most: the absent parent's phone in their pocket.

Transport choice for the live channel is DP-5.

---

## 8. Avatar generation and aging

The riskiest technical unknown in the product, and the one the market research flagged as a positioning risk if executed poorly.

**Pipeline:**

```
Parent photos ──► face-feature extraction ──► generation prompt
                                                     │
                                                     ▼
                                          age-band conditioning
                                       (newborn/3m/6m/9m/12m/18m+)
                                                     │
                                                     ▼
                                        render ──► cache per (family, age band)
```

**Design positions:**

- **Renders are cached, not generated on demand.** Six age bands per family, generated ahead of the child reaching them. Generation is a background job, not a request-path operation.
- **Style is illustrated, not photorealistic.** PRD US-1 already specifies "a warm, illustrated persona, not a literal face merge". This is a deliberate uncanny-valley avoidance strategy *and* the strongest visual differentiator from the six novelty photo-generators identified in the market research. A photoreal render invites direct comparison with apps charging $9.99; an illustrated companion does not.
- **Aging is DOB-driven with milestone override.** The avatar advances automatically on date-of-birth age bands; a logged milestone can advance it early. Resolves the PRD's open question in favour of automatic-with-override.
- **Regeneration is capped at 3 attempts** (PRD edge case) — both a cost control and a quality signal. Families exceeding it indicate a model-quality problem worth investigating, so instrument this.

Model selection is DP-2 and **requires a spike before it can be decided** — see § 9.

---

## 9. Decision points requiring an AgDR

Per `.claude/rules/agdr-decisions.md`, each of these is a real choice with alternatives and trade-offs. **None is decided by this document.** Each needs `/decide` (and DP-2 needs a spike first) before the corresponding Build work starts.

| ID | Decision | Options | Lead recommendation | Blocks |
|---|---|---|---|---|
| **DP-1** | Cross-platform mobile framework | React Native + Expo · Flutter · Kotlin Multiplatform · two native apps | React Native + Expo — aligns with the portfolio's TypeScript standard (`handbooks/language/typescript/strict-mode.md`), shares domain-layer code with a TS backend, and has the strongest push/offline library ecosystem. Flutter is a legitimate contender on render performance for the avatar screens. | All mobile work |
| **DP-2** | Avatar image-generation model | Stable Diffusion (self-host or API) · DALL·E · Midjourney API · a fine-tuned illustration model | **Undecided — spike required.** The PRD already schedules this. Judge on emotional resonance across diverse parent pairs, not on benchmark quality. Must include mixed-race pairs; the market research found FutureBaby explicitly weak there, and that is a failure mode we cannot ship. | Avatar work |
| **DP-3** | LLM vendor for baby voice, advice, and nudges | Claude · GPT · Gemini · self-hosted open model | Undecided. Selection criteria must weight *tone control and safety* above raw capability — this model writes messages to exhausted new parents and romantic prompts between spouses. Latency budget (§ 4.2) is a hard filter. | AI gateway |
| **DP-4** | API style | REST · GraphQL · tRPC | Undecided. tRPC is attractive if DP-1 lands on React Native (end-to-end type safety across a TS stack); REST is the safer default if any non-TS client is ever likely. | Core API |
| **DP-5** | Live channel transport | WebSocket · SSE · vendor realtime (Ably/Pusher/Supabase Realtime) | Undecided. Note this channel is an *enhancement* (§ 7) — a managed vendor is defensible here precisely because the failure mode is degraded latency, not a broken promise. | Realtime work |
| **DP-6** | Primary datastore + the class-C partition mechanism | Postgres (separate schema/DB for class C) · Postgres + separate managed instance · Postgres + a dedicated encrypted store | Undecided. **Security Auditor must be in this decision, not consulted after it.** § 6 constrains the option space more than performance does. | All persistence |
| **DP-7** | Backend hosting and deploy model | Container platform · serverless · managed PaaS | Undecided. Notification fan-out at 100k families is the sizing input. | Infrastructure |
| **DP-8** | Auth and family-membership model | Managed auth vendor · self-hosted | Undecided. Partner-invite flow (PRD FR-13) and the two-parents-one-family authorisation boundary are the requirements that constrain this. | All authenticated paths |

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| **Nudge mistiming harms a vulnerable parent** | Severe — reputational and human | Deterministic domain rules (§ 4.4), full test coverage, mental-health signposting, conservative defaults. The LLM phrases; it never decides. |
| **Class-C data leak or partner-visible inference** | Severe — regulatory and product-fatal | § 6 partitioning, per-parent keys, boolean-only boundary crossing, audit logging, Hakim sign-off before schema |
| Avatar quality lands in the uncanny valley | High — product feels cheap, invites novelty-app comparison | Illustrated style, DP-2 spike judged on emotional resonance across diverse pairs |
| LLM latency breaks the 5 s budget | High — breaks the core promise | Template fallback bank (§ 4.2); notification always ships |
| COPPA/GDPR review lands late and blocks beta | High — schedule | Already flagged blocking in the PRD; start it in parallel with tech design, not after |
| Push delivery unreliability at scale | High | Delivery instrumentation from day one; treat push success rate as a product SLO, not an infra metric |
| Over-engineering before product-market fit | Medium | Modular monolith (§ 4); resist service extraction until load proves it necessary |

---

## 11. What must happen before Build opens

- [ ] Solution Architect review of this document
- [ ] **Hakim (Security Auditor) sign-off on § 6** — data partitioning, before any schema exists
- [ ] DP-2 spike completed (avatar model) — already on the PRD timeline
- [ ] AgDRs written for DP-1, DP-4, DP-6, DP-8 (the decisions that block the walking skeleton)
- [ ] `Dr-kersho/still-us` repo created (owner action — outside this session's GitHub grant)
- [ ] Sprint tickets filed, starting with a walking skeleton: log one care event on device → persist → notify the other parent. One trivial path through every architectural layer.

DP-3, DP-5, and DP-7 can be decided during Build without blocking the skeleton.

---

## 12. Open questions for the Solution Architect

1. Is the modular monolith the right call at this stage, or does the notification fan-out warrant extraction from day one?
2. Is the boolean-only class-C boundary (§ 6) sufficient, or should the nudge scheduler run entirely inside the class-C trust boundary and expose only a dispatch call?
3. Should the domain layer be shared as a package between mobile and backend (possible if DP-1 = React Native and the backend is TypeScript), or duplicated deliberately to avoid coupling deploy cycles?
4. Is the template-fallback strategy (§ 4.2) acceptable, or should the notification ship instantly with template copy always, and the AI-written version replace it in-app afterwards?

---

## Glossary

| Term | Definition |
|---|---|
| Class A / B / C | The three data sensitivity classes defined in § 6 — child, co-parenting, and couple/biological |
| Nudge eligibility | The deterministic domain decision of whether a partner nudge may be sent right now, computed independently of any LLM |
| Template bank | Pre-generated baby-voice message phrasings per event type and age band, used when an LLM call exceeds its latency budget |
| Age band | A developmental bracket (newborn, 3m, 6m, 9m, 12m, 18m+) that conditions avatar appearance and voice |
| Walking skeleton | The thinnest end-to-end slice wiring one trivial path through every architectural layer |
| DP-n | A decision point in § 9 requiring an AgDR before the dependent Build work starts |
