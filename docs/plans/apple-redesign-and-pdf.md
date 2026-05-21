# Plan: Apple-Style UI Redesign + ATS Print/PDF

> Save this file to `docs/plans/apple-redesign-and-pdf.md` as first implementation step.

---

## Context

Current site is a hybrid of legacy CSS + modern Tailwind components. The new components (`src/components/layout/`, `src/components/sections/`) use Tailwind + CSS vars but the design is generic — teal brand, DM Sans/Syne, basic cards. Goal is to:
1. Elevate to Apple-level design quality: SF Pro-inspired type, tight spacing, generous whitespace, subtle depth, motion refinement
2. Add ATS-friendly print view that outputs clean, parseable PDF without decorative elements

---

## Part 1 — Apple-Style Visual Redesign

### 1.1 Typography System

**Fonts to adopt:**
- **Display/Hero**: [Inter](https://fonts.google.com/specimen/Inter) — closest free analog to SF Pro (same optical sizing, neutral geometry). Weights: 300, 400, 500, 600, 700, 800.
- **Body**: Inter (same family — Apple uses one family throughout, never mixes)
- **Mono**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — for code/tech skill chips only

**Type scale (CSS vars):**
```
--type-hero:    clamp(3rem, 7vw, 5.5rem)   / 700
--type-section: clamp(1.75rem, 3vw, 2.5rem) / 600
--type-card-h:  1.125rem                    / 600
--type-body:    1rem                        / 400
--type-small:   0.875rem                    / 500
--type-micro:   0.75rem                     / 500  (caps, tracked)
```

**Letter-spacing rule**: Hero headings at -0.03em, section titles at -0.02em, body 0 (Apple standard).

**File to update**: `src/index.css` (Google Fonts import), `tailwind.config.js` (fontFamily)

---

### 1.2 Color System — Apple Light

Apple uses near-white backgrounds, very dark text, one accent (blue/teal), and subtle gray hierarchy.

```css
/* Light (default) */
--bg-primary:    #FFFFFF
--bg-secondary:  #F5F5F7    /* Apple's exact page bg */
--bg-tertiary:   #FBFBFD    /* card backgrounds */
--text-primary:  #1D1D1F    /* Apple's exact headline color */
--text-secondary:#6E6E73    /* Apple secondary text */
--text-tertiary: #86868B    /* Apple caption color */
--accent:        #0071E3    /* Apple blue */
--accent-hover:  #0077ED
--border:        #D2D2D7    /* Apple separator */
--border-subtle: #F0F0F3

/* Dark */
--bg-primary:    #000000
--bg-secondary:  #161617
--bg-tertiary:   #1C1C1E    /* Apple dark card bg */
--text-primary:  #F5F5F7
--text-secondary:#A1A1A6
--text-tertiary: #6E6E73
--accent:        #2997FF    /* Apple dark mode blue */
--border:        #3A3A3C
--border-subtle: #2C2C2E
```

**Remove**: teal brand color (`#11ABB0`) — replace fully with accent blue.

**File**: `src/index.css` (update CSS vars), `tailwind.config.js` (update brand/primary colors)

---

### 1.3 Layout & Spacing

**Max width**: `1120px` (Apple's content max-width, down from whatever current value)
**Section padding**: `120px` top/bottom desktop, `80px` mobile
**Component padding**: `32px` inside cards
**Grid gap**: `20px` (Apple product grid)

**Apple layout principles to implement:**
- Sections alternate `--bg-primary` / `--bg-secondary` (never same BG twice in a row)
- Full-bleed section backgrounds (no card wrapping the section itself)
- Content centered, always left-aligned text within — never center-aligned paragraphs

---

### 1.4 Component Redesigns

#### Hero (`src/components/layout/Hero.jsx`)
- Remove animated orbs — replace with a subtle static gradient fog (one `radial-gradient` blurred element, no animation)
- Name: huge, -0.03em tracking, weight 700
- Role label: `--text-secondary`, `--type-small`, uppercase + 0.1em tracking (Apple product label style)
- CTAs: Two buttons — primary (filled `--accent`) + secondary (ghost with `--border`)
- Avatar: circular, `180px`, thin `--border` ring, no glow
- Social links: icon-only, `--text-tertiary`, hover to `--text-primary`

#### Navbar (`src/components/layout/Navbar.jsx`)
- Frosted glass: `backdrop-filter: blur(20px)` + `background: rgba(255,255,255,0.72)` (exact Apple nav style)
- Dark: `rgba(0,0,0,0.72)` blur
- Remove any colored accent on active link — use font-weight 600 instead
- Nav items: `--type-small` + 500 weight (Apple nav text weight)
- No bottom border — shadow only when scrolled (`box-shadow: 0 1px 0 --border`)

#### Section Titles (all sections via `SectionWrapper.jsx`)
- Two-line structure: eyebrow (`--type-micro`, `--text-tertiary`, uppercase, tracked) + title (`--type-section`, `-0.02em`)
- Eyebrow is the section name; title is the bold statement (e.g. eyebrow: "EXPERIENCE", title: "Where I've Built Things")

#### Work Cards (`src/components/sections/Work.jsx`)
- Replace timeline rail with flush card list
- Each card: `--bg-tertiary`, `24px` radius, `32px` padding, no border (shadow only: `0 2px 8px rgba(0,0,0,0.06)`)
- Company logo: `40px` circle, left-aligned
- Date chip: `--type-micro`, `--bg-secondary`, no border
- Highlights: custom `::before` dash, `--text-secondary`

#### Skills (`src/components/sections/Skills.jsx`)
- Replace progress bars with tag cloud (pill chips)
- Chips: `--bg-secondary` bg, `--text-primary` text, `14px` font, `20px` border-radius
- Group by category with `--type-micro` uppercase label

#### Cards (universal — `src/components/ui/card.jsx`)
- Update variant: `bg-[--bg-tertiary]`, `rounded-3xl` (24px), no border, subtle shadow
- Hover: `translateY(-2px)` + slightly stronger shadow (Apple lift)

---

### 1.5 Motion & Interaction

**Principles**: Purposeful, short, physical.

- Page scroll reveals: `IntersectionObserver` fade-up (already exists in Hero) → extend to all `SectionWrapper` children. Duration `0.6s`, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (Apple spring-lite).
- Button hover: `scale(1.02)` + 200ms ease
- Card hover: `translateY(-2px)` + 200ms ease
- No infinite animations (remove existing orb drift keyframes)
- Respect `prefers-reduced-motion`: wrap all transforms in `@media (prefers-reduced-motion: no-preference)`

**File**: `src/index.css` (keyframes), individual section `.jsx` files for IntersectionObserver classes

---

### 1.6 Unique Differentiators (non-Apple-generic)

To avoid looking like a template:

1. **Timeline dateline** in Work section: a full-width horizontal rule connecting years, positioned at top of section — gives a "career timeline at a glance" reading before cards
2. **Skill constellation** in Skills section: SVG scatter plot where skills are nodes sized by proficiency, grouped by category via proximity (static, not animated) — replaces both bars and tags
3. **Section transition dividers**: Instead of plain BG switches, each section transition has a 1px SVG wave divider (Apple-esque curve between sections)
4. **"Currently" indicator**: Live pulsing dot next to current employer — CSS-only pulse (1.5s ease-in-out infinite scale)
5. **Micro-interactions on contact links**: Email/social links in About use an inline slide-right arrow icon on hover (pure CSS transform)

---

## Part 2 — ATS-Friendly Print / PDF

### 2.1 Strategy

**Two-track output:**
| Track | Purpose | Trigger |
|-------|---------|---------|
| Screen view | Full Apple-style design | default |
| Print view | ATS-optimized, black-on-white, single-column | `window.print()` via button |

**ATS parsing rules to follow:**
- No CSS columns in print (single linear flow)
- All text must be real DOM text, not background-image or canvas
- No absolute/fixed positioning in print (breaks parser order)
- Section headings as semantic `<h2>` (already should be — verify)
- Avoid SVG text (skill constellation → fallback to list in print)
- Contact info in `<p>` tags, not icon-only
- No `display:none` on semantically important content
- Standard section order: Contact → Summary → Experience → Education → Skills → Certifications

### 2.2 Print Stylesheet (`src/styles/print.css`)

New file. Imported in `src/main.jsx` with `<link media="print">` or via `@import` with `@media print`.

```css
@media print {
  /* Reset decorative elements */
  *, *::before, *::after {
    color: #000 !important;
    background: #fff !important;
    box-shadow: none !important;
    text-shadow: none !important;
    animation: none !important;
    transition: none !important;
  }

  /* Hide non-content */
  nav, .navbar, footer, .hero-orb, .print-hide,
  .theme-toggle, .scroll-down, [data-print="hidden"] { display: none !important; }

  /* Show print-only content */
  [data-print="only"] { display: block !important; }

  /* Page setup */
  @page {
    size: Letter portrait;
    margin: 0.75in 0.75in 0.75in 0.75in;
  }

  body { font-family: 'Inter', Arial, sans-serif; font-size: 11pt; line-height: 1.5; }

  /* Prevent orphaned headings */
  h2, h3 { page-break-after: avoid; }
  .work-card, .cert-card, .edu-card { page-break-inside: avoid; }

  /* ATS-safe contact header (print-only component renders this) */
  .print-header {
    display: block !important;
    text-align: center;
    margin-bottom: 16pt;
    border-bottom: 1pt solid #000;
    padding-bottom: 8pt;
  }

  /* Section spacing */
  section { margin-bottom: 16pt; }
  h2 { font-size: 13pt; font-weight: 700; text-transform: uppercase;
       letter-spacing: 0.05em; border-bottom: 0.5pt solid #000; margin-bottom: 8pt; }

  /* Skills: comma-separated in print (no chips) */
  .skills-chip-list { display: none !important; }
  .skills-print-list { display: block !important; }

  /* Constellation fallback */
  .skill-constellation { display: none !important; }
  .skill-print-fallback { display: block !important; }

  /* Links: show URL text */
  a[href]::after { content: " (" attr(href) ")"; font-size: 9pt; color: #333; }
  a[href^="#"]::after { content: ""; } /* suppress internal anchor URLs */
}
```

### 2.3 Print-Only Header Component

New component: `src/components/PrintHeader.jsx`

Renders only under `@media print` (CSS `display: none` by default, `display: block` in print CSS). Contains:
- Full name (h1)
- Job title
- Email | Phone | Location | LinkedIn URL | GitHub URL
- All as plain text with `|` separators (100% ATS readable)

### 2.4 Print Button

**Location**: Sticky bottom-right FAB on screen, hidden in print.

```jsx
// src/components/ui/PrintButton.jsx
<button
  onClick={() => window.print()}
  data-print="hidden"
  className="fixed bottom-6 right-6 z-50 ..."
  aria-label="Download PDF"
>
  <DownloadIcon /> Save as PDF
</button>
```

**Usage instructions** shown to user on click (tooltip or small modal):
> "Use your browser's Save as PDF option in the print dialog. Set margins to Default and enable Background Graphics OFF."

### 2.5 PDF Generation Alternative (Optional Enhancement)

If browser print-to-PDF is insufficient, add `html2pdf.js` (lightweight, 47kb):
- Triggered by same button via `data-prefer-html2pdf` flag
- Configuration: A4 paper, 0.75in margins, scale 0.95
- Filename: `{name}-resume.pdf` from resume data
- **Only add if print CSS approach proves layout-unstable**

### 2.6 ATS Content Audit

During implementation, verify each section outputs semantic HTML:
- `<h2>` for section titles ✓
- `<h3>` for company/school names
- `<p>` for descriptions
- `<ul><li>` for highlights/bullets
- `<time>` for dates
- Contact: `<address>` block
- Skills: plain `<ul>` in `.skills-print-list`

---

## Files to Create / Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/index.css` | Modify | New color vars, Inter font import, remove orb keyframes |
| `tailwind.config.js` | Modify | New color tokens, Inter fontFamily, updated radius |
| `src/components/layout/Hero.jsx` | Modify | Remove orbs, new type scale, refined layout |
| `src/components/layout/Navbar.jsx` | Modify | Frosted glass, refined nav text |
| `src/components/layout/SectionWrapper.jsx` | Modify | Eyebrow+title pattern, bg alternation |
| `src/components/sections/Work.jsx` | Modify | Card-list layout, timeline dateline, "currently" dot |
| `src/components/sections/Skills.jsx` | Modify | Constellation SVG + print fallback |
| `src/components/sections/About.jsx` | Modify | Micro-interaction contact links |
| `src/components/ui/card.jsx` | Modify | Updated variant (rounded-3xl, no border, shadow) |
| `src/styles/print.css` | **Create** | Full print/ATS stylesheet |
| `src/components/PrintHeader.jsx` | **Create** | Print-only contact block |
| `src/components/ui/PrintButton.jsx` | **Create** | Sticky PDF save button |
| `src/main.jsx` | Modify | Import print.css |
| `docs/plans/apple-redesign-and-pdf.md` | **Create** | Save this plan here |

---

## Verification

1. `npm run dev` → inspect Hero, Navbar, 3 section cards in both light and dark mode
2. Typography: open DevTools → verify Inter loads, check computed font sizes at mobile breakpoint
3. Color: run axe or Lighthouse accessibility → contrast ratio ≥ 4.5:1 on all text
4. Print: `Ctrl+P` in Chrome → verify decorative elements hidden, all text readable, 1-2 pages
5. ATS: paste printed text into a plain `.txt` → verify name, dates, company names, skills all appear with correct reading order
6. Reduced motion: DevTools → Rendering → "Emulate CSS media" prefers-reduced-motion → no animations
7. Mobile: 375px viewport → verify no horizontal scroll, readable type scale
