import { Link } from 'react-router-dom'
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card'

const SECTIONS = [
  { path: 'locales', label: 'Locales', description: 'Manage available languages' },
  { path: 'basics', label: 'Basics', description: 'Personal info, contact, profiles' },
  { path: 'work', label: 'Work Experience', description: 'Jobs and highlights' },
  { path: 'education', label: 'Education', description: 'Degrees and courses' },
  { path: 'skills', label: 'Skills', description: 'Skill groups and levels' },
  { path: 'languages', label: 'Languages', description: 'Language proficiency' },
  { path: 'interests', label: 'Interests', description: 'Hobbies and keywords' },
  { path: 'projects', label: 'Projects', description: 'Portfolio entries' },
  { path: 'certifications', label: 'Certifications', description: 'Issued certificates' },
  { path: 'testimonials', label: 'Testimonials', description: 'References and quotes' },
]

export function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map(s => (
          <Link key={s.path} to={`/admin/${s.path}`}>
            <Card className="hover:border-apple-text/30 transition-colors cursor-pointer h-full">
              <CardHeader><CardTitle className="text-base">{s.label}</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">{s.description}</p></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
