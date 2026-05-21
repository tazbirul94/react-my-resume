import { Download } from 'lucide-react'

export function PrintButton() {
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
        background: 'rgb(var(--accent))',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: 'inherit',
        boxShadow: '0 4px 16px rgba(0,113,227,0.35)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.04)'
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,113,227,0.45)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,113,227,0.35)'
      }}
    >
      <Download size={16} />
      Save PDF
    </button>
  )
}
