---
target: projects/ahmedportfolio/portfolio.html
total_score: 31
p0_count: 0
p1_count: 1
timestamp: 2026-06-12T17-54-56Z
slug: projects-ahmedportfolio-portfolio-html
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Telegram CTA click has no confirmation; external handoff is invisible |
| 2 | Match System / Real World | 4 | Direct copy, domain language fits; "case files" metaphor earns its use |
| 3 | User Control and Freedom | 3 | Linear scroll only; keyboard users must tab entire page; no anchor nav |
| 4 | Consistency and Standards | 4 | Green accent applied consistently; visual system is internally coherent |
| 5 | Error Prevention | 3 | No forms; Telegram link is the only action. Low error surface, well handled |
| 6 | Recognition Rather Than Recall | 4 | Everything visible; no hidden menus, no cognitive overhead |
| 7 | Flexibility and Efficiency | 2 | No anchor nav, no skip-to-contact; entire page must be scrolled |
| 8 | Aesthetic and Minimalist Design | 3 | Clean system; CTA button wraps to 3 lines on mobile, undermining the most important element |
| 9 | Error Recovery | 3 | No forms; adequate for this surface |
| 10 | Help and Documentation | 2 | No indication of what happens after Telegram click; no alternative contact; no price signal |
| **Total** | | **31/40** | **Good — address weak areas** |

---

## Anti-Patterns Verdict

**Does this look AI-generated?**

**LLM assessment**: Mostly no. The forest green accent is genuinely distinctive — not blue, not purple, not the developer-default palette. No numbered section markers, no side-stripe borders, no identical card grids, no uppercase eyebrows on every section. The combination of a variable-weight single-family serif with a dark CTA block and clean ruled case file list is unusual enough to survive the slop test visually. The one clear tell that remains lives in the copy: 10 em-dashes used as sentence connectors throughout, which is the most reliable single signal of AI-generated body text. The h1 also still has one: "I build the software that runs your sales — solo, end to end."

**Deterministic scan (4 findings):**

- **bounce-easing ×2** (lines 394, 407): `cubic-bezier(.34, 1.35, .64, 1)` on `.snap-up` and `cubic-bezier(.34, 1.2, .64, 1)` on `.card-in`. Both Y control points exceed 1.0, producing a subtle spring overshoot. The detector correctly flags these as bounce/elastic — the impeccable reference explicitly bans them ("feel dated"). These were intentional "spring" animations but crossed the line. Replace with `cubic-bezier(.16, 1, .3, 1)` (ease-out-expo) for both.
- **em-dash overuse ×10** (body text): 10 em-dashes across copy. LLM assessment agrees — this is the strongest remaining AI tell.
- **dark-glow ×1** (line 272): `.cta-link:hover` applies `box-shadow: 0 6px 20px rgba(26,107,60,.4)` — a colored glow on a dark background. Both assessments flagged this independently. Remove the box-shadow; the color change and translateY(-2px) carry the hover state adequately.

No false positives identified.

**Browser visualization**: Not available in this environment (no browser automation). CLI scan is the primary deterministic signal.

---

## Overall Impression

The page has earned a real aesthetic identity — the green accent, the bold display h1, the dark CTA block, and the editorial ruled case file list all feel like deliberate choices rather than defaults. The conversion architecture is solid: problem statement, proof, rationale, ask. The cognitive load is genuinely low.

The single biggest opportunity is the CTA button on mobile. The entire page builds emotional momentum toward "Message me on Telegram → @BuildwithAhmed" and then that string wraps across three lines, producing a tall, awkward button at the one moment the visitor decides whether to contact Ahmed. Per the peak-end rule, the last experience they have disproportionately shapes the memory of the whole page. Fix this first.

---

## What's Working

1. **Forest green is the right accent for this brief.** Not blue. Not purple. Not the developer-brand default. Green reads as business, money, growth — exactly the register for someone pitching to Gulf sales teams. Combined with the single-family serif, it doesn't read as a template.

2. **The case files section is the strongest conversion asset on the page.** Six real systems with specific problems and specific solutions. The "Built solo" stamp and the honest note about screenshots ("my clients' tools are their competitive edge") builds more trust than screenshots would. This is where the page earns credibility.

3. **The h1 animation sets the register immediately.** At clamp(2.8rem, 8vw, 5rem) / weight 800, each word entering in sequence is a display moment that communicates scale and confidence before the visitor reads a word.

---

## Priority Issues

**[P1] CTA button text wraps to 3 lines on mobile**

- What: `.cta-link` text "Message me on Telegram → @BuildwithAhmed" wraps to three lines at ~375px viewport width. The button becomes a tall awkward block at the conversion moment.
- Why it matters: Likely 60-70% of traffic from Telegram referrals arrives on mobile. Per the peak-end rule, the last experience on the page is disproportionately what the visitor remembers. A broken-looking button at the emotional peak undoes everything above it.
- Fix: Shorten button label. "Message Ahmed on Telegram" fits on one line at 375px. Move "@BuildwithAhmed" to a separate line of text below the button, outside the link element, as a handle reference: `<p class="cta-handle">@BuildwithAhmed</p>`
- **`/impeccable adapt`** — responsive fix

**[P2] Bounce-easing on snap-up and card-in animations**

- What: `.snap-up` uses `cubic-bezier(.34, 1.35, .64, 1)` and `.card-in` uses `cubic-bezier(.34, 1.2, .64, 1)`. Both Y values exceed 1.0, creating a spring overshoot. The impeccable reference explicitly bans bounce and elastic easing as feeling dated.
- Why it matters: These are used on every service item and every case file card — the most frequently triggered animation on the page. The overshoot subtly undermines the otherwise clean motion system.
- Fix: Replace both with `cubic-bezier(.16, 1, .3, 1)` (ease-out-expo). The entry will still feel fast and decisive without the overshoot.
- **`/impeccable animate`** — easing fix

**[P2] 10 em-dashes — strongest remaining AI tell in the copy**

- What: 10 instances of — in body copy, across h1, intro, service descriptions, case file body, and CTA paragraph. Used as sentence connectors throughout.
- Why it matters: Em-dashes as connectors are the most reliable single signal that copy was generated by an AI. A Gulf business owner won't consciously clock it, but the cumulative effect makes the copy feel less personal and more templated.
- Fix: Replace with commas, colons, or periods throughout. The h1 ("...your sales — solo, end to end.") becomes "...your sales. Solo, end to end." which is actually stronger as a declaration.
- **`/impeccable clarify`** — copy pass

**[P2] No anchor navigation — page is linear-only**

- What: No `<nav>` with anchor links in the header topline. Keyboard users and impatient decision-makers must scroll or tab through the entire page to reach the CTA.
- Why it matters: A business owner referred to Ahmed via Telegram may just want to jump to proof of work or to contact. Forcing them through the full scroll adds friction.
- Fix: Add 2 anchor links to the topline: `<a href="#work">Work</a>` and `<a href="#contact">Contact</a>`. Minimal, doesn't clutter the header.
- **`/impeccable adapt`** — UX fix

**[P3] Green glow on CTA button hover**

- What: `.cta-link:hover` applies `box-shadow: 0 6px 20px rgba(26,107,60,.4)` — a colored glow. The detector flags this pattern (dark-mode colored glow) as an AI tell.
- Why it matters: The CTA block is already dark; a colored glow adds visual noise without meaning. The button communicates itself through the green background change and the `translateY(-2px)` lift.
- Fix: Remove `box-shadow` from `.cta-link:hover`. Keep the transform.
- **`/impeccable polish`** — one-line fix

---

## Persona Red Flags

**Jordan (First-Timer)** — lands from a Telegram link, unfamiliar with Ahmed:

- Reads h1, impressed. Scrolls down. Reads case files — credible, builds trust.
- Reaches "Why my prices work" — wants prices, doesn't see any. Wonders if this is in budget.
- Reaches CTA on mobile — button wraps to three lines. Hesitates: is this a real button? Taps it — Telegram opens. OK.
- **Red flag**: No price signal anywhere. Jordan doesn't know if they can afford Ahmed before contacting him. This raises the friction of first contact for budget-conscious visitors.
- **Red flag**: Three-line button looks broken. First-timers treat broken-looking UI as untrustworthy UI.

**Casey (Distracted Mobile User)** — phone one-handed, scrolling fast:

- Notices floating green Telegram button immediately — accessible, in thumb zone. Good.
- Skims h3s in case files (too much text to read on the move).
- Hits CTA section — two green CTAs in view simultaneously (floating button + CTA block button). Which one is primary? Slight confusion.
- Taps the block button — it's three lines tall and awkward, but it works.
- **Red flag**: Dual green CTAs at page bottom with no visual hierarchy between them. The float button is always visible; when the CTA block scrolls into view, they compete.
- **Red flag**: No way to jump to "Work" or "Contact" without scrolling — Casey returns after an interruption with no orientation landmarks.

**Sam (Accessibility-Dependent User)** — keyboard/screen reader:

- Tabs through: topline Telegram link → float-cta button (DOM order puts it after main, correct) → h1 (non-interactive) → ... → close section CTA link.
- `aria-hidden="true"` on the SVG icon in float-cta: correct.
- `aria-label="Message Ahmed on Telegram"` on float-cta: good.
- The `.cta-arrow` span in the main CTA link is `aria-hidden="true"`: correct.
- But the link text reads "Message me on Telegram @BuildwithAhmed" — the "@BuildwithAhmed" username appended directly creates odd screen reader pronunciation.
- **Red flag**: No skip-to-main-content link at the top of the document. Keyboard users must tab through the header before reaching the page content.
- **Red flag**: `font-variation-settings: "opsz" 12` on `.cta-link` at rendered ~1rem size is inconsistent optical sizing.
- **Green flag**: `prefers-reduced-motion` is handled correctly throughout. Animations are gated; the page is fully usable without motion.

---

## Minor Observations

1. The `→` in the CTA button link is a Unicode arrow character in the DOM, not `aria-hidden`. The `.cta-arrow` span wrapping it is `aria-hidden="true"` — this is correct, screen readers skip it.
2. The "Also built: Telegram bots..." paragraph uses inline styles (`color:var(--ink-2);font-size:.95rem;margin-top:1.6rem`) — minor code hygiene, should be a class.
3. Footer `font-size: .83rem` (~13.3px) may be marginal on mobile for low-vision users. Consider `.85rem` minimum.
4. The `opsz` values on some elements: `.cta-link` and `.float-cta` use `"opsz" 12` for text rendered at ~16px. Optical sizing of 12 applies small-text hinting to display-sized text. Set to match rendered size or omit.
5. Gap between "Why my prices work" section end and the `.close` dark block is generous but may read as page end on first scroll — the vertical breathing room is high. Acceptable, not a problem.
