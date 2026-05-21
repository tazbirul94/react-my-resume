import { useWork } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function Work() {
  const { data: work, loading } = useWork()

  if (loading) return (
    <SectionWrapper id="work" title="Work Experience" dark>
      <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-32 w-full" />)}</div>
    </SectionWrapper>
  )

  const items = work ?? []

  return (
    <SectionWrapper id="work" title="Work Experience" dark>
      <div className="relative space-y-6 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand/30">
        {items.map((job) => (
          <div key={job.id} className="relative">
            <div className="absolute -left-6 top-5 h-3 w-3 rounded-full bg-brand ring-4 ring-background" />
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.position}</h3>
                    <a href={job.website} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline font-medium">
                      {job.company}
                    </a>
                  </div>
                  <Badge variant="secondary">{formatDate(job.start_date)} — {formatDate(job.end_date)}</Badge>
                </div>
                {job.summary && <p className="text-sm text-muted-foreground mb-2">{job.summary}</p>}
                {job.highlights?.length > 0 && (
                  <ul className="space-y-1">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-brand mt-1">▸</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
                {job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.skills.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
