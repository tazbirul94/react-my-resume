import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { TagInput } from '@/components/ui/TagInput'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/DatePicker'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'
import { useLocale } from '@/context/LocaleContext'

const EMPTY = { company: '', position: '', website: '', start_date: '', end_date: '', summary: '', highlights: [], skills: [], employment_type: '', location: '' }

export function WorkAdmin() {
  const { adminLocale } = useAdminLocale()
  const { t } = useLocale()
  const empTypes = t('work.employmentTypes') ?? []
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!supabase) { setItems(fallbackData.work || []); setLoading(false); return }
    const { data } = await supabase.from('work').select('*').eq('locale', adminLocale).order('start_date', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  return (
    <CrudPage
      title="Work Experience"
      table="work"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={{...EMPTY, locale: adminLocale}}
      renderRow={(item) => (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{item.position}</span>
          <span className="text-muted-foreground">@ {item.company}</span>
          {item.employment_type && (
            <Badge variant="outline" className="text-xs">{item.employment_type}</Badge>
          )}
          <Badge variant="secondary" className="text-xs">{item.start_date?.slice(0,7)} — {item.end_date?.slice(0,7) || 'Present'}</Badge>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Company" value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
            <Input label="Position" value={form.position} onChange={e => setForm(f => ({...f, position: e.target.value}))} />
            <DatePicker label="Start Date" value={form.start_date} onChange={v => setForm(f => ({...f, start_date: v}))} clearable={false} />
            <DatePicker label="End Date (blank = Present)" value={form.end_date || ''} onChange={v => setForm(f => ({...f, end_date: v || null}))} placeholder="Present" />
            <Input label="Website" value={form.website || ''} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
            <Input label="Location" value={form.location || ''} onChange={e => setForm(f => ({...f, location: e.target.value}))} />
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                {adminLocale === 'de-DE' ? 'Beschäftigungsart' : 'Employment Type'}
              </label>
              <select
                value={form.employment_type || ''}
                onChange={e => setForm(f => ({...f, employment_type: e.target.value}))}
                className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">{adminLocale === 'de-DE' ? '— Auswählen —' : '— Select —'}</option>
                {Array.isArray(empTypes) && empTypes.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <Textarea label="Summary" value={form.summary || ''} onChange={e => setForm(f => ({...f, summary: e.target.value}))} />
          <Textarea label="Highlights (one per line)" value={(form.highlights || []).join('\n')} onChange={e => setForm(f => ({...f, highlights: e.target.value.split('\n').filter(Boolean)}))} />
          <TagInput label="Skills" value={form.skills || []} onChange={chips => setForm(f => ({ ...f, skills: chips }))} />
        </>
      )}
    />
  )
}
