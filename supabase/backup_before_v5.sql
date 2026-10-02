-- ============================================================
-- Backup of the currently deployed resume content.
-- Run this in the Supabase SQL Editor BEFORE update_tazbirul_cv_v5_aligned.sql.
-- Copies every content table into a bak_20261002_* table (same project,
-- so no data leaves Supabase). Safe to re-run only after dropping the
-- bak_ tables (CREATE TABLE fails if one already exists, by design).
-- ============================================================

BEGIN;

CREATE TABLE bak_20261002_basics                AS SELECT * FROM basics;
CREATE TABLE bak_20261002_profiles              AS SELECT * FROM profiles;
CREATE TABLE bak_20261002_work                  AS SELECT * FROM work;
CREATE TABLE bak_20261002_education             AS SELECT * FROM education;
CREATE TABLE bak_20261002_skill_groups          AS SELECT * FROM skill_groups;
CREATE TABLE bak_20261002_skills                AS SELECT * FROM skills;
CREATE TABLE bak_20261002_soft_skill_categories AS SELECT * FROM soft_skill_categories;
CREATE TABLE bak_20261002_languages             AS SELECT * FROM languages;
CREATE TABLE bak_20261002_interests             AS SELECT * FROM interests;
CREATE TABLE bak_20261002_projects              AS SELECT * FROM projects;
CREATE TABLE bak_20261002_certifications        AS SELECT * FROM certifications;
CREATE TABLE bak_20261002_testimonials          AS SELECT * FROM testimonials;

-- Keep the backups private: RLS on with no policies = no API access.
ALTER TABLE bak_20261002_basics                ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_work                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_education             ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_skill_groups          ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_skills                ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_soft_skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_languages             ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_interests             ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_projects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_certifications        ENABLE ROW LEVEL SECURITY;
ALTER TABLE bak_20261002_testimonials          ENABLE ROW LEVEL SECURITY;

COMMIT;

-- Verify row counts match the live tables:
-- SELECT 'work' t, (SELECT count(*) FROM work) live, (SELECT count(*) FROM bak_20261002_work) bak
-- UNION ALL SELECT 'skills', (SELECT count(*) FROM skills), (SELECT count(*) FROM bak_20261002_skills)
-- UNION ALL SELECT 'basics', (SELECT count(*) FROM basics), (SELECT count(*) FROM bak_20261002_basics);

-- ------------------------------------------------------------
-- Restore (only if v5 needs rolling back). Example for work:
--   DELETE FROM work;  INSERT INTO work SELECT * FROM bak_20261002_work;
-- Same pattern for basics. For skills: restore skill_groups first, then skills.
-- ------------------------------------------------------------
