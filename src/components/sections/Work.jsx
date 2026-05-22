import { useState } from 'react'
import { useWork } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useLocale } from '@/context/LocaleContext'
import { Skeleton } from '@/components/ui/skeleton'

function formatDate(dateStr, presentLabel = 'Present') {
  if (!dateStr) return presentLabel
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
  const { t } = useLocale()
  const [showAll, setShowAll] = useState(false)

  if (loading) return (
    <SectionWrapper id="work" eyebrow={t('sections.work.eyebrow')} title={t('sections.work.title')} alt>
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = work ?? []
  const recentItems = items.slice(0, 4)
  const olderItems = items.slice(4)
  const visibleItems = showAll ? items : recentItems

  /* career dateline: earliest year → present */
  const years = items
    .filter(j => j.start_date)
    .map(j => new Date(j.start_date).getFullYear())
  const startYear = years.length ? Math.min(...years) : null
  const endYear = new Date().getFullYear()

  return (
    <SectionWrapper id="work" eyebrow={t('sections.work.eyebrow')} title={t('sections.work.title')} alt>
      {/* Career dateline */}
      {startYear && (
        <div className="flex items-center gap-3 mb-10">
          <span className="eyebrow whitespace-nowrap">{startYear}</span>
          <div style={{ flex: 1, height: 1, background: 'rgb(var(--apple-border))' }} />
          <span className="eyebrow whitespace-nowrap">{endYear}</span>
        </div>
      )}

      <div className="space-y-4">
        {visibleItems.map((job) => (
          <div key={job.id} className="apple-card stagger-item">
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
                        {t('work.current')}
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
                  {formatDate(job.start_date, t('work.present'))} – {formatDate(job.end_date, t('work.present'))}
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

            {/* Key achievement callout */}
            {job.highlights?.[0] && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 14px',
                borderRadius: 10,
                background: 'rgba(var(--accent)/0.06)',
                border: '1px solid rgba(var(--accent)/0.15)',
                marginBottom: 10,
              }}>
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>⭐</span>
                <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55 }}>
                  {job.highlights[0]}
                </span>
              </div>
            )}

            {/* Highlights */}
            {job.highlights?.length > 0 && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {job.highlights.slice(1).map((h, i) => (
                  <li key={h} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
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

      {olderItems.length > 0 && (
        <button
          onClick={() => setShowAll(v => !v)}
          style={{
            display: 'block', width: '100%', marginTop: 12,
            padding: '12px 0',
            borderRadius: 14,
            border: '1px dashed rgb(var(--apple-border))',
            background: 'transparent',
            color: 'rgb(var(--text-tertiary))',
            fontSize: 'var(--type-small)', fontWeight: 500,
            cursor: 'pointer',
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgb(var(--text-secondary))'; e.currentTarget.style.color = 'rgb(var(--text-secondary))' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgb(var(--apple-border))'; e.currentTarget.style.color = 'rgb(var(--text-tertiary))' }}
        >
          {showAll ? '↑ Show less' : `↓ Show ${olderItems.length} earlier ${olderItems.length === 1 ? 'role' : 'roles'}`}
        </button>
      )}
    </SectionWrapper>
  )
}
