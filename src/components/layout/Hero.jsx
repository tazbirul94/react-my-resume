import { useMemo } from 'react'
import { Github, Mail, Globe, Linkedin, Twitter, ArrowDown, FileText } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import { useWork } from '@/hooks/useResume'

const ICON_MAP = {
  github:   Github,
  linkedin: Linkedin,
  twitter:  Twitter,
  email:    Mail,
  website:  Globe,
}

export function Hero({ basics, profiles = [] }) {
  const { t } = useLocale()
  const { data: work } = useWork()

  const stats = useMemo(() => {
    if (!work?.length) return null
    const startDates = work.map(j => new Date(j.start_date)).filter(d => !isNaN(d))
    const earliest = startDates.length ? Math.min(...startDates.map(d => d.getTime())) : null
    const years = earliest ? Math.floor((Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25)) : null
    const countries = new Set(
      work
        .map(j => j.location)
        .filter(l => l && l !== 'Remote')
        .map(l => l.split(', ').pop())
        .filter(Boolean)
    ).size
    const techCount = new Set(work.flatMap(j => j.skills ?? [])).size
    return { years, techCount, countries }
  }, [work])

  const topTechChips = useMemo(() => {
    if (basics?.hero_chips?.length) return basics.hero_chips
    if (!work?.length) return []
    const freq = {}
    work.forEach(j => (j.skills ?? []).forEach(s => { freq[s] = (freq[s] ?? 0) + 1 }))
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name]) => name)
  }, [basics?.hero_chips, work])

  if (!basics) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'rgb(var(--bg-primary))' }}>

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(var(--apple-border)/0.7) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.25,
        }}
      />

      <div className="relative z-10 text-center px-5 w-full max-w-3xl mx-auto pt-20 pb-28 sm:pt-28 sm:pb-36">


        {/* Role eyebrow */}
        <p className="hero-label eyebrow mb-4">{basics.label}</p>

        {/* Name */}
        <h1
          className="hero-name font-display font-bold tracking-tight leading-none break-words mb-6"
          style={{ fontSize: 'var(--type-hero)', letterSpacing: '-0.03em', color: 'rgb(var(--text-primary))' }}
        >
          {basics.name}
        </h1>

        {basics.tagline && (
          <p
            className="hero-socials mb-6 mx-auto max-w-xl leading-relaxed"
            style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))' }}
          >
            {basics.tagline}
          </p>
        )}

        {/* Tech stack chips — staggered entrance */}
        <div className="hero-tech-chips flex flex-wrap justify-center gap-2 mb-10">
          {topTechChips.map(tech => (
            <span
              key={tech}
              className="hero-tech-chip apple-chip font-mono-code"
              style={{ fontSize: 12, background: 'rgb(var(--bg-secondary))' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Stats row — computed from work data */}
        {stats && (
          <div className="hero-stats-row">
            {[
              { value: `${stats.years}+`, label: t('hero.statsYears') },
              { value: `${stats.techCount}+`, label: t('hero.statsTech') },
              { value: stats.countries,        label: t('hero.statsCountries') },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="hero-ctas flex flex-wrap justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="hero-cta-btn"
            style={{
              background: 'rgb(var(--text-primary))',
              color: 'rgb(var(--bg-primary))',
              fontSize: 'var(--type-small)', fontWeight: 600,
              letterSpacing: '-0.01em',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
              transition: 'opacity 150ms ease, transform 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <FileText size={16} />
            {t('hero.viewResume')}
          </button>
          <a
            href={`mailto:${basics.email}`}
            className="hero-cta-btn"
            style={{
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
      <button
        type="button"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        aria-label={t('hero.scroll')}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors z-10"
        style={{ color: 'rgb(var(--text-tertiary))', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
      >
        <span className="eyebrow" style={{ letterSpacing: '0.2em' }}>{t('hero.scroll')}</span>
        <ArrowDown size={13} />
      </button>
    </section>
  )
}
