import { useCertifications } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function Certifications() {
  const { data: certs, loading } = useCertifications()

  if (loading) return (
    <SectionWrapper id="certifications" eyebrow="Certifications" title="Credentials">
      <div className="grid sm:grid-cols-2 gap-4">{[1,2].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div>
    </SectionWrapper>
  )

  const items = certs ?? []
  if (!items.length) return null

  return (
    <SectionWrapper id="certifications" eyebrow="Certifications" title="Credentials">
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="pt-4 flex items-start gap-3">
              {cert.logo && <img src={cert.logo} alt={cert.issuer} className="h-10 w-10 object-contain rounded" onError={(e) => { e.target.style.display = 'none' }} />}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{cert.title}</h3>
                <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                {cert.issue_date && <Badge variant="secondary" className="mt-1 text-xs">{formatDate(cert.issue_date)}</Badge>}
              </div>
              {cert.credential_url && (
                <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
