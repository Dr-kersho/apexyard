# KoraID — Validation

**Date**: 2026-05-14
**Source**: IDEA-001
**Verdict**: **GREEN** — concrete user, clear alternatives being beaten, 1-day pre-launch test scoped correctly, kill criteria explicit, and a real differentiator (booking-hook + structured drill data) that no current competitor holds.

## Starting context

Mobile-first PWA: football court booking + structured video-verified FIFA-style player profiles (5-tier Bronze→Diamond) + TikTok-style social highlight feed. Launch market: Alexandria, Egypt. Tagline: *Book. Play. Get Discovered.* Solo technical founder (Ahmed), 6-week MVP timeline, ~$22 cash outlay.

## Q1. Target user

Egyptian male youth aged 14–25, playing pickup/street/amateur football in Alexandria. Aspiring to be discovered by scouts. Currently excluded from formal scouting pipelines — private clubs cost up to 250K EGP/year against a 165K EGP average income. Has a smartphone. Plays 2–4x per week at local courts.

Secondary users (court owners for supply-side, scouts for B2B revenue) are derivative: they only come because players are already on the platform.

## Q2. Current alternative

Players share clips informally on WhatsApp/Instagram, rely on corrupt agent networks (FIFPRO-flagged), or simply have no visibility path. For bookings: WhatsApp groups and cash. The closest app (Hareeef, 10K installs) has portfolios and highlights but zero daily utility — no booking hook means players open it once and abandon it.

## Q3. Smallest version

Static HTML FIFA-style card generator, shared in 5+ Egyptian football Facebook/WhatsApp groups. Kill criteria: fewer than 100 cards created in 7 days = don't build. Takes ~1 day, zero backend, tests the viral coefficient before writing a line of app code.

## Q4. Kill criteria

Explicit and measurable, per the plan:
- Pre-launch: < 100 cards in 7 days → don't build
- < 30% Silver tier completion in first 2 weeks → drill UX broken
- < 2/5 court owners agree to onboard → supply won't materialise
- < 10% players upload match clips → social layer not compelling
- DAU/MAU < 10% → no retention beyond initial download
- Zero scout interest after 5K+ GOLD profiles → pivot or kill B2B layer

## Q5. Build / buy / rent

**BUILD.** The differentiator is the combination: booking utility (daily retention hook) + structured video-verified drill protocol (scout-grade data, not self-reported) + social feed. No competitor owns all three. The structured drill protocol — every stat derived from filmed standardised tests — is the real moat: it makes player data credible to scouts and is hard to replicate with a copy of the FIFA card UI alone.

## Read-out

All five answers are strong. The pre-launch test is properly scoped to 1 day (not an "MVP") and the kill criteria are tied to concrete metrics for each product layer. The competitive analysis is honest: Hareeef has identity without retention, Yalla Hagz has booking without identity, Soka Scout has scouting but is top-down and expensive. The genuine risk is execution — four product layers is ambitious for a solo founder, and the validation only holds if each layer is proven sequentially rather than built in parallel.

## Next step

Proceed to `/write-spec KoraID`. Recommend scoping the spec to Layer 1 (booking) + Layer 2 up to GOLD tier only — prove the drill protocol works before building the social feed and B2B scouting layers.
