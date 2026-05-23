import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function SectionWrapper({ id, eyebrow, title, subtitle, className, children, alt = false }) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Wave divider before alt sections */}
      {alt && (
        <div className="wave-divider" aria-hidden="true" style={{ marginBottom: -2, lineHeight: 0, background: 'rgb(var(--bg-secondary))' }}>
          <svg viewBox="0 0 1440 28" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ fill: 'rgb(var(--bg-primary))', display: 'block', width: '100%', height: 28 }}>
            <path d="M0,14 C360,28 1080,0 1440,14 L1440,0 L0,0 Z" />
          </svg>
        </div>
      )}

      <section
        id={id}
        ref={ref}
        className={cn('px-5 sm:px-6', revealed && 'section-visible', className)}
        style={{
          paddingTop: 'clamp(72px, 10vw, 120px)',
          paddingBottom: 'clamp(72px, 10vw, 120px)',
          background: alt ? 'rgb(var(--bg-secondary))' : 'rgb(var(--bg-primary))',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        <div className="max-w-content mx-auto">
          {(eyebrow || title) && (
            <div className="mb-12 sm:mb-16">
              {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
              {title && <h2 className="section-title">{title}</h2>}
              {subtitle && (
                <p className="mt-3 max-w-xl" style={{ color: 'rgb(var(--text-secondary))', fontSize: 'var(--type-body)', lineHeight: 1.6 }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </section>

      {/* Wave divider after alt sections */}
      {alt && (
        <div className="wave-divider" aria-hidden="true" style={{ marginTop: -2, lineHeight: 0, background: 'rgb(var(--bg-secondary))' }}>
          <svg viewBox="0 0 1440 28" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ fill: 'rgb(var(--bg-primary))', display: 'block', width: '100%', height: 28 }}>
            <path d="M0,14 C360,0 1080,28 1440,14 L1440,28 L0,28 Z" />
          </svg>
        </div>
      )}
    </>
  )
}
