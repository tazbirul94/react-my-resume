# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Setup

1. Copy env file: `cp .env.example .env`
2. Fill in `.env`:
   ```
   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<publishable-key>
   ```
   Get both from Supabase dashboard → **Settings → API Keys**.
3. Create admin user: Supabase dashboard → **Authentication → Users → Add user**.
4. Install deps: `npm install`

## Commands

```bash
npm run dev        # Dev server on localhost:5173
npm run build      # Production build
npm run preview    # Preview production build locally
npm run deploy     # Build + publish to GitHub Pages (tazbirul94.github.io/react-my-resume)
```

Admin panel: `http://localhost:5173/admin/login`

## Architecture

**Data flow**: `App` holds locale state → passes `resume` + `navigation` objects to `Home` → `Home` routes data to `Header` (banner/navbar) and `Section` (all resume sections).

**Two data sources per locale**, both in `src/template/`:
- `resume.*.js` — resume content (basics, work, education, skills, projects, references, hobby)
- `ui.*.js` — UI string translations (section titles, nav labels, modal text)

Switching locale in `App.onSelectLocale` swaps both objects simultaneously. Currently supported: `en-US`, `zh-CN`.

**i18n**: `react-intl` wraps the tree. UI strings use `<FormattedMessage id="section.key">` where IDs map to the nested keys in `ui.*.js` (flattened by `src/utils/flattenMessages.js`). Resume content strings are passed as props directly — not through intl.

**Section components** (`src/components/Section/`) are purely presentational — each receives a `content` prop sliced from the resume object. To add a new section: add data to `resume.*.js`, add a component, wire it in `Section/index.js` and `Home.js`.

**Styling**: global CSS in `public/css/default.css` (Skeleton grid). Component-level overrides in `src/styles/`. Font Awesome, Fontello, and custom `librebaskerville` fonts are bundled under `public/css/`.

**Deploy**: `npm run deploy` runs `react-scripts build` then `gh-pages -d build`. The `homepage` field in `package.json` sets the correct base URL for GitHub Pages.
