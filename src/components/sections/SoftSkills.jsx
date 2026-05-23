import { useSoftSkills } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useLocale } from '@/context/LocaleContext'
import { Skeleton } from '@/components/ui/skeleton'

export function SoftSkills() {
  const { t } = useLocale()
  const { data, loading } = useSoftSkills()

  const eyebrow = t('sections.softSkills.eyebrow') || 'Interpersonal'
  const title   = t('sections.softSkills.title')   || 'Soft Skills'

  if (loading) return (
    <SectionWrapper id="soft-skills" eyebrow={eyebrow} title={title}>
      <div className="grid md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-36 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = data ?? []

  return (
    <SectionWrapper id="soft-skills" eyebrow={eyebrow} title={title}>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.id} className="apple-card stagger-item" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {item.icon && (
                <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              )}
              <p className="eyebrow" style={{ color: 'rgb(var(--accent))', margin: 0 }}>
                {item.title}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(item.tags ?? []).map((tag) => (
                <span key={tag} className="apple-chip">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
