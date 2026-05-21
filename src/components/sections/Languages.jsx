import { useLanguages } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

export function Languages() {
  const { data: languages, loading } = useLanguages()
  const { t } = useLocale()

  if (loading) return (
    <SectionWrapper id="languages" eyebrow={t('sections.languages.eyebrow')} title={t('sections.languages.title')} alt>
      <div className="flex flex-wrap gap-3">
        {[1,2,3].map(i => <Skeleton key={i} className="h-16 w-40 rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = languages ?? []

  return (
    <SectionWrapper id="languages" eyebrow={t('sections.languages.eyebrow')} title={t('sections.languages.title')} alt>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {items.map((lang, idx) => (
          <div key={lang.id ?? idx} style={{
            padding: '14px 20px',
            borderRadius: 14,
            background: 'rgb(var(--bg-tertiary, 251 251 253))',
            border: '1px solid rgb(var(--apple-border))',
            minWidth: 140,
          }}>
            <p style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 3 }}>
              {lang.name}
            </p>
            <p className="eyebrow" style={{ color: 'rgb(var(--accent))' }}>{lang.level}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
