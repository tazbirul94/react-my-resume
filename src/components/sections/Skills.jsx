import { useSkills } from '@/hooks/useResume'
import { useEffect, useRef, useState } from 'react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Skeleton } from '@/components/ui/skeleton'

function AnimatedBar({ level }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-brand-light transition-all ease-out"
        style={{
          width: inView ? `${level}%` : '0%',
          transitionDuration: '1.1s',
          transitionDelay: '0.1s',
        }}
      />
    </div>
  )
}

export function Skills() {
  const { data: groups, loading } = useSkills()

  if (loading) return (
    <SectionWrapper id="skills" title="Skills" dark>
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map(i => <Skeleton key={i} className="h-52 w-full rounded-xl opacity-20" />)}
      </div>
    </SectionWrapper>
  )

  const items = groups ?? []

  return (
    <SectionWrapper id="skills" title="Skills" dark>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((group) => (
          <div
            key={group.id}
            className="rounded-xl border border-white/5 bg-white/3 p-6"
          >
            <h3 className="font-display font-bold text-white mb-5 text-sm tracking-wide uppercase text-brand-light">
              {group.title}
            </h3>
            <div className="space-y-4">
              {group.skillDetails?.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm font-medium text-white/80">{skill.name}</span>
                    <span className="text-xs font-mono text-brand-light/70">{skill.level}%</span>
                  </div>
                  <AnimatedBar level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
