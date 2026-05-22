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

function groupByCompany(jobs) {
  const map = new Map()
  jobs.forEach(job => {
    if (!map.has(job.company)) {
      map.set(job.company, {
        company: job.company,
        logo: job.logo,
        website: job.website,
        location: job.location,
        roles: [],
      })
    }
    map.get(job.company).roles.push(job)
  })
  return Array.from(map.values())
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
  const groups = groupByCompany(items)
  const visibleGroups = showAll ? groups : groups.slice(0, 3)
  const hiddenCount = Math.max(0, groups.length - 3)

  return (
    <SectionWrapper id="work" eyebrow={t('sections.work.eyebrow')} title={t('sections.work.title')} alt>
      <div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Vertical timeline line — scoped to cards only */}
        <div style={{
          position: 'absolute', left: 19, top: 20, bottom: 20,
          width: 1, background: 'rgb(var(--apple-border))', zIndex: 0,
        }} />
          {visibleGroups.map((group, idx) => {
            const allRoles = group.roles
            const isCurrent = allRoles.some(r => !r.end_date)
            const earliestStart = allRoles.map(r => r.start_date).filter(Boolean).sort()[0]
            const latestEnd = isCurrent ? null : allRoles.map(r => r.end_date).filter(Boolean).sort().reverse()[0]
            const joinYear = earliestStart ? new Date(earliestStart).getFullYear() : null
            const totalDuration = earliestStart ? duration(earliestStart, latestEnd) : null
            const allSkills = [...new Set(allRoles.flatMap(r => r.skills ?? []))]
            const multiRole = allRoles.length > 1

            return (
              <div key={group.company} style={{ display: 'flex', gap: 16, position: 'relative' }}>

                {/* Dot + year */}
                <div style={{
                  flexShrink: 0, width: 40, display: 'flex',
                  flexDirection: 'column', alignItems: 'center',
                  paddingTop: 20, gap: 5, zIndex: 1,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: isCurrent ? '#22c55e' : 'rgb(var(--bg-primary))',
                    border: `2px solid ${isCurrent ? '#22c55e' : 'rgb(var(--apple-border))'}`,
                    boxShadow: isCurrent ? '0 0 0 4px rgba(34,197,94,0.18)' : 'none',
                  }} />
                  {joinYear && (
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: 'rgb(var(--text-tertiary))',
                      letterSpacing: '0.04em',
                    }}>
                      {joinYear}
                    </span>
                  )}
                </div>

                {/* Company card */}
                <div style={{ flex: 1, minWidth: 0 }} className="apple-card stagger-item">

                  {/* Company header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      background: 'rgb(var(--bg-secondary))',
                      border: '1px solid rgb(var(--apple-border))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700, color: 'rgb(var(--text-tertiary))',
                      overflow: 'hidden',
                    }}>
                      {group.logo ? (
                        <img src={group.logo} alt={group.company}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = group.company?.[0] || '?' }} />
                      ) : (group.company?.[0] || '?')}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {group.website ? (
                        <a href={group.website} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 'var(--type-card-h)', fontWeight: 700, color: 'rgb(var(--text-primary))', textDecoration: 'none' }}>
                          {group.company}
                        </a>
                      ) : (
                        <span style={{ fontSize: 'var(--type-card-h)', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>
                          {group.company}
                        </span>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 3 }}>
                        {group.location && (
                          <span style={{ fontSize: 'var(--type-micro)', color: 'rgb(var(--text-tertiary))' }}>
                            {group.location}
                          </span>
                        )}
                        {totalDuration && (
                          <span style={{ fontSize: 'var(--type-micro)', color: 'rgb(var(--text-tertiary))' }}>
                            · {totalDuration}
                          </span>
                        )}
                        {isCurrent && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                            fontSize: 10, fontWeight: 600, color: '#22c55e',
                            background: 'rgba(34,197,94,0.10)',
                            padding: '2px 8px', borderRadius: 20,
                          }}>
                            <span
                              className="current-dot"
                              style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }}
                            />
                            {t('work.current')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Roles */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {allRoles.map((role, ri) => (
                      <div key={role.id} style={{
                        paddingTop: ri > 0 ? 14 : 0,
                        marginTop: ri > 0 ? 14 : 0,
                        borderTop: ri > 0 ? '1px solid rgb(var(--apple-border-subtle))' : 'none',
                        paddingLeft: multiRole ? 14 : 0,
                        borderLeft: multiRole ? '2px solid rgb(var(--apple-border-subtle))' : 'none',
                        marginLeft: multiRole ? 6 : 0,
                      }}>
                        {/* Role title + dates */}
                        <div style={{
                          display: 'flex', flexWrap: 'wrap',
                          alignItems: 'flex-start', justifyContent: 'space-between',
                          gap: 8, marginBottom: 10,
                        }}>
                          <h3 style={{
                            fontSize: 'var(--type-small)', fontWeight: 600,
                            color: 'rgb(var(--text-primary))', margin: 0,
                          }}>
                            {role.position}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
                            <span className="apple-chip" style={{ background: 'rgb(var(--bg-secondary))' }}>
                              {formatDate(role.start_date, t('work.present'))} – {formatDate(role.end_date, t('work.present'))}
                            </span>
                            {role.start_date && (
                              <span className="eyebrow" style={{ color: 'rgb(var(--text-tertiary))' }}>
                                {duration(role.start_date, role.end_date)}
                              </span>
                            )}
                          </div>
                        </div>

                        {role.summary && (
                          <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.65, marginBottom: 10 }}>
                            {role.summary}
                          </p>
                        )}

                        {role.highlights?.[0] && (
                          <div style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '10px 14px', borderRadius: 10,
                            background: 'rgba(var(--accent)/0.06)',
                            border: '1px solid rgba(var(--accent)/0.15)',
                            marginBottom: 10,
                          }}>
                            <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>⭐</span>
                            <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55 }}>
                              {role.highlights[0]}
                            </span>
                          </div>
                        )}

                        {role.highlights?.slice(1).length > 0 && (
                          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {role.highlights.slice(1).map(h => (
                              <li key={h} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <span style={{ color: 'rgb(var(--text-tertiary))', fontSize: 13, marginTop: 2, flexShrink: 0 }}>—</span>
                                <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55 }}>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Merged skill chips across all roles */}
                  {allSkills.length > 0 && (
                    <div style={{
                      display: 'flex', flexWrap: 'wrap', gap: 6,
                      paddingTop: 14, marginTop: 12,
                      borderTop: '1px solid rgb(var(--apple-border-subtle))',
                    }}>
                      {allSkills.map(s => (
                        <span key={s} className="apple-chip font-mono-code"
                          style={{ fontSize: 12, background: 'rgb(var(--bg-secondary))' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {hiddenCount > 0 && (
          <button
            onClick={() => setShowAll(v => !v)}
            style={{
              display: 'block', width: '100%', marginTop: 16,
              padding: '12px 0', borderRadius: 14,
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
            {showAll
              ? '↑ Show less'
              : `↓ Show ${hiddenCount} earlier ${hiddenCount === 1 ? 'position' : 'positions'}`}
          </button>
        )}
      </div>
    </SectionWrapper>
  )
}
