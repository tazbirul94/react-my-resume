import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export function CrudPage({ title, table, items = [], loading, renderRow, renderForm, emptyForm, onRefresh }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const openAdd = () => { setEditing(null); setForm(emptyForm); setDialogOpen(true) }
  const openEdit = (item) => { setEditing(item); setForm(item); setDialogOpen(true) }

  const handleSave = async () => {
    if (!supabase) { alert('Supabase not configured'); return }
    setSaving(true)
    try {
      if (editing) {
        await supabase.from(table).update(form).eq('id', editing.id)
      } else {
        await supabase.from(table).insert(form)
      }
      setDialogOpen(false)
      onRefresh?.()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!supabase) return
    await supabase.from(table).delete().eq('id', id)
    setDeleteConfirm(null)
    onRefresh?.()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button onClick={openAdd} size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-muted-foreground">No entries yet. Click Add to create one.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="py-3 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">{renderRow(item)}</div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => setDeleteConfirm(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title={editing ? `Edit ${title}` : `Add ${title}`}>
        <div className="space-y-4">
          {renderForm(form, setForm)}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Confirm Delete">
        <p className="text-muted-foreground mb-4">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
        </div>
      </Dialog>
    </div>
  )
}
