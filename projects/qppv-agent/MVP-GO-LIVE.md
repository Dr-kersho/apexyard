# QPPV — MVP go-live checklist

**Goal:** Run as a **full MVP for 1–3 design-partner MAHs**, not a pitch-only demo.  
**Definition of done:** One real QPPV can use daily ICSR / ESI / Q&A / PSUR on always-on prod without cold-start theater; you can provision them; compliance posture is honest.

**Out of scope for this go-live:** Stripe, public signup, Vigipx replacement, Arabic UI, full multi-tenant admin UI, every post-MVP signal/E2B epic.

---

## Gate 0 — Decide (you)

- [ ] Confirm MVP = **single MAH / single QPPV** first customer (CONTEXT v1.0)
- [ ] Name design partner(s) (target: 1 paid or LOI, up to 3)
- [ ] Keep `demo@qppv.eg` as **sales sandbox** only — not the production tenant
- [ ] Accept: app **does not** submit to EDA; disclaimer stays visible
- [ ] Until reopen: keep public login **closed** via `LOGIN_ENABLED=false` ([#109](https://github.com/Dr-kersho/QPPV-Agent/issues/109))

### Login kill switch (public site)

| Action | Vercel + Render env |
|--------|---------------------|
| **Close** all sign-in | `LOGIN_ENABLED=false` (then redeploy frontend) |
| **Reopen** | `LOGIN_ENABLED=true` or remove the var |

Patch: `projects/qppv-agent/QPPV-109-login-kill-switch.patch`

---

## Gate 1 — Infra (must be green)

| # | Check | How |
|---|--------|-----|
| 1.1 | Render `qppv-api` on **Starter** (always-on), not free | Render dashboard → plan |
| 1.2 | Service **not suspended** | `curl -D- https://qppv-api.onrender.com/health` → 200 JSON, no `x-render-routing: suspend` |
| 1.3 | Managed Postgres with backups | Neon or Render Postgres (not ephemeral) |
| 1.4 | Qdrant Cloud reachable + RAG seeded | `seed_rag` run; Q&A returns EDA citations |
| 1.5 | Vercel `BACKEND_URL` set; `NEXT_PUBLIC_API_URL` **unset** | Vercel env |
| 1.6 | `OPS_CONSOLE_ENABLED=false` in production | Vercel + Render |
| 1.7 | AI keys present (Anthropic, OpenAI; Perplexity optional) | Render secrets |
| 1.8 | Health script PASS | `./scripts/verify-pilot-health.sh` |
| 1.9 | Demo login still works (sandbox) | `demo@qppv.eg` / `demo1234` |

**Exit:** Health PASS for 24h without manual resume.

---

## Gate 2 — Product hardening (must ship)

| # | Item | Ticket / artifact |
|---|------|-------------------|
| 2.1 | Apply sellable-pilot fix (JSON health + offline EN/AR login) | [#107](https://github.com/Dr-kersho/QPPV-Agent/issues/107) — patch in ops `projects/qppv-agent/QPPV-107-pilot-sellable.patch` / [apexyard#30](https://github.com/Dr-kersho/apexyard/pull/30) |
| 2.2 | GxP lite pack (intended use + validation outline) | [#83](https://github.com/Dr-kersho/QPPV-Agent/issues/83) |
| 2.3 | Compliance disclaimer on login + dashboard + AI answers | Already in product — verify on prod |
| 2.4 | Holiday table for ESI working days (or documented fixed-date limit) | CONTEXT: required before multi-customer; document ceiling for partner #1 |
| 2.5 | Soft AI metering or ops kill-switch before heavy PSUR use | Prevents COGS blowups |

**Exit:** Partner can complete: login → ICSR intake → deadline visible → Q&A with citation → one PSUR/RMP draft → logout.

---

## Gate 3 — First real tenant (must)

| # | Check |
|---|--------|
| 3.1 | Provision QPPV via admin API (`X-Admin-Key`) — not public registration |
| 3.2 | Preload **company products** for that MAH |
| 3.3 | Force password change / share credentials securely |
| 3.4 | Seed or confirm regulatory KB index date shown in footer |
| 3.5 | Run UAT pack against partner workflows (`docs/UAT-PACK-QPPV-074.md`) |
| 3.6 | Written LOI or pilot agreement (assistive tool; no EDA submission claim) |

**Do not** onboard customer #2 until [#2 multi-tenancy](https://github.com/Dr-kersho/QPPV-Agent/issues/2) lands (or you run fully isolated deploys).

---

## Gate 4 — Ops & money (lightweight)

| # | Check |
|---|--------|
| 4.1 | Invoice manually (EGP or USD) — no Stripe required for MVP |
| 4.2 | Price band: **$400–700/mo** Professional local MAH (or pilot discount) |
| 4.3 | Support channel (WhatsApp/email) + response SLA you can keep |
| 4.4 | Backup restore drill once |
| 4.5 | Incident runbook: suspend / resume / redeploy (RENDER-DEPLOY.md) |

---

## Gate 5 — Explicit non-goals (do not block go-live)

- Stripe / self-serve billing  
- Public registration  
- Full Vigipx import (#88)  
- Tier-2 signal screening (#89)  
- Perfect E2B gateway to EDA  
- Arabic/RTL UI  
- Multi-MAH admin UI  

---

## Go / no-go

| Signal | Call |
|--------|------|
| Gates 1–3 green | **GO** — full MVP for partner #1 |
| Gate 1 red (timeouts / suspend) | **NO-GO** — still a demo |
| Gate 2.1 or 2.2 missing | Soft GO only with partner informed |
| Want customer #2 | **NO-GO** until #2 multi-tenancy |

---

## Suggested order this week

1. Upgrade Render → Starter; verify health 24h  
2. Land #107 on QPPV-Agent (switch repo / apply patch)  
3. Finish or stub #83 GxP lite PDF pack  
4. Provision partner #1; run UAT  
5. Invoice / LOI; keep demo tenant for sales  

---

*Living checklist — update checkboxes as you clear gates. Product decisions remain in app-repo `CONTEXT.md`.*
