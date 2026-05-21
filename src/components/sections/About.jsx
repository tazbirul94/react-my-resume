import { useBasics } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export function About() {
  const { data: basics, loading } = useBasics()

  if (loading) return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid md:grid-cols-3 gap-8">
        <Skeleton className="h-48 w-48 rounded-full mx-auto" />
        <div className="md:col-span-2 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    </SectionWrapper>
  )

  if (!basics) return null

  return (
    <SectionWrapper id="about" title="About Me">
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div className="flex flex-col items-center gap-4">
          {basics.picture && (
            <img
              src={basics.picture}
              alt={basics.name}
              onError={(e) => { e.target.style.display = 'none' }}
              className="h-48 w-48 rounded-full object-cover ring-4 ring-brand/30"
            />
          )}
        </div>
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{basics.name}</h3>
            <p className="text-brand font-medium">{basics.label}</p>
          </div>
          <div className="space-y-2 text-muted-foreground">
            {(basics.summary || []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Card>
            <CardContent className="pt-4 grid sm:grid-cols-2 gap-3 text-sm">
              {basics.email && (
                <a href={`mailto:${basics.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors">
                  <Mail className="h-4 w-4 text-brand" />{basics.email}
                </a>
              )}
              {basics.phone && (
                <a href={`tel:${basics.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors">
                  <Phone className="h-4 w-4 text-brand" />{basics.phone}
                </a>
              )}
              {(basics.city || basics.country_code) && (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-brand" />{[basics.city, basics.country_code].filter(Boolean).join(', ')}
                </span>
              )}
              {basics.website && (
                <a href={basics.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors">
                  <Globe className="h-4 w-4 text-brand" />{basics.website}
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
