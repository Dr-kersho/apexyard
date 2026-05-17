# KoraID — Build Tasks

**Stack:** Next.js 14 + Tailwind + PWA · Firebase Auth · AWS Lambda + DynamoDB · S3 + CloudFront · Paymob · Firebase push
**PRD:** See `apexyard/projects/koraid/prd-mvp.md`
**Architecture:** See `apexyard/projects/koraid/docs/agdr/`

---

## PHASE 0 — Kill Test (Day 1, before any app code)

> Build a static HTML card generator, share in Egyptian football groups. Goal: 100 cards in 7 days.

- [ ] `public/card-generator.html` — standalone page, no backend, no signup
  - Form: name, position (dropdown), age, city, photo upload
  - Canvas renders a Bronze FIFA-style card from inputs
  - "Download Card" button → PNG export
  - "Get the full app — KoraID" CTA at bottom of every card
  - Loads in < 2s on 3G (no external fonts that block render)
  - Works on mobile Chrome + Safari
- [ ] Deploy to Vercel (push to main → auto-deploy)
- [ ] Share link in 5+ Egyptian football Facebook/WhatsApp groups
- [ ] Track: how many cards generated in 7 days (add PostHog pageview + "card_generated" event)

**Kill criterion: < 100 cards in 7 days → STOP and diagnose before continuing**

---

## WEEK 1–2 — Foundation

### Project setup
- [ ] `npx create-next-app@14 . --typescript --tailwind --app --src-dir`
- [ ] Install deps: `firebase`, `firebase-admin`, `@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`, `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `leaflet`, `react-leaflet`, `html2canvas`, `next-pwa`
- [ ] `public/manifest.json` — PWA manifest (name: KoraID, theme: green, icons)
- [ ] `next.config.js` — enable PWA with `next-pwa`, RTL-safe
- [ ] `tailwind.config.js` — add custom colors (KoraID green #1a9c4f, gold #f5c518)
- [ ] `.env.local` — Firebase config, AWS credentials, DynamoDB table name
- [ ] PostHog analytics setup (`src/lib/posthog.ts`)
- [ ] Sentry error tracking setup

### Firebase Auth — phone OTP + Google
- [ ] Create Firebase project, enable Phone and Google providers
- [ ] `src/lib/firebase.ts` — Firebase client init
- [ ] `src/lib/firebase-admin.ts` — Firebase Admin init (Lambda-side token verification)
- [ ] `src/app/auth/page.tsx` — phone number input + country code (+20 Egypt default)
- [ ] `src/app/auth/verify/page.tsx` — OTP entry (6-digit code)
- [ ] `src/app/auth/google/page.tsx` — Google OAuth flow
- [ ] `src/middleware.ts` — protect routes, redirect unauthenticated → /auth
- [ ] Age gate: if age < 13 → redirect to `/auth/parent` flow
  - `src/app/auth/parent/page.tsx` — parent phone OTP entry
  - Create parent account, link to child UID in DynamoDB

### DynamoDB — single-table setup
- [ ] `src/lib/db.ts` — DynamoDB DocumentClient singleton
- [ ] `src/lib/entities.ts` — TypeScript types for all entities (Player, Court, Booking, etc.)
- [ ] AWS Console: create table `koraid-main`, PK=`PK` (String), SK=`SK` (String)
- [ ] Create GSI-1: `CityTierIndex` — GSI1PK / GSI1SK
- [ ] Create GSI-2: `CourtOwnerIndex` — GSI2PK / GSI2SK
- [ ] Enable TTL on attribute `ttl`
- [ ] `src/lib/db-helpers.ts` — typed wrappers: `getPlayer`, `putPlayer`, `getCourtSlots`, `transactBooking`

### Bronze profile + card (US-04)
- [ ] `src/app/onboarding/page.tsx` — profile creation form
  - Fields: photo upload, name, age, height, weight, dominant foot, position(s), city, team (optional)
  - Age < 13 → show "parent-managed profile" banner
- [ ] `src/lib/card-generator.ts` — Canvas API card renderer
  - Input: player profile data
  - Output: PNG data URL
  - Renders: position badge, name, age, city, photo, 6 stats (PAC/SHO/PAS/DRI/DEF/PHY as "?")
  - Bronze card style: dark background, bronze border
- [ ] `src/app/profile/page.tsx` — player profile page showing the card
- [ ] "Share to WhatsApp" — `whatsapp://send?text=...&media=...` with card image
- [ ] "Challenge a friend" — side-by-side card image (friend card shows as "Unrated")

---

## WEEK 2–3 — Court Booking

### Court discovery (US-02)
- [ ] `src/app/courts/page.tsx` — court listing + map
  - Map: Leaflet + OpenStreetMap, court markers
  - List: court cards with name, surface, price, distance, rating, "available today" badge
  - Filters: city, floodlights (night filter), price range, surface type
  - Prayer-time slot labels: label slots as "Post-Maghrib" / "Post-Isha" (use Aladhan API for times, fall back to static table)
- [ ] `src/app/courts/[courtId]/page.tsx` — court detail page
  - Slot grid: today + tomorrow, colour-coded (green=available, grey=booked, red=blocked)
  - Tap slot → booking modal
- [ ] `src/lib/aladhan.ts` — prayer times lookup by city + date (free API, no key needed)

### Paymob payment (US-02)
- [ ] Register for Paymob merchant account at paymob.com/en (do this NOW — 2–5 day approval)
- [ ] `src/lib/paymob.ts` — Paymob API wrapper
  - `createOrder(amount, currency)` → order ID
  - `createPaymentKey(orderId, billingData)` → payment key
  - `verifyHmac(payload, secret)` → boolean (webhook verification)
- [ ] `src/app/api/bookings/create/route.ts` — POST handler
  - Validate slot is AVAILABLE (DynamoDB GetItem)
  - Create Paymob order
  - Return payment key to client
- [ ] `src/app/api/bookings/webhook/route.ts` — Paymob callback
  - Verify HMAC
  - If success → `transactBooking()` (atomic DynamoDB write)
  - Send push notification to player (Firebase FCM)
- [ ] `src/app/checkout/page.tsx` — Paymob iframe embed
- [ ] `src/app/booking-confirmed/page.tsx` — success screen

### Court owner dashboard (US-03)
- [ ] `src/app/owner/page.tsx` — owner home (bookings this week + revenue summary)
- [ ] `src/app/owner/slots/page.tsx` — slot management
  - Create recurring slot template (daily, time range, 1h blocks)
  - Block out slots (tap → blocked)
  - Peak / off-peak pricing per slot
- [ ] `src/app/api/owner/slots/route.ts` — CRUD for slot templates
- [ ] QR code generation: `src/lib/qr.ts` — generate court QR (links to `/checkin/[courtId]`)
- [ ] `src/app/owner/qr/page.tsx` — printable QR code page

### Court QR check-in (US-10)
- [ ] `src/app/checkin/[courtId]/page.tsx` — deep link landing page
  - If logged in → log check-in to DynamoDB (`SESSION#<date>#<sessionId>`)
  - If not logged in → redirect to auth, then back to check-in
  - Tag any drills recorded after check-in with `courtId`
- [ ] Update court page: show "Played here recently" (last 7 days, public profiles)
- [ ] Update court page: show "Trending this week" (top 3 rated players who checked in)

---

## WEEK 3–4 — Profile Builder (Silver + Gold)

### Training Mode entry point (US-07)
- [ ] `src/app/build/page.tsx` — "Build My Card" hub
  - Drill checklist: shows which tests are done, which are pending
  - Accessible without a booking
  - Drills recorded here tagged as `recordingContext: TRAINING_MODE`

### Silver tier — physical tests (US-05)
- [ ] `src/app/build/silver/page.tsx` — Silver tier hub (3 tests)
- [ ] `src/app/build/silver/sprint/page.tsx`
  - Animated demo: looping GIF/video showing 20m sprint setup
  - "Start recording" → MediaRecorder (H.264, 720p, ~800kbps)
  - Timer overlay rendered on-screen during recording
  - Upload: presigned S3 URL, multipart (5MB parts), resumable on 3G fail
  - User confirms measured time → stat derived → PAC score updated
- [ ] `src/app/build/silver/agility/page.tsx` — 4×5m agility shuttle (same pattern)
- [ ] `src/app/build/silver/jump/page.tsx` — standing jump vs wall (same pattern)
- [ ] `src/lib/stat-engine.ts` — derive 0–99 percentile from raw measurement
  - Age-group cohort lookup (static table until ≥ 50 players in cohort)
  - Switch to live DynamoDB percentile after cohort threshold
- [ ] `src/app/api/drills/upload-url/route.ts` — return presigned S3 multipart URL
- [ ] `src/app/api/drills/complete/route.ts` — mark drill done, update player stats
- [ ] Silver card upgrade: auto-issue when all 3 tests complete + READY

### Gold tier — technical drills (US-06)
- [ ] `src/app/build/gold/page.tsx` — Gold tier hub (5 drills)
- [ ] `src/app/build/gold/juggling/page.tsx` — max juggling count
- [ ] `src/app/build/gold/passing/page.tsx` — 10 passes at target (15m)
- [ ] `src/app/build/gold/shooting/page.tsx` — 5 shots at corners
- [ ] `src/app/build/gold/dribbling/page.tsx` — slalom through 5 cones (timed)
- [ ] `src/app/build/gold/position/page.tsx` — position-specific drill
  - GK: saves · DEF: heading · MID: first-touch-turn · FWD: 1v1 finish
- [ ] All 6 stats populated → overall rating calculated (position-weighted)
- [ ] Gold card upgrade: auto-issue when all 5 drills complete
- [ ] "Improve this stat" CTA: each stat links to its drill with "try again"

---

## WEEK 4–5 — Community Features

### Open Match Board (US-09)
- [ ] `src/app/matches/page.tsx` — browse open games (filter: city, date, position)
- [ ] `src/app/matches/new/page.tsx` — post a game
  - Fields: positions needed (multi-select), date, time, court (search or free-text), spots, skill note
  - TTL: auto-expire 1h after slot start (DynamoDB TTL)
- [ ] `src/app/matches/[postId]/page.tsx` — match detail + join request
  - Shows creator's card + all joiners' cards
  - "Request to join" → notification to creator
  - Creator: accept / decline from notification
- [ ] `src/app/api/matches/route.ts` — CRUD for match posts
- [ ] `src/app/api/matches/join/route.ts` — join request + notification

### Post-game peer ratings (US-12)
- [ ] `src/lib/notifications.ts` — FCM push notification sender
- [ ] Scheduled trigger: 30 min after booking slot end → push to all players in session
  - Use Vercel cron or EventBridge + Lambda
  - Message: "How did [Name] play? Rate your teammates"
- [ ] `src/app/rate/[sessionId]/page.tsx` — rating UI
  - Shows each teammate's card
  - 3 attributes: Effort / Skill / Fair Play (star tap, 1–5)
  - Submits in < 60s
  - Second dismiss → suppress future prompts for this player
- [ ] `src/app/api/ratings/route.ts` — save ratings to DynamoDB
- [ ] Update player profile: show peer rating average (distinct from drill-verified stats)

### Squad profiles (US-11)
- [ ] `src/app/squads/new/page.tsx` — create squad (name, city, emoji, invite members)
- [ ] `src/app/squads/[squadId]/page.tsx` — squad page
  - Member cards, aggregate rating, recent activity
  - "Challenge another squad" → side-by-side aggregate card share image
- [ ] `src/app/api/squads/route.ts` — CRUD

### "Open to Trials" toggle (US-13)
- [ ] Toggle on profile page — ON/OFF
- [ ] Preferred trial location + club tier fields
- [ ] Saved to DynamoDB `openToTrials` attribute on PLAYER#PROFILE

---

## WEEK 5–6 — Polish

### Parent Mode (US-08)
- [ ] `src/app/auth/parent/page.tsx` — parent phone OTP (for under-13 signup)
- [ ] Parent account linked to child profile in DynamoDB
- [ ] All notifications for child profile → parent phone
- [ ] Child profile `profileVisibility: PRIVATE` by default
- [ ] Parent can toggle child profile to PUBLIC (with consent step)
- [ ] Data deletion: `src/app/api/account/delete/route.ts` — deletes all child data within 30 days

### Community court submission (US-14)
- [ ] "Submit a court" button on `/courts` map
- [ ] `src/app/courts/submit/page.tsx` — form (name, location pin, surface, price range, photo)
- [ ] `src/app/api/courts/submit/route.ts` — save to review queue in DynamoDB
- [ ] Simple admin review: `src/app/admin/courts/page.tsx` — list pending submissions, approve/reject
- [ ] Approved submitter earns "Court Scout" badge on their profile

### Arabic RTL
- [ ] Add `dir="rtl"` to `<html>` when locale = Arabic
- [ ] Use Tailwind logical properties throughout (`ms-`, `me-`, `ps-`, `pe-` instead of `ml-`, `mr-`)
- [ ] Arabic font: `Cairo` or `Noto Kufi Arabic` via next/font
- [ ] Language toggle in nav: AR / EN

### Mobile polish
- [ ] PWA install prompt: custom "Add to Home Screen" banner (shows after 2nd visit)
- [ ] Splash screen: green background + KoraID logo
- [ ] iOS Safari: check push notification fallback (SMS via Vonage if no FCM token)
- [ ] Test on Android Chrome + iOS Safari + Egyptian 3G simulation (Chrome DevTools: Slow 3G)
- [ ] Lighthouse PWA audit: aim for ≥ 90 score

### Pre-launch checklist
- [ ] 3–5 Alexandria court owners onboarded (in-person, free commission for 3 months)
- [ ] 10–20 players invited to test
- [ ] PostHog dashboards: card shares, bookings, GOLD completion rate, DAU/MAU
- [ ] Paymob merchant account approved and tested with real EGP transaction
- [ ] Sentry alerts configured (error rate > 1%)
- [ ] Load test: 50 concurrent slot booking attempts (must resolve atomically)

---

## Environment Variables (.env.local)

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

# AWS
AWS_REGION=eu-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
DYNAMODB_TABLE=koraid-main
S3_BUCKET=koraid-videos
CLOUDFRONT_DOMAIN=

# Paymob
PAYMOB_API_KEY=
PAYMOB_INTEGRATION_ID=
PAYMOB_IFRAME_ID=
PAYMOB_HMAC_SECRET=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://eu.posthog.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=
```

---

## Key Files to Read Before Building

- `apexyard/projects/koraid/prd-mvp.md` — full PRD with all acceptance criteria
- `apexyard/projects/koraid/docs/agdr/AgDR-0001-dynamodb-single-table-design.md` — full DynamoDB entity model + access patterns
- `apexyard/projects/koraid/docs/agdr/AgDR-0002-firebase-auth-vs-auth0.md` — Firebase Auth setup + cost rationale
