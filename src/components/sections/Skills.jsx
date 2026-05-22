import { useSkills } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useLocale } from '@/context/LocaleContext'
import { Skeleton } from '@/components/ui/skeleton'

const GROUP_COLORS = {
  'Backend':            '0 113 227',
  'Cloud & DevOps':     '139 92 246',
  'Frontend & Mobile':  '16 185 129',
  'Data & ML':          '245 158 11',
}

const DEFAULT_COLOR = '0 113 227'

export function Skills() {
  const { t } = useLocale()
  const { data: groups, loading } = useSkills()

  if (loading) return (
    <SectionWrapper id="skills" eyebrow={t('sections.skills.eyebrow')} title={t('sections.skills.title')}>
      <div className="grid md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-52 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = groups ?? []

  return (
    <SectionWrapper id="skills" eyebrow={t('sections.skills.eyebrow')} title={t('sections.skills.title')}>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((group) => {
          const color = GROUP_COLORS[group.title] ?? DEFAULT_COLOR
          return (
            <div
              key={group.id}
              className="apple-card skill-group-card stagger-item"
              style={{ padding: 24, '--group-color': color }}
            >
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: `rgb(${color})`,
                  flexShrink: 0,
                }} />
                <p className="eyebrow" style={{ color: `rgb(${color})`, margin: 0 }}>{group.title}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                {group.skillDetails?.map((skill) => (
                  <span
                    key={skill.id}
                    className="apple-chip font-mono-code"
                    style={{ fontSize: 12, background: 'rgb(var(--bg-secondary))', border: `1px solid rgba(${color}/0.25)` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
