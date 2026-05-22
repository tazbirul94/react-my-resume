# Resume Redesign Plan — Recruiter-First UX

**Goal**: Transform the resume into a high-impact, recruiter-optimized portfolio site.
**Target audience**: Senior tech recruiters at EU/DE companies, hiring managers, ATS bots.
**Branch**: `new_design`

---

## Audit Findings Summary

### Critical Bugs
- Portfolio section has no CSS for `pf-grid` class → renders unstyled
- `print.css` exists but never imported → printing breaks
- Skills section renders hardcoded data, ignores resume template
- `resume.en_US.js` has `"website": "<WEBSITE>"` unfilled placeholder

### Key UX Problems (Recruiter View)
- No above-the-fold value proposition or summary
- No "Download CV" / "Contact Me" CTA visible on load
- Contact info buried in About section — not scannable
- Banner shows decorative tech icons but no clear headline or role
- Soft skills shown as percentage bars (misleading metric)
- References carousel auto-plays, no pause (WCAG violation)
- No print-friendly layout
- No structured metadata (Schema.org, OpenGraph)
- Color contrast issues: body text `#838C95` on white ~4:1 (fails WCAG AA)

### Missing For Recruiters
- Prominent role title + years of experience above fold
- One-line headline "what I do / what I bring"
- Download PDF button (sticky or hero CTA)
- Quick-scan skills grid (not bar chart)
- Quantified achievements highlighted (not buried in bullet lists)
- Open to work / availability status
- Portfolio with live links + tech stack tags
- More references (1 is weak)
- German language level shown prominently (B1 matters for DE jobs)

---

## Stories

Each story is self-contained, executable by a single agent. Stories are grouped by phase and ordered by dependency.

---

### Phase 1 — Foundation & Critical Fixes (no visual deps, do first)

**S1: Fix critical bugs**
- Import `print.css` into `App.js` or main stylesheet
- Remove hardcoded skills array in `Skills.js`; wire to `resume.skills` prop
- Add CSS rules for `.pf-grid` in `src/styles/portfolio.css`
- Replace `"<WEBSITE>"` placeholder in `resume.en_US.js` with actual URL or empty string
- Files: `src/App.js`, `src/components/Section/Skills.js`, `src/styles/portfolio.css`, `src/template/resume.en_US.js`

**S2: SEO & metadata**
- Add `<meta name="description">` with professional summary in `public/index.html`
- Add OpenGraph tags (og:title, og:description, og:image)
- Add JSON-LD Schema.org `Person` markup with name, jobTitle, email, sameAs (LinkedIn/GitHub)
- Add `lang="en"` on `<html>` tag
- Files: `public/index.html`

---

### Phase 2 — Hero Section Redesign

**S3: Redesign Banner as hero**
- Replace static "WELCOME TO MY RESUME" with dynamic role + tagline from `basics.label` + `basics.summary[0]`
- Add two CTA buttons: "Download CV" (triggers print/PDF) and "Contact Me" (mailto link from `basics.email`)
- Move tech stack icons below CTAs with a subtle label "Tech I work with daily"
- Make buttons data-driven: pull email from `basics.email`
- Keep social media links, reposition below CTAs
- Files: `src/components/Header/Banner.js`, `src/styles/banner.css` (new or existing)

**S4: Sticky navbar with contact shortcut**
- Add email icon + LinkedIn icon to navbar visible on desktop
- Add "Download CV" button to navbar (triggers `window.print()`)
- Ensure navbar highlights active section on scroll (IntersectionObserver)
- Files: `src/components/Header/Navbar.js`, `src/styles/navbar.css`

---

### Phase 3 — About & Skills Overhaul

**S5: About section — scannable layout**
- Split into two columns: left = summary paragraphs, right = quick-facts sidebar
- Quick-facts sidebar: location (Bremen, Germany), availability status, years of experience (calculated from first job date), top 3 skills, language levels
- Add "Open to opportunities" badge (configurable boolean in resume template)
- Files: `src/components/Section/About.js`, `src/styles/about.css`, `src/template/resume.en_US.js`

**S6: Skills section — grid instead of bars**
- Replace bar chart with a categorized tag grid (Backend / Frontend / DevOps / Cloud / Tools)
- Pull data from `basics.summary` tech mentions + work `summary` fields parsed into categories
- Add a dedicated `technicalSkills` array to `resume.en_US.js` with category grouping
- Files: `src/components/Section/Skills.js`, `src/template/resume.en_US.js`, `src/styles/skills.css`

**S7: Soft skills — replace percentage bars**
- Replace numeric bars with keyword tags or icons (percentages on soft skills look unprofessional)
- Group: Communication, Leadership, Collaboration, Delivery
- Files: `src/components/Section/SoftSkills.js`, `src/styles/softskills.css`

---

### Phase 4 — Work & Education Enhancement

**S8: Work section — achievement callouts**
- Add visual "highlight" badge to each role for 1 quantified achievement (pull from first highlight bullet)
- Show company logo prominently, fallback to company initial if logo fails
- Add a "Tech stack" chip row per role (already in `summary` field, parse it)
- Collapse old/early roles (Convince, China Railway) behind "Show earlier experience" toggle
- Files: `src/components/Section/Work.js`, `src/styles/work.css`

**S9: Education — thesis highlight**
- Surface Master's thesis title as a featured card with a book icon
- Add GPA display with German grade equivalent (already in data: `gpa_german`)
- Files: `src/components/Section/Education.js`, `src/styles/education.css`

---

### Phase 5 — Social Proof & Credibility

**S10: Certifications — improve visual**
- Add expiry/validity date display
- Show issuer logo prominently; improve fallback (show issuer name as text, not blank)
- Link "Verify" button opens in new tab with icon indicating external link
- Files: `src/components/Section/Certifications.js`, `src/styles/certifications.css`

**S11: References — fix carousel + add prompt**
- Add prev/next navigation buttons to carousel (currently `decorators: []` is empty)
- Remove or control autoplay (WCAG 2.1 violation)
- Add "Request reference letter" CTA below carousel (mailto link)
- Files: `src/components/Section/References.js`, `src/styles/references.css`

---

### Phase 6 — Print / PDF & Accessibility

**S12: Print layout**
- Create `@media print` rules: hide navbar, hero CTAs, animations, carousels
- Show contact info (email, LinkedIn, GitHub, location) in print header
- Ensure all sections print in readable black-on-white
- Fix dark section backgrounds for print
- Files: `src/styles/print.css`, `public/css/media-queries.css`

**S13: Accessibility fixes**
- Add `aria-label` to hamburger toggle button
- Add `title` attributes to all social media links
- Add `aria-label` to ScrollDown button
- Add `prefers-reduced-motion` media query to disable animations
- Fix heading hierarchy: ensure single `<h1>` (name), `<h2>` for section titles
- Files: `src/components/Header/Navbar.js`, `src/components/SocialMedia.js`, `src/components/Header/ScrollDown.js`, `public/css/default.css`

---

### Phase 7 — Data Completeness

**S14: Add `technicalSkills` to resume template**
- Add structured `technicalSkills` block to `resume.en_US.js`:
  ```js
  technicalSkills: {
    backend: ["C#", "ASP.NET Core", "Entity Framework", "REST APIs", "GraphQL", "RabbitMQ"],
    frontend: ["React", "React Native", "JavaScript", "HTML5", "CSS3"],
    devops: ["Docker", "Kubernetes", "GitLab CI/CD", "ArgoCD", "Azure DevOps"],
    cloud: ["Azure", "Databricks", "Azure Data Factory"],
    databases: ["MS SQL Server", "LINQ"],
    tools: ["Git", "Jira", "Postman"]
  }
  ```
- Add `availability: "Open to opportunities"` boolean or string to `basics`
- Wire `Home.js` to pass `technicalSkills` to Section
- Files: `src/template/resume.en_US.js`, `src/Home.js`, `src/components/Section/index.js`

**S15: Add more certifications / awards data (content only)**
- Remove `<PLACEHOLDER>` strings from volunteer, awards sections or hide those sections if empty
- Add defensive rendering: skip sections with all-placeholder data
- Files: `src/template/resume.en_US.js`, `src/components/Section/index.js`

---

## Execution Order

```
Phase 1 (S1, S2)          — parallel, no deps
Phase 2 (S3, S4)          — parallel, after Phase 1
Phase 3 (S5, S6, S7)      — parallel, after S3 complete
Phase 4 (S8, S9)          — parallel, after Phase 3
Phase 5 (S10, S11)        — parallel, independent
Phase 6 (S12, S13)        — parallel, after all UI done
Phase 7 (S14, S15)        — parallel, can run alongside Phase 1
```

## Agent Assignment Guidance

- **Frontend agent**: S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13
- **Backend/data agent**: S1 (bug fixes), S2 (metadata), S14, S15
- Both agents can start Phase 1 + Phase 7 in parallel on day 1.

---

## Definition of Done

- [ ] `npm run build` passes with zero errors
- [ ] No `<PLACEHOLDER>` strings visible in rendered app
- [ ] "Download CV" button triggers browser print dialog
- [ ] Navbar highlights active section on scroll
- [ ] Skills section shows categorized tag grid
- [ ] All social links have `title` attributes
- [ ] Print preview shows clean black-on-white layout
- [ ] Lighthouse accessibility score > 90
- [ ] Lighthouse SEO score > 90
