# Getting Started

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

## Admin Panel

Visit `http://localhost:5173/admin/login` and sign in with the user created in step 3.
