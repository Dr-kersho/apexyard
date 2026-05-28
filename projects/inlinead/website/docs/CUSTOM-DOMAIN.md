# Custom domain — www.inlinead.eg

**Status:** `inlinead.eg` currently returns **NXDOMAIN** (domain not registered in DNS).  
Use **https://dr-kersho.github.io/inlinead-website/** until the domain is bought and DNS is set.

When ready, the public share link should be **https://www.inlinead.eg**.

## 1. Register the domain

Buy `inlinead.eg` from an `.eg` registrar (e.g. via [egregistry.eg](https://egregistry.eg) / accredited providers).

## 2. DNS (at your domain registrar)

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `dr-kersho.github.io` |

Optional apex `inlinead.eg` → redirect to `www` (registrar redirect or A records per [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

## GitHub

1. Repo **Settings → Pages → Custom domain** → enter `www.inlinead.eg`
2. Enable **Enforce HTTPS** when available (after DNS propagates, ~24h max).

The repo includes a `CNAME` file so Pages keeps the domain on deploy.

## Until DNS is live

Temporary URL: https://dr-kersho.github.io/inlinead-website/

After DNS: **https://www.inlinead.eg**
