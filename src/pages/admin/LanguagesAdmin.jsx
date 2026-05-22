import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'

// Each level has: a natural label, a CEFR code (null = non-CEFR), and a sort order
export const LANGUAGE_LEVELS = [
  { label: 'Mother Tongue',      labelDe: 'Muttersprache',       cefr: null, sort: 7 },
  { label: 'Fluent',             labelDe: 'Fließend',            cefr: 'C2', sort: 6 },
  { label: 'Advanced',           labelDe: 'Fortgeschritten',     cefr: 'C1', sort: 5 },
  { label: 'Upper Intermediate', labelDe: 'Obere Mittelstufe',   cefr: 'B2', sort: 4 },
  { label: 'Intermediate',       labelDe: 'Mittelstufe',         cefr: 'B1', sort: 3 },
  { label: 'Elementary',         labelDe: 'Grundkenntnisse',     cefr: 'A2', sort: 2 },
  { label: 'Beginner',           labelDe: 'Anfänger',            cefr: 'A1', sort: 1 },
]

// Normalize any stored value (old CEFR code or natural label) → canonical label
function normalizeLevel(raw) {
  if (!raw) return ''
  const match = LANGUAGE_LEVELS.find(l => l.label === raw || l.cefr === raw)
  return match?.label || ''
}

const EMPTY = { name: '', level: '' }

export function LanguagesAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { adminLocale } = useAdminLocale()

  const load = async () => {
    if (!supabase) { setItems(fallbackData.languages || []); setLoading(false); return }
    const { data } = await supabase.from('languages').select('*').eq('locale', adminLocale).order('name')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  return (
    <CrudPage
      title="Languages"
      table="languages"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={{...EMPTY, locale: adminLocale}}
      renderRow={(item) => {
        const match = LANGUAGE_LEVELS.find(l => l.label === item.level)
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{item.name}</span>
            {item.level && <Badge variant="secondary" className="text-xs">{item.level}</Badge>}
            {match?.cefr && <Badge variant="outline" className="text-xs font-mono">{match.cefr}</Badge>}
          </div>
        )
      }}
      renderForm={(form, setForm) => {
        const normalized = normalizeLevel(form.level)
        const match = LANGUAGE_LEVELS.find(l => l.label === normalized)
        return (
          <>
            <Input
              label="Language Name"
              value={form.name || ''}
              onChange={e => setForm(f => ({...f, name: e.target.value}))}
            />
            <div className="space-y-1">
              <label className="text-sm font-medium">Proficiency Level</label>
              <select
                value={normalized}
                onChange={e => setForm(f => ({...f, level: e.target.value}))}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="" disabled>Select level…</option>
                {LANGUAGE_LEVELS.map(({ label, cefr }) => (
                  <option key={label} value={label}>
                    {label}{cefr ? ` (${cefr})` : ''}
                  </option>
                ))}
              </select>
              {match?.cefr && (
                <p className="text-xs text-muted-foreground">CEFR equivalent: {match.cefr}</p>
              )}
            </div>
          </>
        )
      }}
    />
  )
}
