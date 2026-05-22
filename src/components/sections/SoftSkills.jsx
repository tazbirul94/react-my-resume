import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useLocale } from '@/context/LocaleContext'

const SOFT_SKILLS = [
  { category: 'Communication',  tags: ['Technical Writing', 'Stakeholder Presentation', 'Cross-cultural Collaboration'] },
  { category: 'Leadership',     tags: ['Team Mentoring', 'Code Review Culture', 'Initiative Taking'] },
  { category: 'Delivery',       tags: ['Agile / Scrum', 'Deadline-driven', 'Iterative Improvement'] },
  { category: 'Collaboration',  tags: ['Remote-first', 'Pair Programming', 'Knowledge Sharing'] },
]

export function SoftSkills() {
  const { t } = useLocale()

  const eyebrow = t('sections.softSkills.eyebrow') || 'Interpersonal'
  const title   = t('sections.softSkills.title')   || 'Soft Skills'

  return (
    <SectionWrapper id="soft-skills" eyebrow={eyebrow} title={title}>
      <div className="grid md:grid-cols-2 gap-5">
        {SOFT_SKILLS.map(({ category, tags }) => (
          <div key={category} className="apple-card" style={{ padding: 24 }}>
            <p className="eyebrow" style={{ color: 'rgb(var(--accent))', margin: '0 0 12px' }}>
              {category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tags.map((tag) => (
                <span key={tag} className="apple-chip">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
