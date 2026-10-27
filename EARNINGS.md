# EARNINGS.md — How this clone can make money

**Date:** 2026-10-27 · **Scope:** one page, honest, no income promises.

## 1. How the original Tally makes money
Tally is freemium. The **Free** plan is genuinely unlimited — unlimited forms, unlimited submissions, logic, integrations — so anyone can adopt it with zero friction. Revenue comes from the small share of users who need professional polish:
- **Pro — $29/mo** ($24/mo billed annually): remove the "Made with Tally" badge, custom domains, team collaboration, partial submissions, advanced customization + custom CSS, analytics, version history.
- **Business — $79/mo** ($74/mo billed annually): everything in Pro + data-retention control, email verification, 90-day version history.
- **The viral loop:** every free form carries a "Made with Tally" badge linking back to tally.so. Founder-reported, ~40% of new signups arrive through that badge. Free users are the marketing.
- **Result (founder-reported, Sept 2026):** $6M ARR / $501K MRR, 2.5M users — roughly a 1–2% paid conversion on a huge free base. Bootstrapped by 2 founders, no VC.

## 2. How THIS clone can make money with the same model
Same freemium shape, adapted to a browser-only build:
- **Keep free forever:** unlimited forms and submissions (localStorage), all block types, templates, publish + share links. Free is the funnel — never charge for the core.
- **Charge for the Pro tier ($29/mo target):** remove the "Made with Tally" badge, custom domain support, team workspaces, file-upload size limits lifted, form analytics (visits/drop-off), version history. These are the exact features the original charges for, and they are the ones serious users will pay for.
- **Charge for the Business tier ($79/mo target):** data-retention controls, email verification, longer history, priority support.
- **The badge loop works on the clone too:** every free published form shows "Made with Tally — create your own free form" linking to the clone's homepage. Each respondent is a potential signup. This is the cheapest distribution there is — no ads, no cold outreach.
- **What stays free by design:** the editor, publishing, inbox, templates, CSV export. If the free tier feels crippled, the loop dies.

## 3. What is still missing before it can earn a single rupee
Be blunt: **this build earns nothing on day one.** It is a working website + browser form builder, not a business yet. Missing pieces, in order:
1. **User accounts** — today forms live in one browser's localStorage; there is no signup, no login, no cross-device access. Needed: auth + a server database (e.g. Supabase/Firebase or a small backend).
2. **Payments** — no checkout exists. Needed: Stripe or Paddle (Paddle handles tax/VAT and works better for Pakistan-based sellers; Stripe needs a supported-country entity). Plus a billing page, invoices, and dunning for failed cards.
3. **Usage limits & plan enforcement** — free vs Pro must be enforced server-side (badge removal, upload limits, team seats), otherwise anyone can bypass it in the browser.
4. **Terms of Service + Privacy Policy** — required before taking money or storing other people's form responses; must cover data ownership, retention, and GDPR-style commitments.
5. **Abuse & spam controls** — rate limits, CAPTCHA on public forms, storage quotas, moderation. Free unlimited submissions attract bots.
6. **Support + reliability** — uptime, backups, a way for paying users to reach a human. A paid product with no support refunds fast.
7. **Legal identity** — a registered business entity and a bank/payment account that can receive payouts. (For Zohaib: Pakistan-based payout routes need checking — Paddle pays via PayPal/bank; Stripe is not available for Pakistan-registered businesses.)

## 4. Realistic path & timeline (no income promises)
- **Weeks 1–4 — users first:** ship the clone, list it in free directories (see backlinks.md), share in form-builder/template communities. Goal: real people creating and sharing forms. Measure: forms created, published links clicked, badge click-throughs. Target: 100+ active forms.
- **Months 2–3 — prove retention:** add accounts + cloud storage so forms survive across devices (the single biggest reason users stay). Add email notifications for new submissions. Goal: users returning weekly.
- **Months 3–4 — first paid tier:** add Stripe/Paddle checkout for Pro ($29/mo). Start with badge removal + custom domains only — the two features with the clearest willingness to pay. Goal: first 10 paying users.
- **Months 4–6 — grow the loop:** analytics, teams, templates marketplace. Each free form keeps advertising the product. If conversion matches the original's ~1–2%, 1,000 active users ≈ 10–20 paying users ≈ $290–580/mo.
- **Honest expectation:** a clone earns nothing on day one, and most clones never earn. The original took years and 2.5M users to reach $501K MRR. The realistic win is a working product with real users first; revenue follows retention, not launch day.
