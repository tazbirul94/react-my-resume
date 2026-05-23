import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { useAdminLocale } from '@/context/AdminLocaleContext'
import { TagInput } from '@/components/ui/TagInput'
import { EmojiPickerInput } from '@/components/ui/EmojiPickerInput'

function PreviewCard({ item }) {
  const [showEmoji, setShowEmoji] = useState(false)

  return (
    <div style={{
      marginTop: 12, padding: 16, borderRadius: 12,
      background: 'rgb(var(--bg-secondary))',
      border: '1px solid rgba(var(--border-color) / 0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgb(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Preview
        </span>
        {item.icon && (
          <button
            onClick={() => setShowEmoji(v => !v)}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 6,
              color: showEmoji ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))',
              fontSize: 11, fontWeight: 500,
            }}
          >
            {showEmoji ? <Eye size={12} /> : <EyeOff size={12} />}
            {showEmoji ? 'Emoji on' : 'Emoji off'}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {showEmoji && item.icon && (
          <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
        )}
        <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgb(var(--accent))' }}>
          {item.title || '—'}
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(item.tags ?? []).map((tag, i) => (
          <span key={i} style={{
            fontSize: 12, padding: '4px 10px', borderRadius: 999,
            background: 'rgba(var(--bg-primary))',
            border: '1px solid rgba(var(--border-color) / 0.5)',
          }}>
            {tag}
          </span>
        ))}
        {(item.tags ?? []).length === 0 && (
          <span style={{ fontSize: 12, color: 'rgb(var(--text-secondary))' }}>No tags yet</span>
        )}
      </div>
    </div>
  )
}

export function SoftSkillsAdmin() {
  const { adminLocale } = useAdminLocale()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', icon: '', tags: [] })

  const load = async () => {
    if (!supabase) {
      setItems(fallbackData.softSkillCategories || [])
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from('soft_skill_categories')
      .select('*')
      .eq('locale', adminLocale)
      .order('sort_order')
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [adminLocale])

  const openAdd = () => {
    setEditing(null)
    setForm({ title: '', icon: '', tags: [] })
    setDialog(true)
  }

  const openEdit = (item) => {
    setEditing(item)
    setForm({ title: item.title, icon: item.icon || '', tags: item.tags || [] })
    setDialog(true)
  }

  const save = async () => {
    if (!supabase) return
    const payload = { title: form.title, icon: form.icon || null, tags: form.tags }
    if (editing) await supabase.from('soft_skill_categories').update(payload).eq('id', editing.id)
    else await supabase.from('soft_skill_categories').insert({ ...payload, locale: adminLocale })
    setDialog(false)
    load()
  }

  const remove = async (id) => {
    if (!supabase) return
    await supabase.from('soft_skill_categories').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Soft Skills</h1>
        <Button size="sm" onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {loading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="space-y-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {item.icon && <span>{item.icon}</span>}
                  {item.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-red-500" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-1">
                  {(item.tags ?? []).map(tag => (
                    <span key={tag} className="bg-muted rounded-full px-3 py-1 text-sm">{tag}</span>
                  ))}
                </div>
                <PreviewCard item={item} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialog} onClose={() => setDialog(false)} title={editing ? 'Edit Category' : 'Add Category'}>
        <div className="space-y-3">
          <Input label="Category Title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
          <EmojiPickerInput
            value={form.icon}
            onChange={icon => setForm(f => ({...f, icon}))}
            label="Emoji"
          />
          <div className="space-y-1">
            <label className="text-sm font-medium">Tags</label>
            <TagInput
              value={form.tags}
              onChange={tags => setForm(f => ({...f, tags}))}
              placeholder="Type tag and press Enter"
            />
          </div>
          {(form.title || form.tags.length > 0) && (
            <PreviewCard item={form} />
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
