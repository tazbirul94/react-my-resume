import { useState } from 'react'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EXPORT_TABLES, fetchAllTables, downloadJson, downloadExcel } from '@/lib/exportData'

export function ExportAdmin() {
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState('')
  const [counts, setCounts] = useState(null)

  async function run(kind) {
    setBusy(kind)
    setError('')
    try {
      const tables = await fetchAllTables()
      setCounts(Object.fromEntries(Object.entries(tables).map(([k, v]) => [k, v.length])))
      if (kind === 'json') downloadJson(tables)
      else await downloadExcel(tables)
    } catch (e) {
      setError(e.message || 'Export failed.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Export / Backup</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Downloads every content table ({EXPORT_TABLES.length} tables, all locales) as one file.
        JSON keeps exact values and is best for restoring; Excel has one sheet per table for reading.
      </p>
      <Card className="max-w-xl">
        <CardHeader><CardTitle className="text-base">Download backup</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button onClick={() => run('json')} disabled={!!busy}>
              {busy === 'json' ? 'Exporting…' : 'Download JSON'}
            </Button>
            <Button variant="outline" onClick={() => run('xlsx')} disabled={!!busy}>
              {busy === 'xlsx' ? 'Exporting…' : 'Download Excel (.xlsx)'}
            </Button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {counts && (
            <ul className="text-sm text-muted-foreground grid grid-cols-2 gap-x-6">
              {Object.entries(counts).map(([k, n]) => (
                <li key={k} className="flex justify-between"><span>{k}</span><span>{n} rows</span></li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
