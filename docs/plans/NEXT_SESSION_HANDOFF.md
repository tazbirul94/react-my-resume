# Next Session Handoff — Apple Redesign Continuation

## Branch
`new_design` — committed as `b2d6e1c`

## What Is Done

### Foundation
- `src/index.css` — Inter font, Apple CSS vars (`--bg-primary`, `--text-primary`, `--accent` etc), removed teal/orb keyframes, added `apple-card`, `apple-chip`, `eyebrow`, `section-title` utility classes, `current-pulse` + `section-reveal` keyframes, `prefers-reduced-motion` wrapping
- `tailwind.config.js` — `apple-bg`, `apple-text`, `apple-accent` tokens, Inter + JetBrains Mono fonts, `max-w-content` (1120px)

### Components Rewritten
| File | Status |
|------|--------|
| `src/components/layout/Hero.jsx` | Done — static fog, -0.03em tracking, circular avatar, CTA buttons |
| `src/components/layout/Navbar.jsx` | Done — frosted glass blur(20px), weight-based active, Apple spacing |
| `src/components/layout/SectionWrapper.jsx` | Done — `eyebrow`/`title`/`alt` props, wave SVG dividers, IntersectionObserver section-reveal |
| `src/components/sections/About.jsx` | Done — micro-interaction arrows on contact links, apple photo |
| `src/components/sections/Work.jsx` | Done — apple cards, company logo, career dateline, current-pulse dot |
| `src/components/sections/Skills.jsx` | Done — chip cloud (opacity=proficiency), print-safe `<ul>` fallback |
| `src/components/sections/Education.jsx` | Partial — only SectionWrapper props updated, internal UI still old |
| `src/components/sections/Languages.jsx` | Partial — only SectionWrapper props updated |
| `src/components/sections/Interests.jsx` | Partial — only SectionWrapper props updated |
| `src/components/sections/Portfolio.jsx` | Partial — only SectionWrapper props updated |
| `src/components/sections/Certifications.jsx` | Partial — only SectionWrapper props updated |
| `src/components/sections/Testimonials.jsx` | Partial — only SectionWrapper props updated |
| `src/components/ui/card.jsx` | Done — uses `apple-card` class |

### Print / PDF
| File | Status |
|------|--------|
| `src/styles/print.css` | Done — full ATS print stylesheet |
| `src/components/PrintHeader.jsx` | Done — print-only plain-text contact block |
| `src/components/ui/PrintButton.jsx` | Done — sticky FAB, `window.print()` |
| `src/pages/Resume.jsx` | Done — PrintHeader + PrintButton wired in |
| `src/main.jsx` | Done — `import './styles/print.css'` added |

## What Is NOT Done Yet

### Priority 1 — Partial sections need internal Apple styling

These 6 sections only had their `SectionWrapper` props swapped. Their internal card/item markup still uses old patterns (dark bg, teal brand, border-white/5 etc). They need the same treatment as `Work.jsx`:

1. **`Education.jsx`** — convert timeline/cards to `apple-card`, use CSS vars
2. **`Languages.jsx`** — pill tags using `apple-chip` class  
3. **`Interests.jsx`** — keyword tags using `apple-chip` class
4. **`Portfolio.jsx`** — project cards using `apple-card`, remove teal
5. **`Certifications.jsx`** — cert cards using `apple-card`, remove teal
6. **`Testimonials.jsx`** — quote cards using `apple-card`, remove teal

### Priority 2 — Footer
- `src/components/layout/Footer.jsx` — still uses old teal brand colors. Needs Apple `--text-tertiary` / `--bg-secondary` treatment.

### Priority 3 — Hero section ID fix
- Hero `<section>` has no `id`. The print.css rule `section:has(h1) { display: none }` may not work correctly in all browsers for hiding hero in print. Better approach: add `data-print="hidden"` to the Hero section element directly.

### Priority 4 — Test / QA
1. Run `node ./node_modules/vite/bin/vite.js build` (use this exact command — `npm run build` is blocked by RTK hook in this env)
2. Run dev: `node ./node_modules/vite/bin/vite.js` then open `http://localhost:5173/react-my-resume/`
3. Verify in Chrome: light mode + dark mode
4. `Ctrl+P` → check print preview: decorative hidden, skills show as plain list, PrintHeader visible
5. Verify `prefers-reduced-motion` in DevTools Rendering panel

## CSS Var Reference (from `src/index.css`)

```
Light:
  --bg-primary    255 255 255
  --bg-secondary  245 245 247
  --bg-tertiary   251 251 253
  --text-primary  29 29 31
  --text-secondary 110 110 115
  --text-tertiary 134 134 139
  --accent        0 113 227
  --apple-border  210 210 215

Dark: (same vars, different values — see src/index.css .dark block)
```

Usage: `color: rgb(var(--text-primary))` or Tailwind: `text-apple-text`

## Utility Classes Reference

```
.apple-card      — white card, 18px radius, subtle shadow, hover lift
.apple-chip      — pill tag, bg-secondary, 13px, 500 weight
.eyebrow         — 0.6875rem, 600, uppercase, 0.1em tracking, text-tertiary
.section-title   — clamp(1.75rem…2.5rem), 700, -0.02em tracking
.font-mono-code  — JetBrains Mono (for skill chips)
.section-visible — triggers section-reveal animation via IntersectionObserver
.current-dot     — green pulse animation for current employer
```

## How to Continue

Paste this prompt at session start:

---

**SESSION PROMPT TO PASTE:**

> I'm continuing Apple-style redesign of my React resume app on branch `new_design`. Foundation + Hero/Navbar/SectionWrapper/Work/Skills/About are done. Six sections still have old internal styling: Education, Languages, Interests, Portfolio, Certifications, Testimonials. Also Footer needs update. Full context is in `docs/plans/NEXT_SESSION_HANDOFF.md` and the plan is in `docs/plans/apple-redesign-and-pdf.md`. Continue implementing — use multiple agents in parallel. Git commands must use full path: `"/c/Program Files/Git/bin/git.exe"` (RTK hook blocks `git` directly). Build via `node ./node_modules/vite/bin/vite.js build`.
