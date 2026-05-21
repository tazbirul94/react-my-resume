# Next Session Handoff

## Project
React 18 + Vite resume app with Supabase backend + admin panel.
Branch: `feature/update_2025`
Path: `C:\Users\mhaque\Downloads\Myself\Coding\react-my-resume`

## What Is Already Done

### Infrastructure
- CRA fully replaced with **Vite 5 + React 18**
- **Tailwind CSS** with dark mode (`class` strategy), CSS variable design tokens
- `@/` path alias → `src/`
- `vite.config.js` — base `/react-my-resume/` for GitHub Pages
- `package.json` scripts: `dev`, `build`, `preview`, `deploy`
- **Build passes**: `npm run build` produces `dist/` with no errors

### Supabase Layer
- `supabase/schema.sql` — 11 tables: `basics`, `profiles`, `work`, `education`, `skill_groups`, `skills`, `languages`, `interests`, `projects`, `certifications`, `testimonials` — all with RLS (public read, auth write)
- `supabase/seed.sql` — INSERT statements from existing template data
- `src/lib/supabase.js` — conditional client (null if `.env` missing)
- `src/lib/fallback.js` — hardcoded fallback data (app works without Supabase)
- `src/hooks/useResume.js` — 9 hooks: `useBasics`, `useWork`, `useEducation`, `useSkills`, `useLanguages`, `useInterests`, `useProjects`, `useCertifications`, `useTestimonials` — each returns `{ data, loading, error }`, falls back to hardcoded data
- `src/hooks/useAuth.jsx` — `AuthProvider` + `useAuth` hook (Supabase email/password auth)

### UI Components
- `src/components/ui/` — Button, Card, Badge, Skeleton, Progress, Dialog, Input, Textarea
- `src/context/ThemeContext.jsx` — `ThemeProvider` + `useTheme` (persists to localStorage)
- `src/components/layout/` — Layout, Navbar (sticky + mobile menu), Hero (full-screen gradient), ThemeToggle, SectionWrapper, Footer

### Section Components (all Supabase-driven with skeleton loading)
- `src/components/sections/` — About, Work (timeline), Education, Skills (progress bars), Languages, Interests, Portfolio (grid + dialog), Certifications, Testimonials (carousel), index.jsx

### Admin Panel
- `src/components/admin/` — ProtectedRoute, AdminLayout (sidebar), CrudPage (reusable CRUD shell)
- `src/pages/admin/` — Login, Dashboard, BasicsAdmin, WorkAdmin, EducationAdmin, SkillsAdmin, LanguagesAdmin, InterestsAdmin, ProjectsAdmin, CertificationsAdmin, TestimonialsAdmin
- Route: `/admin` (protected) with nested routes per section

### App Wiring
- `src/App.jsx` — ThemeProvider + AuthProvider + BrowserRouter + all routes
- `src/pages/Resume.jsx` — Hero + Sections + Footer
- `src/main.jsx` — React 18 createRoot entry

### Legacy Files (still present, not used by new app)
- `src/components/App.js`, `src/components/Home.js`, old `src/components/Section/`, `src/index.js` — safe to delete but left intact

---

## What Still Needs to Be Done

### 1. Supabase Setup (manual — user must do this)
- Create project at supabase.com
- Run `supabase/schema.sql` in SQL editor
- Run `supabase/seed.sql` to populate with real data
- Create admin user in Auth → Authentication → Users
- Add `.env` file:
  ```
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

### 2. Verify Dev Server
Run `npm run dev` and check:
- Hero loads with name/title/socials from fallback data
- All 9 sections render (About, Work, Education, Skills, Languages, Interests, Portfolio, Certifications, Testimonials)
- Dark/light toggle works
- `/admin/login` renders, `/admin` redirects to login when not authenticated
- After Supabase is configured: login works, CRUD operations save

### 3. Fix/Polish Known Gaps
- **`src/components/sections/index.jsx`** imports from `@/components/sections` — verify barrel export works correctly
- **`src/App.jsx`** — old `src/components/App.js` still exists; `src/index.js` still references old entry. Confirm `src/main.jsx` is the actual entry Vite uses (it is, via `index.html`)
- **CrudPage.jsx** refresh pattern — after save/delete, `onRefresh()` is called but child components hold their own state. Verify optimistic updates work or add `useEffect` re-fetch
- **SkillsAdmin.jsx** — two-level CRUD (groups + skills); test adding a group then skills within it
- **Hero.jsx** — `Button` component has `asChild` prop not implemented; the "View Resume" button uses `asChild` — either implement slot pattern or change to plain `<a>` tag

### 4. Cleanup
- Delete old unused files: `src/components/App.js`, `src/components/Home.js`, `src/components/Section/`, `src/index.js`, `src/registerServiceWorker.js`, `src/template/`, `src/utils/` (old ones), `copy_wave1b.ps1`, `copy_wave2.ps1`
- Remove `yarn.lock` (project now uses npm only)

### 5. Deploy
```bash
npm run build
npm run deploy
```
Deploys to `tazbirul94.github.io/react-my-resume`

---

## Key File Map

| Purpose | File |
|---------|------|
| Entry point | `src/main.jsx` |
| Router + providers | `src/App.jsx` |
| Public resume page | `src/pages/Resume.jsx` |
| Data hooks | `src/hooks/useResume.js` |
| Auth | `src/hooks/useAuth.jsx` |
| Supabase client | `src/lib/supabase.js` |
| Fallback data | `src/lib/fallback.js` |
| DB schema | `supabase/schema.sql` |
| DB seed | `supabase/seed.sql` |
| Admin login | `src/pages/admin/Login.jsx` |
| Admin dashboard | `src/pages/admin/Dashboard.jsx` |
| Section components | `src/components/sections/` |
| UI primitives | `src/components/ui/` |
| Layout shell | `src/components/layout/` |

## Known Issues to Fix First
1. `Hero.jsx` line ~60: `<Button ... asChild>` — remove `asChild`, wrap content in `<a>` directly or use plain anchor
2. Run `npm run dev` and fix any remaining console errors
3. After first `npm run dev` verify Tailwind classes render (dark bg, brand teal color visible)
