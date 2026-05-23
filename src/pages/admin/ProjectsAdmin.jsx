import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TagInput } from '@/components/ui/TagInput'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/DatePicker'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'

const EMPTY = { name: '', category: '', publisher: '', website: '', description: '', image_thumb: '', image_modal: '', release_date: '', keywords: [] }

export function ProjectsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { adminLocale } = useAdminLocale()

  const load = async () => {
    if (!supabase) { setItems(fallbackData.projects || []); setLoading(false); return }
    const { data } = await supabase.from('projects').select('*').eq('locale', adminLocale).order('release_date', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  return (
    <CrudPage
      title="Projects"
      table="projects"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={{...EMPTY, locale: adminLocale}}
      renderRow={(item) => (
        <div>
          <span className="font-medium">{item.name}</span>
          {item.category && <Badge variant="secondary" className="ml-2 text-xs">{item.category}</Badge>}
          {item.publisher && <span className="text-muted-foreground text-sm ml-2">by {item.publisher}</span>}
          {item.release_date && <span className="text-muted-foreground text-sm ml-2">{item.release_date?.slice(0,7)}</span>}
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={form.name || ''} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
            <Input label="Category" value={form.category || ''} onChange={e => setForm(f => ({...f, category: e.target.value}))} />
            <Input label="Publisher" value={form.publisher || ''} onChange={e => setForm(f => ({...f, publisher: e.target.value}))} />
            <Input label="Website" value={form.website || ''} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
            <Input label="Thumbnail Image URL" value={form.image_thumb || ''} onChange={e => setForm(f => ({...f, image_thumb: e.target.value}))} />
            <Input label="Modal Image URL" value={form.image_modal || ''} onChange={e => setForm(f => ({...f, image_modal: e.target.value}))} />
            <DatePicker label="Release Date" value={form.release_date || ''} onChange={v => setForm(f => ({...f, release_date: v}))} />
          </div>
          <Textarea label="Description" value={form.description || ''} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
          <TagInput label="Keywords" value={form.keywords || []} onChange={chips => setForm(f => ({ ...f, keywords: chips }))} />
        </>
      )}
    />
  )
}
