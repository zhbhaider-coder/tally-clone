# Tally Clone — Free Form Builder

A lightweight, free rebuild of [Tally](https://tally.so) — the simplest way to create forms. Build forms like a text document, share them with a link, and collect responses. No sign-up, no server, no database.

**Live site:** https://tally-clone.pages.dev/

> Unofficial rebuild for personal use — not affiliated with Tally.

## What it does

- **Form builder** (`editor.html`) — 13 block types, slash menu, drag to reorder, required toggles, live preview, autosave
- **Published forms** (`form.html?id=…`) — shareable public form pages
- **Submissions inbox** (`inbox.html`) — view responses, export to CSV
- **Templates** (`templates.html`) — 8 ready-made templates
- **Pricing** (`pricing.html`) — Free $0, Pro $29/mo ($24/mo annual), Business $79/mo ($74/mo annual)
- **SEO pages** — free form builder, Google Forms alternative, online survey maker

## How it works

Everything runs in the browser. Forms and submissions are stored in `localStorage` — there are no accounts, no server database, and no real payments. Open the editor, type to build, publish, and share the link.

## Tech

Plain HTML, CSS, and JavaScript. No framework, no build step. The whole site is ~24 KB — about 155× lighter than the original.

## Deploy

Hosted on Cloudflare Pages (free). Deploy with the Pages helper from the project directory:

```bash
cd ~/workspace/tally-clone
PYTHONPATH=/opt/muse/skills/custom-connector-setup/bin python3 ~/workspace/custom-connectors/custom.legacy-cloudflare-pages-deploy/bin/cf-pages-deploy.py tally-clone . <account-id>
```

## Files

| File | What it is |
| --- | --- |
| `index.html` | Landing page |
| `editor.html` | Form builder |
| `form.html` | Published form page |
| `inbox.html` | Submissions inbox + CSV export |
| `templates.html` | Template gallery |
| `pricing.html` | Pricing tiers |
| `css/`, `js/` | Styles and builder logic |
| `sitemap.xml` | 9 URLs |
| `ANALYSIS.md` | Deep analysis of the original (Tally: $6M ARR, 2.5M users, Sept 2026) |
| `EARNINGS.md` | How the original earns and how this clone could |
| `SEARCH-CONSOLE.md` | Search Console setup notes |
| `BACKLINK-CHECKLIST.md`, `backlinks.md` | Backlink plan |

## Status

- Live at https://tally-clone.pages.dev/
- Search Console: verified (zhbhaider@gmail.com, 2026-10-27); sitemap submitted — Google reported "Couldn't fetch" on 2026-10-27 (same on all Pages sites; Google retries on its own)
- Second verification file added for the szhaider716@gmail.com property (2026-10-27)
