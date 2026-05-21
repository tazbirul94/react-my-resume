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
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 3 }}>
                  {edu.degree || edu.area}
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
              <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', marginTop: 10, lineHeight: 1.6 }}>
                {edu.summary}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
