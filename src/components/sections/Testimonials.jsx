import { useState } from 'react'
import { useTestimonials } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export function Testimonials() {
  const { data: testimonials, loading } = useTestimonials()
  const [idx, setIdx] = useState(0)

  if (loading) return (
    <SectionWrapper id="testimonials" title="References" dark>
      <Skeleton className="h-48 w-full max-w-2xl mx-auto" />
    </SectionWrapper>
  )

  const items = testimonials ?? []
  if (!items.length) return null

  const current = items[idx]

  return (
    <SectionWrapper id="testimonials" title="References" dark>
      <div className="max-w-2xl mx-auto">
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardContent className="pt-6 pb-4 text-center">
            <Quote className="h-8 w-8 text-brand mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground italic mb-6 text-lg leading-relaxed">"{current.reference}"</p>
            <p className="font-semibold text-foreground">{current.name}</p>
            <p className="text-sm text-brand">{current.position}{current.company ? `, ${current.company}` : ''}</p>
          </CardContent>
        </Card>

        {items.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button onClick={() => setIdx(i => (i - 1 + items.length) % items.length)} className="p-2 rounded-full hover:bg-muted transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`h-2 w-2 rounded-full transition-colors ${i === idx ? 'bg-brand' : 'bg-muted'}`} />
              ))}
            </div>
            <button onClick={() => setIdx(i => (i + 1) % items.length)} className="p-2 rounded-full hover:bg-muted transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
