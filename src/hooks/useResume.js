import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getFallback } from '@/lib/fallback'
import { useLocale } from '@/context/LocaleContext'

function useQuery(tableName, fallbackKey, options = {}) {
  const { locale } = useLocale()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setData(getFallback(fallbackKey, locale))
      setLoading(false)
      return
    }
    let q = supabase.from(tableName).select(options.select || '*')
    if (options.order) q = q.order(options.order, { ascending: options.ascending ?? false })
    if (options.limit) q = q.limit(options.limit)
    q.then(({ data: result, error: err }) => {
      if (err) { setError(err); setData(getFallback(fallbackKey, locale)) }
      else setData(result)
      setLoading(false)
    })
  }, [tableName, fallbackKey, locale])

  return { data, loading, error }
}

export function useBasics() {
  const b = useQuery('basics', 'basics', { limit: 1 })
  const p = useQuery('profiles', 'profiles', { order: 'sort_order', ascending: true })
  return {
    data: Array.isArray(b.data) ? b.data[0] ?? null : b.data,
    profiles: p.data ?? [],
    loading: b.loading || p.loading,
    error: b.error || p.error,
  }
}

export function useWork() {
  return useQuery('work', 'work', { order: 'start_date', ascending: false })
}

export function useEducation() {
  return useQuery('education', 'education', { order: 'start_date', ascending: false })
}

export function useSkills() {
  const groups = useQuery('skill_groups', 'skillGroups', { order: 'sort_order', ascending: true })
  const skills = useQuery('skills', 'skills', { order: 'sort_order', ascending: true })
  const data = groups.data?.map(g => ({
    ...g,
    skillDetails: skills.data?.filter(s => s.group_id === g.id) ?? [],
  })) ?? null
  return { data, loading: groups.loading || skills.loading, error: groups.error || skills.error }
}

export function useLanguages() {
  return useQuery('languages', 'languages', { order: 'sort_order', ascending: true })
}

export function useInterests() {
  return useQuery('interests', 'interests', { order: 'sort_order', ascending: true })
}

export function useProjects() {
  return useQuery('projects', 'projects', { order: 'sort_order', ascending: true })
}

export function useCertifications() {
  return useQuery('certifications', 'certifications', { order: 'sort_order', ascending: true })
}

export function useTestimonials() {
  return useQuery('testimonials', 'testimonials', { order: 'sort_order', ascending: true })
}
