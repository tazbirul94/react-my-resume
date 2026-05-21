# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server on localhost:3000
npm run build      # Production build
npm test           # Run tests (Jest, jsdom)
npm run deploy     # Build + publish to GitHub Pages (tazbirul94.github.io/react-my-resume)
```

No single-test runner flag needed — `react-scripts test` runs all tests; prefix with `--testPathPattern=<name>` to filter.

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
