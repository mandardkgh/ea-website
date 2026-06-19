# Enabelo Apps — Official Landing Website

A multi-page institutional landing website for enabeloapps.com — an accessible education platform for visually impaired and writing‑disabled students in India.

## Run & Operate

- `pnpm --filter @workspace/website run dev` — run the Vite dev server for the website (port 19161)
- `pnpm --filter @workspace/api-server run dev` — run the Express API server (serves `/api` only)
- Workflow names in Replit: `artifacts/website: web` and `artifacts/api-server: API Server`
- No database, no API codegen required

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- **Website:** `artifacts/website` — Vite-served static site (`kind=web`, `previewPath=/`)
- **API server:** `artifacts/api-server` — Express 5, serves `/api` only (no static files)
- Static site: plain HTML + CSS + vanilla JS (no React framework in site content)
- Fonts: Inter (400/600/700/800/900) from Google Fonts
- Icons: inline SVGs throughout — no icon library dependency
- No database, no ORM, no API spec

## Where things live

```
artifacts/website/
├── index.html                  — All pages (SPA via JS routing, showPage())
├── public/
│   ├── css/style.css           — All styles, CSS custom properties
│   ├── js/main.js              — Page routing, nav toggle, form handling
│   └── images/
│       ├── logo-enabelo.png    — Enabelo Apps logo (120px in header & footer)
│       ├── logo-zspl.png       — Zapurzaa Systems logo (footer copyright band)
│       ├── computer-lab.png    — Hero section image
│       ├── vi-girl.jpg         — "Why Unique" section image
│       └── favicon.svg         — Browser tab icon
├── vite.config.ts              — Vite config (PORT + BASE_PATH from env)
└── .replit-artifact/
    └── artifact.toml           — kind=web, paths=["/"], previewPath="/"

artifacts/api-server/
├── src/app.ts                  — Express server, /api routes only
├── public/                     — Source copy of HTML/CSS/JS (kept in sync manually)
└── .replit-artifact/
    └── artifact.toml           — kind=api, paths=["/api"]

railway.toml                    — Railway deployment config (repo root)
```

## Deployment

### Replit (development preview)
The `artifacts/website: web` workflow serves the site at `/` via Vite dev server.
Click **Publish** in Replit to deploy to a `.replit.app` domain or custom domain.

### Railway (production / custom domain)
`railway.toml` at the repo root configures Railway automatically on every deploy:
- **Install:** `pnpm install --no-frozen-lockfile` — bypasses pnpm lockfile mismatch caused by Replit-specific platform overrides in `pnpm-workspace.yaml`
- **Build:** `pnpm --filter @workspace/website run build` — Vite static build → `artifacts/website/dist/public/`
- **Serve:** `npx serve -s artifacts/website/dist/public -p $PORT`
- **No API server needed** — the site is fully static; forms go to Formspree, demo booking to Calendly

Connect Railway to `https://github.com/mandardkgh/ea-website` (main branch). Railway picks up `railway.toml` automatically — no Railway dashboard build settings needed.

## Architecture decisions

- **Single HTML file, JS-routed SPA** — all pages (Home, About, Impact & Compliance, Contact, Platform Access, Privacy, Terms) live in `index.html` as `<div class="page-view">` blocks; `showPage()` in `main.js` toggles visibility.
- **kind=web artifact** — `artifacts/website` is registered as `kind=web` so the Replit Publish button is enabled.
- **No emoji anywhere** — all iconography uses inline SVGs for professionalism and accessibility.
- **Non-breaking hyphen for "writing‑disabled"** — uses `&#8209;` throughout to prevent the word splitting across lines.
- **Company name standard** — always "Zapurzaa Systems Pvt. Ltd." with full-stops after both Pvt and Ltd.
- **Static files only** — no API routes needed for the landing site.

## Product

Enabelo Apps is a software platform that empowers visually impaired and writing‑disabled students to complete academic work and take exams independently using AI-powered voice technology. Built by Zapurzaa Systems Pvt. Ltd., it replaces the traditional scribe system with a voice-based platform covering 11 Indian and 4 foreign languages.

**Target audience:** Trustees, university administrators, NAAC teams, NGOs.

**Primary CTA:** Book a Demo — opens a modal form (Name, Institution, Role, Email, Phone). Demo leads naturally into pilot discussions over personal follow-up. No separate "Request Pilot" button anywhere on the site.

**Pages:** Home · About · Impact & Compliance · Contact · Platform Access · Privacy · Terms

## Design system

- **Brand colour:** `#0077A8` (teal), deeper `#003D57`
- **All icon circles:** 68px diameter, `border-radius: 50%`, teal gradient background (`linear-gradient(135deg, rgba(0,119,168,0.12), rgba(0,61,87,0.08))`), 30px SVG inside — consistent across card icons, flow step icons, and trust strip icons
- **Trust strip:** brand teal (`#0077A8`) background, 4 credentials: Patent Pending · 15 Languages · Zero Scribes · RPWD Act 2016
- **Problem cards:** amber left border (`#D97706`) to visually distinguish from solution/feature cards
- **SDG badges:** official UN colours — SDG #4 red `#C5192D`, SDG #10 fuchsia `#DD1367`
- **CTA band:** full-width dark teal strip before the footer on all pages

## Placeholders still to fill

- ~~Calendly link~~ — filled in: `https://calendly.com/mandar-zapurzaasystems`
- ~~Formspree ID~~ — filled in: `xlgkkaqa` (endpoint: `https://formspree.io/f/xlgkkaqa`)
- `YOUTUBE_VIDEO_ID_1`, `YOUTUBE_VIDEO_ID_2` — demo video embeds
- Testimonial text — currently placeholder copy

## User preferences

- No emoji anywhere in the UI
- Professional and institutional tone throughout
- "writing‑disabled" always uses non-breaking hyphen, never splits across lines
- Company name always: "Zapurzaa Systems Pvt. Ltd." (full-stops after Pvt and Ltd)
- Hero keywords stay as: Independence. Dignity. Education. (do not swap or add)
- Single-file HTML export deferred — user will request when site is final

## Gotchas

- **Do not use `sed` with `&` in replacement strings** — `&` is special in sed and doubles the match. Use Python for string replacements involving special characters (e.g. `&#8209;`).
- **Verify `writing&#8209;disabled` encoding** — after any bulk find-replace, grep for `writingwriting` to catch double-replacement bugs.
- The logo file at `public/images/logo-enabelo.png` is the correct current logo (teal Enabelo Apps script). The footer version uses `filter:brightness(0) invert(1)` for the white-on-dark display.
- The compliance table on the Impact & Compliance page wraps heading + paragraph + `<table>` inside `.compliance-table-wrap` — padding for the text is applied via CSS child selectors (`> h3`, `> p`), not inline styles.
- **Railway lockfile mismatch** — solved permanently by `railway.toml` using `--no-frozen-lockfile`. Root cause: `pnpm-workspace.yaml` has Replit-specific platform overrides (`"-"` syntax) that Railway's pnpm doesn't read from workspace config. Never remove `railway.toml` or change it to `--frozen-lockfile`.
- **Two copies of static files** — `artifacts/website/public/` is the live source; `artifacts/api-server/public/` is a legacy copy. If you edit HTML/CSS/JS, edit `artifacts/website/` only.
