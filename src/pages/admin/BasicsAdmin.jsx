import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { TagInput } from '@/components/ui/TagInput'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { fallbackData } from '@/lib/fallback'
import { useAdminLocale } from '@/context/AdminLocaleContext'
import { Upload, X } from 'lucide-react'

export function BasicsAdmin() {
  const { adminLocale } = useAdminLocale()
  const [form, setForm] = useState({ name: '', label: '', tagline: '', hero_chips: [], email: '', phone: '', website: '', picture: '', city: '', country_code: '', summary: [] })
  const [id, setId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [blobPreview, setBlobPreview] = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    const load = async () => {
      if (!supabase) { const d = fallbackData.basics; if (d) setForm(d); return }
      const { data } = await supabase.from('basics').select('*').eq('locale', adminLocale).limit(1)
      if (data?.[0]) { setForm(data[0]); setId(data[0].id) }
    }
    load()
  }, [adminLocale])

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    setBlobPreview(localUrl)
    if (!supabase) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `avatars/${adminLocale}-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!error) {
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
      setForm(f => ({ ...f, picture: urlData.publicUrl }))
    }
    setBlobPreview('')
    setUploading(false)
  }

  const handleSave = async () => {
    if (!supabase) { alert('Supabase not configured'); return }
    setSaving(true)
    const payload = { ...form }
    delete payload.id
    payload.locale = adminLocale
    const { data } = await supabase.from('basics').upsert({ ...payload, locale: adminLocale }, { onConflict: 'locale' }).select()
    if (data?.[0]) setId(data[0].id)
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
          </div>
          <Input label="Tagline (one-liner shown in hero)" value={form.tagline || ''} onChange={e => setForm(f => ({...f, tagline: e.target.value}))} />
          <TagInput
            label="Hero Tech Chips (shown under tagline in hero)"
            value={form.hero_chips || []}
            onChange={chips => setForm(f => ({ ...f, hero_chips: chips }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email" type="email" value={form.email || ''} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
            <Input label="Phone" value={form.phone || ''} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
            <Input label="Website" value={form.website || ''} onChange={e => setForm(f => ({...f, website: e.target.value}))} />
            <Input label="City" value={form.city || ''} onChange={e => setForm(f => ({...f, city: e.target.value}))} />
            <Input label="Country Code" value={form.country_code || ''} onChange={e => setForm(f => ({...f, country_code: e.target.value}))} />
          </div>

          {/* Photo upload */}
          <div>
            <p className="text-sm font-medium mb-2">Profile Photo</p>
            <div className="flex items-start gap-4">
              {(blobPreview || form.picture) ? (
                <div className="relative shrink-0">
                  <img
                    src={blobPreview || form.picture}
                    alt="Profile"
                    className="w-24 h-24 rounded-xl object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => { setBlobPreview(''); setForm(f => ({ ...f, picture: '' })) }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center"
                  >
                    <X size={11} />
                  </button>
                </div>
              ) : (
                <div
                  className="w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary transition-colors shrink-0"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload size={18} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Upload</span>
                </div>
              )}
              <div className="flex items-end">
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? 'Uploading…' : 'Choose photo'}
                </Button>
              </div>
            </div>
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
