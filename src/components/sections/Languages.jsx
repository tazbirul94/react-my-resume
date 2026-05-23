import { useLanguages } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { LANGUAGE_LEVELS } from '@/lib/languageLevels'

function sortOrder(lang) {
  const match = LANGUAGE_LEVELS.find(l => l.label === lang.level || l.cefr === lang.level)
  return match?.sort ?? 0
}

export function Languages() {
  const { data: languages, loading } = useLanguages()
  const { t, locale } = useLocale()

  if (loading) return (
    <SectionWrapper id="languages" eyebrow={t('sections.languages.eyebrow')} title={t('sections.languages.title')} alt>
      <div className="flex flex-wrap gap-3">
        {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-44 rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = [...(languages ?? [])].sort((a, b) => sortOrder(b) - sortOrder(a))
  const isDe = locale === 'de-DE'

  return (
    <SectionWrapper id="languages" eyebrow={t('sections.languages.eyebrow')} title={t('sections.languages.title')} alt>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {items.map((lang, idx) => {
          const match = LANGUAGE_LEVELS.find(l => l.label === lang.level || l.cefr === lang.level)
          const displayLevel = match ? (isDe ? match.labelDe : match.label) : lang.level
          return (
            <div key={lang.id ?? idx} style={{
              padding: '16px 20px',
              borderRadius: 14,
              background: 'rgb(var(--bg-tertiary))',
              border: '1px solid rgb(var(--apple-border))',
              minWidth: 130,
              flex: '1 1 130px',
            }}>
              <p style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 6 }}>
                {lang.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                {displayLevel && (
                  <span className="eyebrow" style={{ color: 'rgb(var(--accent))' }}>
                    {displayLevel}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
