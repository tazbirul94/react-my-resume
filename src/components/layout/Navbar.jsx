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

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
      scrolled
        ? 'bg-background/85 backdrop-blur-lg border-b border-border/60 shadow-sm'
        : 'bg-transparent'
    )}>
      <nav className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-brand tracking-tight shrink-0">
          {name}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150',
                  isActive ? 'text-brand' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-md bg-brand/8" />
                )}
                <span className="relative">{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-px bg-brand/60 rounded-full" />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border px-5 py-2">
          {NAV_LINKS.map(link => {
            const isActive = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-2.5 py-3 text-sm font-medium border-b border-border/40 last:border-0 transition-colors',
                  isActive ? 'text-brand' : 'text-muted-foreground hover:text-brand'
                )}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0" />}
                {link.label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
