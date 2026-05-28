# Technical Design: Sarraf OS — Multi-Tenant Refactor

**Status**: Draft  
**Author**: Khalid (Head of Engineering)  
**Date**: 2026-05-24  
**PRD**: [prd.md](./prd.md)  
**Baseline codebase**: `Dr-kersho/elite-telegram` @ single-tenant MVP

---

## Overview

### Summary

Evolve the Elite Telegram single-tenant bot into **Sarraf OS** — a multi-tenant B2B platform where each operator (tenant) has isolated config, CRM data, Telegram webhook, and AI persona. Postgres replaces Airtable as system of record; a minimal operator dashboard enables self-serve configuration.

### Goals

- `tenant_id` isolation on all persistent data — zero cross-tenant leakage
- Configurable AI voice (unblock operator #2)
- Per-tenant webhook + encrypted bot token
- Postgres schema for tenants, clients, transactions, config
- Mazen migrates as `tenant_id = elite-telegram` without regression

### Non-Goals (this refactor)

- Full billing UI (Stripe Customer Portal OK for v1)
- Paymob integration
- Mobile app
- Multi-bot per tenant
- Real-time operator dashboard analytics (basic tables OK)

---

## Domain Model

### Entities

```
Tenant
├── id: uuid (PK)
├── slug: string (unique, URL-safe — e.g. "elite-telegram")
├── name: string ("Elite Telegram")
├── plan: enum (trial | starter | pro | scale)
├── stripe_customer_id: string?
├── status: enum (active | suspended | churned)
├── created_at, updated_at
└── Relations: TenantConfig, Client[], Transaction[]

TenantConfig (1:1 Tenant)
├── tenant_id: uuid (FK, unique)
├── telegram_bot_token_enc: string
├── telegram_webhook_secret: string
├── operator_telegram_chat_id: string
├── rate_spread_egp: decimal
├── welcome_bonus_egp: decimal
├── manual_rate_override_egp: decimal?
├── default_conversion_divisor: decimal
├── escalation_usd_threshold: decimal (default 2000)
├── ai_model: string
├── voice_config: jsonb  ← phrases, greeting style, emoji level
├── fee_rules: jsonb     ← payoneer, wise, paypal rules
└── onboarding_questions: jsonb (v2)

Client
├── id: uuid
├── tenant_id: uuid (FK) ← REQUIRED INDEX
├── telegram_user_id: string
├── telegram_username: string?
├── full_name, email, country, instapay_phone, ...
├── onboarding_complete: boolean
├── client_tier: enum
├── lifetime_value_egp: decimal
├── first_transaction_at, last_transaction_at
└── UNIQUE (tenant_id, telegram_user_id)

Transaction
├── id: uuid
├── tenant_id: uuid (FK) ← REQUIRED INDEX
├── client_id: uuid (FK)
├── usd_amount_gross, platform, platform_fee_usd, ...
├── profit_egp, profit_margin_percent
├── status: enum (pending | confirmed | complete)
└── created_at

OperatorUser (dashboard login)
├── id: uuid
├── tenant_id: uuid (FK)
├── email: string (unique)
├── password_hash / auth_provider
└── role: enum (owner | admin)
```

### Value Objects

| Value Object | Fields | Purpose |
|--------------|--------|---------|
| `VoiceConfig` | greetings, phrases, emojiLevel, languageMix | Builds Claude system prompt |
| `FeeRules` | payoneer, wise, paypal, ach | Platform fee calculator |
| `RateSnapshot` | usdtSellRateEgp, source, fetchedAt | Shared OKX cache (global) or per-tenant override |

### Domain Events

| Event | Trigger | Data |
|-------|---------|------|
| `TenantCreated` | Signup complete | tenant_id, plan |
| `BotConnected` | Token validated | tenant_id, bot_username |
| `TransactionCompleted` | Client confirms payment | tenant_id, transaction_id, profit_egp |
| `EscalationTriggered` | AI or amount rule | tenant_id, client_id, reason |

---

## Architecture

### Component Diagram

```
                    ┌─────────────────┐
                    │ Operator Dashboard│  Next.js (or Hono+HTMX v1)
                    │  (web)          │
                    └────────┬────────┘
                             │ REST
┌──────────┐    webhook     ┌▼────────────────────────────┐
│ Telegram │───────────────►│ Sarraf API (Hono)            │
│ Bot API  │                │  /webhook/telegram/:slug     │
└──────────┘                │  TenantResolver → Handler    │
                            │  RateEngine (shared OKX)     │
                            │  PromptBuilder(voice_config) │
                            │  ClaudeClient                │
                            └────────┬─────────────────────┘
                                     │
                            ┌────────▼────────┐
                            │ Postgres (Neon) │
                            │  tenants        │
                            │  clients        │
                            │  transactions   │
                            └─────────────────┘
                                     │
                            ┌────────▼────────┐
                            │ Stripe Billing  │
                            └─────────────────┘
```

### Tenant resolution (webhook)

```
POST /webhook/telegram/:tenantSlug
  1. Load Tenant by slug (cache 60s)
  2. Verify x-telegram-bot-api-secret-token == tenant.webhook_secret
  3. Run handleTelegramUpdate(update, tenantContext)
  4. All DB queries scoped: WHERE tenant_id = ?
```

### Session storage

**Today:** in-memory `Map<userId, Session>` — lost on restart, not multi-tenant safe.

**Target:** Redis or Postgres `sessions` table:

```
sessions (tenant_id, telegram_user_id, state jsonb, expires_at)
```

Phase 1 can use Postgres sessions; Redis when >50 tenants.

---

## Configurable voice (critical path)

### Today

Single file `prompts/elite-system.md` — Mazen's Franco Arabic, hardcoded phrases.

### Target

```
prompts/
  base-system.md          # Sarraf platform rules (escalation, never reveal traders)
  voice-template.md       # Placeholders: {{greeting}}, {{amount_ask}}, etc.

src/ai/prompt-builder.ts
  buildSystemPrompt(tenant: TenantConfig): string
    = base-system + inject(voice_config) + live rate context
```

### VoiceConfig JSON schema (v1)

```json
{
  "personaName": "Mazen",
  "addressTerm": "king",
  "emojiLevel": "high",
  "languageMix": "franco",
  "phrases": {
    "morningGreeting": "sabah el foll",
    "regularGreeting": "eh el a5bar ya {{addressTerm}}",
    "askAmount": "kam el amount?",
    "confirmationReceived": "Received / Done",
    "egpSent": "Done - hayewsalak halan",
    "delayApology": "sorry for the delay, halan hayewsalak",
    "postTransaction": "taht amrak anytime ya {{addressTerm}}",
    "competitorResponse": "enta eh ahsan rate galak fel market?"
  }
}
```

Operator #2 sets their own phrases in dashboard → never sounds like Mazen.

---

## Database schema (Postgres)

```sql
-- Core tenancy
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'trial',
  status TEXT NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tenant_configs (
  tenant_id UUID PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  telegram_bot_token_enc TEXT,
  telegram_webhook_secret TEXT NOT NULL,
  operator_telegram_chat_id TEXT,
  rate_spread_egp NUMERIC(6,3) NOT NULL DEFAULT 0.35,
  welcome_bonus_egp NUMERIC(6,3) NOT NULL DEFAULT 0,
  manual_rate_override_egp NUMERIC(8,2),
  default_conversion_divisor NUMERIC(8,4) NOT NULL DEFAULT 1.009,
  escalation_usd_threshold NUMERIC(12,2) NOT NULL DEFAULT 2000,
  voice_config JSONB NOT NULL DEFAULT '{}',
  fee_rules JSONB NOT NULL DEFAULT '{}',
  ai_model TEXT NOT NULL DEFAULT 'claude-sonnet-4-20250514',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  telegram_user_id TEXT NOT NULL,
  telegram_username TEXT,
  full_name TEXT,
  instapay_phone TEXT,
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  -- ... additional profile fields
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, telegram_user_id)
);
CREATE INDEX idx_clients_tenant ON clients(tenant_id);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  client_id UUID REFERENCES clients(id),
  usd_amount_gross NUMERIC(12,2) NOT NULL,
  platform TEXT NOT NULL,
  platform_fee_usd NUMERIC(12,2),
  client_rate_egp NUMERIC(8,2),
  profit_egp NUMERIC(12,2),
  profit_margin_percent NUMERIC(6,2),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_transactions_tenant ON transactions(tenant_id);
CREATE INDEX idx_transactions_tenant_created ON transactions(tenant_id, created_at DESC);
```

**Row-level security (recommended):** Enable RLS on `clients`, `transactions` with `tenant_id = current_setting('app.tenant_id')`.

---

## Migration plan (elite-telegram → Sarraf OS)

| Step | Action | Risk |
|------|--------|------|
| 1 | Add Postgres + Drizzle/Prisma; run migrations | Low |
| 2 | Seed tenant `elite-telegram` with Mazen's current `.env` values | Low |
| 3 | Port `airtable.ts` → `crm/postgres.ts` with `tenant_id` param | Medium |
| 4 | Extract `VoiceConfig` from `elite-system.md` into seed for Mazen tenant | Medium |
| 5 | Change webhook to `/webhook/telegram/:slug` | Medium — re-register webhook |
| 6 | Replace in-memory sessions with Postgres sessions | Medium |
| 7 | Minimal dashboard: config + client/tx tables | Low |
| 8 | Stripe products + tenant plan field | Low |
| 9 | Onboard operator #2 as second tenant row | **Validation gate** |

**Parallel run:** Keep Airtable sync optional for Mazen during step 3–4 if needed.

---

## API changes

| Endpoint | Change |
|----------|--------|
| `POST /webhook/telegram` | → `POST /webhook/telegram/:tenantSlug` |
| `GET /api/rate` | → `GET /api/v1/tenants/:slug/rate` (or tenant from JWT on dashboard) |
| `GET /demo` | Keep for Sarraf marketing; not tenant-specific |
| New | `POST /api/v1/auth/signup` |
| New | `PATCH /api/v1/tenants/:id/config` |
| New | `GET /api/v1/tenants/:id/clients` |

---

## Security

| Item | Approach |
|------|----------|
| Bot token storage | Encrypt with `ENCRYPTION_KEY`; decrypt only in webhook handler |
| Cross-tenant access | `tenant_id` on every query; integration tests for isolation |
| Dashboard auth | Clerk, Auth.js, or Lucia — v1 simple email/password |
| Webhook secret | Per-tenant random UUID |
| Operator escalation | Never hardcode Mazen's chat ID — read from `tenant_configs` |

---

## Testing strategy

| Test | Purpose |
|------|---------|
| Tenant isolation integration | Tenant A cannot read Tenant B clients |
| Prompt builder unit | VoiceConfig → expected prompt fragments |
| Webhook routing | Correct tenant from slug |
| Mazen regression | Full /transfer flow on `elite-telegram` slug |
| Fee + profit calculator | Unchanged math per tenant fee_rules |

---

## Implementation phases (engineering)

### Phase 1 — Tenant foundation (week 1–2)

- [ ] Postgres on Neon + migrations
- [ ] `Tenant`, `TenantConfig`, `Client`, `Transaction` repositories
- [ ] `TenantContext` passed through bot handler
- [ ] Webhook route by slug
- [ ] Seed Mazen tenant

### Phase 2 — Configurable voice (week 2–3)

- [ ] `VoiceConfig` schema + `prompt-builder.ts`
- [ ] Migrate Mazen phrases to seed JSON
- [ ] Dashboard page: edit voice + preview (minimal)

### Phase 3 — Sessions + dashboard (week 3–4)

- [ ] Postgres sessions
- [ ] Dashboard: clients, transactions, rate override
- [ ] Remove Airtable dependency (or optional export)

### Phase 4 — Operator #2 + billing (week 4–6)

- [ ] Concierge tenant create for pilot operator
- [ ] Stripe subscription + plan limits
- [ ] Self-serve signup (if #2 successful)

---

## Open technical decisions

| Decision | Options | Recommendation |
|----------|---------|----------------|
| ORM | Drizzle vs Prisma | Drizzle (lighter, SQL-friendly) |
| Dashboard | Next.js vs Hono+HTMX | Next.js if team knows it; else Hono admin routes v1 |
| Auth | Clerk vs Auth.js | Auth.js (cost) |
| Repo naming | Rename elite-telegram → sarraf-os | Rename at v0.2.0 tag |
| OKX rate cache | Global vs per-tenant | Global cache + per-tenant override |

---

## Approvals

| Role | Status |
|------|--------|
| Tech Lead (Hisham) | Pending |
| Head of Engineering (Khalid) | Draft |
| Product (Mariam) | Pending |
