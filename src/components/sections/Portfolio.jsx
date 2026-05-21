import { useState } from 'react'
import { useProjects } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

export function Portfolio() {
  const { data: projects, loading } = useProjects()
  const [selected, setSelected] = useState(null)

  if (loading) return (
    <SectionWrapper id="portfolio" title="Portfolio" dark>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-56 w-full" />)}
      </div>
    </SectionWrapper>
  )

  const items = (projects ?? []).slice(0, 9)

  return (
    <SectionWrapper id="portfolio" title="Portfolio" dark>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((proj) => (
          <Card key={proj.id} className="overflow-hidden cursor-pointer group dark:bg-slate-800 dark:border-slate-700 hover:border-brand transition-colors" onClick={() => setSelected(proj)}>
            <div className="relative h-40 bg-muted overflow-hidden">
              {(proj.image_thumb || proj.image_modal) ? (
                <img src={proj.image_thumb || proj.image_modal} alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = 'none' }} />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl text-muted-foreground">
                  {proj.name?.[0]}
                </div>
              )}
              {proj.category && (
                <Badge className="absolute top-2 right-2">{proj.category}</Badge>
              )}
            </div>
            <CardContent className="pt-3 pb-4">
              <h3 className="font-semibold text-foreground">{proj.name}</h3>
              {proj.publisher && <p className="text-xs text-muted-foreground">{proj.publisher}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {selected && (
        <Dialog open={!!selected} onClose={() => setSelected(null)} title={selected.name}>
          <div className="space-y-4">
            {selected.image_modal && (
              <img src={selected.image_modal} alt={selected.name} className="w-full rounded-lg object-cover max-h-64" />
            )}
            <div className="flex flex-wrap gap-2">
              {selected.keywords?.map(kw => <Badge key={kw} variant="secondary">{kw}</Badge>)}
            </div>
            {selected.website && (
              <a href={selected.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand hover:underline text-sm">
                <ExternalLink className="h-4 w-4" /> Visit Project
              </a>
            )}
          </div>
        </Dialog>
      )}
    </SectionWrapper>
  )
}
