# Google Search Console — setup steps for tally-clone.pages.dev

**Status: NOT submitted.** These steps need the site owner's Google account, so they cannot be done by the agent. Follow them once, in order.

## 1. Add the property

1. Go to https://search.google.com/search-console
2. Sign in with the Google account that should own the property.
3. Click **Add property** → choose **URL prefix** (not Domain).
4. Enter exactly: `https://tally-clone.pages.dev`
5. Click **Continue**. Google will ask you to verify ownership.

## 2. Verify ownership (HTML-file method — works with Cloudflare Pages)

1. In the verification screen, choose the **HTML file** method.
2. Google will give you a file to download, named something like `googleXXXXXXXXXXXX.html` (a long string of letters and numbers), plus its contents.
3. Download that file.
4. Place the file in the root of this repo (`~/workspace/tally-clone/`), next to `index.html`. Do not rename it and do not edit its contents.
5. Commit and redeploy the site (the coordinator deploys — the file must be live at `https://tally-clone.pages.dev/googleXXXXXXXXXXXX.html`).
6. Go back to Search Console and click **Verify**.
7. If it fails, first check the file loads in a browser at that URL. The usual cause is a deploy that did not include the new file.

Notes:
- The verification file must stay in the repo permanently. Removing it can lose verification.
- Alternative methods (DNS TXT, HTML tag) also work, but the HTML-file method is the simplest for a Cloudflare Pages site with no DNS access to the `pages.dev` domain.

## 3. Submit the sitemap

1. In Search Console, open **Sitemaps** in the left menu (under "Indexing").
2. In "Add a new sitemap", enter: `sitemap.xml`
3. Click **Submit**.
4. The full sitemap URL is `https://tally-clone.pages.dev/sitemap.xml` — it lists all 9 pages (home, editor, templates, pricing, free-form-builder, google-forms-alternative, online-survey-maker, inbox, form).

## 4. Check indexing (after 1–3 days)

1. In Search Console, open **Pages** (under "Indexing") and confirm the 9 URLs appear as indexed or "Discovered — currently not indexed" (normal for a new site; re-check after a week).
2. Use the **URL Inspection** tool on the homepage and the three guide pages to request indexing if they are not picked up within a week.
3. Under **Performance**, watch for impressions on the target keywords: "free form builder", "Google Forms alternative", "online survey maker".

## 5. Keep it healthy

- Re-check Search Console monthly for crawl errors and manual actions.
- Every time a new page is added, add it to `sitemap.xml` and re-submit the sitemap (Search Console re-reads it automatically, but a manual submit speeds things up).
