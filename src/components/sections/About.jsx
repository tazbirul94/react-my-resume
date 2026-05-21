import { useBasics } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react'

const contactItems = (basics) => [
  basics.email  && { icon: Mail,   href: `mailto:${basics.email}`,  label: basics.email },
  basics.phone  && { icon: Phone,  href: `tel:${basics.phone}`,     label: basics.phone },
  (basics.city || basics.country_code) && { icon: MapPin, href: null, label: [basics.city, basics.country_code].filter(Boolean).join(', ') },
  basics.website && { icon: Globe, href: basics.website, label: basics.website, external: true },
].filter(Boolean)

export function About() {
  const { data: basics, loading } = useBasics()

  if (loading) return (
    <SectionWrapper id="about" eyebrow="About" title="About Me">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14">
        <Skeleton className="h-52 w-52 rounded-3xl shrink-0" />
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
    <SectionWrapper id="about" eyebrow="About" title="About Me">
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* Photo */}
        <div className="shrink-0 flex justify-center md:justify-start">
          {basics.picture ? (
            <img
              src={basics.picture}
              alt={basics.name}
              onError={(e) => { e.target.style.display = 'none' }}
              style={{
                width: 200, height: 200,
                borderRadius: 24,
                objectFit: 'cover',
                border: '1px solid rgb(var(--apple-border))',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
              }}
            />
          ) : (
            <div style={{
              width: 200, height: 200, borderRadius: 24,
              background: 'rgb(var(--bg-secondary))',
              border: '1px solid rgb(var(--apple-border))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 48, fontWeight: 700, color: 'rgb(var(--text-tertiary))',
            }}>
              {basics.name?.[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: 4 }}>
            {basics.name}
          </h3>
          <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--accent))', fontWeight: 500, marginBottom: 20 }}>
            {basics.label}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {(basics.summary || []).map((para, i) => (
              <p key={i} style={{ fontSize: 'var(--type-body)', color: 'rgb(var(--text-secondary))', lineHeight: 1.7 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Contact items with micro-interaction arrow */}
          {contacts.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {contacts.map(({ icon: Icon, href, label, external }) => {
                const content = (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                    <span style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: 'rgb(var(--bg-secondary))',
                      border: '1px solid rgb(var(--apple-border))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={14} style={{ color: 'rgb(var(--accent))' }} />
                    </span>
                    <span style={{
                      fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                    }}>
                      {label}
                    </span>
                    {href && (
                      <ArrowRight size={12}
                        className="contact-arrow"
                        style={{
                          color: 'rgb(var(--text-tertiary))',
                          flexShrink: 0,
                          transform: 'translateX(-4px)',
                          opacity: 0,
                          transition: 'transform 150ms ease, opacity 150ms ease',
                        }}
                      />
                    )}
                  </span>
                )

                const baseStyle = {
                  display: 'flex', alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'background 150ms ease, border-color 150ms ease',
                  cursor: href ? 'pointer' : 'default',
                }

                const handleEnter = (e) => {
                  if (!href) return
                  e.currentTarget.style.background = 'rgb(var(--bg-secondary))'
                  e.currentTarget.style.borderColor = 'rgb(var(--apple-border))'
                  const arrow = e.currentTarget.querySelector('.contact-arrow')
                  if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)' }
                }
                const handleLeave = (e) => {
                  if (!href) return
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  const arrow = e.currentTarget.querySelector('.contact-arrow')
                  if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-4px)' }
                }

                return href ? (
                  <a key={label} href={href} style={baseStyle}
                    onMouseEnter={handleEnter} onMouseLeave={handleLeave}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {content}
                  </a>
                ) : (
                  <span key={label} style={baseStyle}>{content}</span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
