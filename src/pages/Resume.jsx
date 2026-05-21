import { useBasics } from '@/hooks/useResume'
import { Hero } from '@/components/layout/Hero'
import { Sections } from '@/components/sections'
import { Footer } from '@/components/layout/Footer'

export function Resume() {
  const { data: basics, profiles } = useBasics()
  return (
    <>
      <Hero basics={basics} profiles={profiles} />
      <Sections />
      <Footer basics={basics} />
    </>
  )
}
