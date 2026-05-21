import { useInterests } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

export function Interests() {
  const { data: interests, loading } = useInterests()
  const { t } = useLocale()

  if (loading) return (
    <SectionWrapper id="interests" eyebrow={t('sections.interests.eyebrow')} title={t('sections.interests.title')}>
      <div className="flex flex-wrap gap-3">
        {[1,2,3,4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
      </div>
    </SectionWrapper>
  )

  const items = interests ?? []

  return (
    <SectionWrapper id="interests" eyebrow={t('sections.interests.eyebrow')} title={t('sections.interests.title')}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((interest, idx) => (
          <div key={interest.id ?? idx}>
            {interest.name && (
              <p style={{ fontSize: 'var(--type-small)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 8 }}>
                {interest.name}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(interest.keywords || []).filter(k => k && !k.startsWith('<')).map((kw, i) => (
                <span key={i} className="apple-chip">{kw}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
