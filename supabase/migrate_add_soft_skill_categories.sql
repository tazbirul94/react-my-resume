-- Migration: add soft_skill_categories table
-- Safe to re-run (CREATE TABLE IF NOT EXISTS, INSERT with ON CONFLICT DO NOTHING)

CREATE TABLE IF NOT EXISTS soft_skill_categories (
  id         uuid primary key default gen_random_uuid(),
  locale     text not null default 'en-US' references locales(code),
  title      text not null,
  icon       text,
  tags       text[] default '{}',
  sort_order int default 0
);

ALTER TABLE soft_skill_categories ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'soft_skill_categories' AND policyname = 'Public read soft_skill_categories'
  ) THEN
    CREATE POLICY "Public read soft_skill_categories" ON soft_skill_categories FOR SELECT USING (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'soft_skill_categories' AND policyname = 'Auth write soft_skill_categories'
  ) THEN
    CREATE POLICY "Auth write soft_skill_categories" ON soft_skill_categories FOR ALL USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- en-US seed
INSERT INTO soft_skill_categories (locale, title, icon, tags, sort_order) VALUES
  ('en-US', 'Communication',  '💬', ARRAY['Technical Writing', 'Stakeholder Presentation', 'Cross-cultural Collaboration'], 0),
  ('en-US', 'Leadership',     '🌱', ARRAY['Team Mentoring', 'Code Review Culture', 'Initiative Taking'],                    1),
  ('en-US', 'Delivery',       '⚡', ARRAY['Agile / Scrum', 'Deadline-driven', 'Iterative Improvement'],                    2),
  ('en-US', 'Collaboration',  '🤝', ARRAY['Remote-first', 'Pair Programming', 'Knowledge Sharing'],                        3)
ON CONFLICT DO NOTHING;

-- de-DE seed
INSERT INTO soft_skill_categories (locale, title, icon, tags, sort_order) VALUES
  ('de-DE', 'Kommunikation',  '💬', ARRAY['Technisches Schreiben', 'Stakeholder-Präsentation', 'Interkulturelle Zusammenarbeit'], 0),
  ('de-DE', 'Führung',        '🌱', ARRAY['Team-Mentoring', 'Code-Review-Kultur', 'Eigeninitiative'],                           1),
  ('de-DE', 'Lieferung',      '⚡', ARRAY['Agile / Scrum', 'Termintreue', 'Iterative Verbesserung'],                           2),
  ('de-DE', 'Zusammenarbeit', '🤝', ARRAY['Remote-first', 'Pair Programming', 'Wissensteilung'],                               3)
ON CONFLICT DO NOTHING;
