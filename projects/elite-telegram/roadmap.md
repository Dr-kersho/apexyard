# Elite Telegram — Roadmap

**Registry:** `elite-telegram` | **Repo:** [Dr-kersho/elite-telegram](https://github.com/Dr-kersho/elite-telegram)  
**Workspace:** `workspace/elite-telegram` | **PRD:** `prd.md`

---

## Phase 0 — Product ✅

- [x] Import source PRD
- [x] Normalize to `prd.md` with P0/P1/Later MVP cut
- [x] Scaffold app repo + push to GitHub
- [ ] Mazen sign-off on MVP scope
- [ ] Airtable base created (`workspace/elite-telegram/docs/airtable-schema.md`)
- [ ] Bot token + HTTPS deploy

---

## Phase 1 — Foundation (Week 1–2) — P0 🚧

| Task | Status |
|------|--------|
| TypeScript app (Hono server) | ✅ |
| OKX C2C rate poller + `/api/rate` + manual override | ✅ |
| Profit calculator + unit tests (9 tests) | ✅ |
| Telegram webhook + 9-step onboarding | ✅ |
| Structured `/transfer` transaction flow → Airtable | ✅ |
| Returning client lookup (Airtable skip onboarding) | ✅ |
| Mazen admin commands (`/rate`, `/override`) | ✅ |
| Claude agent + system prompt | ✅ |
| Deploy config (Dockerfile, Railway, webhook script) | ✅ |
| Airtable base live | ⬜ Mazen |
| Deploy webhook to production | ⬜ |

**Exit criteria:** Live bot completes onboarding → rate quote → Mazen sees row in Airtable.

---

## Phase 2 — AI Agent (Week 2–3) — P0

_Merged into Phase 1 scaffold — remaining: production env, Mazen testing, tune prompt._

| Task | Status |
|------|--------|
| System prompt v1 | ✅ |
| Onboarding + welcome bonus | ✅ |
| Escalation to Mazen | ✅ |
| 10 simulated conversations | ⬜ Mazen + QA |

---

## Phase 3 — Data Migration (Week 3–4) — P1

| Task | Status |
|------|--------|
| Export Telegram JSON | ⬜ Mazen |
| Run `npm run import:telegram` | ✅ script ready |
| Bulk import to Airtable | ⬜ |
| Profile update broadcast | ⬜ Mazen |
| Segment views in Airtable | ⬜ |

---

## Phase 4–8 — Later

See `prd.md` § MVP Scope Cut (Later).

---

## Success checkpoints

| When | Metric |
|------|--------|
| Week 2 | Rate calculator live; first Airtable transaction |
| Week 3 | AI handles first real new-client conversation |
| Week 4 | ≥100 clients imported to CRM |
| Day 60 | 100% CRM coverage; 80% AI handling |
