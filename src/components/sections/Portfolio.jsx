import { useProjects } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

export function Portfolio() {
  const { data: projects, loading } = useProjects()
  const { t } = useLocale()

  if (loading) return (
    <SectionWrapper id="portfolio" eyebrow={t('sections.portfolio.eyebrow')} title={t('sections.portfolio.title')}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3].map(i => <Skeleton key={i} className="h-52 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = (projects ?? []).filter(p => p.name && !p.name.startsWith('<'))

  return (
    <SectionWrapper id="portfolio" eyebrow={t('sections.portfolio.eyebrow')} title={t('sections.portfolio.title')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
        {items.map((project, idx) => (
          <div key={project.id ?? idx} className="apple-card stagger-item" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, overflow: 'hidden' }}>
            {/* Thumbnail */}
            {project.image_thumb && !project.image_thumb.startsWith('<') && (
              <div style={{ width: '100%', height: 160, overflow: 'hidden', background: 'rgb(var(--bg-secondary))' }}>
                <img src={project.image_thumb} alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.parentNode.style.display = 'none' }} />
              </div>
            )}
            <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', margin: 0 }}>
                  {project.name}
                </h3>
                {project.website && !project.website.startsWith('<') && (
                  <a href={project.website} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgb(var(--text-tertiary))', transition: 'color 150ms ease', flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgb(var(--accent))'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgb(var(--text-tertiary))'}>
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
              {project.category && (
                <span className="eyebrow" style={{ color: 'rgb(var(--accent))' }}>{project.category}</span>
              )}
              {project.description && (
                <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.6, margin: 0 }}>
                  {project.description}
                </p>
              )}
              {(project.keywords || []).filter(k => !k.startsWith('<')).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {project.keywords.filter(k => !k.startsWith('<')).map((kw, i) => (
                    <span key={i} className="apple-chip font-mono-code" style={{ fontSize: 11 }}>{kw}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
