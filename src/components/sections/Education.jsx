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
  const { t } = useLocale()
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
                    {edu.gpa && (
                      <span className="apple-chip" style={{ background: 'rgba(var(--accent)/0.08)', color: 'rgb(var(--accent))' }}>
                        GPA {edu.gpa}{edu.gpa_german ? ` / ${edu.gpa_german}` : ''}
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
