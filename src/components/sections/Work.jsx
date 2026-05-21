import { useWork } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Briefcase } from 'lucide-react'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function duration(start, end) {
  const s = new Date(start)
  const e = end ? new Date(end) : new Date()
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  if (months < 12) return `${months}mo`
  const y = Math.floor(months / 12)
  const m = months % 12
  return m ? `${y}y ${m}mo` : `${y}y`
}

export function Work() {
  const { data: work, loading } = useWork()

  if (loading) return (
    <SectionWrapper id="work" title="Work Experience" dark>
      <div className="space-y-5">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-36 w-full rounded-xl opacity-20" />)}
      </div>
    </SectionWrapper>
  )

  const items = work ?? []

  return (
    <SectionWrapper id="work" title="Work Experience" dark>
      <div className="relative pl-7 sm:pl-9">
        {/* Timeline line */}
        <div className="absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-brand/20 to-transparent" />

        <div className="space-y-5">
          {items.map((job) => (
            <div key={job.id} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-7 sm:-left-9 top-4 flex items-center justify-center w-7 sm:w-9">
                <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-brand bg-slate-950 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 p-5 transition-colors duration-200">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{job.position}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="h-3 w-3 text-brand" />
                      {job.website ? (
                        <a href={job.website} target="_blank" rel="noopener noreferrer"
                          className="text-brand hover:text-brand-light text-sm font-medium transition-colors">
                          {job.company}
                        </a>
                      ) : (
                        <span className="text-brand text-sm font-medium">{job.company}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-xs font-medium text-white/50 bg-white/5 border border-white/10 rounded-md px-2.5 py-1">
                      {formatDate(job.start_date)} — {formatDate(job.end_date)}
                    </span>
                    {job.start_date && (
                      <span className="text-[11px] text-white/30">{duration(job.start_date, job.end_date)}</span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {job.summary && (
                  <p className="text-sm text-white/60 mb-3 leading-relaxed">{job.summary}</p>
                )}

                {/* Highlights */}
                {job.highlights?.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-white/55 flex gap-2.5">
                        <span className="text-brand shrink-0 mt-px">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                    {job.skills.map(s => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-brand/10 text-brand-light border border-brand/15 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
