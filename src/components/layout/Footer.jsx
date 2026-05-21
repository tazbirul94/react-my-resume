import { useLocale } from '@/context/LocaleContext'

export function Footer({ basics }) {
  const { t } = useLocale()
  const desc = t('footer.description')
    .replace('{author1}', basics?.name || t('footer.authorName'))
    .replace('{author2}', 'Ceevee')

  return (
    <footer
      data-print="hidden"
      style={{
        borderTop: '1px solid rgb(var(--apple-border))',
        background: 'rgb(var(--bg-secondary))',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <div className="max-w-content mx-auto">
        <p style={{ fontSize: 'var(--type-micro)', color: 'rgb(var(--text-tertiary))', lineHeight: 1.6 }}>
          {desc}
        </p>
      </div>
    </footer>
  )
}
