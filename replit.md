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
├── vite.config.ts              — Vite config; PORT + BASE_PATH optional (default: 3000, "/")
└── .replit-artifact/
    └── artifact.toml           — kind=web, paths=["/"], previewPath="/"

artifacts/api-server/
├── src/app.ts                  — Express server, /api routes only
├── public/                     — Legacy copy of HTML/CSS/JS (do not edit here)
└── .replit-artifact/
    └── artifact.toml           — kind=api, paths=["/api"]

railway.toml                    — Railway build + serve config (repo root)
nixpacks.toml                   — Nixpacks overrides: Node 20, custom install cmd (repo root)
```

## Deployment

### Replit (development preview)
The `artifacts/website: web` workflow serves the site at `/` via Vite dev server.
Click **Publish** in Replit to deploy to a `.replit.app` domain or custom domain.

### Railway (production / custom domain)
Three files at the repo root work together on every Railway deploy:

**`railway.toml`**
```toml
[build]
builder = "NIXPACKS"
buildCommand = "pnpm --filter @workspace/website run build"

[deploy]
startCommand = "npx serve -s artifacts/website/dist/public -p $PORT"
healthcheckPath = "/"
healthcheckTimeout = 30
```

**`nixpacks.toml`**
```toml
[variables]
NODE_VERSION = "20"

[phases.install]
cmds = ["pnpm install --no-frozen-lockfile"]
```

- `NODE_VERSION = "20"` — Vite 7 requires Node ≥ 20.19; Nixpacks auto-detects 18 without this.
- `phases.install` — overrides Nixpacks' default `pnpm i --frozen-lockfile` pre-step, which fails because `pnpm-workspace.yaml` has Replit-specific platform overrides that Railway's pnpm does not understand.
- `buildCommand` in `railway.toml` runs only the Vite build; install is handled by Nixpacks via `nixpacks.toml`.

**`vite.config.ts`** — PORT and BASE_PATH are optional with safe defaults (`3000` and `"/"`) so Vite does not throw during Railway's build phase (when `PORT` is not set).

Connect Railway to `https://github.com/mandardkgh/ea-website` (main branch). Railway picks up both `.toml` files automatically — no Railway dashboard settings needed.

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
- ~~`YOUTUBE_VIDEO_ID_1`~~ — filled in: `XGLwIXgqcyQ` (https://youtube.com/shorts/XGLwIXgqcyQ)
- ~~`YOUTUBE_VIDEO_ID_2`~~ — filled in: `v-5UDXx1nj8` (https://youtube.com/shorts/v-5UDXx1nj8)
- ~~Testimonial #1~~ — filled in: Dr. Kirti Vaidya, German Language Teacher, German Department SPPU Pune
- ~~Testimonial #2~~ — filled in: Salman Shakeel Sheikh, College Student, Pune

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
- **Railway lockfile mismatch** — fixed via `nixpacks.toml` overriding the install phase with `pnpm install --no-frozen-lockfile`. Root cause: `pnpm-workspace.yaml` has Replit-specific platform overrides (`"-"` syntax) that Railway's pnpm ignores, causing a lockfile hash mismatch. Never remove `nixpacks.toml` or revert its install command.
- **Railway Node version** — Nixpacks auto-detects Node 18 but Vite 7 requires ≥ 20.19. Pinned via `NODE_VERSION = "20"` in `nixpacks.toml`. Do not remove this.
- **Vite build requires no PORT/BASE_PATH** — `vite.config.ts` uses safe defaults (`3000` / `"/"`) when env vars are absent. Do not add back hard throws for these vars — the Railway build phase has no PORT set.
- **Two copies of static files** — `artifacts/website/public/` is the live source; `artifacts/api-server/public/` is a legacy copy. If you edit HTML/CSS/JS, edit `artifacts/website/` only.
