import { Download } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'

export function PrintButton() {
  const { t } = useLocale()
  return (
    <button
      data-print="hidden"
      onClick={() => window.print()}
      aria-label="Save as PDF"
      title="Save as PDF — use 'Save as PDF' in the print dialog"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 44,
        padding: '0 20px',
        borderRadius: 22,
        background: 'rgb(var(--text-primary))',
        color: 'rgb(var(--bg-primary))',
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit',
        letterSpacing: '-0.01em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.10)',
        transition: 'transform 200ms ease, box-shadow 200ms ease, opacity 150ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.04)'
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.22)'
        e.currentTarget.style.opacity = '0.92'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.10)'
        e.currentTarget.style.opacity = '1'
      }}
    >
      <Download size={16} />
      {t('print.saveButton')}
    </button>
  )
}
