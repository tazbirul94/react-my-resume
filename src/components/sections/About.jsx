import { useBasics } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

const contactItems = (basics) => [
  basics.email  && { icon: Mail,   href: `mailto:${basics.email}`,  label: basics.email },
  basics.phone  && { icon: Phone,  href: `tel:${basics.phone}`,     label: basics.phone },
  (basics.city || basics.country_code) && { icon: MapPin, href: null, label: [basics.city, basics.country_code].filter(Boolean).join(', ') },
  basics.website && { icon: Globe, href: basics.website, label: basics.website, external: true },
].filter(Boolean)

export function About() {
  const { data: basics, loading } = useBasics()

  if (loading) return (
    <SectionWrapper id="about" title="About Me">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        <div className="flex justify-center md:justify-start shrink-0">
          <Skeleton className="h-52 w-52 rounded-2xl" />
        </div>
        <div className="flex-1 space-y-3 pt-2">
          {[1, 0.9, 0.75, 0.8, 0.6].map((w, i) => (
            <Skeleton key={i} className="h-4 rounded" style={{ width: `${w * 100}%` }} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )

  if (!basics) return null

  const contacts = contactItems(basics)

  return (
    <SectionWrapper id="about" title="About Me">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Photo */}
        <div className="flex justify-center md:justify-start shrink-0">
          {basics.picture ? (
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand/30 to-brand-light/10 blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
              <img
                src={basics.picture}
                alt={basics.name}
                onError={(e) => { e.target.style.display = 'none' }}
                className="relative h-52 w-52 rounded-2xl object-cover ring-1 ring-brand/20"
              />
            </div>
          ) : (
            <div className="h-52 w-52 rounded-2xl bg-muted flex items-center justify-center text-4xl font-display font-bold text-brand/40">
              {basics.name?.[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">{basics.name}</h3>
            <p className="text-brand font-medium mt-0.5">{basics.label}</p>
          </div>

          <div className="space-y-2.5 text-muted-foreground leading-relaxed">
            {(basics.summary || []).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Contact grid */}
          {contacts.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-2 pt-2">
              {contacts.map(({ icon: Icon, href, label, external }) => {
                const cls = "flex items-center gap-2.5 text-sm text-muted-foreground hover:text-brand transition-colors group"
                const inner = (
                  <>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand/8 group-hover:bg-brand/15 transition-colors">
                      <Icon className="h-3.5 w-3.5 text-brand" />
                    </span>
                    <span className="truncate">{label}</span>
                  </>
                )
                return href ? (
                  <a key={label} href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {inner}
                  </a>
                ) : (
                  <span key={label} className={cls}>{inner}</span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
