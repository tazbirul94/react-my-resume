import { useEducation } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

function formatDate(dateStr, presentLabel) {
  if (!dateStr) return presentLabel
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function Education() {
  const { data: education, loading } = useEducation()
  const { t, locale } = useLocale()
  const present = t('education.present')

  if (loading) return (
    <SectionWrapper id="education" eyebrow={t('sections.education.eyebrow')} title={t('sections.education.title')}>
      <div className="space-y-4">{[1,2].map(i => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}</div>
    </SectionWrapper>
  )

  const items = education ?? []

  return (
    <SectionWrapper id="education" eyebrow={t('sections.education.eyebrow')} title={t('sections.education.title')}>
      <div className="space-y-4">
        {items.map((edu, idx) => (
          <div key={edu.id ?? idx} className="apple-card">
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              {/* Institution logo or initial */}
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: 'rgb(var(--bg-secondary))',
                border: '1px solid rgb(var(--apple-border))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 700, color: 'rgb(var(--text-tertiary))',
                overflow: 'hidden',
              }}>
                {edu.logo ? (
                  <img src={edu.logo} alt={edu.institution}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = edu.institution?.[0] || '?' }} />
                ) : (edu.institution?.[0] || '?')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 3 }}>
                      {edu.degree || edu.area}
                      {edu.degree && edu.area && (
                        <span style={{ fontWeight: 400, color: 'rgb(var(--text-secondary))', marginLeft: 6 }}>
                          — {edu.area}
                        </span>
                      )}
                    </h3>
                    {edu.website ? (
                      <a href={edu.website} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--accent))', fontWeight: 500, textDecoration: 'none' }}>
                        {edu.institution}
                      </a>
                    ) : (
                      <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>
                        {edu.institution}
                      </span>
                    )}
                    {edu.location && (
                      <p style={{ fontSize: 'var(--type-micro)', color: 'rgb(var(--text-tertiary))', marginTop: 2 }}>{edu.location}</p>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span className="apple-chip">
                      {formatDate(edu.start_date, present)} – {formatDate(edu.end_date, present)}
                    </span>
                    {edu.gpa_german && (
                      <span
                        className="apple-chip"
                        style={{ background: 'rgba(var(--accent)/0.08)', color: 'rgb(var(--accent))', position: 'relative', cursor: 'default' }}
                        onMouseEnter={e => { const t = e.currentTarget.querySelector('.grade-tooltip'); if (t) t.style.opacity = '1'; if (t) t.style.pointerEvents = 'auto' }}
                        onMouseLeave={e => { const t = e.currentTarget.querySelector('.grade-tooltip'); if (t) t.style.opacity = '0'; if (t) t.style.pointerEvents = 'none' }}
                      >
                        {locale === 'de-DE' ? 'Note' : 'Grade'} {edu.gpa_german}
                        <span className="grade-tooltip" style={{
                          opacity: 0, pointerEvents: 'none',
                          position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
                          background: 'rgb(var(--bg-primary))',
                          border: '1px solid rgb(var(--apple-border))',
                          borderRadius: 10, padding: '10px 14px',
                          width: 220, zIndex: 50,
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          transition: 'opacity 150ms ease',
                          textAlign: 'left',
                        }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: 8, whiteSpace: 'nowrap' }}>
                            {locale === 'de-DE' ? 'Deutsche Notenskala' : 'German Grading Scale'}
                          </p>
                          {[
                            ['1.0 – 1.5', 'Sehr gut', 'Excellent'],
                            ['1.6 – 2.5', 'Gut', 'Good'],
                            ['2.6 – 3.5', 'Befriedigend', 'Satisfactory'],
                            ['3.6 – 4.0', 'Ausreichend', 'Sufficient'],
                            ['4.1 – 5.0', 'Nicht bestanden', 'Fail'],
                          ].map(([range, de, en]) => {
                            const val = parseFloat(edu.gpa_german)
                            const [lo, hi] = range.split(' – ').map(parseFloat)
                            const active = val >= lo && val <= hi
                            return (
                              <div key={range} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '3px 6px', borderRadius: 6, marginBottom: 2,
                                background: active ? 'rgba(var(--accent)/0.12)' : 'transparent',
                              }}>
                                <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-tertiary))', whiteSpace: 'nowrap' }}>{range}</span>
                                <span style={{ fontSize: 10, color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))', marginLeft: 8, whiteSpace: 'nowrap' }}>{locale === 'de-DE' ? de : en}</span>
                              </div>
                            )
                          })}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                {edu.summary && edu.summary !== '<SUMMARY>' && (
                  (Array.isArray(edu.summary) ? edu.summary : [edu.summary])
                    .filter(s => s && !s.toLowerCase().includes('thesis'))
                    .map((s, si) => (
                      <p key={si} style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', marginTop: 10, lineHeight: 1.6 }}>
                        {s}
                      </p>
                    ))
                )}
                {/* Thesis highlight — show if any summary line mentions thesis */}
                {(() => {
                  const summaryArr = Array.isArray(edu.summary) ? edu.summary : [edu.summary].filter(Boolean)
                  const thesisLine = summaryArr.find(s => s && s.toLowerCase().includes('thesis'))
                  if (!thesisLine) return null
                  return (
                    <div style={{
                      marginTop: 12,
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(var(--accent)/0.06)',
                      border: '1px solid rgba(var(--accent)/0.15)',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>📄</span>
                      <div>
                        <p className="eyebrow" style={{ color: 'rgb(var(--accent))', marginBottom: 3 }}>Master's Thesis</p>
                        <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55, margin: 0 }}>
                          {thesisLine}
                        </p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
