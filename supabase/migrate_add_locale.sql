-- Migration: add locale support
-- Run once against your existing Supabase database (after migrate_add_project_description.sql)
-- Safe to re-run: uses IF NOT EXISTS / IF NOT EXISTS / ON CONFLICT DO NOTHING

-- ─── 1. Locales registry ────────────────────────────────────────────────────

create table if not exists locales (
  code       text primary key,
  label      text not null,
  is_active  boolean not null default true,
  sort_order int not null default 0
);

insert into locales (code, label, is_active, sort_order) values
  ('en-US', 'EN', true, 0),
  ('de-DE', 'DE', true, 1)
on conflict (code) do nothing;

-- RLS
alter table locales enable row level security;

create policy "Public read locales" on locales for select using (true);
create policy "Auth write locales"  on locales for all   using (auth.role() = 'authenticated');

-- ─── 2. Add locale column to all content tables ──────────────────────────────
-- DEFAULT 'en-US' backfills all existing rows automatically.

alter table basics       add column if not exists locale text not null default 'en-US' references locales(code);
alter table profiles     add column if not exists locale text not null default 'en-US' references locales(code);
alter table work         add column if not exists locale text not null default 'en-US' references locales(code);
alter table education    add column if not exists locale text not null default 'en-US' references locales(code);
alter table skill_groups add column if not exists locale text not null default 'en-US' references locales(code);
alter table skills       add column if not exists locale text not null default 'en-US' references locales(code);
alter table languages    add column if not exists locale text not null default 'en-US' references locales(code);
alter table interests    add column if not exists locale text not null default 'en-US' references locales(code);
alter table projects     add column if not exists locale text not null default 'en-US' references locales(code);
alter table certifications add column if not exists locale text not null default 'en-US' references locales(code);
alter table testimonials add column if not exists locale text not null default 'en-US' references locales(code);

-- ─── 3. Unique index on basics (one row per locale) ─────────────────────────

create unique index if not exists basics_locale_unique on basics (locale);

-- ─── 4. Indexes for locale filter performance ────────────────────────────────

create index if not exists idx_profiles_locale     on profiles     (locale);
create index if not exists idx_work_locale         on work         (locale);
create index if not exists idx_education_locale    on education    (locale);
create index if not exists idx_skill_groups_locale on skill_groups (locale);
create index if not exists idx_skills_locale       on skills       (locale);
create index if not exists idx_languages_locale    on languages    (locale);
create index if not exists idx_interests_locale    on interests    (locale);
create index if not exists idx_projects_locale     on projects     (locale);
create index if not exists idx_certifications_locale on certifications (locale);
create index if not exists idx_testimonials_locale on testimonials (locale);
