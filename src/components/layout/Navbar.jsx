import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#work',         label: 'Work' },
  { href: '#education',    label: 'Education' },
  { href: '#skills',       label: 'Skills' },
  { href: '#portfolio',    label: 'Portfolio' },
  { href: '#testimonials', label: 'References' },
]

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))
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
      <nav className="max-w-content mx-auto px-6 h-[52px] flex items-center justify-between">
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
                className="relative px-3 py-1.5 rounded-md transition-colors duration-150"
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
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-md transition-colors"
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
          className="md:hidden border-b px-6 py-2 backdrop-blur-[20px]"
          style={{
            background: 'rgba(var(--bg-primary)/0.92)',
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
                className="flex items-center py-3 border-b last:border-0 transition-colors"
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
