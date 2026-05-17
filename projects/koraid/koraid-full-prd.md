# KoraID — Full Product Document
### MVP · Full Product · All Tickets

**Version:** 1.0  
**Author:** Ahmed  
**Date:** 2026-05-17  
**Status:** Living Document

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Market & Problem](#2-market--problem)
3. [Target Users](#3-target-users)
4. [Product Architecture (4 Layers)](#4-product-architecture-4-layers)
5. [MVP PRD — Phase 1 (Weeks 1–6)](#5-mvp-prd--phase-1-weeks-16)
6. [Full Product Roadmap — Phases 2–4](#6-full-product-roadmap--phases-24)
7. [Technical Architecture](#7-technical-architecture)
8. [All Tickets — MVP](#8-all-tickets--mvp)
9. [All Tickets — Phase 2](#9-all-tickets--phase-2)
10. [All Tickets — Phase 3](#10-all-tickets--phase-3)
11. [Kill Criteria & Success Metrics](#11-kill-criteria--success-metrics)

---

## 1. Product Vision

**KoraID is the digital identity layer for Egyptian grassroots football.**

Every player gets a FIFA-style card that reflects their real ability — verified through a structured drill protocol, not self-reported. Coaches and scouts get a credible, searchable database of talent that didn't exist before. Court owners fill empty slots without WhatsApp chaos.

**One sentence:** Book your pitch, build your card, get discovered.

**The moat:** Stats are drill-verified and video-backed. You cannot buy a better rating. A 17-year-old in Borg el-Arab with a 78-rated GOLD card has genuinely done the work — and any scout in the world can see that.

---

## 2. Market & Problem

### The Market

- Egypt population: 107M. Under-30s: 35–40M.
- Football is the national obsession — more passionate engagement per capita than most European markets.
- 623,000 registered athletes (down 32% from 920K in 2013 due to club unaffordability).
- Millions more playing unregistered street and pickup football — invisible to the formal game.
- Private clubs: up to 250,000 EGP/year against a 165,000 EGP average annual income.

### The Three Underserved Groups

**The Player**  
Has no path to visibility. The scouting pipeline is controlled by corrupt agents — FIFPRO has formally warned foreign players against Egyptian clubs. Talented kids from lower-income backgrounds have zero structured way to prove their ability. They play, they're good, nobody knows.

**The Court Owner**  
Runs on WhatsApp and cash. No-shows are common. Empty slots at 3pm go unfilled. Revenue is unpredictable. Switching cost to digital is high because no platform has proven it fills slots rather than just complicating operations.

**The Scout**  
Has no data. No structured, verifiable information on Egyptian grassroots talent. Must physically attend matches or rely on agent networks. Gulf and European clubs actively seek affordable MENA talent — Egypt is a blind spot because the data doesn't exist.

### The Competitive Gap

| App | What it does | What's missing |
|-----|-------------|---------------|
| Yalla Hagz (26K DL) | Court booking | No player identity; zero return visits after booking |
| Hareeef (10K installs) | Player highlights + portfolio | No booking utility; players open once, abandon |
| Malaeb | Booking + match-finding | No profile/scouting layer; Egypt weak |
| Sofascore / Wyscout | Pro stats | Zero grassroots coverage |
| **KoraID** | All three, connected | — |

The intersection nobody has built: **daily booking utility (return visits) + drill-verified profile (moat) + community (network effects)**.

---

## 3. Target Users

### Primary — The Player (Acquisition Engine)

Egyptian male or female youth aged **8–25**, playing pickup/street/amateur football.

**Segment A — Ages 8–12 (Parent-mediated)**
- Parent creates and manages the profile
- Parent films the drills and books the court
- Child's data belongs to the parent account
- Parent WhatsApp sharing ("my 9-year-old got GOLD tier!") is a distinct viral loop
- Profile private by default; parent can unlock public visibility

**Segment B — Ages 13–25 (Self-managed)**
- Books independently, builds their own profile, shares their card
- Aspires to be discovered — currently excluded from formal scouting pipelines
- Driven by peer competition and the social status of a higher-rated card

**Launch geography:** Alexandria (Month 1–2) → Cairo (Month 3+) → other governorates (Month 6+)

### Secondary — The Court Owner (Supply Side)

Egyptian football court and futsal pitch operators. Currently managing bookings via WhatsApp and cash.
- Willing to adopt digital **if it fills empty slots**
- Commission-only model (no upfront cost) is non-negotiable for adoption
- Target: 3–5 Alexandria courts at soft launch, 20+ by Month 3

### Tertiary — The Scout (Phase 2 Revenue)

Professional and semi-professional scouts at Egyptian clubs, Gulf clubs, European clubs seeking MENA talent.
- Not building for them in Phase 1
- Every player profile is structured to be scout-readable from Day 1
- B2B dashboard and subscription revenue in Phase 2 (Month 6+)

---

## 4. Product Architecture (4 Layers)

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 4 — B2B SCOUT DASHBOARD              Phase 2+    │
│  Searchable DB · Watchlists · Contact requests           │
├─────────────────────────────────────────────────────────┤
│  LAYER 3 — KORA REELS (Social Feed)         Phase 2     │
│  TikTok-style clips · Goals of Week · Challenges        │
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — PROFILE BUILDER                  Phase 1     │
│  Bronze → Silver → Gold drill protocol                   │
│  Video-verified stats · FIFA card · Sharing engine      │
├─────────────────────────────────────────────────────────┤
│  LAYER 1 — BOOKING MARKETPLACE              Phase 1     │
│  Court discovery · Paymob · Owner dashboard · QR        │
└─────────────────────────────────────────────────────────┘
```

**Layer 1** is the utility that drives daily opens.  
**Layer 2** is the moat — nobody can replicate drill-verified stats quickly.  
**Layer 3** is the network effect accelerator.  
**Layer 4** is the B2B revenue engine.

---

## 5. MVP PRD — Phase 1 (Weeks 1–6)

### Scope

Phase 1 delivers Layers 1 and 2 completely, with the community scaffolding that makes Layer 3 possible in Phase 2.

### What's IN Phase 1

- Pre-launch static HTML card generator (kill test)
- Firebase phone OTP + Google auth with age gate
- Parent Mode (ages 8–12)
- Court discovery map + list + Paymob booking
- Court owner dashboard with slot management
- Prayer-time slot labelling
- QR check-in
- Bronze → Silver → Gold tier profile
- Training Mode (drills without booking)
- FIFA card PNG export + WhatsApp sharing
- "Challenge a friend" side-by-side card share
- Open Match Board (post a game, join a game)
- Post-game peer ratings
- Squad profiles + challenge
- "Open to Trials" toggle
- Community court submission
- Arabic RTL throughout

### What's OUT of Phase 1

| Feature | Reason | When |
|---------|---------|------|
| Kora Reels feed (algorithmic) | Needs content volume | Phase 2 |
| B2B Scout Dashboard | Needs player database first | Phase 2 |
| Platinum/Diamond tiers | Needs denser network for coach verification | Phase 2 |
| G coins / virtual economy | Needs Month 1 behavioral data to design | Phase 2 |
| Padel booking | Dilutes football-first positioning | Month 3 |
| AI video auto-tagging | Needs training data volume | Phase 3 |
| Transfer fee / agent marketplace | Legal + operational complexity | Phase 3+ |
| In-feed advertising | No inventory at launch scale | Phase 3 |

### Phase 1 Success Metrics

| Metric | Target | By |
|--------|--------|----|
| Pre-launch cards generated | ≥ 100 | Day 7 |
| Registered users | ≥ 500 | Month 1 |
| Court bookings | ≥ 200 | Month 1 |
| GOLD tier completion rate | ≥ 20% of registrants | Month 1 |
| Active court owner partners | ≥ 3 of 5 | Day 30 |
| DAU/MAU ratio | ≥ 15% | Month 1 |
| Viral coefficient (share → signup) | ≥ 1.2 | Month 1 |
| Open Match Board posts filled | ≥ 50% | Month 1 |

---

## 6. Full Product Roadmap — Phases 2–4

### Phase 2 — Growth Layer (Months 2–6)

**Goal:** Turn KoraID from a useful utility into a platform players return to daily for social reasons, not just to book courts.

#### 2A — Kora Reels (Month 2–3)
TikTok-style vertical video feed of player highlights.
- Goals of the Week — curated weekly compilation
- Challenge of the Week — themed skill challenge; Player of the Week badge for highest-rated submission
- For-You feed — algorithm surfaces clips from players similar to the viewer (city, position, tier)
- Duet mode — react to a challenge clip with your own attempt side-by-side
- "Sponsor this player" soft signal — third-party can mark interest in a player; routes through KoraID, not directly

#### 2B — Platinum Tier (Month 3–4)
4th tier unlocked by match clip uploads + coach verification.
- Match highlights: player uploads clips from real matches (tagged by opponent + score)
- Coach verification: a verified coach on the platform endorses the player
- Platinum card: different visual design; "Match Proven" badge
- Access to the scout-facing preview (see your profile as a scout would see it)

#### 2C — Diamond Tier (Month 4–5)
Top tier — peer-endorsed by ≥ 3 Gold or Platinum players, ≥ 1 club-verified coach.
- Verified Club Experience badge (e.g., "Alexandria FC Academy")
- Diamond card enters the "Top Players" leaderboard per city and position

#### 2D — Scout Dashboard Beta (Month 5–6)
B2B interface for scouts.
- Searchable player database: filter by city, age, position, tier, open to trials
- Watchlist: save players, receive notifications when they upload new content
- Contact request: routed through KoraID (not direct contact) — player can accept or decline
- Pricing: EGP 500/mo per scout seat (beta price; full price Phase 3)

#### 2E — G Coins Economy (Month 4+)
Virtual currency designed after Month 1 behavioral data.
- Earned: completing drills, booking verified courts, posting on Match Board, referring a user who reaches Silver
- Spent: cosmetic card frames, squad logo customization, priority listing on Match Board
- Not spendable on stats — stats stay merit-only, non-purchasable

#### 2F — Physical Card Printing (Month 3+)
Revenue stream.
- Player orders physical card (FIFA card format, premium finish) for 75–150 EGP
- Ships within 5 business days via courier
- 40–60% margin

### Phase 3 — Monetization at Scale (Months 6–12)

#### 3A — AI Video Analysis
- Automatic stat extraction from drill videos using computer vision
- Eliminates the "user-confirmed measurement" step
- Requires: 50K+ labeled drill clips as training data

#### 3B — Scout Dashboard Full Launch
- Tier 2: agency seats (5 scouts), custom export, API access — EGP 3,000/mo
- Tier 3: club license (unlimited scouts), branded profile pages, talent pipeline integrations

#### 3C — Sponsored Tournaments
- Court owner posts a tournament bracket through KoraID
- Players pay entry fee (split: 70% prize pool / 20% court / 10% KoraID)

#### 3D — Transfer Marketplace
- Players list themselves for transfer
- KoraID takes 3–5% of any completed transfer where first contact happened on-platform
- Requires Egyptian FA regulatory review

#### 3E — Padel Expansion
- Add padel court booking (same infrastructure)
- Growing fast in Egypt's upper-middle market

### Phase 4 — Platform (Year 2+)

#### 4A — Academy Portal
- Registered academies manage entire youth squads
- Parents receive progress reports
- Bulk pricing: EGP 500/mo per academy (up to 50 players)

#### 4B — Insurance & Welfare
- Sports injury micro-insurance for verified KoraID players (EGP 30–50/mo)
- KoraID distribution cut

#### 4C — International Expansion
- Tunisia, Morocco → Nigeria, Ghana → Turkey

---

## 7. Technical Architecture

### Stack

| Layer | Technology | Phase 1 Cost |
|-------|-----------|-------------|
| Frontend | Next.js 14 + Tailwind CSS + PWA (next-pwa) | $0 (Vercel free) |
| Auth | Firebase Auth (phone OTP + Google) | ~$7.50 at 500 signups |
| API | Next.js Route Handlers + AWS Lambda | $0 free tier |
| Database | DynamoDB single-table | $0 free tier |
| Video storage | S3 + CloudFront | ~$10–15/mo at launch |
| Payments | Paymob | 2.5–3% per transaction |
| Push | Firebase Cloud Messaging | $0 |
| SMS fallback | Vonage / Twilio | ~$0.05/SMS |
| Maps | Leaflet + OpenStreetMap | $0 |
| Analytics | PostHog (EU instance) | $0 free tier |
| Errors | Sentry | $0 free tier |

**Total Phase 1 infrastructure: ~$22/mo** (mostly domain)

### Key Architecture Decisions

**Firebase Auth over Auth0:** Auth0 phone OTP requires Twilio at $0.07/SMS — $35 at 500 signups. Firebase Auth SMS in Egypt costs ~$0.015/SMS. FCM already in the stack. No MAU cap on Spark plan. *See AgDR-0002.*

**DynamoDB single-table over RDS:** Free tier covers full launch scale. Atomic conditional write prevents double-booking. No RDS minimum cost. *See AgDR-0001.*

**Client-side MediaRecorder over FFmpeg Lambda:** Client records H.264 720p at ~800kbps; uploads via S3 presigned multipart URL. Lambda handles metadata only. MediaConvert in Phase 2.

**iOS push limitation:** ~30–40% of iOS users need PWA installed + iOS 16.4+. SMS fallback required from Day 1.

### DynamoDB Entity Model (Single Table: `koraid-main`)

```
PK                SK                   Entity
------------------+--------------------+---------------------------
PLAYER#<uid>      PROFILE              Player profile + card tier
PLAYER#<uid>      DRILL#<tier>#<id>    Drill upload + stat
PLAYER#<uid>      SESSION#<date>#<id>  Court check-in session
PLAYER#<uid>      BOOKING#<date>#<id>  Player booking index
PLAYER#<uid>      SQUAD#<squadId>      Player squad membership
PLAYER#<uid>      RATING#<sid>#<rid>   Peer rating received
COURT#<courtId>   PROFILE              Court details + owner
COURT#<courtId>   SLOT#<date>#<time>   Slot availability (TTL)
BOOKING#<id>      DETAIL               Booking record
CITY#<city>       MATCH#<epoch>#<id>   Open match board post (TTL)
MATCH#<id>        PARTICIPANT#<uid>    Match join request
SQUAD#<squadId>   PROFILE              Squad details
SQUAD#<squadId>   MEMBER#<uid>         Squad member
PARENT#<uid>      PROFILE              Parent account
PARENT#<uid>      CHILD#<uid>          Parent-child link
OWNER#<uid>       PROFILE              Court owner account
```

GSI-1 `CityTierIndex`: `CITY#<city>` / `TIER#<tier>#PLAYER#<uid>` — scout search by city + tier (Phase 2)  
GSI-2 `CourtOwnerIndex`: `OWNER#<uid>` / `COURT#<courtId>` — owner dashboard

### Atomic Booking (Double-booking Prevention)

```javascript
await dynamoDB.transactWrite({
  TransactItems: [
    {
      Update: {
        Key: { PK: `COURT#${courtId}`, SK: `SLOT#${date}#${time}` },
        UpdateExpression: 'SET #status = :booked, bookingId = :bid',
        ConditionExpression: '#status = :available',
        ExpressionAttributeValues: {
          ':booked': 'BOOKED', ':available': 'AVAILABLE', ':bid': bookingId
        }
      }
    },
    {
      Put: {
        Item: { PK: `BOOKING#${bookingId}`, SK: 'DETAIL', ... },
        ConditionExpression: 'attribute_not_exists(PK)'
      }
    }
  ]
})
// Concurrent second booking → ConditionalCheckFailed → 409 Conflict
```

---

## 8. All Tickets — MVP

> **Format:** Each ticket maps to one GitHub Issue. Priority: 🔴 Must / 🟡 Should / 🟢 Could

---

### EPIC 0 — Kill Test

#### TICKET-001 · Static Card Generator (Phase 0) 🔴

**Type:** Feature | **Epic:** Phase 0 | **Estimate:** 1 day

**User Story:**  
As a footballer in an Egyptian Facebook/WhatsApp group, I want to generate a FIFA-style card with my basic info and share it, so that I feel seen as a player and my friends want one too.

**Acceptance Criteria:**
- [ ] Standalone `public/card-generator.html` — no backend, no signup required
- [ ] Form: name, position (GK/CB/LB/RB/CDM/CM/CAM/LW/RW/ST), age, city, photo upload
- [ ] Canvas renders Bronze FIFA card: dark background, bronze border, stats as "?"
- [ ] Download Card → PNG via canvas.toDataURL
- [ ] "Get the full app — KoraID" CTA on every card
- [ ] Loads < 2s on 3G (system-ui font only, no blocking external fonts)
- [ ] Works on mobile Chrome + Safari
- [ ] PostHog `card_generated` event on each generation
- [ ] Navigator Share API for mobile; fallback to download

**Kill criterion:** < 100 cards in 7 days → STOP

---

### EPIC 1 — Foundation

#### TICKET-002 · Project Setup & PWA Config 🔴

**Type:** Task | **Estimate:** 4 hours

**Acceptance Criteria:**
- [ ] Next.js 14 + TypeScript + Tailwind + App Router + src/ dir
- [ ] All deps: firebase, firebase-admin, @aws-sdk/client-dynamodb, @aws-sdk/lib-dynamodb, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, leaflet, react-leaflet, html2canvas, next-pwa, qrcode
- [ ] public/manifest.json — name: KoraID, theme: #1a9c4f, lang: ar, dir: rtl
- [ ] tailwind.config.ts — koraid.green #1a9c4f, koraid.gold #f5c518, koraid.bronze #cd7f32
- [ ] src/app/layout.tsx — Cairo font, dir="rtl" on html
- [ ] PostHog + Sentry wired in
- [ ] npm run typecheck && npm run lint both pass

---

#### TICKET-003 · Firebase Auth — Phone OTP 🔴

**Type:** Feature | **Estimate:** 1 day

**User Story:**  
As a player in Egypt, I want to sign up with my mobile number so I don't need an email or app store download.

**Acceptance Criteria:**
- [ ] src/app/auth/page.tsx — phone input with +20 prefix, Egyptian format validation
- [ ] src/app/auth/verify/page.tsx — 6-digit OTP, auto-submit on 6th digit
- [ ] RecaptchaVerifier (invisible) wired to auth page
- [ ] idToken POSTed to /api/auth/session on confirm
- [ ] Session cookie set (httpOnly, 7-day, secure in prod)
- [ ] src/middleware.ts — unauthenticated → /auth?redirect=<path>
- [ ] Resend code button after 60s countdown

---

#### TICKET-004 · Firebase Auth — Google OAuth 🔴

**Type:** Feature | **Estimate:** 3 hours

**Acceptance Criteria:**
- [ ] "Continue with Google" button on auth page
- [ ] signInWithPopup (desktop) / signInWithRedirect (mobile)
- [ ] Same session cookie flow as phone OTP
- [ ] Does not bypass age gate — redirects to onboarding if no profile exists

---

#### TICKET-005 · Age Gate & Parent Mode Entry 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-003

**User Story:**  
As a parent of a footballer aged 8–12, I want to create a verified profile for my child with my own phone number as the primary account.

**Acceptance Criteria:**
- [ ] Age field in onboarding; if age < 13 → "Parent account required" banner → /auth/parent
- [ ] src/app/auth/parent/page.tsx — parent phone OTP
- [ ] Parent Firebase account created; child UID linked to parent UID in DynamoDB
- [ ] All notifications route to parent phone
- [ ] No direct login for players under 13

---

#### TICKET-006 · DynamoDB Setup & Entity Types 🔴

**Type:** Task | **Estimate:** 4 hours

**Acceptance Criteria:**
- [ ] src/lib/db.ts — DynamoDB DocumentClient singleton
- [ ] src/lib/entities.ts — TypeScript interfaces for all entities
- [ ] src/lib/db-helpers.ts — getPlayer(), putPlayer(), updatePlayerTier(), getCourtSlots(), transactBooking()
- [ ] AWS table koraid-main: PK + SK (String), PAY_PER_REQUEST
- [ ] GSI-1 CityTierIndex + GSI-2 CourtOwnerIndex created
- [ ] TTL attribute ttl enabled

---

#### TICKET-007 · Bronze Player Profile Creation 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-003, TICKET-006

**User Story:**  
As a new player, I want to create my profile in 5 minutes and have a Bronze FIFA card I can share immediately.

**Acceptance Criteria:**
- [ ] Onboarding form: photo, name, age, height, weight, foot, position(s), city, team (optional)
- [ ] Photo cropped square client-side before S3 upload
- [ ] Player profile saved as PLAYER#<uid> / PROFILE
- [ ] Bronze card generated immediately on save
- [ ] Card PNG downloadable from profile page
- [ ] "Share to WhatsApp" — whatsapp://send with card

---

#### TICKET-008 · FIFA Card Canvas Renderer 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-007

**User Story:**  
As a player, I want my card to look like a real FIFA card so I feel proud sharing it.

**Acceptance Criteria:**
- [ ] src/lib/card-generator.ts — Canvas API, input PlayerProfile, output PNG data URL (320×440px)
- [ ] Bronze: dark gradient, bronze metallic border + glow
- [ ] Silver: silver border
- [ ] Gold: gold border + glow + star accent
- [ ] 6 stats rendered (value or "?")
- [ ] Circular photo crop, position badge, name, age, city, overall rating
- [ ] KoraID watermark in green
- [ ] Generation < 1 second
- [ ] Challenge variant: two cards side-by-side, friend's card = "Unrated"

---

### EPIC 2 — Court Booking

#### TICKET-009 · Court Discovery — Map + List 🔴

**Type:** Feature | **Estimate:** 2 days

**User Story:**  
As a player, I want to find a court near me and see available slots.

**Acceptance Criteria:**
- [ ] src/app/courts/page.tsx — Leaflet + OSM map + list view toggle
- [ ] Court markers; tap → court card popover
- [ ] List: name, surface, price/hr, distance, rating, "available today" badge
- [ ] Filters: city, floodlights, price range, surface
- [ ] Prayer-time labels: Post-Maghrib / Post-Isha on relevant slots
- [ ] src/lib/aladhan.ts — Aladhan free API by city + date; static table fallback
- [ ] Sorted by distance when geolocation granted
- [ ] "Submit a court" button on map

---

#### TICKET-010 · Court Detail & Slot Grid 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-009

**Acceptance Criteria:**
- [ ] src/app/courts/[courtId]/page.tsx — photos, surface, price, rating
- [ ] Slot grid: today + tomorrow, 1h blocks, green=available / grey=booked / red=blocked
- [ ] Prayer-time labels on slots
- [ ] Tap slot → booking modal with price summary
- [ ] "Played here recently" row (last 7 days, public cards)
- [ ] "Trending this week" — top 3 rated check-in players

---

#### TICKET-011 · Paymob Payment Integration 🔴

**Type:** Feature | **Estimate:** 2 days | **Depends on:** TICKET-010

**User Story:**  
As a player, I want to pay with Fawry, card, or mobile wallet and receive a confirmation.

**Acceptance Criteria:**
- [ ] src/lib/paymob.ts — createOrder(), createPaymentKey(), verifyHmac()
- [ ] POST /api/bookings/create — validate AVAILABLE, create Paymob order, return key
- [ ] src/app/checkout/page.tsx — Paymob iframe (card/Fawry/wallet)
- [ ] POST /api/bookings/webhook — verify HMAC → transactBooking() → push notification
- [ ] src/app/booking-confirmed/page.tsx — success screen
- [ ] Slot released after 5-min hold if payment abandoned
- [ ] Push + SMS fallback confirmation

**Technical Notes:**  
Register Paymob merchant at paymob.com/en NOW — 2–5 day approval. HMAC verification mandatory.

---

#### TICKET-012 · Booking Management (Player) 🟡

**Type:** Feature | **Estimate:** 4 hours | **Depends on:** TICKET-011

**Acceptance Criteria:**
- [ ] Profile shows upcoming + past bookings
- [ ] Cancel button for bookings ≥ 2h before slot
- [ ] Cancellation → slot AVAILABLE in DynamoDB + owner push notification

---

#### TICKET-013 · Court Owner Dashboard 🔴

**Type:** Feature | **Estimate:** 2 days | **Depends on:** TICKET-006

**User Story:**  
As a court owner, I want to manage slot availability and see weekly bookings without WhatsApp.

**Acceptance Criteria:**
- [ ] src/app/owner/page.tsx — bookings this week, revenue week/month/all-time (EGP)
- [ ] src/app/owner/slots/page.tsx — recurring template builder (days, time range, 1h blocks)
- [ ] Tap slot → toggle blocked/available
- [ ] Peak/off-peak price per slot
- [ ] Push on booking/cancellation
- [ ] /owner-signup flow: phone OTP, court name, city, surface, price

---

#### TICKET-014 · Court QR Code & Check-In 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-013

**User Story:**  
As a player at a partner court, I want to scan a QR and log that I played here.

**Acceptance Criteria:**
- [ ] src/lib/qr.ts — QR → /checkin/[courtId] deep link
- [ ] src/app/owner/qr/page.tsx — printable A4 QR page
- [ ] src/app/checkin/[courtId]/page.tsx — log SESSION#<date>#<id>; redirect to auth if not logged in
- [ ] Drill videos filmed post-check-in tagged with courtId
- [ ] Court page "Played here recently" + "Trending this week" updated

---

### EPIC 3 — Profile Builder

#### TICKET-015 · Silver Tier — 20m Sprint 🔴

**Type:** Feature | **Estimate:** 1.5 days | **Depends on:** TICKET-007

**User Story:**  
As a player, I want to film my 20m sprint and have my PAC stat updated with a real number.

**Acceptance Criteria:**
- [ ] src/app/build/silver/sprint/page.tsx
- [ ] Animated demo GIF showing 20m sprint setup
- [ ] MediaRecorder (H.264, 720p, ~800kbps) — browser API only
- [ ] Timer overlay during recording
- [ ] User enters time (seconds, 1 decimal) post-recording
- [ ] S3 multipart upload (5MB parts), progress bar, resumes on 3G disconnect
- [ ] PAC updated in DynamoDB on complete
- [ ] PAC = 0–99 percentile vs age cohort (raw if < 50 in cohort)

---

#### TICKET-016 · Silver Tier — Agility Shuttle 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-015

**Acceptance Criteria:**
- [ ] src/app/build/silver/agility/page.tsx — same pattern as TICKET-015
- [ ] 4×5m shuttle; animated cone placement demo
- [ ] Contributes to PHY stat

---

#### TICKET-017 · Silver Tier — Standing Jump 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-015

**Acceptance Criteria:**
- [ ] src/app/build/silver/jump/page.tsx
- [ ] Jump vs wall; user measures height in cm
- [ ] Contributes to PHY stat
- [ ] Silver card auto-issued when all 3 tests READY

---

#### TICKET-018 · S3 Presigned Upload API 🔴

**Type:** Task | **Estimate:** 4 hours | **Depends on:** TICKET-006

**Acceptance Criteria:**
- [ ] POST /api/drills/upload-url — returns presigned multipart URLs (1 per 5MB part)
- [ ] POST /api/drills/complete — completes multipart, marks READY, triggers stat update
- [ ] S3 bucket koraid-videos, private ACL, CloudFront in front
- [ ] Presigned URL expiry: 1 hour
- [ ] Client retry: up to 3× with exponential backoff per part

---

#### TICKET-019 · Stat Engine — Percentile Derivation 🔴

**Type:** Task | **Estimate:** 1 day | **Depends on:** TICKET-018

**Acceptance Criteria:**
- [ ] src/lib/stat-engine.ts — deriveStatFromMeasurement(drillType, rawValue, age) → 0–99
- [ ] Static percentile tables by age group (8–10, 11–12, 13–15, 16–18, 19–25)
- [ ] < 50 players in cohort → raw score + "Unranked" label
- [ ] ≥ 50 players → live DynamoDB percentile
- [ ] Position-weighted overall rating formula per position
- [ ] Vercel cron monthly recalibration at 2am EET on 1st

---

#### TICKET-020 · Training Mode Hub 🔴

**Type:** Feature | **Estimate:** 4 hours | **Depends on:** TICKET-015

**User Story:**  
As a player on public pitches, I want to build my card without booking a court.

**Acceptance Criteria:**
- [ ] src/app/build/page.tsx — checklist: done (tick), pending (empty), in progress (spinner)
- [ ] Videos tagged TRAINING_MODE or BOOKED_SESSION+courtId accordingly

---

#### TICKET-021 · Gold — Juggling 🔴

**Type:** Feature | **Estimate:** 4 hours | **Depends on:** TICKET-015

- [ ] src/app/build/gold/juggling/page.tsx — user enters max juggling count → DRI stat

---

#### TICKET-022 · Gold — Passing 🔴

**Type:** Feature | **Estimate:** 4 hours

- [ ] src/app/build/gold/passing/page.tsx — 10 passes at 15m target → PAS stat

---

#### TICKET-023 · Gold — Shooting 🔴

**Type:** Feature | **Estimate:** 4 hours

- [ ] src/app/build/gold/shooting/page.tsx — 5 shots at corners → SHO stat

---

#### TICKET-024 · Gold — Dribbling Slalom 🔴

**Type:** Feature | **Estimate:** 4 hours

- [ ] src/app/build/gold/dribbling/page.tsx — 5-cone slalom timed → DRI stat

---

#### TICKET-025 · Gold — Position Drill 🔴

**Type:** Feature | **Estimate:** 4 hours

**Acceptance Criteria:**
- [ ] src/app/build/gold/position/page.tsx
- [ ] GK→saves, DEF→heading, MID→first-touch-turn, FWD→1v1 finish
- [ ] Gold card auto-issued when all 5 drills READY; overall rating calculated
- [ ] "Improve this stat" CTA on each stat → drill with "try again"

---

### EPIC 4 — Community Features

#### TICKET-026 · Open Match Board — Browse & Post 🔴

**Type:** Feature | **Estimate:** 2 days | **Depends on:** TICKET-006

**User Story:**  
As a player who can't fill a squad, I want to post "need 2 players, Friday 7pm" and find others to join.

**Acceptance Criteria:**
- [ ] src/app/matches/page.tsx — list; filter by city, date, position
- [ ] src/app/matches/new/page.tsx — positions needed, date, time, court, spots, skill note
- [ ] Stored as CITY#<city> / MATCH#<epoch>#<id> with DynamoDB TTL = slot start + 1h
- [ ] Creator's card on post detail

---

#### TICKET-027 · Open Match Board — Join Flow 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-026

**Acceptance Criteria:**
- [ ] "Request to Join" → PARTICIPANT#<uid> REQUESTED
- [ ] Push to creator: accept/decline
- [ ] Participant's card shown to creator before acceptance
- [ ] POST /api/matches/join — join + notification
- [ ] Joined cards shown in row on match detail

---

#### TICKET-028 · Post-Game Peer Ratings 🔴

**Type:** Feature | **Estimate:** 1.5 days | **Depends on:** TICKET-011

**User Story:**  
As a player who just finished a session, I want to rate my teammates.

**Acceptance Criteria:**
- [ ] Cron fires 30 min after slot ends → push to all booking players
- [ ] src/app/rate/[sessionId]/page.tsx — teammate cards; Effort/Skill/Fair Play 1–5 stars
- [ ] < 60 seconds for 4 teammates
- [ ] Ratings anonymous (aggregate only on profile)
- [ ] POST /api/ratings/route.ts
- [ ] Second dismiss → suppress future prompts

---

#### TICKET-029 · Squad Profiles 🔴

**Type:** Feature | **Estimate:** 1.5 days | **Depends on:** TICKET-007

**User Story:**  
As a group of friends, we want a squad profile with our name and aggregate rating.

**Acceptance Criteria:**
- [ ] /squads/new — name, city, emoji, invite members
- [ ] /squads/[squadId] — member cards, aggregate Gold-only rating
- [ ] "Challenge" → side-by-side aggregate card PNG
- [ ] POST /api/squads CRUD

---

#### TICKET-030 · Open to Trials Toggle 🔴

**Type:** Feature | **Estimate:** 3 hours | **Depends on:** TICKET-007

**Acceptance Criteria:**
- [ ] Toggle: Open to Trial Opportunities ON/OFF
- [ ] Badge on card when ON (player-visible Phase 1; scout-visible Phase 2)
- [ ] Preferred trial location + club tier fields
- [ ] Saved to PLAYER#PROFILE in DynamoDB

---

### EPIC 5 — Polish & Launch

#### TICKET-031 · Parent Mode — Full Flow 🔴

**Type:** Feature | **Estimate:** 1 day | **Depends on:** TICKET-005

**Acceptance Criteria:**
- [ ] All child notifications → parent phone (push + SMS)
- [ ] Child profile PRIVATE by default
- [ ] Parent toggle to PUBLIC with explicit consent step
- [ ] No direct messaging to/from child profiles
- [ ] DELETE /api/account/delete — full data deletion ≤ 30 days

---

#### TICKET-032 · Community Court Submission 🟡

**Type:** Feature | **Estimate:** 4 hours

**Acceptance Criteria:**
- [ ] "Submit a court" on map
- [ ] Form: name, location pin, surface, price range, photo
- [ ] Saved to REVIEW#<id> / COURT_SUBMISSION in DynamoDB
- [ ] Admin approve/reject at /admin/courts
- [ ] Approved → live court + "Court Scout" badge for submitter

---

#### TICKET-033 · Arabic RTL — Full Pass 🔴

**Type:** Task | **Estimate:** 1 day

**Acceptance Criteria:**
- [ ] html lang="ar" dir="rtl" on all Arabic pages
- [ ] All spacing uses Tailwind logical properties (ms-/me-/ps-/pe-) throughout
- [ ] Cairo font correct at all weights
- [ ] Language toggle AR/EN in nav, stored in localStorage
- [ ] Canvas card text direction matches locale

---

#### TICKET-034 · PWA Mobile Polish 🔴

**Type:** Task | **Estimate:** 1 day

**Acceptance Criteria:**
- [ ] "Add to Home Screen" banner after 2nd visit, dismissable
- [ ] Splash: dark green #0f1a12 + KoraID wordmark
- [ ] iOS fallback: Vonage SMS if no FCM token
- [ ] Test: Android Chrome + iOS Safari 16.4+ + 3G simulation
- [ ] Lighthouse PWA ≥ 90, Performance ≥ 70 (mobile)

---

#### TICKET-035 · Pre-Launch Checklist 🔴

**Type:** Task

**Acceptance Criteria:**
- [ ] 3–5 Alexandria court owners onboarded in-person; free commission 3 months confirmed
- [ ] 10–20 beta players with profiles created
- [ ] PostHog dashboards: card shares, booking conversion, GOLD rate, DAU/MAU
- [ ] Paymob merchant approved; real EGP transaction tested
- [ ] Sentry: error rate > 1% → alert within 5 min
- [ ] Load test: 50 concurrent bookings, all atomic
- [ ] S3 versioning + lifecycle rules + DynamoDB point-in-time recovery enabled

---

## 9. All Tickets — Phase 2

#### TICKET-036 · Kora Reels — Feed Infrastructure 🔴
**Type:** Feature | **Estimate:** 3 days
- [ ] src/app/reels/page.tsx — vertical TikTok-style feed
- [ ] "Make public" toggle per drill clip
- [ ] For-You v1: same city → position → tier filter
- [ ] View/like/share counts in DynamoDB
- [ ] AWS MediaConvert transcoding (480p + 720p)
- [ ] HLS via CloudFront for adaptive bitrate on 3G

#### TICKET-037 · Goals of the Week 🟡
**Estimate:** 1 day
- [ ] Admin curates up to 5 clips weekly
- [ ] Pinned at top of Reels every Monday
- [ ] Curator badge on selected players

#### TICKET-038 · Challenge of the Week 🟡
**Estimate:** 2 days
- [ ] Admin posts weekly skill challenge
- [ ] Community star-vote on submissions
- [ ] Top → "Player of the Week" badge for 7 days

#### TICKET-039 · Platinum Tier — Match Clips 🟡
**Estimate:** 2 days | **Depends on:** TICKET-025
- [ ] /build/platinum — upload match clip with opponent + score
- [ ] Minimum 3 clips to unlock Platinum
- [ ] "Match Proven" badge; "See profile as scout" preview unlocked

#### TICKET-040 · Coach Verification Flow 🟡
**Estimate:** 2 days
- [ ] /coach signup: phone OTP + club affiliation
- [ ] Coach endorses player (1 per player)
- [ ] Endorsement on card; player accept/reject
- [ ] ≥ 1 coach endorsement required for Platinum

#### TICKET-041 · Diamond Tier 🟢
**Estimate:** 2 days | **Depends on:** TICKET-040
- [ ] ≥ 3 Gold/Platinum endorsements + ≥ 1 coach
- [ ] Black/gold card design
- [ ] Top Players leaderboard per city/position

#### TICKET-042 · Scout Dashboard — Player Search 🔴
**Estimate:** 3 days
- [ ] /scout — separate login
- [ ] Filters: city, age, position, tier, open to trials
- [ ] Grid sorted by rating; GSI-1 powered
- [ ] Gated by scout subscription

#### TICKET-043 · Scout Dashboard — Watchlist 🟡
**Estimate:** 1 day | **Depends on:** TICKET-042
- [ ] Add to watchlist; push on new drill/tier upgrade

#### TICKET-044 · Scout Dashboard — Contact Request 🟡
**Estimate:** 1 day | **Depends on:** TICKET-042
- [ ] "Send Interest" → player notified → accept reveals contact
- [ ] All contact logged; no direct exposure until accepted

#### TICKET-045 · G Coins — Earn Flow 🟡
**Estimate:** 2 days
- [ ] Earned: drill +50, Silver +200, Gold +500, booking +25, Match Board joiner +100, referral to Silver +300
- [ ] Balance + transaction history on profile
- [ ] NOT earnable by payment

#### TICKET-046 · G Coins — Spend Flow 🟡
**Estimate:** 1 day | **Depends on:** TICKET-045
- [ ] /store — cosmetic card frames, squad logo, Match Board priority boost
- [ ] Stats/tier/rating NOT purchasable — ever

#### TICKET-047 · Physical Card Printing 🟢
**Estimate:** 1 day
- [ ] Gold+ only; 75 EGP standard / 150 EGP premium (foil)
- [ ] Paymob payment; 5 business day delivery

---

## 10. All Tickets — Phase 3

#### TICKET-048 · AI Video Stat Extraction 🟢
**Type:** Research | **Estimate:** 6 weeks
- Requires 50K+ labeled drill clips
- Pose estimation → automated stat derivation
- Replace user-input measurement step

#### TICKET-049 · Sponsored Tournaments 🟢
**Estimate:** 3 days
- Court owner posts bracket; players pay entry
- 70% prize / 20% court / 10% KoraID split

#### TICKET-050 · Transfer Marketplace 🟢
**Type:** Research
- 3–5% platform fee on completed transfers
- Requires Egyptian FA regulatory review

#### TICKET-051 · Padel Expansion 🟢
**Estimate:** 2 weeks
- Reuse booking infrastructure; separate padel stat set

---

## 11. Kill Criteria & Success Metrics

### Kill Criteria — Stop If Any Two Fire Together

| Criterion | Threshold | When |
|-----------|-----------|------|
| Pre-launch card test | < 100 cards in 7 days | Day 7 |
| Silver completion | < 30% of Bronze users attempt Silver | Week 2 |
| Court owner adoption | < 2 of 5 go live | Soft launch |
| DAU/MAU | < 10% | Day 30 |
| Booking conversion | < 5% of court views → booking | Day 30 |

### Phase 1 Targets

| Metric | Target | By |
|--------|--------|----|
| Cards (kill test) | ≥ 100 | Day 7 |
| Users | ≥ 500 | Month 1 |
| Bookings | ≥ 200 | Month 1 |
| GOLD completion | ≥ 20% | Month 1 |
| Active owners | ≥ 3 of 5 | Day 30 |
| DAU/MAU | ≥ 15% | Month 1 |
| Viral coefficient | ≥ 1.2 | Month 1 |
| Match Board fill rate | ≥ 50% | Month 1 |

### Phase 2 Targets

| Metric | Target | By |
|--------|--------|----|
| Users | ≥ 5,000 | Month 3 |
| GOLD players | ≥ 1,000 | Month 3 |
| Paying scouts | ≥ 10 | Month 6 |
| Monthly booking revenue | ≥ EGP 50,000 | Month 6 |

### Phase 3 Targets

| Metric | Target |
|--------|--------|
| Users | ≥ 25,000 |
| Monthly GMV | ≥ EGP 500,000 |
| Scout MRR | ≥ EGP 30,000/mo |

---

## Ticket Index

| # | Title | Epic | Priority | Phase |
|---|-------|------|----------|-------|
| TICKET-001 | Static Card Generator | Phase 0 | 🔴 Must | 1 |
| TICKET-002 | Project Setup & PWA | Foundation | 🔴 Must | 1 |
| TICKET-003 | Firebase Auth — Phone OTP | Foundation | 🔴 Must | 1 |
| TICKET-004 | Firebase Auth — Google | Foundation | 🔴 Must | 1 |
| TICKET-005 | Age Gate & Parent Mode | Foundation | 🔴 Must | 1 |
| TICKET-006 | DynamoDB Setup | Foundation | 🔴 Must | 1 |
| TICKET-007 | Bronze Profile Creation | Foundation | 🔴 Must | 1 |
| TICKET-008 | FIFA Card Renderer | Foundation | 🔴 Must | 1 |
| TICKET-009 | Court Discovery | Booking | 🔴 Must | 1 |
| TICKET-010 | Court Detail & Slot Grid | Booking | 🔴 Must | 1 |
| TICKET-011 | Paymob Payment | Booking | 🔴 Must | 1 |
| TICKET-012 | Booking Management | Booking | 🟡 Should | 1 |
| TICKET-013 | Owner Dashboard | Booking | 🔴 Must | 1 |
| TICKET-014 | Court QR & Check-In | Booking | 🔴 Must | 1 |
| TICKET-015 | Silver — Sprint | Profile | 🔴 Must | 1 |
| TICKET-016 | Silver — Agility | Profile | 🔴 Must | 1 |
| TICKET-017 | Silver — Jump | Profile | 🔴 Must | 1 |
| TICKET-018 | S3 Upload API | Profile | 🔴 Must | 1 |
| TICKET-019 | Stat Engine | Profile | 🔴 Must | 1 |
| TICKET-020 | Training Mode | Profile | 🔴 Must | 1 |
| TICKET-021 | Gold — Juggling | Profile | 🔴 Must | 1 |
| TICKET-022 | Gold — Passing | Profile | 🔴 Must | 1 |
| TICKET-023 | Gold — Shooting | Profile | 🔴 Must | 1 |
| TICKET-024 | Gold — Dribbling | Profile | 🔴 Must | 1 |
| TICKET-025 | Gold — Position Drill | Profile | 🔴 Must | 1 |
| TICKET-026 | Match Board — Post | Community | 🔴 Must | 1 |
| TICKET-027 | Match Board — Join | Community | 🔴 Must | 1 |
| TICKET-028 | Peer Ratings | Community | 🔴 Must | 1 |
| TICKET-029 | Squad Profiles | Community | 🔴 Must | 1 |
| TICKET-030 | Open to Trials | Community | 🔴 Must | 1 |
| TICKET-031 | Parent Mode Full Flow | Polish | 🔴 Must | 1 |
| TICKET-032 | Court Submission | Polish | 🟡 Should | 1 |
| TICKET-033 | Arabic RTL | Polish | 🔴 Must | 1 |
| TICKET-034 | PWA Polish | Polish | 🔴 Must | 1 |
| TICKET-035 | Pre-Launch Checklist | Polish | 🔴 Must | 1 |
| TICKET-036 | Kora Reels Feed | Reels | 🔴 Must | 2 |
| TICKET-037 | Goals of the Week | Reels | 🟡 Should | 2 |
| TICKET-038 | Challenge of the Week | Reels | 🟡 Should | 2 |
| TICKET-039 | Platinum — Match Clips | Platinum | 🟡 Should | 2 |
| TICKET-040 | Coach Verification | Platinum | 🟡 Should | 2 |
| TICKET-041 | Diamond Tier | Diamond | 🟢 Could | 2 |
| TICKET-042 | Scout — Player Search | Scout | 🔴 Must | 2 |
| TICKET-043 | Scout — Watchlist | Scout | 🟡 Should | 2 |
| TICKET-044 | Scout — Contact Request | Scout | 🟡 Should | 2 |
| TICKET-045 | G Coins Earn | Economy | 🟡 Should | 2 |
| TICKET-046 | G Coins Spend | Economy | 🟡 Should | 2 |
| TICKET-047 | Physical Card Print | Revenue | 🟢 Could | 2 |
| TICKET-048 | AI Video Stats | AI | 🟢 Could | 3 |
| TICKET-049 | Sponsored Tournaments | Monetization | 🟢 Could | 3 |
| TICKET-050 | Transfer Marketplace | Monetization | 🟢 Could | 3 |
| TICKET-051 | Padel Expansion | Expansion | 🟢 Could | 3 |

**Total: 51 tickets** — 35 Phase 1 · 12 Phase 2 · 4 Phase 3

---

*KoraID — Your football identity. Book it. Build it. Get discovered.*  
*v1.0 · 2026-05-17 · ApexYard*
