import { Github, Mail, Globe, Linkedin, Twitter, ArrowDown, FileText } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

const ICON_MAP = {
  github:   Github,
  linkedin: Linkedin,
  twitter:  Twitter,
  email:    Mail,
  website:  Globe,
}

export function Hero({ basics, profiles = [] }) {
  const { t } = useLocale()
  if (!basics) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'rgb(var(--bg-primary))' }}>

      {/* Static gradient fog — no animation, Apple-style */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(var(--accent)/0.07) 0%, transparent 70%)',
        }}
      />

      {/* Very subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(var(--apple-border)/0.9) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 text-center px-5 w-full max-w-3xl mx-auto pt-28 pb-36">

        {/* Avatar */}
        {basics.picture && (
          <div className="hero-avatar mb-9 flex justify-center">
            <img
              src={basics.picture}
              alt={basics.name}
              onError={(e) => { e.target.style.display = 'none' }}
              style={{
                width: 180,
                height: 180,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgb(var(--apple-border))',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              }}
            />
          </div>
        )}

        {/* Role eyebrow */}
        <p className="hero-label eyebrow mb-4">{basics.label}</p>

        {/* Name */}
        <h1
          className="hero-name font-display font-bold tracking-tight leading-none break-words mb-6"
          style={{ fontSize: 'var(--type-hero)', letterSpacing: '-0.03em', color: 'rgb(var(--text-primary))' }}
        >
          {basics.name}
        </h1>

        {/* Summary first line as subtitle */}
        {basics.summary?.[0] && (
          <p
            className="hero-socials mb-10 mx-auto max-w-xl leading-relaxed"
            style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))' }}
          >
            {basics.summary[0]}
          </p>
        )}

        {/* CTAs */}
        <div className="hero-ctas flex flex-wrap justify-center gap-3 mb-10">
          <a
            href="#about"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 44, padding: '0 28px', borderRadius: 12,
              background: 'rgb(var(--accent))',
              color: '#fff',
              fontSize: 'var(--type-small)', fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 200ms ease, transform 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgb(var(--accent-hover))'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgb(var(--accent))'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <FileText size={16} />
            {t('hero.viewResume')}
          </a>
          <a
            href={`mailto:${basics.email}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 44, padding: '0 28px', borderRadius: 12,
              background: 'transparent',
              border: '1px solid rgb(var(--apple-border))',
              color: 'rgb(var(--text-primary))',
              fontSize: 'var(--type-small)', fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 200ms ease, transform 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgb(var(--bg-secondary))'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <Mail size={16} />
            {t('hero.contactMe')}
          </a>
        </div>

        {/* Social links */}
        {(profiles.length > 0 || basics.email) && (
          <div className="flex justify-center gap-2">
            {profiles.map((p) => {
              const Icon = ICON_MAP[p.network?.toLowerCase()] || Globe
              return (
                <a
                  key={p.network}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.network}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: '50%',
                    border: '1px solid rgb(var(--apple-border))',
                    color: 'rgb(var(--text-tertiary))',
                    transition: 'color 150ms ease, border-color 150ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgb(var(--text-primary))'; e.currentTarget.style.borderColor = 'rgb(var(--text-secondary))' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgb(var(--text-tertiary))'; e.currentTarget.style.borderColor = 'rgb(var(--apple-border))' }}
                >
                  <Icon size={15} />
                </a>
              )
            })}
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                title="Email"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 38, height: 38, borderRadius: '50%',
                  border: '1px solid rgb(var(--apple-border))',
                  color: 'rgb(var(--text-tertiary))',
                  transition: 'color 150ms ease, border-color 150ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgb(var(--text-primary))'; e.currentTarget.style.borderColor = 'rgb(var(--text-secondary))' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgb(var(--text-tertiary))'; e.currentTarget.style.borderColor = 'rgb(var(--apple-border))' }}
              >
                <Mail size={15} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors"
        style={{ color: 'rgb(var(--text-tertiary))', textDecoration: 'none' }}
      >
        <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>{t('hero.scroll')}</span>
        <ArrowDown size={13} />
      </a>
    </section>
  )
}
