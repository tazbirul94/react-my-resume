export function PrintHeader({ basics, profiles = [] }) {
  if (!basics) return null

  const parts = [
    basics.email,
    basics.phone,
    [basics.city, basics.country_code].filter(Boolean).join(', '),
    basics.website,
    ...profiles.map(p => p.url).filter(Boolean),
  ].filter(Boolean)

  return (
    <div className="print-header" data-print="only" style={{ display: 'none' }}>
      <h1>{basics.name}</h1>
      <p>{basics.label}</p>
      <p>{parts.join(' | ')}</p>
    </div>
  )
}
