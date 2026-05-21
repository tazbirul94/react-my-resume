import { useLocale, SUPPORTED_LOCALES } from '@/context/LocaleContext'

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {SUPPORTED_LOCALES.map(l => {
        const isActive = locale === l.code
        return (
          <button
            key={l.code}
            onClick={() => setLocale(l.code)}
            data-print="hidden"
            className={isActive ? undefined : 'locale-btn'}
            style={{
              padding: '3px 9px',
              borderRadius: 6,
              border: isActive ? '1px solid rgb(var(--text-primary))' : '1px solid rgb(var(--apple-border))',
              background: isActive ? 'rgb(var(--text-primary))' : 'transparent',
              color: isActive ? 'rgb(var(--bg-primary))' : 'rgb(var(--text-secondary))',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              letterSpacing: '0.04em',
            }}
          >
            {l.label}
          </button>
        )
      })}
    </div>
  )
}
