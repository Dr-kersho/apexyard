# KoraID — MVP PRD

**Status**: Draft
**Author**: Ahmed (Product Manager, ApexYard)
**Created**: 2026-05-15
**Last Updated**: 2026-05-15
**Validation**: IDEA-001 — GREEN (see `projects/_inbox/validation/IDEA-001-validation.md`)

---

## Overview

### Problem Statement

Egypt has 35–40M youth under 30. Football is the national obsession. Yet three groups are structurally underserved:

**The player** has no path to visibility. 623,000 registered athletes (down 32% from 920K in 2013) and millions more playing unregistered street football. Private clubs charge up to 250,000 EGP/year against a 165,000 EGP average income. The scouting pipeline is controlled by corrupt agents — FIFPRO has formally warned foreign players against Egyptian clubs. Talented kids from lower-income backgrounds have zero structured way to prove their ability.

**The court owner** runs on WhatsApp and cash. No digital booking system, no-shows are common, empty slots go unfilled, revenue is unpredictable.

**The scout** has no data. No structured, verifiable information exists on Egyptian grassroots talent. Scouts must physically attend matches or rely on corrupt agent networks.

Existing apps each solve one piece. Yalla Hagz (26K downloads) handles booking but has no player identity. Hareeef (10K installs) has player portfolios and highlights but no booking utility — players open it once and abandon it. Nobody connects booking + structured player identity + community.

KoraID is the intersection: daily booking utility that keeps players coming back, a structured drill-verified profile that makes them discoverable, and community features that create network effects.

### Target Users

**Primary — The Player (Acquisition)**
Egyptian male or female youth aged **8–25**, playing pickup/street/amateur football in Alexandria (launch) and Cairo (Month 3+). Two segments:

- **8–12 (Parent-mediated)**: Parent creates and manages the profile. Parent films the drills, books the court, shares the card. Child's data belongs to the parent account. Parent WhatsApp sharing ("my 9-year-old got GOLD tier!") is a distinct viral loop.
- **13–25 (Self-managed)**: Player books independently, builds their own profile, shares their card. Aspiring to be discovered by scouts. Currently excluded from formal scouting pipelines.

**Secondary — The Court Owner (Supply)**
Egyptian football court/futsal pitch operators in Alexandria. Currently managing bookings via WhatsApp and cash. Willing to adopt digital if it fills empty slots and requires no upfront payment (commission-only model).

**Tertiary — The Scout (Phase 2 Revenue)**
Professional and semi-professional scouts at Egyptian clubs, Gulf clubs, and European clubs seeking affordable MENA talent. Not building for them in this MVP — but every player profile is structured to be scout-readable from Day 1.

### Goals

1. **Viral coefficient ≥ 1.2** within 30 days of launch — measured by card shares that result in a new signup within 48h
2. **≥ 20% of registered players reach GOLD tier** within their first 30 days — proving the drill protocol converts
3. **≥ 200 court bookings** in Month 1 across 3–5 partner courts in Alexandria
4. **≥ 3 of 5 launch-partner court owners** still active (posting slots, responding to bookings) at the 30-day mark
5. **DAU/MAU ≥ 15%** by end of Month 1 — Open Match Board and peer ratings drive daily opens beyond booking days

### Non-Goals (Out of Scope for this MVP)

- **Layer 3 — Full Kora Reels social feed**: TikTok-style vertical scroll, Goals of the Week compilations, Challenge of the Week with Player of the Week badge. Deferred to Phase 2 (Month 2–3). *Basic clip upload to profile is in scope; the algorithmic feed is not.*
- **Layer 4 — B2B Scout Dashboard**: searchable database, watchlists, contact requests, agency API. Deferred to Phase 2 (Month 6+). Profiles are built scout-ready from Day 1; the interface to access them is not.
- **Platinum and Diamond card tiers**: coach verification and teammate endorsement flows require a denser network. Deferred to Phase 2.
- **G coins / virtual currency economy**: needs Month 1 behavioral data to design incentive curves correctly. Deferred to Phase 2.
- **Padel booking**: strong Egyptian market, but dilutes football-first positioning at launch. Add in Month 3.
- **In-feed advertising** and **sponsored tournaments**: no inventory to sell at launch scale. Phase 3.
- **AI video auto-tagging**: needs training data volume. Phase 3.
- **Transfer fee cut / agent marketplace**: legal and operational complexity. Phase 3+.

---

## Success Metrics

| Metric | Target | Timeframe | How Measured |
|--------|--------|-----------|--------------|
| Cards shared (WhatsApp/Instagram) | ≥ 100 | Pre-launch week | PostHog share events |
| Registered users | ≥ 500 | Month 1 | Auth0 |
| Court bookings | ≥ 200 | Month 1 | Booking DB |
| GOLD tier completion rate | ≥ 20% of registrants | Month 1 | Profile tier field |
| Active court owners | ≥ 3 of 5 | Day 30 | Owner dashboard logins |
| DAU/MAU ratio | ≥ 15% | Month 1 | PostHog |
| Viral coefficient (share → signup) | ≥ 1.2 | Month 1 | PostHog referral tracking |
| Open Match Board posts filled | ≥ 50% of posts | Month 1 | Match board DB |

**Kill criteria** (shut down or pivot if any two fire together):
- Pre-launch: < 100 cards created in 7-day HTML test
- < 30% Silver tier completion at Week 2
- < 2 of 5 court owners agree to onboard at soft launch
- DAU/MAU < 10% at Day 30

---

## User Stories

### US-01: Pre-launch Card Generator

> As a **footballer in an Egyptian Facebook/WhatsApp group**, I want to generate a FIFA-style card with my basic info and share it, so that I feel seen as a player with an identity and my friends want one too.

**Acceptance Criteria**:
- [ ] Static HTML page (no backend, no signup required) generates a Bronze-tier FIFA card from name, position, age, city, photo
- [ ] Card renders as a shareable image (canvas → PNG download)
- [ ] "Get the full app" CTA on every generated card
- [ ] Works on mobile Chrome and Safari without install
- [ ] Loads in < 2s on a 3G connection

---

### US-02: Court Discovery and Booking

> As a **player aged 13–25 in Alexandria**, I want to find an available court near me, see its price and slot times, and book and pay in under 2 minutes, so that I stop coordinating via WhatsApp and can guarantee my spot.

**Acceptance Criteria**:
- [ ] Map view and list view of partner courts with distance from current location
- [ ] Each court shows: name, surface type, price per hour, available slots today and tomorrow, user rating
- [ ] Slot selection and Paymob payment (Fawry / card / wallet) in ≤ 3 taps from court detail page
- [ ] Booking confirmation sent via push notification and SMS fallback
- [ ] Player can view and cancel (≥ 2h before slot) bookings from their profile
- [ ] Prayer-time slots are labelled: "Post-Maghrib", "Post-Isha" — not hidden, just named correctly for cultural context
- [ ] Night/outdoor filter: filter courts by "has floodlights" for evening slots

---

### US-03: Court Owner Dashboard

> As a **court owner in Alexandria**, I want to set my available slots, pricing, and see my bookings for the week, so that I don't need to manage WhatsApp messages and I can see my revenue clearly.

**Acceptance Criteria**:
- [ ] Court owner logs in with a separate owner account (phone OTP)
- [ ] Can create recurring slot templates (e.g., every day 4pm–11pm in 1h blocks)
- [ ] Can block out slots (maintenance, private events) with one tap
- [ ] Sees upcoming bookings for the next 7 days with player name and payment status
- [ ] Revenue summary: this week / this month / all-time (EGP)
- [ ] Can set different prices per slot (peak / off-peak)
- [ ] Receives push notification when a slot is booked or cancelled
- [ ] Court page shows the court's "trending players this week"

---

### US-04: Player Profile — Bronze Tier

> As a **new player (any age)**, I want to create my player profile in 5 minutes, so that I have a basic FIFA card I can share immediately and a foundation to build on.

**Acceptance Criteria**:
- [ ] Signup via phone OTP (primary) or Google (secondary)
- [ ] If declared age < 13: parent phone/email is required; profile is parent-managed
- [ ] Profile fields: photo, name, age, height (cm), weight (kg), dominant foot, position(s), city, team name (optional)
- [ ] Bronze card generated instantly on profile save — all 6 FIFA stats shown as "?" placeholders
- [ ] Card downloadable as PNG, shareable to WhatsApp with one tap
- [ ] "Challenge a friend" share: generates side-by-side card comparison image; friend's card shows as "Unrated" if not on platform

---

### US-05: Player Profile — Silver Tier (Physical Tests)

> As a **player with a Bronze card**, I want to film three physical tests with a friend at any open space, so that my PAC and PHY stats get real numbers and my card upgrades to Silver.

**Acceptance Criteria**:
- [ ] Step 2 accessible from Training Mode (no court booking required) or from a booked session
- [ ] Three tests with animated in-app demos: 20m sprint (timed on video), 4×5m agility shuttle (timed), standing jump against wall (measured in cm)
- [ ] Video uploaded to S3 via presigned URL with client-side compression to ≤ 10MB per clip
- [ ] Timer overlay rendered client-side; stat derived from recorded time/measurement
- [ ] PAC derived from 20m sprint; PHY from agility shuttle + jump
- [ ] Stats displayed as 0–99 percentile vs all players in same age group
- [ ] Silver card issued automatically when all three tests uploaded and processed
- [ ] Upload survives interrupted 3G connection (resumable upload)

---

### US-06: Player Profile — Gold Tier (Technical Drills)

> As a **player with a Silver card**, I want to film five technical drills, so that all six FIFA stats are real numbers and scouts can see I've proven myself beyond physical tests.

**Acceptance Criteria**:
- [ ] Five drills with animated in-app demos: juggling max count, 10 passes at target (15m), 5 shots at corners, dribbling slalom (5 cones, timed), position-specific drill
- [ ] All 6 stats (PAC, SHO, PAS, DRI, DEF, PHY) populated from real data after Gold completion
- [ ] Overall rating calculated using position-weighted formula
- [ ] Gold card issued automatically
- [ ] Benchmarks recalibrated monthly against full player population per age group
- [ ] "Improve this stat" CTA: each stat links to the relevant drill with a "try again" flow

---

### US-07: Training Mode

> As a **player who plays on public pitches (no court booking)**, I want to complete my drill protocol without needing to book a court, so that I can build my profile no matter where I play.

**Acceptance Criteria**:
- [ ] "Build My Card" entry point on home screen — separate from booking flow
- [ ] All Silver and Gold drills accessible without an active booking
- [ ] Drill checklist shows which tests are complete, which are pending
- [ ] Videos filmed after QR check-in are tagged with the court name automatically; others tagged "self-recorded"
- [ ] Both tags shown transparently on profile

---

### US-08: Parent Mode (Ages 8–12)

> As a **parent of a young footballer aged 8–12**, I want to create a verified profile for my child and share their card in family WhatsApp groups, so that their progress is documented and they have a path to visibility as they grow up.

**Acceptance Criteria**:
- [ ] Age gate at signup: if player age < 13, parent phone + name required before profile creation
- [ ] Parent account is primary; child's card linked to it
- [ ] Parent receives all notifications (tier upgrades, future scout views)
- [ ] Child's profile is private by default; parent can set to public
- [ ] Parent can manage bookings on behalf of child
- [ ] No direct messaging to/from the child's profile — all communication routes through parent account
- [ ] Full data deletion within 30 days of parent request

---

### US-09: Open Match Board

> As a **player who can't fill a full squad**, I want to post "need 2 players, Friday 7pm, Court Al-Nour" and find others to join, so that I can play more often even when my usual crew isn't available.

**Acceptance Criteria**:
- [ ] Post a game: position needed, date/time, court, number of spots, skill level note
- [ ] Browse open games: filtered by city, date, position, court
- [ ] Request to join → creator notified → accepts/declines
- [ ] Post auto-expires 1h after the slot start time
- [ ] Player's card visible to post creator when they request to join
- [ ] Creator notified on join requests; joining players notified on acceptance

---

### US-10: Court QR Check-In

> As a **player at a partner court**, I want to scan a QR code and log that I played here, so that my sessions are tracked and the court shows my presence.

**Acceptance Criteria**:
- [ ] Each partner court has a unique QR code (PDF printable from owner dashboard)
- [ ] Scanning QR opens KoraID PWA to court's check-in page (deep link)
- [ ] Check-in logged to player session history with court name, date, time
- [ ] Court page shows "Played here recently" (last 7 days, public profiles only)
- [ ] Court page shows "Trending this week" — top 3 rated players who checked in
- [ ] Drill videos filmed after check-in tagged with court name automatically

---

### US-11: Squad / Street Team Profile

> As a **group of friends who play together regularly**, I want to create a squad profile with our name and aggregate rating, so that we have a shared identity and can challenge other local squads.

**Acceptance Criteria**:
- [ ] Squad creation: name, city, optional logo (emoji fallback), 5–15 members
- [ ] Squad card: aggregate overall rating (average of member Gold ratings)
- [ ] "Challenge" button: sends challenge notification to another squad; both aggregate cards shown side-by-side
- [ ] WhatsApp share: "Our squad is rated X — challenge us" image with squad card

---

### US-12: Post-Game Peer Ratings

> As a **player who just finished a booked session**, I want to rate my teammates quickly, so that their profiles reflect real peer validation beyond drill stats.

**Acceptance Criteria**:
- [ ] 30 minutes after session ends: push notification to all booking players "Rate your teammates"
- [ ] Three attributes: Effort / Skill / Fair Play (1–5 stars each)
- [ ] Rating takes < 60 seconds for all teammates
- [ ] Peer rating shown on profile as a soft signal, visually distinct from drill-verified stats
- [ ] Ratings are anonymous (aggregate only)
- [ ] Second dismiss suppresses future post-game prompts (opt-out)

---

### US-13: Open to Trials Toggle

> As a **player seeking a professional opportunity**, I want to signal that I'm open to trial invitations, so that when scouts join the platform they can identify me immediately.

**Acceptance Criteria**:
- [ ] Toggle on profile: "Open to Trial Opportunities — ON/OFF"
- [ ] When ON: badge on player card (visible to scouts in Phase 2; visible to player only in Phase 1)
- [ ] Player can set preferred trial location and preferred club tier

---

### US-14: Community Court Submission

> As a **player who knows a court that isn't listed**, I want to submit it for review, so that the database covers all courts in Alexandria.

**Acceptance Criteria**:
- [ ] "Submit a court" button on court discovery map
- [ ] Fields: name, location pin, surface type, approximate price range, photo (optional)
- [ ] Submission goes to admin review queue
- [ ] Submitter notified when court goes live
- [ ] Approved submitters earn a "Court Scout" badge on their player profile

---

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Player declares wrong age (e.g., 10-year-old enters 14) | Self-declared at launch; court owner can flag discrepancy; manual review |
| Video upload fails mid-upload on 3G | Resumable upload — pick up from last byte; show progress bar |
| Paymob payment times out | Slot not confirmed; player shown clear error; slot released after 5 min hold |
| Court owner doesn't respond to booking for 30 min | Auto-confirmed; owner notified; no manual acceptance required by default |
| Peer rating not submitted | Prompt expires after 24h; no penalty; no repeat prompt |
| Open Match Board post for court not in system | Free-text court name accepted; post still visible |
| Squad member leaves | Squad rating recalculated; departing member's card removed from squad page |
| < 50 players in an age cohort | Show raw score, not percentile; switch to percentile automatically at ≥ 50 |

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-01 | Pre-launch HTML card generator (static, no backend) | Must | Week 0–1, kill test |
| FR-02 | Phone OTP + Google auth (Auth0) | Must | Age gate at signup |
| FR-03 | Parent account for ages 8–12 | Must | Child data privacy |
| FR-04 | Court discovery — map + list + filters | Must | Leaflet + OSM |
| FR-05 | Real-time slot availability | Must | DynamoDB |
| FR-06 | Paymob payment (Fawry / card / wallet) | Must | 2.5–3% per tx |
| FR-07 | Booking confirmation (push + SMS fallback) | Must | Firebase push |
| FR-08 | Court owner dashboard — slots, pricing, revenue | Must | |
| FR-09 | Prayer-time slot labels (Maghrib / Isha context) | Must | Static lookup by city |
| FR-10 | Bronze profile creation | Must | |
| FR-11 | Silver tier — 3 physical tests with video upload | Must | S3 + FFmpeg Lambda |
| FR-12 | Gold tier — 5 technical drills with video upload | Must | |
| FR-13 | Stat derivation engine (video → 0–99 percentile) | Must | Age-group cohort calibration |
| FR-14 | Training Mode — drills without booking | Must | Decouples profile from paid booking |
| FR-15 | FIFA card PNG export | Must | Canvas API |
| FR-16 | WhatsApp card share (single + challenge format) | Must | |
| FR-17 | Court QR code — generation + check-in deep link | Must | |
| FR-18 | Open Match Board — post, browse, join, auto-expire | Must | |
| FR-19 | Post-game peer ratings (30 min after session) | Must | |
| FR-20 | "Open to Trials" toggle on profile | Must | |
| FR-21 | Squad/team profile + challenge | Must | |
| FR-22 | Community court submission + review queue | Must | |
| FR-23 | Arabic RTL support throughout | Must | |
| FR-24 | Resumable video upload (3G resilience) | Must | |
| FR-25 | "Improve this stat" drill suggestions | Should | |
| FR-26 | Booking cancellation (≥ 2h before slot) | Should | |
| FR-27 | Player search (name, city, position) | Should | Phase 2 scout prep |
| FR-28 | "Trending this week" per court | Should | Court owner engagement |
| FR-29 | Physical card print ordering (50–100 EGP) | Could | Phase 1.5 revenue |
| FR-30 | Night / floodlit court filter | Could | |

### Non-Functional Requirements

| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Initial PWA load (3G) | < 3s |
| Performance | Video upload start (after file select) | < 2s to begin |
| Performance | Card PNG generation | < 1s |
| Reliability | Booking availability read | < 500ms |
| Storage | Per drill clip size (post-compression) | ≤ 10MB |
| Availability | Court booking system uptime | ≥ 99.5% |
| Security | Player video — private S3 with presigned URLs | Signed URLs, 1h expiry |
| Security | Child data (< 13) — parent-gated access | No direct child login |
| Accessibility | Arabic RTL + English LTR | Both supported from Day 1 |
| Compliance | Child data deletion on request | ≤ 30 days |
| Cost | Infrastructure at 500 MAU | ≤ $15/mo |
| Cost | Infrastructure at 5K MAU | ≤ $90/mo |

---

## Design

### Core User Flows

#### Player Onboarding → First Card Share
```
Download / open PWA
    |
    v
Sign up (phone OTP)
    |
    v
Age gate — under 13?
    |-- YES → Parent phone required → Parent account created → Child profile linked
    |-- NO  → Self-managed profile
    |
    v
Profile creation (name, photo, position, city)
    |
    v
Bronze card generated → Share to WhatsApp (or Challenge a Friend)
    |
    v
Home screen: "Complete Step 2 to unlock Silver"
```

#### Court Booking
```
Home → "Book a Court"
    |
    v
Map / list view — filter by distance, price, surface, floodlights, prayer slot label
    |
    v
Court detail — slot grid (available / booked / blocked)
    |
    v
Select slot → Paymob checkout (Fawry / card / wallet)
    |
    v
Confirmation push + SMS
    |
    v
[30 min after session] Push: "Rate your teammates"
```

#### Drill Protocol — Bronze → Gold
```
Home → "Build My Card" (Training Mode, no booking required)
    -- OR --
Post-booking: "Build your card at this court"
    |
    v
Step 2 checklist: 3 physical tests
    |-- Watch animated demo
    |-- Film test (timer overlay)
    |-- Upload (resumable, 3G-safe)
    |-- Stat derived → PAC / PHY updated
    |
    v
Silver card issued
    |
    v
Step 3 checklist: 5 technical drills (same flow)
    |
    v
Gold card issued → All 6 stats populated → Overall rating shown
    |
    v
"Challenge a friend" share prompt
```

---

## Technical Notes

### Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 14 + Tailwind CSS (PWA) | $0 (Vercel free) |
| Auth | Auth0 (phone OTP + Google) | $0 (free tier) |
| API | AWS Lambda (Node.js) | $0 (free tier) |
| Database | DynamoDB | $0 (free tier) |
| Video storage | S3 + CloudFront | ~$10–90/mo at scale |
| Video processing | FFmpeg on Lambda | Pay-per-use |
| Payments | Paymob | 2.5–3% per transaction |
| Push notifications | Firebase Cloud Messaging | $0 |
| Maps | Leaflet + OpenStreetMap | $0 |
| Analytics | PostHog | $0 (free tier) |
| Error tracking | Sentry | $0 (free tier) |

**Total cash outlay for MVP: ~$22** (domain only).

### Dependencies

| Dependency | Type | Status | Notes |
|------------|------|--------|-------|
| Paymob merchant account | External | Needs registration | 2–5 day approval |
| Auth0 tenant | External | Ready | Free tier supports 7,500 MAU |
| AWS account | External | Ready | Free tier covers launch scale |
| 3–5 Alexandria court owner agreements | Business | Needs founder outreach | Free commission for 3 months |
| S3 bucket + CloudFront distribution | Infrastructure | Ready | FFmpeg Lambda layer needed |

### Technical Constraints

- Video upload must survive interrupted 3G — use multipart upload with client-side retry
- All drill stats derived client-side from video metadata and user-confirmed measurements; no server-side CV at this stage
- DynamoDB single-table design required — avoid relational patterns that would require RDS
- PWA install prompt must work on iOS Safari and Android Chrome
- Arabic RTL handled at CSS level (logical properties) from Day 1

---

## Launch Plan

### Phase 0 — Kill Test (Week 0–1)
- [ ] Build static HTML card generator (1 day)
- [ ] Share in ≥ 5 Egyptian football Facebook and WhatsApp groups
- [ ] **Go criterion: ≥ 100 cards in 7 days.** Below this: stop and diagnose.

### Phase 1 — MVP Build (Weeks 1–6)
- [ ] Week 1–2: Foundation — Next.js PWA, Auth0, DynamoDB, Bronze profile, card generator in-app
- [ ] Week 2–3: Booking — court discovery, Paymob, court owner dashboard, QR check-in, prayer-time labels
- [ ] Week 3–4: Profile builder — Silver + Gold tiers, drill demos, S3 video upload, stat engine
- [ ] Week 4–5: Community — Open Match Board, peer ratings, squad profiles, Training Mode
- [ ] Week 5–6: Polish — Parent Mode, Arabic RTL, challenge card share, community court submission, mobile testing

---

## Open Questions

| Question | Owner | Status | Resolution |
|----------|-------|--------|------------|
| Paymob merchant approval timeline — 2–5 days or 2 weeks? | Ahmed | Open | Unblock Week 2 gate |
| Min player count per age cohort before percentile scoring is meaningful? | Ahmed (tech) | Open | Suggest ≥ 50; show raw score until then |
| Parent Mode age gate: self-declared or ID-verified? | Ahmed (product) | Open | Recommend self-declared at launch |
| Prayer times: static lookup or free API (Aladhan)? | Ahmed (tech) | Open | Aladhan API is free and accurate |
| Open Match Board abuse moderation approach? | Ahmed | Open | Report button + auto-flag on repeated "didn't happen" reports |
| Under-13 profile: invisible by default or parent-unlockable? | Ahmed (product + legal) | Open | Recommend invisible by default, parent-unlockable with consent step |

---

## Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Kill test (100 cards in 7 days) | 2026-05-22 | Pending |
| Foundation complete (auth, DB, Bronze profile) | 2026-05-29 | Pending |
| Booking live with Paymob | 2026-06-05 | Pending |
| Profile builder to Gold tier | 2026-06-12 | Pending |
| Community features (Match Board, squads, ratings) | 2026-06-19 | Pending |
| Soft launch — Alexandria, 3–5 courts | 2026-06-26 | Pending |
| 500 users / 200 bookings / 100 GOLD profiles | 2026-07-26 | Pending |

---

## Approvals

| Role | Name | Date | Status |
|------|------|------|--------|
| Product Manager | Ahmed | 2026-05-15 | Author |
| Head of Product | — | — | Pending |
| Tech Lead | — | — | Pending |
| Head of Design | — | — | Pending |
