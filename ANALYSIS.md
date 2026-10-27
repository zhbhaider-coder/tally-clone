# Tally (tally.so) — Deep Analysis

**Date:** 2026-10-27 · **Analyst:** Muse (builder subagent) · **Method:** live fetch of tally.so homepage, /pricing, /templates + curl timing/headers. All facts below were observed on 2026-10-27 ~01:00 PKT unless marked founder-reported.

## 1. What Tally is
A free, Notion-style form builder from Ghent, Belgium. Founders: Marie Martens & Filip Minev (2 co-founders, bootstrapped, no outside investment, team of ~10). Tagline: *"The simplest way to create forms."*

**Verified numbers (founder-reported, Sept 2026):** $6M ARR / $501K MRR, 2.5M users. Older reports put it at $2.1–3M ARR (2024–2025) — growth is real and recent.

## 2. Site structure
- `/` — homepage (landing, all sections below)
- `/pricing` — pricing tiers + FAQ
- `/templates` — 100+ community templates gallery, filterable by category (Creators / Product / Marketing / HR / Office / Personal), each showing author + usage count (top: Registration Form 113,969 uses; Contact Form 104,146)
- `/r/<id>` — hosted public form pages (shareable links)
- App (login-gated): form editor, submission inbox, workspaces
- Also: `/videos/demo/*` demo clips, `/images/demo/v2/*` illustration set, `tally.so/widgets/embed.js` embed script, `apply.tally.so` template-submission form, comparison guides (vs Typeform / Jotform / Paperform), GDPR page.

## 3. Homepage sections (in order)
1. **Hero** — "The simplest way to create forms", subhead "Say goodbye to boring forms and surveys…", CTA "Create a form", "No signup required", floating-faces illustration.
2. **A form builder like no other** — Unlimited forms & submissions free (fair-use); Just start typing (works like a text doc); Privacy-friendly (GDPR, hosted in Europe, no cookie tracking, encrypted in transit + at rest).
3. **Simple but powerful** — Build any form in seconds: input blocks — contact info, payments, signatures, rate & rank, file uploads, date & time.
4. **Craft intelligent forms** — Conditional logic, Calculator, Hidden fields (UTM/prefill via URL params), Answer piping, Email notifications, Redirect on completion, Pre-populate fields, reCAPTCHA, Partial submissions.
5. **Make forms uniquely yours** — themes, custom colors/fonts/buttons, column layout, custom CSS, images/logo/cover, embeds (YouTube, Calendly, Maps), multi-page forms, 50+ languages.
6. **Share with your audience** — Embed (WordPress/Webflow/Framer/Notion), Popup, Tally links (`tally.so/r/…`), Custom domains (`forms.yourdomain.com/feedback`).
7. **Connect your favorite tools** — Notion, Airtable, Webhooks, Slack, Coda, Google Analytics, Meta Pixel, Zapier, Make, Pipedream (+ thousands via automation tools).
8. **Designed for you** — use cases by audience: Creators (sell products, newsletter, contact), Product (feedback, feature requests, user research), Marketing (leads, registration, CSAT), HR (engagement, job applications, exit surveys), Office (events, help desk, suggestions), Personal (quiz, RSVP, volunteer signup).
9. **Testimonials** — Ben Lang (angel investor, ex-Notion), Natan Castiel (Head of Growth, Gelt), Steven Tey (founder Dub.co, ex-Vercel), Jac, Shyam Verma.
10. **Final CTA** — "Build stunning forms for free — you don't even need an account to try it out!"
11. **FAQ** — Is Tally really free? Are forms secure? How does it compare? How do I get started?

## 4. Exact feature list
- **Editor:** Notion-style block editor — type on a blank page, `/` slash commands to insert blocks, drag to reorder.
- **Block types:** short text, long text, multiple choice, checkboxes, dropdown, email, number, date & time, rating/scale/ranking, file upload, signature, payment, address, phone, link, heading, text, image, video/embed, divider, page break, calculator.
- **Smart features:** conditional logic & branching, calculator/variables, hidden fields, answer piping, pre-populate via URL, email notifications (self + respondents), redirect on completion, partial submissions, duplicate-submission prevention, password protection, close on limit/date, reCAPTCHA.
- **Design:** themes, custom colors/fonts/buttons, custom CSS, logo/cover images, column layout, multi-page forms, 50+ languages + RTL.
- **Sharing:** hosted form pages, shareable links, embed, popup, custom domains.
- **Inbox:** submission inbox, CSV export, analytics (visits, duration, traffic sources, drop-off).
- **Integrations:** Notion, Airtable, Google Sheets, Slack, Webhooks, Zapier, Make, Pipedream, Coda, Google Analytics, Meta Pixel.
- **Teams:** workspaces & folders, unlimited team members (Pro), version history (30d Pro / 90d Business), data-retention control (Business), email verification (Business).

## 5. Pricing (verified live on /pricing, 2026-10-27)
The live page shows **annual-billing prices** with "2 months off"; monthly prices are $29 / $79 (per the shortlist and the standard $24×12/10 math — $24/mo annual = $288/yr vs $29×12 = $348).

| Plan | Monthly | Annual (per mo) | Headline features |
|---|---|---|---|
| **Free** | $0 | $0 | Unlimited forms & submissions, payments, signatures, file uploads, custom Thank You page, self email notifications, redirect on completion, conditional logic & calculations, duplicate prevention, password protection, close on limit/date, answer piping, 45+ languages & RTL, Google Sheets/Notion/Airtable/Zapier/Make/Webhooks |
| **Pro** | **$29** | **$24** | Everything in Free + remove Tally branding, custom domains, collaboration (unlimited team members), partial submissions, advanced customization + custom CSS, respondent email notifications, custom email domains, custom link preview (OG image/favicon), workspaces & folders, unlimited uploads (no 10 MB/file limit), visit & drop-off analytics, version history 30 days, premium integrations (GA, Meta Pixel) |
| **Business** | **$79** | **$74** | Everything in Pro + control data retention, verify emails, version history 90 days |

## 6. CTAs & conversion flow
- Primary CTA everywhere: "Create a form — it's free". **No signup required to start** — the editor opens immediately; account creation comes later (after value is delivered). This is the core conversion trick: zero-friction trial.
- Secondary: "Browse templates" → gallery → "Use template" → editor.
- Free plan is genuinely generous (unlimited everything), so the funnel is volume-first: get millions of free users, convert the small % who need branding removal, domains, teams or analytics.

## 7. The viral badge loop
- Every form on the **Free** plan carries a **"Made with Tally"** badge linking back to tally.so.
- Free users share their forms with respondents (often hundreds per form) — each respondent sees the badge. Founder-reported: **~40% of new signups come via the badge**.
- Removing the badge is the #1 Pro selling point ($29/mo) — the loop monetizes exactly the users who outgrow the free tier, while the rest keep advertising the product for free.
- The clone reproduces this: free published forms show a "Made with Tally" badge linking to the clone's homepage.

## 8. Tech signals
- **Framework:** Next.js (x-powered-by: Next.js, `_next/static/chunks/*` in HTML) + React, served behind Cloudflare (Server: cloudflare, CF-Ray, CF-Cache-Status: DYNAMIC).
- Form assets hosted on Google Cloud Storage (`storage.googleapis.com/tally-block-assets`, `storage.tally.so`).
- Embeddable via `tally.so/widgets/embed.js`.
- No heavy client-side app on the marketing pages — mostly static HTML + JS chunks.

## 9. PERFORMANCE — measured baseline (curl, 2026-10-27 ~01:00 PKT)
| Metric | Original tally.so homepage |
|---|---|
| HTTP status | 200 |
| TTFB | **1.29 s** |
| Full HTML download | **1.51 s** |
| HTML size | 297,872 bytes (~291 KB) |
| Same-origin asset references in HTML | 92 (85 unique, fetchable) |
| Asset bytes (JS chunks + images + fonts) | 3,503,321 bytes (~3.42 MB) |
| **Total page weight (HTML + assets)** | **3,801,193 bytes ≈ 3.7 MB** |
| **Total requests (HTML + assets)** | **86** |

Notes: the weight is dominated by large PNG illustrations (faces, demo art) and many Next.js chunks. The clone's target is to beat this comfortably: static HTML + one small CSS file + a few KB of JS, no images, no framework — measured after deploy in the clone's performance section of the final report.

## 10. Business model (one paragraph)
Tally is a classic freemium SaaS: the product is free without limits (unlimited forms and submissions) so that anyone can adopt it with zero friction, and the free tier itself is the marketing engine — every free form carries a "Made with Tally" badge that drives ~40% of signups. Revenue comes from the small share of users who need professional polish: Pro ($29/mo, $24 annual) removes the badge and adds custom domains, collaboration, analytics and customization, while Business ($79/mo, $74 annual) adds data-retention control and email verification for organizations. With 2.5M users and $501K MRR, the model converts roughly 1–2% of users to paid — a tiny conversion rate on a huge free base, bootstrapped by two founders with no outside investment.
