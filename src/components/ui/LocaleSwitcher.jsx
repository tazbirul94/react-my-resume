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
            style={{
              padding: '3px 9px',
              borderRadius: 6,
              border: isActive ? '1px solid rgb(var(--accent))' : '1px solid rgb(var(--apple-border))',
              background: isActive ? 'rgb(var(--accent))' : 'transparent',
              color: isActive ? '#fff' : 'rgb(var(--text-secondary))',
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
