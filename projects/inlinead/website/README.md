# INLINE AD — marketing site

Static landing page (brands + gyms), deployed on **Netlify** with a serverless lead handler and **Supabase** storage.

## Local preview (UI only)

```bash
cd projects/inlinead/website
python3 -m http.server 8787
# open http://localhost:8787
```

Forms need Netlify Functions to save leads:

```bash
npm i -g netlify-cli   # once
netlify dev            # http://localhost:8888
```

## Deploy to Netlify

1. Create a new site → **Deploy from Git** or drag-drop this `website/` folder.
2. Build settings: publish directory = `.` (root of this folder), functions = `netlify/functions`.
3. Run SQL in Supabase: [`../supabase/migrations/001_leads.sql`](../supabase/migrations/001_leads.sql).
4. Set environment variables (see [`.env.example`](./.env.example)):
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (required for forms)
   - `SALES_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM` (optional email alerts)
5. Edit `index.html` config:

```html
<script>
window.INLINEAD = {
  submitUrl: '/.netlify/functions/submit-lead',
  whatsappNumber: '201XXXXXXXXX'
};
</script>
```

6. Point domain (e.g. `inlinead.eg`) in Netlify DNS.

## View leads

Supabase → Table Editor → `leads`, or SQL:

```sql
select created_at, lead_type, status, payload->>'company' as brand, payload->>'gym' as gym
from leads order by created_at desc;
```

## Files

| Path | Role |
|------|------|
| `index.html` | Landing page |
| `privacy.html` | Privacy stub |
| `assets/js/` | i18n, forms, init |
| `netlify/functions/submit-lead.js` | Validate + insert + optional email |

Design preview (non-production): [`../design-preview/inlinead-landing.html`](../design-preview/inlinead-landing.html)
