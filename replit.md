# Enabelo Apps — Official Landing Website

A multi-page institutional landing website for enabeloapps.com — an accessible education platform for visually impaired and writing‑disabled students in India.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the Express server (serves the static site)
- Workflow name: `artifacts/api-server: API Server` — start/restart via Replit workflows panel
- No database, no API codegen, no build step required for the static site

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Server: Express 5 (`artifacts/api-server/src/app.ts`) — serves static files only
- Static site: plain HTML + CSS + vanilla JS (no framework)
- Fonts: Inter (400/600/700/800/900) from Google Fonts
- Icons: inline SVGs throughout — no icon library dependency
- No database, no ORM, no API spec

## Where things live

```
artifacts/api-server/
├── src/app.ts                  — Express server, serves public/ at root
├── public/
│   ├── index.html              — All pages (SPA via JS routing, showPage())
│   ├── css/style.css           — All styles, CSS custom properties
│   ├── js/main.js              — Page routing, nav toggle, form handling
│   └── images/
│       ├── logo-enabelo.png    — Enabelo Apps logo (120px in header & footer)
│       ├── logo-zspl.png       — Zapurzaa Systems logo (footer copyright band)
│       ├── computer-lab.png    — Hero section image
│       └── vi-girl.jpg         — "Why Unique" section image
└── .replit-artifact/
    └── artifact.toml           — paths=["/api","/"], previewPath="/"
```

## Architecture decisions

- **Single HTML file, JS-routed SPA** — all pages (Home, About, Impact & Compliance, Contact) live in `index.html` as `<div class="page-view">` blocks; `showPage()` in `main.js` toggles visibility. Keeps deployment simple — no build pipeline for the marketing site.
- **No emoji anywhere** — all iconography uses inline SVGs for professionalism and accessibility.
- **Non-breaking hyphen for "writing‑disabled"** — uses `&#8209;` throughout to prevent the word splitting across lines.
- **Company name standard** — always "Zapurzaa Systems Pvt. Ltd." with full-stops after both Pvt and Ltd.
- **Static files only** — Express is used purely as a static file server. No API routes are needed for the landing site.

## Product

Enabelo Apps is a software platform that empowers visually impaired and writing‑disabled students to complete academic work and take exams independently using AI-powered voice technology. Built by Zapurzaa Systems Pvt. Ltd., it replaces the traditional scribe system with a voice-based platform covering 11 Indian and 4 foreign languages.

**Target audience:** Trustees, university administrators, NAAC teams, NGOs.

**Primary CTA:** Book a Demo — opens a modal form (Name, Institution, Role, Email, Phone). Demo leads naturally into pilot discussions over personal follow-up. No separate "Request Pilot" button anywhere on the site.

**Pages:** Home · About · Impact & Compliance · Contact

## Design system

- **Brand colour:** `#0077A8` (teal), deeper `#003D57`
- **All icon circles:** 68px diameter, `border-radius: 50%`, teal gradient background (`linear-gradient(135deg, rgba(0,119,168,0.12), rgba(0,61,87,0.08))`), 30px SVG inside — consistent across card icons, flow step icons, and trust strip icons
- **Trust strip:** brand teal (`#0077A8`) background, 4 credentials: Patent Pending · 15 Languages · Zero Scribes · RPWD Act 2016
- **Problem cards:** amber left border (`#D97706`) to visually distinguish from solution/feature cards
- **SDG badges:** official UN colours — SDG #4 red `#C5192D`, SDG #10 fuchsia `#DD1367`
- **CTA band:** full-width dark teal strip before the footer on all pages

## Placeholders still to fill

- ~~Calendly link~~ — filled in: `https://calendly.com/mandar-zapurzaasystems`
- `YOUR_FORMSPREE_ID` — Formspree form ID for the contact form
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
