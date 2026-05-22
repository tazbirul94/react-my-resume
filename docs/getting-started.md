# Getting Started

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works)

---

## Option A — Run with Supabase (full stack)

This mode reads live data from your Supabase database. Required for the admin panel and data persistence.

### 1. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<publishable-anon-key>
```

Get both values from: **Supabase dashboard → Project Settings → API → Project URL / anon public key**.

### 2. Apply database schema

In your Supabase dashboard → **SQL Editor**, run these files in order:

```
supabase/schema.sql                  # creates all tables
supabase/seed.sql                    # inserts default resume data (en-US)
supabase/migrate_add_locale.sql      # adds locale support
supabase/migrate_seed_de_DE.sql      # inserts German locale data
supabase/migrate_add_project_description.sql   # adds project description column
```

### 3. Create admin user

Supabase dashboard → **Authentication → Users → Add user** — set email + password.

### 4. Install and start

```bash
npm install
npm run dev
```

App: `http://localhost:5173`
Admin: `http://localhost:5173/admin/login`

---

## Option B — Run without Supabase (offline / fallback mode)

No `.env` needed. The app uses built-in fallback data from `src/lib/fallback.js`.
Admin panel is non-functional in this mode.

```bash
npm install
npm run dev
```

App loads with hardcoded resume data. To edit content, modify `src/lib/fallback.js` directly.

---

## All Commands

```bash
npm run dev        # Dev server on localhost:5173
npm run build      # Production build (output: dist/)
npm run preview    # Preview production build locally
npm run deploy     # Build + publish to GitHub Pages (tazbirul94.github.io/react-my-resume)
```

---

## Troubleshooting

**`npm run dev` starts but shows no data / blank sections**
→ `.env` is missing or has wrong keys. Check Supabase dashboard for correct URL and anon key.
→ Or: schema not applied yet — run `supabase/schema.sql` + `supabase/seed.sql` in SQL Editor.

**Admin login fails**
→ No user created. Go to Supabase → Authentication → Users → Add user.

**Data shows but is wrong locale**
→ Run `supabase/migrate_seed_de_DE.sql` for German content, or check the locale switcher in the UI.

**Works offline (fallback) but not with Supabase**
→ Confirm `VITE_SUPABASE_URL` has no trailing slash and `VITE_SUPABASE_ANON_KEY` is the **anon** key, not the service role key.
