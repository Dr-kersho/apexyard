# PGM Export Website — Roadmap

**Registry:** `pgm-export-website` | **Repo:** Dr-kersho/pgm-export-website | **Status:** pre-launch (feature branch)

## Now (P0)

1. ~~Scaffold Next.js 14 marketing site (port 3020)~~ — done 2026-05-21
2. ~~Full route set + commercial offer data layer~~ — done (handoff 2026-05-21)
3. ~~Commit + push~~ `feature/GH-1-offer-website` — done 2026-05-25
4. ~~Vercel staging~~ — https://pgm-export-website.vercel.app
5. ~~Season offer PDF download (`PGM-EXP-2026-SA`)~~ — ~4 MB; Ghostscript compress optional

## Next (P1) — KSA buyer lens

- ~~Arabic / RTL v1~~ — `/ar`, `/ar/export`, `/ar/contact`, `/ar/products` + EN|AR switcher (2026-05-25); refine copy with PGM-approved Arabic terms
- **Resend on Vercel** — live quote submit ([docs/vercel-env-setup.md](https://github.com/Dr-kersho/pgm-export-website/blob/main/docs/vercel-env-setup.md) in app repo)
- Real PGM photography + logo — drop files in `public/brand/` per README
- SEO baseline (metadata done; sitemap + structured data)
- Analytics + consent (see apexyard AgDR-0004 pattern)

## Later (P2)

- Lead capture form → CRM handoff (AgDR before XPORT-CRM integration)
- Content CMS or markdown-based pages
- Arabic product detail pages + Arabic offer PDF
- Production domain `pgmexport.com` cutover

## Docs

| Doc | Path |
|-----|------|
| Arabic/RTL PRD | `projects/pgm-export-website/prd-arabic-rtl.md` |
| PDF offer PRD | `projects/pgm-export-website/prd-pdf-offer-download.md` |
