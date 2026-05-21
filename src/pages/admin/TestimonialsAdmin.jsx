import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'

const EMPTY = { name: '', position: '', company: '', reference: '' }

export function TestimonialsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { adminLocale } = useAdminLocale()

  const load = async () => {
    if (!supabase) { setItems(fallbackData.testimonials || []); setLoading(false); return }
    const { data } = await supabase.from('testimonials').select('*').eq('locale', adminLocale).order('name')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  return (
    <CrudPage
      title="Testimonials"
      table="testimonials"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={{...EMPTY, locale: adminLocale}}
      renderRow={(item) => (
        <div>
          <span className="font-medium">{item.name}</span>
          {item.position && <span className="text-muted-foreground">, {item.position}</span>}
          {item.company && <span className="text-muted-foreground"> @ {item.company}</span>}
          {item.reference && (
            <p className="text-sm text-muted-foreground mt-1 truncate">{item.reference}</p>
          )}
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={form.name || ''} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
            <Input label="Position / Title" value={form.position || ''} onChange={e => setForm(f => ({...f, position: e.target.value}))} />
            <Input label="Company" value={form.company || ''} onChange={e => setForm(f => ({...f, company: e.target.value}))} className="col-span-2" />
          </div>
          <Textarea label="Reference / Quote" rows={4} value={form.reference || ''} onChange={e => setForm(f => ({...f, reference: e.target.value}))} />
        </>
      )}
    />
  )
}
