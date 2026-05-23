import { useSkills } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useLocale } from '@/context/LocaleContext'
import { Skeleton } from '@/components/ui/skeleton'

const HARD_GROUP_COLORS = {
  'Backend':            '0 113 227',
  'Cloud & DevOps':     '139 92 246',
  'Frontend & Mobile':  '16 185 129',
  'Data & ML':          '245 158 11',
}

const DEFAULT_HARD_COLOR = '0 113 227'
const SOFT_COLOR = '255 90 50'

function SoftGroupCard({ group }) {
  const hasAnyIcon = group.skillDetails?.some(s => s.icon)

  return (
    <div
      className="apple-card skill-group-card stagger-item"
      style={{ padding: 24, '--group-color': SOFT_COLOR }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgb(255 149 0), rgb(255 45 85))',
          flexShrink: 0,
        }} />
        <p className="eyebrow" style={{
          margin: 0,
          background: 'linear-gradient(90deg, rgb(255 149 0), rgb(255 45 85))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {group.title}
        </p>
      </div>

      {hasAnyIcon ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
          {group.skillDetails?.map((skill) => {
            const pct = skill.level ?? 80
            return (
              <div key={skill.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {skill.icon && (
                  <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0, width: 20, textAlign: 'center' }}>
                    {skill.icon}
                  </span>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'rgb(var(--text-primary))' }}>{skill.name}</span>
                    <span style={{ fontSize: 11, color: 'rgb(var(--text-secondary))' }}>{pct}%</span>
                  </div>
                  <div style={{
                    height: 3, borderRadius: 99,
                    background: 'rgba(var(--border-color) / 0.35)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', width: `${pct}%`, borderRadius: 99,
                      background: 'linear-gradient(90deg, rgb(255 149 0), rgb(255 45 85))',
                    }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {group.skillDetails?.map((skill) => (
            <span
              key={skill.id}
              className="apple-chip font-mono-code"
              style={{ fontSize: 12, background: 'rgb(var(--bg-secondary))', border: '1px solid rgba(255 90 50 / 0.25)' }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function Skills() {
  const { t } = useLocale()
  const { data: groups, loading } = useSkills()

  if (loading) return (
    <SectionWrapper id="skills" eyebrow={t('sections.skills.eyebrow')} title={t('sections.skills.title')} alt>
      <div className="grid md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-52 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = groups ?? []

  return (
    <SectionWrapper id="skills" eyebrow={t('sections.skills.eyebrow')} title={t('sections.skills.title')} alt>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((group) => {
          if (group.type === 'soft') return <SoftGroupCard key={group.id} group={group} />

          const color = HARD_GROUP_COLORS[group.title] ?? DEFAULT_HARD_COLOR
          return (
            <div
              key={group.id}
              className="apple-card skill-group-card stagger-item"
              style={{ padding: 24, '--group-color': color }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: `rgb(${color})`, flexShrink: 0,
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
