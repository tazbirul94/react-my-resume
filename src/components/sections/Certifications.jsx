import { useState } from 'react'
import { useCertifications } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { ExternalLink } from 'lucide-react'

function formatDate(dateStr, locale = 'en-US') {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

export function Certifications() {
  const { data: certifications, loading } = useCertifications()
  const { t, locale } = useLocale()
  const [logoErrors, setLogoErrors] = useState({})

  if (loading) return (
    <SectionWrapper id="certifications" eyebrow={t('sections.certifications.eyebrow')} title={t('sections.certifications.title')}>
      <div className="grid sm:grid-cols-2 gap-5">
        {[1,2].map(i => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}
      </div>
    </SectionWrapper>
  )

  const items = certifications ?? []

  return (
    <SectionWrapper id="certifications" eyebrow={t('sections.certifications.eyebrow')} title={t('sections.certifications.title')}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
        {items.map((cert, idx) => (
          <div key={cert.id ?? idx} className="apple-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            {/* Logo */}
            {cert.logo && (
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: 'rgb(var(--bg-secondary))',
                border: '1px solid rgb(var(--apple-border))',
                overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {logoErrors[idx] ? (
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'rgb(var(--text-tertiary))' }}>
                    {(cert.issuer?.[0] ?? '?').toUpperCase()}
                  </span>
                ) : (
                  <img src={cert.logo} alt={cert.issuer}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={() => setLogoErrors(prev => ({ ...prev, [idx]: true }))} />
                )}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: 3 }}>
                  {cert.title || cert.name}
                </h3>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgb(var(--text-tertiary))', flexShrink: 0, transition: 'color 150ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgb(var(--accent))'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgb(var(--text-tertiary))'}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: 'inherit' }}>
                      <ExternalLink size={12} />
                      {t('certification.verify')}
                    </span>
                  </a>
                )}
              </div>
              <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>
                {cert.issuer}
              </p>
              {cert.issue_date && (
                <p className="eyebrow" style={{ color: 'rgb(var(--text-tertiary))', marginTop: 4 }}>
                  {formatDate(cert.issue_date, locale)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
