import { useWork } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function duration(start, end) {
  const s = new Date(start)
  const e = end ? new Date(end) : new Date()
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  if (months < 12) return `${months}mo`
  const y = Math.floor(months / 12)
  const m = months % 12
  return m ? `${y}y ${m}mo` : `${y}y`
}

function isCurrent(job) {
  return !job.end_date
}

export function Work() {
  const { data: work, loading } = useWork()

  if (loading) return (
    <SectionWrapper id="work" eyebrow="Experience" title="Where I've Built Things" alt>
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = work ?? []

  /* career dateline: earliest year → present */
  const years = items
    .filter(j => j.start_date)
    .map(j => new Date(j.start_date).getFullYear())
  const startYear = years.length ? Math.min(...years) : null
  const endYear = new Date().getFullYear()

  return (
    <SectionWrapper id="work" eyebrow="Experience" title="Where I've Built Things" alt>
      {/* Career dateline */}
      {startYear && (
        <div className="flex items-center gap-3 mb-10">
          <span className="eyebrow whitespace-nowrap">{startYear}</span>
          <div style={{ flex: 1, height: 1, background: 'rgb(var(--apple-border))' }} />
          <span className="eyebrow whitespace-nowrap">{endYear}</span>
        </div>
      )}

      <div className="space-y-4">
        {items.map((job) => (
          <div key={job.id} className="apple-card">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                {/* Company logo or initial */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'rgb(var(--bg-secondary))',
                  border: '1px solid rgb(var(--apple-border))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700, color: 'rgb(var(--text-tertiary))',
                  overflow: 'hidden',
                }}>
                  {job.logo ? (
                    <img src={job.logo} alt={job.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = job.company?.[0] || '?' }} />
                  ) : (job.company?.[0] || '?')}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', margin: 0 }}>
                      {job.position}
                    </h3>
                    {isCurrent(job) && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 11, fontWeight: 600,
                        color: '#22c55e',
                        background: 'rgba(34,197,94,0.1)',
                        padding: '2px 8px', borderRadius: 20,
                      }}>
                        <span
                          className="current-dot"
                          style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}
                        />
                        Current
                      </span>
                    )}
                  </div>
                  {job.website ? (
                    <a href={job.website} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--accent))', textDecoration: 'none', fontWeight: 500 }}>
                      {job.company}
                    </a>
                  ) : (
                    <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>
                      {job.company}
                    </span>
                  )}
                </div>
              </div>

              {/* Date chip */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                <span className="apple-chip" style={{ background: 'rgb(var(--bg-secondary))' }}>
                  {formatDate(job.start_date)} – {formatDate(job.end_date)}
                </span>
                {job.start_date && (
                  <span className="eyebrow" style={{ color: 'rgb(var(--text-tertiary))' }}>
                    {duration(job.start_date, job.end_date)}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            {job.summary && (
              <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.65, marginBottom: 12 }}>
                {job.summary}
              </p>
            )}

            {/* Highlights */}
            {job.highlights?.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {job.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'rgb(var(--text-tertiary))', fontSize: 13, marginTop: 2, flexShrink: 0 }}>—</span>
                    <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55 }}>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Skill chips */}
            {job.skills?.length > 0 && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
                paddingTop: 14, marginTop: 4,
                borderTop: '1px solid rgb(var(--apple-border-subtle))',
              }}>
                {job.skills.map(s => (
                  <span key={s} className="apple-chip font-mono-code"
                    style={{ fontSize: 12, background: 'rgb(var(--bg-secondary))' }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
