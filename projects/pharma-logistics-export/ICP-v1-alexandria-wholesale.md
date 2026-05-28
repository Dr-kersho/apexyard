# PharmaConnect — ICP v1 & GTM (Alexandria · premium fulfillment)

**Status:** Approved direction · **Mode A** (full venture + software)  
**Backlog:** IDEA-002 · **Repo:** [PHARMA-LOGISTICS-EXPORT-COMPANY](https://github.com/Dr-kersho/PHARMA-LOGISTICS-EXPORT-COMPANY)  

**Warehouse:** [Location](https://maps.app.goo.gl/bHDgZDxPwovikSQ49) (~600m², truck-friendly) — **you own inventory & fulfillment** (Amazon-style hub, single seller)  
**Launch market:** **Alexandria governorate only** — no expansion until product owner changes scope  
**ICP v1:** **Licensed pharmacies** in Alexandria · **Premium** ordering experience  

---

## 1. Business model (locked)

```
[Your warehouse] = fulfillment center (you hold stock)
[App + WhatsApp] = premium storefront
[Pharmacy]       = B2B customer
```

- You buy and sell from **your** inventory (not a marketplace).
- **Out of plan permanently:** third-party sellers, manufacturers stocking in your warehouse (FBA-style), marketplace fees. Do not spec or roadmap.

---

## 2. Premium positioning & minimum order

| Rule | Value | Why |
|------|-------|-----|
| **Minimum order** | **1,000 EGP** from day one | Premium floor; better unit economics per stop |
| **Payment** | **Cash on delivery (COD) only** — no credit in v1 | No receivables risk at launch |
| **Delivery waves** | **1:00 PM · 4:00 PM · 9:00 PM** daily | Batch pick/pack; cut-off before each wave (ops to confirm) |
| **Brand** | Premium app | Better UX, reliable waves, trust, assortment — not “cheapest wholesaler” |
| **Delivery pricing** | **50 EGP per order** on invoice (locked for feasibility; **verify at launch**) | Included in COD total; not free delivery |

Checkout **blocks below 1,000 EGP** (GH-0004). Payment method: **COD only**.

**What premium means in practice (not logo only):**

- Confirmed stock on catalog (“available now”)  
- Delivery window / ETA on WhatsApp  
- **Delivery fee line on invoice** — part of total due at COD  
- Never “free delivery” promos  
- GDP traceability, clean invoices  
- Curated hero availability (50-SKU program)  
- Named support — not anonymous digital-only distributor  

---

## 3. Market average (still the commercial logic)

| Signal | Implication |
|--------|-------------|
| National ~80k registered pharmacies (sector est.); Alex **~4,722** general pharmacies (health directorate) | **No commercial directory counts** — SAM from field + licenses |
| 50% / 50% wallet | Grow share to 65–70% over 12 months |
| Others cheaper, fewer SKUs | Win on **assortment + availability + service** |
| No room for 5% everywhere | Hero subsidy only, capped |
| SKU not available | Fill rate on heroes before more discount |
| Fear of digital distributors | **Physical Alex warehouse + people**; app is channel |

**AR:** تطبيق بريميوم — حد ١,٠٠٠ جنيه، COD، موجات ١م / ٤م / ٩م، رسوم التوصيل في الفاتورة.  
**EN:** Premium Alexandria supply — 1,000 EGP min, COD only, waves 1pm / 4pm / 9pm, delivery on invoice, owned warehouse.

**Research (2026-05-26):** Full market data + CSV exports — [`MARKET-RESEARCH-2026-05-26.md`](./MARKET-RESEARCH-2026-05-26.md) · [`data/market-variables-master.csv`](./data/market-variables-master.csv)  
**Operations feasibility (payroll / fleet / break-even):** [`FEASIBILITY-OPERATIONS-2026.md`](./FEASIBILITY-OPERATIONS-2026.md)

---

## 4. Who we sell to

### In scope (v1)

- **Licensed pharmacies** in Alexandria governorate  
- Orders ≥ **1,000 EGP** · **COD** · wave **1pm / 4pm / 9pm** · delivery fee on invoice  

### Out of scope (v1)

- Other governorates (until scope change)  
- Unlicensed buyers  
- **Marketplace / multi-seller / FBA** (removed from plan — not deferred)  
- Competing on “lowest price in Egypt”  

### Optional later (only if owner adds)

- Manual exceptions via admin — not default GTM  

---

## 4b. Export Wave 1 — Libya & Sudan (locked)

| Rule | Detail |
|------|--------|
| **Markets** | **Libya** and **Sudan** only for first export wave |
| **Priority** | **Parallel** — **whoever buys first** (first qualified importer in either country) |
| **Not** | Libya-before-Sudan sequencing; not waiting for domestic “perfection” beyond G1 gates |
| **Ops** | Country registration + buyer outreach in parallel; first closed deal triggers first USD shipment |
| **Software** | Export module later (Phase 2–3); first deals **offline** (registration manager + export manager) |

**Why these two:** CAPMAS — Egypt’s largest Africa export corridors; Alexandria warehouse proximity (Libya); historic Egypt–Sudan pharma supply.

**Country dossiers (operational):**

| Country | File |
|---------|------|
| Index + buyer scorecard | [export-dossiers/README.md](./export-dossiers/README.md) |
| Libya | [export-dossiers/export-dossier-libya.md](./export-dossiers/export-dossier-libya.md) |
| Sudan | [export-dossiers/export-dossier-sudan.md](./export-dossiers/export-dossier-sudan.md) |
| CSV | [data/export-target-countries.csv](./data/export-target-countries.csv) |

---

## 5. Commercial wedge — 50 hero SKUs (12 months)

| Rule | Detail |
|------|--------|
| Selection | Top movers from 10–15 **pharmacy** interviews in Alexandria |
| Fill rate | ≥95% on heroes before deepening subsidy |
| Discount | Targeted heroes only; not basket-wide 5% |
| Basket | Subsidy only if **≥3 non-hero lines** + order ≥1,000 EGP · COD |
| Budget | **100,000 EGP/mo max margin give-up** on heroes (not opex); weekly burn review |
| Taper | Month 13+ reduce hero subsidy; retain on service + fill |

---

## 6. Trust (vs “digital distributor”)

| Fear | Response |
|------|----------|
| Unknown supplier | Visit warehouse; legal entity; premium = accountable |
| Quality / expiry | GDP, batches, CoA |
| Collection | Clear payment terms; credit only after track record |
| Relationship | Rep + driver; WhatsApp for status |

---

## 7. Software MVP (Alexandria · premium pharmacy)

| Priority | Capability | GH | Notes |
|----------|------------|-----|-------|
| P0 | Pharmacy onboarding | 0002 | EDA license verify |
| P0 | Catalog + stock truth | 0003 | Available / backorder |
| P0 | Cart + checkout | 0004 | **Min 1,000 EGP** · wave select · COD |
| P0 | Hero subsidy engine v0 | New | Alex zone, caps, burn dashboard |
| P0 | Warehouse ops | 0006 | Pick/pack, expiry, cold chain |
| P1 | Delivery + POD | 0007 | Dense Alex routes |
| Defer | Credit v1 | 0008 | **Not v1** — COD only |
| P2 | Full pricing tiers | 0005 | After pilot data |
| **Excluded** | Marketplace, FBA, 3P inventory | — | **Not in roadmap** |

---

## 8. Metrics

| Metric | Month 3 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Active pharmacies (Alex) | 40 | 120 | 300 |
| Avg order value | ≥900 EGP | ≥1,000 | ≥1,100 |
| 30-day repeat rate | 40% | 55% | 65% |
| Hero fill rate | 93% | 95% | 96% |
| Orders below 1,000 EGP | 0% | 0% | 0% |
| COD collection rate | 100% target | 100% | 100% |

---

## 9. Anti-scope (do not build or pitch)

- Multi-vendor marketplace  
- Manufacturer/distributor stock-in-warehouse (FBA)  
- National rollout before Alex works  
- Permanent 5% off entire catalog  
- “Cheapest app” positioning  
- **Free delivery** or “free delivery over X EGP” promos  

---

## 10. Decisions log

| Date | Decision |
|------|----------|
| 2026-05-26 | Mode A; 50 hero SKUs subsidized (capped), 12 months |
| 2026-05-26 | Alexandria only until changed |
| 2026-05-26 | Owned warehouse / Amazon-style fulfillment, **single seller** |
| 2026-05-26 | **Premium app** · **no Marketplace / FBA** · **no free delivery** |
| 2026-05-27 | **1,000 EGP min · COD only · waves 1pm / 4pm / 9pm** |
| 2026-05-27 | **Delivery fee included on invoice** (in COD total) |
| 2026-05-27 | **Hero margin cap 100k EGP/mo** (grill Q9 — B) |
| 2026-05-27 | **Delivery fee 50 EGP/order** (grill Q10 — B; verify at launch) |
| 2026-05-27 | **Export: Libya + Sudan parallel — first qualified buyer first shipment** |
| 2026-05-27 | No pharmacy counts from commercial directories |

---

*Owner: Product · Research · PRD GH-0001 full vision; this doc governs Phase 1 build.*
