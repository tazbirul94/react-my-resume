import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/DatePicker'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'

const EMPTY = { institution: '', degree: '', area: '', start_date: '', end_date: '', gpa: '', gpa_german: '', website: '', location: '', summary: '' }

export function EducationAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!supabase) { setItems(fallbackData.education || []); setLoading(false); return }
    const { data } = await supabase.from('education').select('*').order('start_date', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <CrudPage
      title="Education"
      table="education"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={EMPTY}
      renderRow={(item) => (
        <div>
          <span className="font-medium">{item.degree}</span>
          {item.area && <span className="text-muted-foreground"> in {item.area}</span>}
          <span className="text-muted-foreground"> @ {item.institution}</span>
          <Badge variant="secondary" className="ml-2 text-xs">{item.start_date?.slice(0,7)} — {item.end_date?.slice(0,7) || 'Present'}</Badge>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Institution" value={form.institution || ''} onChange={e => setForm(f => ({...f, institution: e.target.value}))} />
            <Input label="Degree" value={form.degree || ''} onChange={e => setForm(f => ({...f, degree: e.target.value}))} />
            <Input label="Area / Field of Study" value={form.area || ''} onChange={e => setForm(f => ({...f, area: e.target.value}))} />
            <Input label="GPA" value={form.gpa || ''} onChange={e => setForm(f => ({...f, gpa: e.target.value}))} />
            <Input label="GPA (German scale)" value={form.gpa_german || ''} onChange={e => setForm(f => ({...f, gpa_german: e.target.value}))} />
            <Input label="Website" value={form.website || ''} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
            <DatePicker label="Start Date" value={form.start_date || ''} onChange={v => setForm(f => ({...f, start_date: v}))} clearable={false} />
            <DatePicker label="End Date (blank = Present)" value={form.end_date || ''} onChange={v => setForm(f => ({...f, end_date: v || null}))} placeholder="Present" />
            <Input label="Location" value={form.location || ''} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="col-span-2" />
          </div>
          <Textarea label="Summary" value={form.summary || ''} onChange={e => setForm(f => ({...f, summary: e.target.value}))} />
        </>
      )}
    />
  )
}
