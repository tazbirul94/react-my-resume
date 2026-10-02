import { supabase } from '@/lib/supabase'

export const EXPORT_TABLES = [
  'locales', 'basics', 'profiles', 'work', 'education',
  'skill_groups', 'skills', 'soft_skill_categories', 'languages',
  'interests', 'projects', 'certifications', 'testimonials',
]

export async function fetchAllTables() {
  if (!supabase) throw new Error('Supabase is not configured.')
  const entries = await Promise.all(
    EXPORT_TABLES.map(async (table) => {
      const { data, error } = await supabase.from(table).select('*')
      if (error) throw new Error(`${table}: ${error.message}`)
      return [table, data ?? []]
    })
  )
  return Object.fromEntries(entries)
}

function stamp() {
  return new Date().toISOString().slice(0, 16).replace(/[-:]/g, '').replace('T', '-')
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function downloadJson(tables) {
  const payload = { exported_at: new Date().toISOString(), tables }
  download(
    new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
    `resume-backup-${stamp()}.json`
  )
}

// Cell values: arrays become one item per line, objects become JSON text.
function toCell(v) {
  if (v === null || v === undefined) return ''
  if (Array.isArray(v)) return v.join('\n')
  if (typeof v === 'object') return JSON.stringify(v)
  return v
}

// exceljs is large, so it is only loaded when an Excel export is requested.
export async function downloadExcel(tables) {
  const { default: ExcelJS } = await import('exceljs')
  const wb = new ExcelJS.Workbook()
  wb.created = new Date()

  for (const [name, rows] of Object.entries(tables)) {
    const ws = wb.addWorksheet(name.slice(0, 31))
    const columns = [...new Set(rows.flatMap((r) => Object.keys(r)))]
    ws.columns = columns.map((key) => ({
      header: key,
      key,
      width: Math.min(60, Math.max(12, key.length + 2)),
    }))
    rows.forEach((r) => ws.addRow(Object.fromEntries(columns.map((c) => [c, toCell(r[c])]))))
    ws.getRow(1).font = { bold: true }
    ws.views = [{ state: 'frozen', ySplit: 1 }]
    ws.eachRow((row) => { row.alignment = { vertical: 'top', wrapText: true } })
  }

  const buffer = await wb.xlsx.writeBuffer()
  download(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `resume-backup-${stamp()}.xlsx`
  )
}
