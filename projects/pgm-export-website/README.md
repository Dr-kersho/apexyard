# PGM Export Website

**Source repo:** [github.com/Dr-kersho/pgm-export-website](https://github.com/Dr-kersho/pgm-export-website)

Public marketing / export presence site — **separate from** [XPORT-CRM](../xport-crm/README.md) (the sales CRM app).

## Relationship to XPORT-CRM

| Project | Role |
|---------|------|
| **pgm-export-website** | Brand site, product story, lead capture, SEO |
| **xport-crm** | Internal CRM — pipeline, calls, WhatsApp outreach |

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- Local dev: **http://localhost:3020**

## Canonical docs (in app repo)

| Doc | Path (once repo exists) |
|-----|-------------------------|
| Domain language | `CONTEXT.md` |
| Design | `DESIGN.md` |
| Agent notes | `CLAUDE.md` |

## ApexYard docs here

Roadmap and portfolio notes: `projects/pgm-export-website/`. Implementation truth is the **pgm-export-website** git repo.

## Local clone

From the ops repo root:

```bash
ln -sf "/Users/apple/Documents/PGM export website" workspace/pgm-export-website
```

Or after GitHub repo exists:

```bash
git clone git@github.com:Dr-kersho/pgm-export-website.git workspace/pgm-export-website
```

## Ticket prefix

GitHub Issues — **#N**. Branches: `feature/#N-short-description`.

## Status (2026-05-21)

Scaffold shipped — home, products, markets, process, contact sections. Next: real brand assets + Vercel staging.
