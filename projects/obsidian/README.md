# OBSIDIAN

**The Freelancer's Pricing Intelligence Engine** — a mobile-first app that tells freelancers what their work is actually worth (backed by market rate data), shows what platform fees cost them, and hands them lightweight contracts/proposals/invoices to close the gap.

- **Tier:** P1
- **Status:** active (planning stage — no app repo yet)
- **Intended repo:** `Dr-kersho/obsidian`
- **Registered:** 2026-08-15 (portfolio ticket [Dr-kersho/apexyard#35](https://github.com/Dr-kersho/apexyard/issues/35))

## Positioning

> Bonsai helps you invoice at $500. OBSIDIAN tells you the project is worth $2,500.

The **wedge is rate intelligence** ("you're charging 3x below market"); contracts/proposals are table stakes to keep users in the app. Target audience: vibe coders / AI-native builders and platform freelancers ($300–$5,000/month).

## Documents

| Doc | Location |
|-----|----------|
| PRD v3.0 (Gap-Validated, Cursor-Ready) | [`docs/OBSIDIAN_PRD_v3.docx`](docs/OBSIDIAN_PRD_v3.docx) |

## Open decisions before build (from PRD review)

1. **Data provenance** — the "487K transactions / real Upwork+Fiverr data" claim vs. a hardcoded `constants/rates.ts` at launch. Resolve before any marketing goes out.
2. **Percentile credibility** — "23rd percentile" needs a real per-skill × experience × region distribution.
3. **Monetization** — "one-time purchase" vs. the $4.99/mo Pro+ AI tier contradiction; the AI tier's unit economics.
4. **Day-8 retention loop** — pricing intelligence is a check-once utility; what brings users back?

## Suggested next steps in the framework

- `/challenge` — stress-test the vibe-coder bet and data-moat premise (advisory).
- `/write-spec` — convert the PRD into the house template so the empty tables get filled and SDLC gates apply.
- `/roadmap` — sequence the 8-week plan against the open decisions above.
