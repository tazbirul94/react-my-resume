import { useSkills } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

export function Skills() {
  const { data: groups, loading } = useSkills()

  if (loading) return (
    <SectionWrapper id="skills" eyebrow="Skills" title="What I Work With">
      <div className="grid md:grid-cols-2 gap-5">
        {[1, 2].map(i => <Skeleton key={i} className="h-52 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = groups ?? []

  return (
    <SectionWrapper id="skills" eyebrow="Skills" title="What I Work With">
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((group) => (
          <div key={group.id} className="apple-card" style={{ padding: 24 }}>
            <p className="eyebrow mb-4" style={{ color: 'rgb(var(--accent))' }}>{group.title}</p>

            {/* Chip cloud — ATS-safe list hidden on screen, shown in print */}
            <div className="skills-chip-list flex flex-wrap gap-2" role="list">
              {group.skillDetails?.map((skill) => (
                <span
                  key={skill.id}
                  role="listitem"
                  className="apple-chip"
                  style={{
                    background: 'rgb(var(--bg-secondary))',
                    fontSize: 13,
                    fontWeight: skill.level >= 80 ? 600 : 400,
                    opacity: skill.level ? Math.max(0.55, skill.level / 100) : 1,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Print-only fallback: plain list */}
            <ul className="skills-print-list" style={{ display: 'none' }} aria-hidden="true">
              {group.skillDetails?.map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
