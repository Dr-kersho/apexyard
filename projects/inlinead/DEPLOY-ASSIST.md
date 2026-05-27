# INLINE AD — your assist (5 minutes)

Repo is live: **https://github.com/Dr-kersho/inlinead-website**

## 1. Supabase (you)

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) → **New project** (name: `inlinead`, region closest to Egypt).
2. **SQL Editor** → New query → paste contents of  
   `workspace/inlinead-website/supabase/migrations/001_leads.sql` → **Run**.
3. **Settings → API** → copy:
   - Project URL → `SUPABASE_URL`
   - `service_role` key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## 2a. GitHub Pages (fastest — no Netlify CLI)

1. Run SQL **`002_leads_anon_insert.sql`** after `001` (in repo `supabase/migrations/`).
2. GitHub repo → **Settings → Secrets and variables → Actions** → add:
   - `SUPABASE_URL` (project URL)
   - `SUPABASE_ANON_KEY` (anon public key — not service_role)
3. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Push `main` → live at `https://dr-kersho.github.io/inlinead-website/`

## 2b. Netlify (production — hides service role)

1. [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub → **inlinead-website**.
2. Build settings (should auto-detect):
   - Base directory: *(leave empty)*
   - Build command: *(empty — static site)*
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
3. **Site configuration → Environment variables** → add:

   | Key | Value |
   |-----|--------|
   | `SUPABASE_URL` | from step 1 |
   | `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
   | `SALES_EMAIL` | your inbox (optional) |

4. **Deploy site**. Note the `*.netlify.app` URL.

## 3. WhatsApp (you)

Edit in GitHub or locally `index.html`:

```javascript
window.INLINEAD = {
  submitUrl: '/.netlify/functions/submit-lead',
  whatsappNumber: '201XXXXXXXXX'  // your number, no +
};
```

Commit + push → Netlify redeploys.

## 4. Verify (together)

- Open live URL → submit **brand** form → Supabase **Table Editor → leads** has a row.
- Submit **gym** form → second row with `lead_type = gym`.

## Optional later

- Custom domain `inlinead.eg` in Netlify DNS
- Resend email alerts (`RESEND_API_KEY`, `RESEND_FROM` in Netlify env)

When step 1–2 are done, tell the agent your **Netlify site URL** (and confirm Supabase is wired) for a live form test.
