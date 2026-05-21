import { useLanguages } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

const LEVEL_COLOR = {
  Native: 'bg-brand text-white',
  Fluent: 'bg-brand/80 text-white',
  Advanced: 'bg-brand/60 text-white',
  Intermediate: 'bg-brand/40 text-foreground',
  Beginner: 'bg-muted text-muted-foreground',
}

export function Languages() {
  const { data: languages, loading } = useLanguages()

  if (loading) return (
    <SectionWrapper id="languages" title="Languages">
      <div className="flex gap-4">{[1,2,3].map(i => <Skeleton key={i} className="h-20 w-32" />)}</div>
    </SectionWrapper>
  )

  const items = languages ?? []
  if (!items.length) return null

  return (
    <SectionWrapper id="languages" title="Languages">
      <div className="flex flex-wrap gap-4">
        {items.map((lang) => (
          <div key={lang.id} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card min-w-[100px]">
            <span className="font-semibold text-foreground">{lang.name}</span>
            <Badge className={LEVEL_COLOR[lang.level] || 'bg-muted text-foreground'}>{lang.level}</Badge>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
