import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'

const EMPTY = { name: '', keywords: [] }

export function InterestsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!supabase) { setItems(fallbackData.interests || []); setLoading(false); return }
    const { data } = await supabase.from('interests').select('*').order('name')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <CrudPage
      title="Interests"
      table="interests"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={EMPTY}
      renderRow={(item) => (
        <div>
          <span className="font-medium">{item.name}</span>
          {(item.keywords || []).length > 0 && (
            <span className="text-muted-foreground text-sm ml-2">{item.keywords.join(', ')}</span>
          )}
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <Input label="Interest Name" value={form.name || ''} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
          <Input label="Keywords (comma separated)" value={(form.keywords || []).join(', ')} onChange={e => setForm(f => ({...f, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean)}))} />
        </>
      )}
    />
  )
}
