import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export function SkillsAdmin() {
  const [groups, setGroups] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [groupDialog, setGroupDialog] = useState(false)
  const [skillDialog, setSkillDialog] = useState(null)
  const [editingGroup, setEditingGroup] = useState(null)
  const [editingSkill, setEditingSkill] = useState(null)
  const [groupForm, setGroupForm] = useState({ title: '', type: 'hard' })
  const [skillForm, setSkillForm] = useState({ name: '', level: 80, group_id: '' })

  const load = async () => {
    if (!supabase) {
      setGroups(fallbackData.skillGroups || [])
      setSkills(fallbackData.skills || [])
      setLoading(false)
      return
    }
    const [g, s] = await Promise.all([
      supabase.from('skill_groups').select('*').order('sort_order'),
      supabase.from('skills').select('*').order('sort_order'),
    ])
    setGroups(g.data || [])
    setSkills(s.data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const saveGroup = async () => {
    if (!supabase) return
    if (editingGroup) await supabase.from('skill_groups').update(groupForm).eq('id', editingGroup.id)
    else await supabase.from('skill_groups').insert(groupForm)
    setGroupDialog(false)
    load()
  }

  const saveSkill = async () => {
    if (!supabase) return
    if (editingSkill) await supabase.from('skills').update(skillForm).eq('id', editingSkill.id)
    else await supabase.from('skills').insert(skillForm)
    setSkillDialog(null)
    load()
  }

  const deleteGroup = async (id) => {
    if (!supabase) return
    await supabase.from('skill_groups').delete().eq('id', id)
    load()
  }

  const deleteSkill = async (id) => {
    if (!supabase) return
    await supabase.from('skills').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <Button size="sm" onClick={() => { setEditingGroup(null); setGroupForm({ title: '', type: 'hard' }); setGroupDialog(true) }} className="gap-2">
          <Plus className="h-4 w-4" /> Add Group
        </Button>
      </div>

      {loading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="space-y-4">
          {groups.map(group => (
            <Card key={group.id}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base">{group.title} <Badge variant="secondary" className="ml-2">{group.type}</Badge></CardTitle>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => { setEditingGroup(group); setGroupForm(group); setGroupDialog(true) }}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-red-500" onClick={() => deleteGroup(group.id)}><Trash2 className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" className="gap-1 ml-2" onClick={() => { setEditingSkill(null); setSkillForm({ name: '', level: 80, group_id: group.id }); setSkillDialog(group.id) }}>
                    <Plus className="h-3 w-3" /> Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(s => s.group_id === group.id).map(skill => (
                    <div key={skill.id} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1 text-sm">
                      {skill.name} <span className="text-muted-foreground">({skill.level}%)</span>
                      <button onClick={() => { setEditingSkill(skill); setSkillForm(skill); setSkillDialog(group.id) }} className="ml-1 hover:text-brand"><Pencil className="h-3 w-3" /></button>
                      <button onClick={() => deleteSkill(skill.id)} className="hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={groupDialog} onClose={() => setGroupDialog(false)} title={editingGroup ? 'Edit Group' : 'Add Group'}>
        <div className="space-y-3">
          <Input label="Title" value={groupForm.title} onChange={e => setGroupForm(f => ({...f, title: e.target.value}))} />
          <div className="space-y-1">
            <label className="text-sm font-medium">Type</label>
            <select className="w-full h-10 rounded-md border border-border bg-background px-3 text-sm" value={groupForm.type} onChange={e => setGroupForm(f => ({...f, type: e.target.value}))}>
              <option value="hard">Hard Skills</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setGroupDialog(false)}>Cancel</Button>
            <Button onClick={saveGroup}>Save</Button>
          </div>
        </div>
      </Dialog>

      <Dialog open={!!skillDialog} onClose={() => setSkillDialog(null)} title={editingSkill ? 'Edit Skill' : 'Add Skill'}>
        <div className="space-y-3">
          <Input label="Skill Name" value={skillForm.name} onChange={e => setSkillForm(f => ({...f, name: e.target.value}))} />
          <div className="space-y-1">
            <label className="text-sm font-medium">Level ({skillForm.level}%)</label>
            <input type="range" min="0" max="100" value={skillForm.level} onChange={e => setSkillForm(f => ({...f, level: Number(e.target.value)}))} className="w-full accent-brand" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setSkillDialog(null)}>Cancel</Button>
            <Button onClick={saveSkill}>Save</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
