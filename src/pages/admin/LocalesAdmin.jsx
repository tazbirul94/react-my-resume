import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { Plus, Trash2 } from 'lucide-react'

export function LocalesAdmin() {
  const [locales, setLocales] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [form, setForm] = useState({ code: '', label: '' })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase.from('locales').select('*').order('sort_order')
    setLocales(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!supabase || !form.code || !form.label) return
    setSaving(true)
    await supabase.from('locales').insert({
      code: form.code,
      label: form.label,
      is_active: true,
      sort_order: locales.length,
    })
    setSaving(false)
    setDialogOpen(false)
    setForm({ code: '', label: '' })
    load()
  }

  const toggleActive = async (locale) => {
    if (!supabase || locale.code === 'en-US') return
    await supabase.from('locales').update({ is_active: !locale.is_active }).eq('code', locale.code)
    load()
  }

  const handleDelete = async (code) => {
    if (!supabase || code === 'en-US') return
    await supabase.from('locales').delete().eq('code', code)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Locales</h1>
        <Button size="sm" className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Add Locale
        </Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-3">
          {locales.map(loc => (
            <Card key={loc.code}>
              <CardContent className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold">{loc.code}</span>
                  <span className="text-muted-foreground">{loc.label}</span>
                  <Badge variant={loc.is_active ? 'default' : 'secondary'}>
                    {loc.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {loc.code !== 'en-US' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => toggleActive(loc)}>
                        {loc.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(loc.code)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Add Locale">
        <div className="space-y-4">
          <Input label="Code (e.g. fr-FR)" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
          <Input label="Label (e.g. FR)" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={saving}>{saving ? 'Saving…' : 'Add'}</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
