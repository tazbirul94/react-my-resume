import { useTestimonials } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

export function Testimonials() {
  const { data: testimonials, loading } = useTestimonials()
  const { t } = useLocale()

  if (loading) return (
    <SectionWrapper id="testimonials" eyebrow={t('sections.references.eyebrow')} title={t('sections.references.title')} alt>
      <div className="grid md:grid-cols-2 gap-5">
        {[1,2].map(i => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = testimonials ?? []

  return (
    <SectionWrapper id="testimonials" eyebrow={t('sections.references.eyebrow')} title={t('sections.references.title')} alt>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 16 }}>
        {items.map((ref, idx) => (
          <div key={ref.id ?? idx} className="apple-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ref.reference && ref.reference !== '<SUMMARY>' && (
              <blockquote style={{
                fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))',
                lineHeight: 1.7, fontStyle: 'italic', margin: 0,
                paddingLeft: 14, borderLeft: '2px solid rgb(var(--accent))',
              }}>
                "{ref.reference}"
              </blockquote>
            )}
            <div>
              <p style={{ fontSize: 'var(--type-small)', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>
                {ref.name}
              </p>
              {(ref.position || ref.company) && (
                <p className="eyebrow" style={{ color: 'rgb(var(--text-tertiary))', marginTop: 2 }}>
                  {[ref.position, ref.company].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-tertiary))', marginBottom: 12 }}>
          Need more? Additional references available on request.
        </p>
        <a
          href="mailto:tazbirul94@gmail.com?subject=Reference%20Request&body=Hi%20Tazbirul%2C%20I%20would%20like%20to%20request%20a%20reference%20letter."
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            height: 38, padding: '0 20px', borderRadius: 10,
            border: '1px solid rgb(var(--apple-border))',
            color: 'rgb(var(--text-secondary))',
            fontSize: 'var(--type-small)', fontWeight: 500,
            textDecoration: 'none',
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgb(var(--text-secondary))'; e.currentTarget.style.color = 'rgb(var(--text-primary))' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgb(var(--apple-border))'; e.currentTarget.style.color = 'rgb(var(--text-secondary))' }}
        >
          Request a reference letter
        </a>
      </div>
    </SectionWrapper>
  )
}
