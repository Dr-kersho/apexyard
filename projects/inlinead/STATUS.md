# INLINE AD — deployment status

Last checked: 2026-05-26

| Item | Status | Notes |
|------|--------|-------|
| GitHub repo | **Done** | https://github.com/Dr-kersho/inlinead-website |
| Landing page code | **Done** | EN/AR, dual forms, no pricing |
| Portfolio registry | **Done** | `apexyard.projects.yaml` → `inlinead-website` |
| Supabase `001_leads.sql` | **Not verified** | Run in SQL Editor |
| Supabase `002_leads_anon_insert.sql` | **Not verified** | Required for GitHub Pages forms |
| GitHub Actions secrets | **Not done** | `SUPABASE_URL`, `SUPABASE_ANON_KEY` |
| GitHub Pages | **Live** | https://dr-kersho.github.io/inlinead-website/ |
| Netlify site | **Skipped** | Optional; use Pages path first |
| WhatsApp number | **Not done** | `index.html` → `whatsappNumber` |
| Live form test | **Blocked** | Needs Supabase SQL + GitHub secrets |

## Fastest path to live (no Netlify CLI)

1. Supabase: run `001` + `002` migrations.
2. Copy `config.example.js` → `config.js`, add **Project URL** + **anon** key.
3. GitHub repo → **Settings → Pages → Source: GitHub Actions**.
4. Push latest `main` → site at `https://dr-kersho.github.io/inlinead-website/`.

## Preferred production path

Netlify import from GitHub + service-role env vars (keeps secret off the browser).

See [DEPLOY-ASSIST.md](./DEPLOY-ASSIST.md).
