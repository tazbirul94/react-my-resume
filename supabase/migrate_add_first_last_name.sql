ALTER TABLE basics ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS last_name  TEXT;

-- Backfill from existing name column (e.g. 'MD TAZBIRUL HAQUE' → first='Tazbirul', last='Haque')
UPDATE basics
SET
  first_name = initcap(split_part(name, ' ', 2)),
  last_name  = initcap(split_part(name, ' ', 3))
WHERE first_name IS NULL;
