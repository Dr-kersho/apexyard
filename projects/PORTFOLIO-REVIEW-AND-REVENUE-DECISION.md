# Portfolio Review, Business Plan & Revenue Decision Document

**Owner:** Dr-kersho
**Date:** July 2026
**Purpose:** Full record of the portfolio review + business planning session, plus a ranked analysis of which project to start on for the fastest path to actual revenue.

---

## PART 0 — READ THIS FIRST: The Money Answer

You said you need money, really. So here is the direct answer before anything else.

### The blunt diagnosis

You have **11 projects and no revenue**. That is the actual problem. It is not a lack of ideas, engineering ability, or market opportunity — you have all three in abundance. The problem is that 11 half-built things generate exactly as much cash as zero built things.

Every project below is individually defensible. Collectively they are the reason none of them ship. **The single highest-value decision available to you right now is to pick one and put the other ten on ice.**

### Time-to-cash ranking (the only ranking that matters if you need money)

| Rank | Path | Time to first invoice | Capital needed | Realistic monthly revenue at 6 months |
|---|---|---|---|---|
| **1** | **PV / QPPV consulting services** (not software) | **30–60 days** | **~£0** | £3k–£15k |
| 2 | XPORT CRM | 60–120 days | Low (~£2k) | £1k–£3k |
| 3 | Training Command Center | 90–150 days | Low (~£1k) | £500–£2k |
| 4 | QPPV Agent (as software product) | 9–18 months | Medium–High | £0 until year 2 |
| 5 | KoraID | 6–12 months | Medium (ads) | £500–£2k |
| 6 | blendavit / supplements | 6–12 months | **High (£20k+)** | Negative until scale |
| 7 | Luma PWA | 6–12 months | Medium | £1k–£3k |
| 8 | Elite Telegram | Unknown — PRD not yet reviewed | Unknown | Unknown |

### The recommendation: sell the service before you sell the software

This is the single most important insight from this whole session, and it changes the plan we built earlier.

**QPPV Agent as a software product is a bad near-term revenue play.** Not because the product is wrong — the product is genuinely the best idea in your portfolio — but because pharma software has the worst possible sales characteristics for someone who needs money now:

- Vendor qualification audits before they'll even trial it
- GxP / CSV validation requirements (21 CFR Part 11, EU Annex 11)
- 6–18 month procurement cycles
- They will not put an unvalidated AI tool anywhere near regulatory submissions
- Reference customers required — and you have none

**But the same customers will pay for the service immediately.** Pharmacovigilance obligations are legally mandatory and time-bound. An MAH that needs a QPPV, ICSR case processing, PSMF authoring, or literature monitoring needs it *this quarter*, not after a procurement cycle. Services invoice on completion. There is no validation gate on a human doing the work.

**So the play is:**

1. Sell PV services now → cash flow within 60 days
2. Use QPPV Agent internally to do that work faster than competitors → margin advantage
3. Once you have 3–5 service clients using it daily, *that* is your validated product with reference customers
4. Then productise and sell the software to the wider market

This is the classic services-to-product path (how Palantir, Basecamp, and most successful vertical SaaS actually started). It funds itself, and the software gets built against real usage instead of guesses.

### The one thing I don't know — and it decides everything

**Do you personally hold QPPV credentials, or can you partner with someone who does?**

- **If YES** → the services path above is the clear #1. You can be invoicing within 60 days with near-zero capital. Nothing else in this portfolio comes close.
- **If NO** → the services path requires either hiring a named QPPV (expensive) or partnering (revenue share). In that case **XPORT CRM becomes your fastest path** — it's closest to done, has short SMB sales cycles, and needs no credentials or regulatory approval.

Answer that question and the decision makes itself.

### What to explicitly NOT start right now

- **blendavit / supplements** — needs the most capital and returns it slowest. Manufacturing MOQs, inventory, and ad spend before a single pound comes back. Waitlist deposits are not revenue; they are a liability you may have to refund. This is a good business *after* you have cash, not a way to get cash.
- **KoraID** — transaction values in Egyptian grassroots football are small (£1–3 per booking). You need thousands of monthly bookings to make meaningful money. It is a genuinely good product with real network effects, but it is a 2-year build to a real income, not a 6-month one.
- **Elite Telegram** — you cannot evaluate what you haven't read. The PRD is still sitting on your Mac, unimported. Until it's synced, this is not a project, it's a placeholder.
- **The three dev tools** (Impeccable, Graphify, Ponytail) — these make your engineering better. They do not make money. Keep using them; do not spend a day productising them.

---

## PART 1 — Full Portfolio Inventory (11 Projects)

Source: `apexyard.projects.yaml` and `projects/*/README.md` in the ApexYard ops repo.

### 1. KoraID

- **Status:** Active · **Tier:** P0 · **Repo:** `Dr-kersho/koraid`
- **What it is:** Digital identity layer for Egyptian grassroots football — FIFA-style player cards, court booking, community matches, squads, parent-managed child profiles.
- **Users:** Amateur players, court owners, coaches, parents in Egypt.
- **Model:** Court booking fees (Paymob), potential premium player features.
- **Stack:** Next.js 14, TypeScript, Arabic RTL, Supabase (auth), DynamoDB, Paymob. PWA.
- **Stage:** MVP shipped to `main` — courts/booking, drills, training hub, match board, peer ratings, squads, trials all live. Open: parent mode (#31, PR #76), court submission, RTL polish, PWA pre-launch (#32–35).
- **Honest read:** Furthest along of the consumer products. Real network effects (shareable player cards). But low transaction values in a low-purchasing-power market means slow revenue.

### 2. Luma PWA

- **Status:** Paused · **Tier:** P1 · **Repo:** `Dr-kersho/luma-pwa`
- **What it is:** Aesthetic clinic booking marketplace — patient app + clinic admin under one deploy.
- **Users:** Aesthetic clinic patients (OTP login) and clinic staff (PIN login).
- **Model:** Marketplace take-rate on bookings, or flat SaaS per clinic.
- **Stack:** Next.js 14, TypeScript, Tailwind, Prisma 7, Neon PostgreSQL, Twilio (OTP), Resend, Vercel Blob.
- **Stage:** Core booking flow exists. Brutalism UI redesign PRD + technical design filed. Currently paused.
- **Honest read:** Highest-margin vertical of the consumer products, and clinics are sticky once onboarded. But it's a two-sided marketplace, which means the cold-start problem — you need clinics to get patients and patients to keep clinics. That's a slow, expensive climb.

### 3. QPPV Agent

- **Status:** Active · **Tier:** P0 · **Repo:** `Dr-kersho/QPPV-Agent`
- **What it is:** AI assistant for the Qualified Person for Pharmacovigilance — automates ICSR handling, regulatory compliance workflows, signal detection.
- **Users:** Pharma companies, CROs, individual QPPVs.
- **Model:** B2B SaaS, high ACV, regulated vertical.
- **Stack:** Next.js 15 PWA, FastAPI, PostgreSQL, Qdrant (vectors), Claude / OpenAI / Perplexity.
- **Stage:** App shell in progress (#31). Dashboard widgets (#33) and ICSR detail page (#32) blocked on it. Domain glossary (`CONTEXT.md`) has 101 decisions captured.
- **Honest read:** **The best idea in the portfolio.** Legally mandated market, tiny reachable buyer set, near-zero price sensitivity for compliance. But as *software* it has the slowest sales cycle. As a *service* it can pay you next month. See Part 0.

### 4. Training Command Center

- **Status:** Active · **Tier:** P0 · **Repo:** `Dr-kersho/AI-Driven-Personal-Training-Command-Center-`
- **What it is:** Single-coach MVP — rule-based intake → profile snapshot → coach review → AI plan generation.
- **Users:** Personal trainers (solo first, gyms later).
- **Model:** ~$99/month per coach seat.
- **Stack:** FastAPI (port 8101), Next.js (3101), PostgreSQL.
- **Stage:** **Validated with 3 real pilots.** Gap analysis complete (`PILOT-GAP-ANALYSIS.md`). DX audit backlog exists.
- **Honest read:** Underrated. It is the only project in the portfolio with *actual pilot validation from real users*. Low ceiling ($99/mo needs volume), but low friction, no regulation, no credentials, and you already have the case studies. Cheapest genuine revenue after the PV services path.

### 5. XPORT CRM

- **Status:** Active · **Tier:** P0 · **Repo:** `Dr-kersho/XPORT-CRM`
- **What it is:** Gulf export sales CRM — lead pipeline, call log, scored CSV ingest, assisted WhatsApp outreach, consent-gated programmatic send (v2).
- **Users:** GCC export sales teams (food, manufacturing, consumer goods).
- **Model:** ~$299/month per team.
- **Stack:** Next.js 14, TypeScript, Tailwind, Auth0, DynamoDB, Stripe (test mode).
- **Stage:** Auto-lead ingest (#13/PR #19), consent fields (#14/PR #20), outreach task queue (#15/PR #21) **all merged to `staging`**. Next: Meta WhatsApp API (#16), then conditional auto-send (#17). Blockers: Auth0 config (#6), Vercel env (#8), staging smoke test (#9).
- **Honest read:** **The most nearly-shippable revenue product you own.** Three epics already merged. The blockers are configuration chores, not engineering. No regulation, no credentials, short SMB sales cycle. If the PV services path isn't open to you, start here.

### 6. Elite Telegram

- **Status:** Active (planning) · **Tier:** P1 · **Repo:** not yet created
- **What it is:** Unknown. A Telegram-based product. The real PRD is on your Mac and has never been imported — the file in the repo is a placeholder that says so.
- **Stage:** Normalized `prd.md` exists but is entirely `TBD` placeholders.
- **Honest read:** Not a project yet. Sync the PRD or drop it from the portfolio; carrying an unread placeholder as a "P1 active project" inflates your sense of how much you have going on.

### 7. InlineAd Website

- **Status:** Active · **Tier:** P2 · **Repo:** `Dr-kersho/inlinead-website`
- **What it is:** Marketing website for InlineAd. No docs registered in the ops repo.
- **Honest read:** A support asset, not a business. Ignore until the product it supports has traction.

### 8. Impeccable

- **Status:** Active · **Tier:** P1 · **Repo:** `Dr-kersho/impeccable` (fork of `pbakaus/impeccable`)
- **What it is:** Design-language skills + Live Mode for AI coding harnesses. Gives agents shared vocabulary for typography, colour, motion, UX critique, in-browser iteration.
- **Consumers:** blendavit website (`projects/smartmomlabs/website/`).
- **Honest read:** Internal multiplier. Genuinely useful. Not a revenue source in year 1.

### 9. Smart Mom Labs / blendavit

- **Status:** Active · **Tier:** P0 · **Repo:** ops-embedded (future `Dr-kersho/blendavit`)
- **What it is:** DTC children's supplement brand — blendavit (toddler + kids vitamins), part of a 12-SKU / 6-brand Smart Mom Labs portfolio.
- **Locked decisions (June 2026):** KSA-only launch (SAR), Arabic-first + EN toggle, Shopify, waitlist/pre-order model (not ship-from-stock), two MVP SKUs (Toddlers 1–3, Kids 4+), **SFDA registered**, deposit toggle switchable to $0.
- **Stage:** Website MVP built (`index.html` + `product.html` + `/hub/`). Launch readiness tickets filed. Price per market and deposit amount still open.
- **Honest read:** Real brand assets and a genuine regulatory moat (SFDA). But it's the most **capital-hungry** thing you own — manufacturing MOQs, inventory, and paid acquisition all precede revenue. Wrong project to start when you need money; right project to fund once you have some.

### 10. Graphify

- **Status:** Active · **Tier:** P1 · **Repo:** `safishamsi/graphify` (not yours)
- **What it is:** Portfolio-wide codebase knowledge graphs — query a map before grepping.
- **Honest read:** Internal tooling. Makes you faster. Not revenue.

### 11. Ponytail

- **Status:** Handover · **Tier:** P1 · **Repo:** `Dr-kersho/ponytail` (fork of `DietrichGebert/ponytail`)
- **What it is:** Agent harness skill enforcing code minimalism (YAGNI ladder). Claims ~54% LOC reduction on agentic tasks.
- **Consumers:** blendavit website, qppv-agent.
- **Honest read:** Internal tooling. Same as above.

---

## PART 2 — Business Plan (as drafted this session)

> **Note:** This section is the plan we built *before* the time-to-cash analysis in Part 0. The revenue targets below are **targets and assumptions, not validated forecasts** — no market sizing, competitor pricing research, or customer interviews sit behind them. Treat them as a planning frame to pressure-test, not as projections to raise money against.

### Company concept

A holding company with each project as a product line; strong performers spin out once they hit product-market fit. Naming went through several candidates this session (see Part 3).

**Rationale for one entity:**

- Shared infrastructure — one AWS/Vercel/Supabase org, one auth framework, one CI/CD pipeline
- Shared AI dev stack — Graphify + Ponytail + Impeccable amortised across all products
- Talent leverage — engineers move between products without re-onboarding
- Credibility flywheel — a regulated product (QPPV) validates engineering rigour for every other pitch

**Counter-argument worth taking seriously:** a holding company across sports-tech, CRM, DTC supplements, fitness, and pharma compliance has no coherent story for investors, customers, or hires. "We do everything" reads as "we do nothing well." If you keep more than one product, the structure should be a focused parent with a clear thesis, not a conglomerate of unrelated bets.

### Revenue model mix

| Model | Products | Notes |
|---|---|---|
| B2B SaaS | QPPV Agent, XPORT CRM, Training Command Center | Recurring, high ACV |
| Marketplace | Luma PWA | Take-rate on bookings |
| DTC e-commerce | blendavit / Smart Mom Labs | Shopify-native, direct margin |
| Consumer app | KoraID | Freemium + booking fees |
| Telegram product | Elite Telegram | Undefined |
| Marketing surface | InlineAd Website | Support asset |

### Year-1 cost structure (as drafted)

| Line | Monthly |
|---|---|
| Engineering (2–3 engineers) | $15,000–$20,000 |
| Design | $3,000–$5,000 |
| Infrastructure (AWS, Vercel, Supabase, Neon, Qdrant) | $1,500 |
| AI API costs (Claude, OpenAI, Perplexity) | $500–$2,000 |
| Legal / accounting | $1,000 |
| Marketing & ads | $3,000–$5,000 |
| **Total burn** | **~$25,000–$35,000/month** |

**Reality check:** this assumes $300k–$400k of funding you do not currently have. If you need money now, this cost structure is not the plan — it's the plan *after* you have revenue or investment. The bootstrap version is you, one product, and near-zero burn until something is paying.

### 3-year outlook (as drafted — unvalidated)

| Year | Revenue | Driver |
|---|---|---|
| 1 | $200k–$250k | QPPV first clients + blendavit pre-launch + XPORT CRM |
| 2 | $600k–$1M | QPPV scale + KoraID monetisation + Luma relaunch |
| 3 | $2M+ | QPPV growth + blendavit full launch |

### Defensibility by product

| Product | Moat |
|---|---|
| QPPV Agent | Regulatory domain knowledge + QPPV trust — genuinely sticky |
| blendavit | SFDA registration — competitors without it cannot legally sell |
| XPORT CRM | Gulf-specific WhatsApp-native workflow — no Western CRM does this |
| KoraID | Community network effects + Arabic localisation |
| Luma PWA | Two-sided marketplace lock-in once clinics onboard |

### Go-to-market summary per product

**QPPV Agent** — LinkedIn (the QPPV community is small and reachable) + pharma compliance consultants + EMA/DIA conference presence. Offer 3 free 90-day pilots in exchange for case studies. $3–5k/month per seat. *Revised recommendation: lead with services, not software.*

**blendavit** — Instagram/TikTok Arabic parenting content, paid KSA ads, micro-influencers (50k–200k). Shopify waitlist → $2k ad test → 500 pre-orders → enable deposit → take proof-of-concept to manufacturer. ~$25–35/month box.

**XPORT CRM** — LinkedIn Sales Navigator targeting Gulf export managers, Arabic-language positioning. Free 30-day trial with white-glove CSV import; convert on first WhatsApp batch send. $299/month per team.

**KoraID** — Community-first: WhatsApp groups, club admins, Instagram Reels of highlights. Partner with 5 Cairo courts; each booking generates a shareable player card. Free profiles, courts pay per booking.

**Training Command Center** — Instagram fitness coaches + direct DM outreach, PT certification body partnerships. Package as "AI client intake + plan generator," using the 3 existing pilots as social proof. $99/month.

**Luma PWA** — B2B first: direct sales to 10 Riyadh clinics; clinic activation drives patient supply. White-label admin as "your booking page." 8–12% commission or flat monthly fee.

**Elite Telegram** — Telegram-native distribution (channels, groups, Mini Apps). First step is simply importing and reading the PRD.

**InlineAd Website** — SEO + direct outreach. Rebuild with a clear value prop only if the underlying product is being actively sold.

---

## PART 3 — Company Naming Discussion

The name went through three different framings this session. Recording the reasoning because it matters for whichever entity you actually register.

### Candidate: MAH — Modern Advances in Healthcare Solutions

### Arabic: الحلول الرقمية المتقدمة للرعاية الصحية

**Assessment across three different company framings:**

**1. As a holding company for all 11 projects — poor fit.** Only three projects are health-adjacent. KoraID (sports), XPORT (export sales), and the dev tools look misplaced under a healthcare parent, and it actively weakens the XPORT pitch ("why is a healthcare company selling me a CRM?").

**2. As a pharmacovigilance software company — actively harmful.** In pharma, **MAH is a fixed legal term: Marketing Authorization Holder**. Your customers *are* MAHs. The collision breaks your own sentences ("MAH announces a partnership with the MAH"), buries you in search results behind thousands of regulatory documents, and reads as though the founder didn't know the term — the opposite of the domain fluency you need to sell to QPPVs.

**3. As a CRO — worst of the three.** A CRO's core paperwork (PV agreements, SDEAs, delegation logs, PSMF annexes) names "MAH" as a defined legal party on nearly every page, and PV activities are delegated *from the MAH to the CRO*. Contract language becomes: *"MAH (the Service Provider) shall submit ICSRs on behalf of the MAH (the Marketing Authorization Holder)."* Client legal and QA teams will flag this in vendor qualification. Worse, regulators care intensely that the MAH/CRO responsibility boundary stays crisp — a CRO named "MAH" blurs exactly the line inspectors check.

### Additional issue regardless of framing

**The English and Arabic don't match.** The Arabic reads "Advanced **Digital** Solutions for Healthcare" — the English is "Modern Advances in Healthcare Solutions" (no "digital," different structure, and "advances in solutions" is grammatically awkward). Whatever name you land on, mirror the two exactly.

### Recommendation

Drop MAH. Keep the bilingual instinct — it's right for GCC pharma clients. Pick something rooted in **vigilance / safety / trust**, which is what a PV services company actually sells:

- *Vigilanta, VigilaX, PharmaVigil, SafetyDesk*
- *Signalis, SignalDesk, ClearSignal* (signal detection is core PV work)
- *Amanah* (أمانة — trust/custodianship) — resonates strongly in Arabic and maps precisely to what a QPPV service is

**The test for any candidate:** say the sentence *"[Name] provides delegated pharmacovigilance services to MAHs across the GCC."* The name should make that sentence clearer, not weirder.

---

## PART 4 — What I Don't Know (and you should decide)

I built the analysis above on the repo contents and this conversation. These gaps genuinely change the answer, and I'd be guessing if I filled them in:

1. **Do you hold QPPV credentials, or can you partner with someone who does?** — This is the single decision that determines whether the fastest-money path is open to you. Everything in Part 0 hinges on it.
2. **How much runway do you personally have?** — "I need money really" could mean "I need £3k/month to cover rent" or "I need £50k to keep the company alive." The answer changes whether you should be chasing a consulting contract or an investment round.
3. **How much time can you actually put in per week?** — 40 hours and 10 hours produce completely different plans.
4. **Do you have any existing pharma industry relationships?** — Warm intros collapse the PV services sales cycle from months to weeks. Cold outreach does not.
5. **Is there any capital available for inventory?** — Determines whether blendavit is a year-1 or year-3 project.
6. **The revenue figures in Part 2 are unvalidated.** No competitor pricing research, market sizing, or customer interviews sit behind them. Before you take any of these numbers to an investor or a bank, they need real validation.

---

## PART 5 — Suggested Next 30 Days

Written for the "I need money" objective specifically. Adjust once you've answered question 1 above.

### If you have QPPV credentials (or a partner who does)

| Week | Action |
|---|---|
| 1 | Write a one-page PV services offering: QPPV-as-a-service, ICSR case processing, PSMF authoring, literature monitoring. Set day rates. |
| 1 | List every pharma contact you have. Small/mid MAHs and generics companies in Egypt, KSA, UAE are the target — they have obligations and no in-house PV department. |
| 2 | Direct outreach: 20 warm contacts, 50 cold on LinkedIn. The message is "I provide named QPPV coverage and PV operations for MAHs in [region]." |
| 2–3 | Take the first call. Price to win the first contract, not to maximise margin — you need a reference client more than you need the extra £500. |
| 3–4 | Deliver the first engagement using QPPV Agent internally. Note every place it saves you time — that's your product roadmap and your future sales deck. |
| 4 | Invoice. |

### If you don't have QPPV credentials

| Week | Action |
|---|---|
| 1 | Clear the XPORT CRM staging blockers: Auth0 config (#6), Vercel env (#8), staging smoke test (#9). These are chores, not engineering. |
| 1–2 | Ship Meta WhatsApp API integration (#16). This is the feature that makes the product worth paying for. |
| 2 | Build a target list of 50 GCC export companies. Food and manufacturing exporters are the sweet spot. |
| 3 | Outreach with a free 30-day trial and white-glove CSV import — you do the import for them personally. |
| 3–4 | Get 3 teams into trial. Convert on the first successful WhatsApp batch send. |
| 4+ | First invoices at $299/team. |

### Either way — the discipline that matters

**Put the other nine projects in writing as explicitly paused.** Not "P1, resume later" — genuinely paused, with a named condition for resuming (e.g. "resume KoraID when monthly revenue exceeds £5k"). The point is not organisational tidiness. The point is that an unpaused project keeps stealing attention from the one that's supposed to be paying you.

---

*Generated during ApexYard portfolio session, July 2026. Tracked as issue Dr-kersho/apexyard#29.*
