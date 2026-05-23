import { useBasics } from '@/hooks/useResume'
import { Hero } from '@/components/layout/Hero'
import { Sections } from '@/components/sections'
import { Footer } from '@/components/layout/Footer'
import { PrintHeader } from '@/components/PrintHeader'
import { Layout } from '@/components/layout/Layout'

export function Resume() {
  const { data: basics, profiles } = useBasics()
  return (
    <Layout basics={basics}>
      <PrintHeader basics={basics} profiles={profiles ?? []} />
      <Hero basics={basics} profiles={profiles ?? []} />
      <Sections />
      <Footer basics={basics} />
    </Layout>
  )
}
