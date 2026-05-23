import { useState, useEffect } from 'react'
import { useEducation } from '@/hooks/useResume'
import { useLocale } from '@/context/LocaleContext'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronDown } from 'lucide-react'

const GRADE_SCALE_KEYS = [
  ['1.0 – 1.5', 'gradeScale.veryGood'],
  ['1.6 – 2.5', 'gradeScale.good'],
  ['2.6 – 3.5', 'gradeScale.satisfactory'],
  ['3.6 – 4.0', 'gradeScale.sufficient'],
  ['4.1 – 5.0', 'gradeScale.fail'],
]

function formatDate(dateStr, presentLabel, locale = 'en-US') {
  if (!dateStr) return presentLabel
  return new Date(dateStr).toLocaleDateString(locale, { month: 'short', year: 'numeric' })
}

function GradeChip({ gpa_german }) {
  const { t } = useLocale()
  return (
    <span
      className="apple-chip"
      style={{ background: 'rgba(var(--accent)/0.08)', color: 'rgb(var(--accent))', position: 'relative', cursor: 'default' }}
      onMouseEnter={e => { const tip = e.currentTarget.querySelector('.grade-tooltip'); if (tip) { tip.style.opacity = '1'; tip.style.pointerEvents = 'auto' } }}
      onMouseLeave={e => { const tip = e.currentTarget.querySelector('.grade-tooltip'); if (tip) { tip.style.opacity = '0'; tip.style.pointerEvents = 'none' } }}
    >
      {t('education.gradeLabel')} {gpa_german}
      <span className="grade-tooltip" style={{
        opacity: 0, pointerEvents: 'none',
        position: 'absolute', bottom: 'calc(100% + 8px)', right: 0,
        background: 'rgb(var(--bg-primary))',
        border: '1px solid rgb(var(--apple-border))',
        borderRadius: 10, padding: '10px 14px',
        width: 220, zIndex: 50,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transition: 'opacity 150ms ease',
        textAlign: 'left',
      }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: 8, whiteSpace: 'nowrap' }}>
          {t('education.gradeScaleTitle')}
        </p>
        {GRADE_SCALE_KEYS.map(([range, key]) => {
          const val = parseFloat(gpa_german)
          const [lo, hi] = range.split(' – ').map(parseFloat)
          const active = val >= lo && val <= hi
          return (
            <div key={range} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '3px 6px', borderRadius: 6, marginBottom: 2,
              background: active ? 'rgba(var(--accent)/0.12)' : 'transparent',
            }}>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-tertiary))', whiteSpace: 'nowrap' }}>{range}</span>
              <span style={{ fontSize: 10, color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))', marginLeft: 8, whiteSpace: 'nowrap' }}>{t(key)}</span>
            </div>
          )
        })}
      </span>
    </span>
  )
}

export function Education() {
  const { data: education, loading } = useEducation()
  const { t, locale } = useLocale()
  const present = t('education.present')
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = key => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  if (loading) return (
    <SectionWrapper id="education" eyebrow={t('sections.education.eyebrow')} title={t('sections.education.title')}>
      <div className="space-y-4">{[1,2].map(i => <Skeleton key={i} className="h-28 w-full rounded-2xl" />)}</div>
    </SectionWrapper>
  )

  const items = education ?? []

  return (
    <SectionWrapper id="education" eyebrow={t('sections.education.eyebrow')} title={t('sections.education.title')}>
      <div className="space-y-4">
        {items.map((edu, idx) => {
          const key = edu.id ?? idx
          const isOpen = !isMobile || expanded[key]
          const summaryArr = Array.isArray(edu.summary) ? edu.summary : [edu.summary].filter(Boolean)
          const bodyLines = summaryArr.filter(s => s && !s.toLowerCase().includes('thesis'))
          const thesisLine = summaryArr.find(s => s && s.toLowerCase().includes('thesis'))
          const hasBody = bodyLines.length > 0 || !!thesisLine || !!edu.gpa_german

          return (
            <div key={key} className="apple-card">

              {/* ── Header row — always visible ── */}
              <div
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: isMobile && hasBody ? 'pointer' : 'default' }}
                onClick={() => isMobile && hasBody && toggle(key)}
              >
                {/* Logo */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: 'rgb(var(--bg-secondary))',
                  border: '1px solid rgb(var(--apple-border))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, color: 'rgb(var(--text-tertiary))',
                  overflow: 'hidden',
                }}>
                  {edu.logo ? (
                    <img src={edu.logo} alt={edu.institution}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = edu.institution?.[0] || '?' }} />
                  ) : (edu.institution?.[0] || '?')}
                </div>

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Degree + chevron */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <h3 style={{ fontSize: 'var(--type-card-h)', fontWeight: 600, color: 'rgb(var(--text-primary))', margin: 0, lineHeight: 1.3 }}>
                      {edu.degree || edu.area}
                      {edu.degree && edu.area && (
                        <span style={{ fontWeight: 400, color: 'rgb(var(--text-secondary))', marginLeft: 6 }}>
                          — {edu.area}
                        </span>
                      )}
                    </h3>
                    {isMobile && hasBody && (
                      <ChevronDown size={16} style={{
                        flexShrink: 0, marginTop: 3, color: 'rgb(var(--text-tertiary))',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 200ms ease',
                      }} />
                    )}
                  </div>

                  {/* Institution */}
                  <div style={{ marginTop: 3 }}>
                    {edu.website ? (
                      <a href={edu.website} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--accent))', fontWeight: 500, textDecoration: 'none' }}
                        onClick={e => isMobile && e.stopPropagation()}>
                        {edu.institution}
                      </a>
                    ) : (
                      <span style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>
                        {edu.institution}
                      </span>
                    )}
                  </div>

                  {/* Location + date on same line */}
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 5 }}>
                    {edu.location && (
                      <span style={{ fontSize: 'var(--type-micro)', color: 'rgb(var(--text-tertiary))' }}>
                        {edu.location}
                      </span>
                    )}
                    <span className="apple-chip" style={{ fontSize: 11 }}>
                      {formatDate(edu.start_date, present, locale)} – {formatDate(edu.end_date, present, locale)}
                    </span>
                  </div>
                </div>

                {/* Date + grade chips — desktop only, right-aligned */}
                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span className="apple-chip">
                      {formatDate(edu.start_date, present, locale)} – {formatDate(edu.end_date, present, locale)}
                    </span>
                    {edu.gpa_german && <GradeChip gpa_german={edu.gpa_german} />}
                  </div>
                )}
              </div>

              {/* ── Expandable body ── */}
              {isOpen && (
                <div style={{ marginTop: 12 }}>
                  {/* Grade chip on mobile */}
                  {isMobile && edu.gpa_german && (
                    <div style={{ marginBottom: 10 }}>
                      <GradeChip gpa_german={edu.gpa_german} />
                    </div>
                  )}

                  {bodyLines.map((s, si) => (
                    <p key={si} style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', marginBottom: 6, lineHeight: 1.6 }}>
                      {s}
                    </p>
                  ))}

                  {thesisLine && (
                    <div style={{
                      marginTop: 8, padding: '12px 16px', borderRadius: 10,
                      background: 'rgba(var(--accent)/0.06)',
                      border: '1px solid rgba(var(--accent)/0.15)',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>📄</span>
                      <div>
                        <p className="eyebrow" style={{ color: 'rgb(var(--accent))', marginBottom: 3 }}>{t('education.thesisLabel')}</p>
                        <p style={{ fontSize: 'var(--type-small)', color: 'rgb(var(--text-secondary))', lineHeight: 1.55, margin: 0 }}>
                          {thesisLine}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
