import { useInterests } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

export function Interests() {
  const { data: interests, loading } = useInterests()

  if (loading) return (
    <SectionWrapper id="interests" title="Interests">
      <div className="flex gap-2">{[1,2,3,4].map(i => <Skeleton key={i} className="h-8 w-24" />)}</div>
    </SectionWrapper>
  )

  const items = interests ?? []
  if (!items.length) return null

  return (
    <SectionWrapper id="interests" title="Interests & Hobbies">
      <div className="space-y-4">
        {items.map((interest) => (
          <div key={interest.id}>
            <h3 className="font-semibold text-foreground mb-2">{interest.name}</h3>
            <div className="flex flex-wrap gap-2">
              {interest.keywords?.map((kw) => (
                <Badge key={kw} variant="secondary">{kw}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
