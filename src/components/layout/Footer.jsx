import { useLocale } from '@/context/LocaleContext'

export function Footer({ basics }) {
  const { t } = useLocale()
  const desc = t('footer.description')
    .replace('{author1}', basics?.name || t('footer.authorName'))

  return (
    <footer
      data-print="hidden"
      className="px-5 sm:px-6 py-6 sm:py-8 text-center"
      style={{
        background: 'rgb(var(--bg-primary))',
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
