import { useState, useEffect } from 'react'
import { CrudPage } from '@/components/admin/CrudPage'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/DatePicker'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'

const EMPTY = { title: '', issuer: '', logo: '', issue_date: '', credential_url: '' }

export function CertificationsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { adminLocale } = useAdminLocale()

  const load = async () => {
    if (!supabase) { setItems(fallbackData.certifications || []); setLoading(false); return }
    const { data } = await supabase.from('certifications').select('*').eq('locale', adminLocale).order('issue_date', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  return (
    <CrudPage
      title="Certifications"
      table="certifications"
      items={items}
      loading={loading}
      onRefresh={load}
      emptyForm={{...EMPTY, locale: adminLocale}}
      renderRow={(item) => (
        <div>
          <span className="font-medium">{item.title}</span>
          {item.issuer && <span className="text-muted-foreground"> — {item.issuer}</span>}
          {item.issue_date && <Badge variant="secondary" className="ml-2 text-xs">{item.issue_date?.slice(0,7)}</Badge>}
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Title" value={form.title || ''} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
            <Input label="Issuer" value={form.issuer || ''} onChange={e => setForm(f => ({...f, issuer: e.target.value}))} />
            <Input label="Issuer Logo URL" value={form.logo || ''} onChange={e => setForm(f => ({...f, logo: e.target.value}))} />
            <DatePicker label="Issue Date" value={form.issue_date || ''} onChange={v => setForm(f => ({...f, issue_date: v}))} />
            <Input label="Credential URL" value={form.credential_url || ''} onChange={e => setForm(f => ({...f, credential_url: e.target.value}))} className="col-span-2" />
          </div>
        </>
      )}
    />
  )
}
