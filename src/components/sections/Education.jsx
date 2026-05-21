import { useEducation } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function Education() {
  const { data: education, loading } = useEducation()

  if (loading) return (
    <SectionWrapper id="education" eyebrow="Education" title="Academic Background">
      <div className="space-y-4">{[1,2].map(i => <Skeleton key={i} className="h-28 w-full" />)}</div>
    </SectionWrapper>
  )

  const items = education ?? []

  return (
    <SectionWrapper id="education" eyebrow="Education" title="Academic Background">
      <div className="space-y-4">
        {items.map((edu) => (
          <Card key={edu.id}>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground">{edu.degree || edu.area}</h3>
                  <a href={edu.website} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    {edu.institution}
                  </a>
                  {edu.location && <p className="text-xs text-muted-foreground">{edu.location}</p>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary">{formatDate(edu.start_date)} — {formatDate(edu.end_date)}</Badge>
                  {edu.gpa && <Badge variant="default">GPA: {edu.gpa}</Badge>}
                </div>
              </div>
              {edu.summary && <p className="text-sm text-muted-foreground mt-2">{edu.summary}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
