import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import { useTheme } from '@/context/ThemeContext'
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher'
import { useAuth } from '@/hooks/useAuth'

const SECTION_IDS = ['about', 'skills', 'work', 'portfolio', 'education', 'certifications', 'testimonials']

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = SECTION_IDS
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActive(top.target.id)
        }
      },
      { threshold: 0.3, rootMargin: '-5% 0px -60% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

export function Navbar({ name = 'Resume' }) {
  const { t } = useLocale()
  const { theme } = useTheme()
  const { user } = useAuth()
  const NAV_LINKS = [
    { href: '#about',          label: t('navigation.about') },
    { href: '#skills',         label: t('navigation.skills') },
    { href: '#work',           label: t('navigation.work') },
    { href: '#portfolio',      label: t('navigation.portfolio') },
    { href: '#education',      label: t('navigation.education') },
    { href: '#certifications', label: t('navigation.certifications') },
    { href: '#testimonials',   label: t('navigation.references') },
  ]
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navBg = scrolled
    ? 'bg-white/72 dark:bg-black/72 backdrop-blur-[20px] shadow-[0_1px_0_rgb(var(--apple-border))]'
    : 'bg-transparent'

  return (
    <header className={cn('fixed top-0 left-0 right-0 z-40 transition-all duration-300', navBg)}>
      <nav className="max-w-content mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">
        <a
          href="#"
          className="font-display font-semibold text-base tracking-tight shrink-0"
          style={{ color: 'rgb(var(--text-primary))', textDecoration: 'none', fontSize: 'var(--type-small)' }}
        >
          {name}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className="nav-link relative px-3 py-1.5 rounded-md transition-colors duration-150"
                style={{
                  fontSize: 'var(--type-small)',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          {user && <button
            data-print="hidden"
            onClick={() => window.print()}
            title="Save as PDF — use 'Save as PDF' in the print dialog"
            aria-label="Download CV as PDF"
            style={{
              alignItems: 'center',
              gap: 6,
              height: 32,
              padding: '0 14px',
              borderRadius: 16,
              background: 'rgb(var(--text-primary))',
              color: 'rgb(var(--bg-primary))',
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
              letterSpacing: '-0.01em',
              transition: 'opacity 150ms ease',
            }}
            className="hidden md:inline-flex"
            onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Download CV
          </button>}
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            className="mobile-menu-btn md:hidden p-2 rounded-md transition-colors"
            style={{ color: 'rgb(var(--text-secondary))' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-b px-4 sm:px-6 py-2 backdrop-blur-[20px]"
          style={{
            background: theme === 'dark' ? 'rgba(0,0,0,0.92)' : 'rgba(255,255,255,0.92)',
            borderColor: 'rgb(var(--apple-border))',
          }}
        >
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link flex items-center py-3 border-b last:border-0 transition-colors"
                style={{
                  fontSize: 'var(--type-small)',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))',
                  borderColor: 'rgb(var(--apple-border-subtle))',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
