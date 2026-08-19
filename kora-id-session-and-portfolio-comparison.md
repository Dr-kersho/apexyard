# KoraID Session Summary & Portfolio Revenue Comparison
> Generated: 2026-08-19 · For: Dr-kersho · Purpose: decide where to focus for fastest revenue

---

## Part 1 — What We Did This Session

### The problem you came with
You have a product idea — **Kora ID** — and you needed to pitch it to investors without giving away the mechanics. You also needed to understand what the build actually costs.

### What was built this session
1. **Teaser deck** — 10-slide investor deck (`kora-id-teaser-deck.md`) covering problem, market, AI angle, team, and ask — deliberately withholding the card model and AI methodology
2. **Protection strategy** — how to pitch without losing your IP
3. **Cost comparison** — 4 build options priced out

**Deck is live at:** `dr-kersho/apexyard` → PR #21 → `kora-id-teaser-deck.md`

---

## Part 2 — KoraID: What's Already Built

### What it is
Digital identity layer for Egyptian grassroots football — AI-powered player cards, court booking, community matches, squads, and scout discovery tools.

**Stack:** Next.js 14 App Router · TypeScript · Arabic RTL · Supabase Auth · DynamoDB · Paymob (bookings) · PWA

### Shipped features (from roadmap)

| Phase | Feature | Status |
|-------|---------|--------|
| 1 | Auth + player profile + FIFA-style card | ✅ Done |
| 1 | Courts + Paymob booking | ✅ Done |
| 1 | Silver/gold drills + stats tracking | ✅ Done |
| 1 | Training hub, match board, peer ratings, squads | ✅ Done |
| 1 | Parent mode + child profile management | ✅ Done |
| 1 | Arabic RTL + PWA polish | ✅ Done |
| 2 | Pitch IQ (computer vision scouting) | ✅ Shipped |
| 2 | Architecture stores + competition system | ✅ Done |
| 2 | Public product catalogue | ✅ Done |
| 2 | Scout search + watchlist + contact request | ✅ Done |
| 2 | G Coins earn/spend system | ✅ Done |
| 2 | Kora Reels (video highlights) | ✅ Done |
| 2 | DynamoDB GSI index guard | ✅ Done |
| — | Physical card printing | ⏸ Deferred |

### Cost of what's been built

| Component | Est. Hours |
|-----------|------------|
| Core platform (Next.js 14, DynamoDB, Supabase, RTL, auth) | 150h |
| Player profile + FIFA card design + rendering | 80h |
| Courts + Paymob booking system | 100h |
| Drills + training hub + progression | 80h |
| Match board + peer ratings + squads + trials | 100h |
| Parent mode + child profiles + deletion | 60h |
| RTL polish + PWA | 40h |
| Pitch IQ CV (computer vision) | 100h |
| Scout features (search, watchlist, contact) | 80h |
| G Coins wallet system | 60h |
| Kora Reels (video upload + feed) | 70h |
| Architecture stores + competition | 80h |
| Public catalogue + DynamoDB GSI | 60h |
| QA, debugging, integration | 100h |
| **TOTAL** | **~1,160h** |

### What that's worth

| Build route | Rate | Cost equivalent |
|-------------|------|-----------------|
| MENA freelancers | $25/hr avg | **~$29,000** |
| Eastern Europe freelancers | $60/hr avg | **~$69,600** |
| Egyptian agency | fixed | **~$50,000–85,000** |
| US/Western agency | $125/hr avg | **~$145,000** |

> **Note:** Built with heavy Claude Code AI assistance. Actual human oversight time: ~400–500h. The output value is the ~$29–70K equivalent above — you got it at a fraction of the cost.

### KoraID monetization paths (honest assessment)

| Revenue stream | Realistic? | Timeline |
|---------------|-----------|----------|
| Club/academy subscriptions (scout access) | ✅ Yes | 3–6 months post-launch |
| Court booking commission (Paymob % cut) | ✅ Yes | Now (if courts are live) |
| G Coins top-up / premium features | ✅ Yes | Medium term |
| Player premium profiles | ⚠️ Low | Egyptians reluctant to pay for apps |
| Brand sponsorship (sportswear, drinks) | ✅ Yes | 6–12 months, needs user base |
| Physical card printing | ⏸ Deferred | After MVP proves demand |

**Hard truth:** KoraID needs user scale before most revenue kicks in. Court bookings could work now. But it's a platform play — valuable long-term, slow to monetize.

---

## Part 3 — Portfolio Revenue Comparison

| Project | What it is | Built? | Revenue model | Market |
|---------|-----------|--------|--------------|--------|
| **XPORT CRM** | Gulf export sales CRM — leads, WhatsApp outreach, Stripe billing | Staging deployed, Stripe wired | B2B SaaS subscription | Gulf exporters |
| **blendavit / Smart Mom Labs** | DTC supplement brand — 12 SKUs, 6 brands, live website | Website live, products exist | Physical product sales | Saudi/Gulf/Egypt mothers |
| **LUMA PWA** | Aesthetic clinic booking marketplace | In development | Booking commission / clinic subscription | Egypt/GCC aesthetics |
| **KoraID** | AI football identity + scouting platform | Substantial MVP built | Court commission + club subscriptions | Egypt youth football |
| **Elite Telegram** | Telegram-based product | Planning only | TBD | TBD |
| **Training Command Center** | AI personal training hub | Status unclear | Subscription | Fitness |
| **QPPV Agent** | Pharmacovigilance regulatory agent | Status unclear | B2B enterprise | Pharma |

---

## Part 4 — Which One Makes You Money Fastest

### 🥇 #1 — XPORT CRM *(fastest path to cash)*

**Why:** B2B SaaS with Stripe already wired. Gulf exporters have budgets and will pay for a tool that closes deals. You don't need scale — you need 5–10 paying companies.

- Charge: **$99–299/month per company**
- Revenue at 10 customers: **$1,000–3,000/month recurring**
- Blocking: Meta WhatsApp API (#16) + 3 staging fixes (#6, #8, #9)
- Time to first revenue: **4–8 weeks**

**Action:** Fix the 3 staging blockers → get WhatsApp outreach working → cold-call 20 Gulf export businesses.

---

### 🥈 #2 — blendavit / Smart Mom Labs *(sell what you have)*

**Why:** Website is live. Products physically exist. Supplement margins are 60–80%. If inventory is in hand, you can take orders this week.

- Price: **$25–60/unit**
- Revenue at 100 orders/month: **$2,500–6,000/month**
- Blocking: Payment gateway on site + inventory confirmed?
- Time to first revenue: **1–2 weeks**

**Action:** Wire Tabby/Tamara/Stripe to the existing site → one Instagram/TikTok campaign → ship.

---

### 🥉 #3 — LUMA PWA *(high ceiling, medium timeline)*

**Why:** One aesthetic clinic appointment = $200–2,000+. 10% commission on 100 bookings/month = serious money. Needs clinics + patients simultaneously.

- Commission: 10–15% per booking
- Revenue at 100 bookings/month: **$2,000–15,000/month**
- Blocking: Chicken-and-egg marketplace problem
- Time to first revenue: **2–4 months**

**Action:** Personally onboard 3 Cairo/Riyadh aesthetics clinics → free for 60 days → prove bookings → charge.

---

### 4th — KoraID *(long game, not fast cash)*

- Court commission could work now if courts are onboarded
- Club subscriptions: 3–6 months after user acquisition
- Time to meaningful revenue: **6–12 months**

**Action:** Don't chase KoraID if you need money in the next 60 days. Keep it live and growing passively. Return to monetization at 500+ active players.

---

## Part 5 — The Decision Framework

```
Need money in < 30 days?   → blendavit (sell existing product)
Need money in < 90 days?   → XPORT CRM (fix staging, get 5 B2B customers)
Building for 6–12 months?  → LUMA (marketplace, high ceiling)
Long-term portfolio asset?  → KoraID (platform play, needs scale)
```

---

## Part 6 — KoraID Teaser Deck Quick Reference

| Slide | Key message |
|-------|------------|
| 1 | Your Stats. Your Card. Your Future. |
| 2 | The next Mohamed Salah is in Cairo — nobody knows his name |
| 3 | Egypt → GCC → MENA (350M+ people, deep football culture) |
| 4 | Three-sided: Players / Scouts+Clubs / Fans |
| 5 | Verified digital identity — AI curates, not just stores |
| 6 | Human scouts watch 10/week. Our AI watches everyone. |
| 7 | No dominant player in MENA football discovery yet |
| 8 | Traction / early signals [fill in] |
| 9 | Team [fill in] |
| 10 | Raising [X] — 500 players, 3 clubs, prove the loop |

**Withhold until post-NDA:** profile card format · AI scoring methodology · monetization tiers · data moat strategy

---

*© 2026 Dr-kersho portfolio. Private & confidential.*
