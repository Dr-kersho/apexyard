# Sarraf OS

**Product:** B2B SaaS platform — white-label Telegram exchange operating system  
**Customer #1:** [Elite Telegram](../elite-telegram/) (Mazen — dogfood tenant)  
**Codebase:** [Dr-kersho/elite-telegram](https://github.com/Dr-kersho/elite-telegram) (evolves into Sarraf OS)

| Doc | Purpose |
|-----|---------|
| [prd.md](./prd.md) | B2B product requirements — tenants, pricing, configurable voice |
| [technical-design.md](./technical-design.md) | Multi-tenant architecture + migration from single-tenant MVP |

**One-liner:** *Shopify for Telegram currency exchange operators.*

## Implementation status (2026-05-25)

| Phase | Status |
|-------|--------|
| Phase 1 — Multi-tenant SQLite, voice config, `/webhook/telegram/:slug` | Shipped on `main` |
| Operator #2 pilot — `cairo-exchange` tenant (Ali / English voice) | Shipped — proves configurable voice vs Mazen |

**Local demo:** `npm run db:seed && npm run dev` → http://localhost:3000/demo (tenant switcher: Elite Telegram vs Cairo Exchange)
