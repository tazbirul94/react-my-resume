import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'

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
      renderRow={(item) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.name}</span>
          {item.level && <Badge variant="secondary" className="text-xs">{item.level}</Badge>}
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <Input label="Language Name" value={form.name || ''} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          <Input label="Proficiency Level (e.g. Native, Fluent, B2)" value={form.level || ''} onChange={e => setForm(f => ({...f, level: e.target.value}))} />
        </>
      )}
    />
  )
}
