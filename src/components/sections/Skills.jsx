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

function tierLabel(level) {
  if (!level) return null
  if (level >= 88) return 'Expert'
  if (level >= 72) return 'Proficient'
  return 'Familiar'
}

function tierColor(level, groupColor) {
  if (!level) return groupColor
  return groupColor
}

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

              {/* Skills list with bar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.skillDetails?.map((skill) => {
                  const pct = skill.level ? `${skill.level}%` : '60%'
                  const tier = tierLabel(skill.level)
                  return (
                    <div key={skill.id}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: skill.level >= 88 ? 600 : 500,
                            color: 'rgb(var(--text-primary))',
                            fontFamily: "'JetBrains Mono', monospace",
                          }}
                        >
                          {skill.name}
                        </span>
                        {tier && (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.07em',
                            color: `rgb(${color})`,
                            background: `rgba(${color}/0.1)`,
                            padding: '2px 7px',
                            borderRadius: 20,
                          }}>
                            {tier}
                          </span>
                        )}
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-bar-fill"
                          style={{ '--skill-pct': pct }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Print-only fallback */}
              <ul className="skills-print-list" style={{ display: 'none' }} aria-hidden="true">
                {group.skillDetails?.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
