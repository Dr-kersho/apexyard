# QPPV AI Assistant

**Repo:** [Dr-kersho/QPPV-Agent](https://github.com/Dr-kersho/QPPV-Agent)  
**Domain glossary:** `CONTEXT.md` in app repo (101 grill decisions)  
**Build order:** `docs/MVP-ROADMAP.md` in app repo  
**Go-live:** [MVP-GO-LIVE.md](./MVP-GO-LIVE.md) — checklist to run as full MVP (not pitch-only)  
**Login kill switch (#109):** set `LOGIN_ENABLED=false` on Vercel + Render to close all public sign-in. Patch: `QPPV-109-login-kill-switch.patch`

## Active slice

| Ticket | Title | State |
|--------|--------|--------|
| [#31](https://github.com/Dr-kersho/QPPV-Agent/issues/31) | App shell — sidebar, badges, meta, request ID | OPEN (implementation on branch) |
| [#33](https://github.com/Dr-kersho/QPPV-Agent/issues/33) | Dashboard widgets + compliance gauge | Blocked by #31 |
| [#32](https://github.com/Dr-kersho/QPPV-Agent/issues/32) | ICSR detail page | Blocked by #31 |

## Stack

Next.js 15 PWA · FastAPI · PostgreSQL · Qdrant · Claude / OpenAI / Perplexity

## Ports (local)

| Service | Port |
|---------|------|
| Frontend | 3010 |
| Backend | 8010 |
| Postgres | 5433 |

## Pilot sellability (#107)

Production demo must stay on **Render Starter (always-on)**, not free tier.

- Health proxy returns JSON only (`ok` | `warming` | `suspended` | `unavailable`)
- Login disables sign-in when suspended (EN + AR copy)
- Runbook: `docs/PILOT-DEPLOY.md` + `docs/RENDER-DEPLOY.md` in app repo
- Verify: `./scripts/verify-pilot-health.sh`

Patch ready to apply (ops cannot push to app repo from this agent):

`projects/qppv-agent/QPPV-107-pilot-sellable.patch` — branch `fix/QPPV-107-pilot-stack-sellable`
