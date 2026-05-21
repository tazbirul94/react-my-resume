import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'

export function BasicsAdmin() {
  const [form, setForm] = useState({ name: '', label: '', email: '', phone: '', website: '', picture: '', city: '', country_code: '', summary: [] })
  const [id, setId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (!supabase) { const d = fallbackData.basics; if (d) setForm(d); return }
      const { data } = await supabase.from('basics').select('*').limit(1)
      if (data?.[0]) { setForm(data[0]); setId(data[0].id) }
    }
    load()
  }, [])

  const handleSave = async () => {
    if (!supabase) { alert('Supabase not configured'); return }
    setSaving(true)
    const payload = { ...form }
    delete payload.id
    if (id) {
      await supabase.from('basics').update(payload).eq('id', id)
    } else {
      const { data } = await supabase.from('basics').insert(payload).select()
      if (data?.[0]) setId(data[0].id)
    }
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Basics</h1>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name || ''} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
            <Input label="Job Title / Label" value={form.label || ''} onChange={e => setForm(f => ({...f, label: e.target.value}))} />
            <Input label="Email" type="email" value={form.email || ''} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            <Input label="Phone" value={form.phone || ''} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            <Input label="Website" value={form.website || ''} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
            <Input label="Profile Picture URL" value={form.picture || ''} onChange={e => setForm(f => ({...f, picture: e.target.value}))} />
            <Input label="City" value={form.city || ''} onChange={e => setForm(f => ({...f, city: e.target.value}))} />
            <Input label="Country Code" value={form.country_code || ''} onChange={e => setForm(f => ({...f, country_code: e.target.value}))} />
          </div>
          <Textarea
            label="Summary (one paragraph per line)"
            rows={4}
            value={(form.summary || []).join('\n')}
            onChange={e => setForm(f => ({...f, summary: e.target.value.split('\n').filter(Boolean)}))}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
