-- Migration: add tagline and hero_chips to basics
ALTER TABLE basics ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS hero_chips TEXT[];

UPDATE basics
SET
  tagline    = '8+ years building enterprise .NET systems across Germany — microservices, cloud, and fintech.',
  hero_chips = ARRAY['C#', '.NET Core', 'Docker', 'Kubernetes', 'Azure', 'MS SQL', 'RabbitMQ', 'React']
WHERE locale = 'en-US' AND tagline IS NULL;
