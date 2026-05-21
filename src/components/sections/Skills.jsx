import { useSkills } from '@/hooks/useResume'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

export function Skills() {
  const { data: groups, loading } = useSkills()

  if (loading) return (
    <SectionWrapper id="skills" title="Skills" dark>
      <div className="grid md:grid-cols-2 gap-6">{[1,2].map(i => <Skeleton key={i} className="h-48 w-full" />)}</div>
    </SectionWrapper>
  )

  const items = groups ?? []

  return (
    <SectionWrapper id="skills" title="Skills" dark>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((group) => (
          <Card key={group.id} className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.skillDetails?.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  )
}
