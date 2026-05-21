// One-time seed script. Run after schema migration:
// VITE_SUPABASE_URL=... VITE_SUPABASE_ANON_KEY=... node src/scripts/seedLocales.js
// Uses service role key for upserts — replace anon key with service role key in env.
//
// NOTE: This script is a template. The Vite alias @/ and ES module imports from
// src/lib/fallback.js cannot be resolved directly by Node. To run it you have two options:
//   1. Use vite-node:  npx vite-node src/scripts/seedLocales.js
//   2. Manually paste the locale rows below and adjust the import path to a relative path.

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

// Import fallback data — adjust path if running from project root
// Run: node --experimental-vm-modules src/scripts/seedLocales.js
// Or compile with ts-node / vite-node

async function upsertWithLocale(table, rows, locale) {
  const payload = rows.map(({ id, ...r }) => ({ ...r, locale }))
  const { error } = await supabase.from(table).upsert(payload, { onConflict: 'locale' })
  if (error) console.error(`${table} (${locale}):`, error.message)
  else console.log(`✓ ${table} (${locale}): ${payload.length} rows`)
}

console.log('Seed script ready. Import fallbackData and deFallbackData from src/lib/fallback.js')
console.log('and call upsertWithLocale() per table. This script is a template — adapt imports for your bundler.')
