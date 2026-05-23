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

## Database rules — ALWAYS follow

**Any time a column is added, removed, or renamed in Supabase:**

1. Update `supabase/schema.sql` — keep in sync with live schema
2. Update `supabase/seed.sql` — include the new column in INSERT statements with a sensible seed value
3. Update `src/lib/fallback.js` — mirror the field in the relevant fallback object (used when Supabase is not configured)
4. Create `supabase/migrate_<description>.sql` — migration script for existing projects. Must include:
   - `ALTER TABLE` to add/drop/rename the column
   - `UPDATE` to backfill existing rows with a sensible default
   - Example for adding a column:
     ```sql
     ALTER TABLE basics ADD COLUMN IF NOT EXISTS hero_chips TEXT[];
     UPDATE basics SET hero_chips = ARRAY['C#', 'Docker', 'Azure'] WHERE hero_chips IS NULL;
     ```
5. Output the migration SQL to the user so they can run it in the Supabase SQL editor

Never let schema.sql, seed.sql, fallback.js, and migration scripts diverge from each other.

## Architecture

**Data flow**: Supabase → `useResume` hooks → components. `useBasics`, `useWork`, etc. each query one table and fall back to `src/lib/fallback.js` when Supabase is not configured.

**Two data sources per locale**, both in `src/template/` (legacy — new content goes in Supabase):
- `resume.*.js` — resume content
- `ui.*.js` — UI string translations (section titles, nav labels, modal text)

**i18n**: `react-intl` wraps the tree. UI strings use `<FormattedMessage id="section.key">` where IDs map to the nested keys in `ui.*.js` (flattened by `src/utils/flattenMessages.js`). Resume content strings are passed as props directly — not through intl. Supported locales: `en-US`, `de-DE`.

**Section components** (`src/components/sections/`) are purely presentational — each fetches its own data via a `useResume` hook. To add a new section: add table + column to schema, add hook to `useResume.js`, add component, wire it in `sections/index.jsx`.

**Styling**: Tailwind CSS + CSS variables in `src/styles/`. Theme tokens defined in `src/styles/tokens.css`. Dark/light mode via `ThemeToggle` writing a `data-theme` attribute on `<html>`.

**Deploy**: `npm run deploy` runs Vite build then `gh-pages -d dist`. The `base` field in `vite.config.js` sets the correct path for GitHub Pages.

## Feature index

### Hero section (`src/components/layout/Hero.jsx`)
Full-screen landing with animated gradient orbs, dot-grid texture, name, role label, **tagline**, tech chip strip (derived from work skills), stats row (years / tech count / countries), CTA buttons, and social icon links.

- **tagline** (`basics.tagline` — `text`): short one-liner shown under the name. Separate from `summary` (full bio in About). Editable in admin → Basics → "Tagline" field.
- **hero_chips** (`basics.hero_chips` — `text[]`): tech stack chips shown under tagline. Set explicitly in admin → Basics → "Hero Tech Chips" (comma-separated). Falls back to top-8 most-frequent skills computed from `work.skills[]` if not set.

### About section (`src/components/sections/About.jsx`)
Photo, name, role label, "Open to opportunities" badge, years-experience chip, full `summary` paragraphs, and contact grid (email, phone, location, website).

- `summary` is `text[]` — each array element renders as a separate paragraph.
- Photo uploaded via Supabase Storage bucket `avatars`.

### Basics admin (`src/pages/admin/BasicsAdmin.jsx`)
Edits the single `basics` row for the selected locale. Fields: Full Name, Job Title/Label, **Tagline**, **Hero Tech Chips** (comma-separated → stored as `text[]`), Email, Phone, Website, City, Country Code, Profile Photo (upload to `avatars` bucket), Summary (one paragraph per line → stored as `text[]`).

### Work (`src/pages/admin/WorkAdmin.jsx` / `src/components/sections/Work.jsx`)
Ordered list of jobs. Each entry: company, logo, position, employment type badge, location, date range, highlights array, skills chips.

### Education (`src/pages/admin/EducationAdmin.jsx` / `src/components/sections/Education.jsx`)
Ordered list of degrees. Each entry: institution, logo, degree, area, location, date range, GPA (raw + German scale), summary paragraphs.

### Skills (`src/pages/admin/SkillsAdmin.jsx` / `src/components/sections/Skills.jsx`)
Skill groups (`skill_groups`) each containing skills (`skills`). Each skill has a 0–100 proficiency level rendered as a progress bar. Groups are typed `hard` or `soft`.

### Certifications (`src/pages/admin/CertificationsAdmin.jsx` / `src/components/sections/Certifications.jsx`)
List of certs with issuer logo, title, issue date, and credential link.

### Portfolio (`src/pages/admin/ProjectsAdmin.jsx` / `src/components/sections/Portfolio.jsx`)
Project cards with category, publisher, keywords, website link, optional thumbnail/modal image.

### Testimonials (`src/pages/admin/TestimonialsAdmin.jsx` / `src/components/sections/Testimonials.jsx`)
Quote cards with name, position, company, and reference text.

### Languages (`src/pages/admin/LanguagesAdmin.jsx` / `src/components/sections/Languages.jsx`)
Language proficiency list (name + level string e.g. B1, Native).

### Interests (`src/pages/admin/InterestsAdmin.jsx` / `src/components/sections/Interests.jsx`)
Interest items with keyword chips.

### Locale switcher
`LocaleSwitcher` component reads available locales from `locales` table. Switching locale re-fetches all hooks (locale is context state in `LocaleContext`). Admin uses a separate `AdminLocaleContext` so admin edits can target any locale regardless of public site locale.

### Theme
`ThemeToggle` toggles `data-theme="dark"|"light"` on `<html>`. CSS variables in `tokens.css` respond to the attribute. Default: system preference via `prefers-color-scheme`.

### Print / PDF export
`PrintButton` triggers `window.print()`. `PrintHeader` component renders a simplified header visible only in print media. Print styles in `src/styles/print.css`.
