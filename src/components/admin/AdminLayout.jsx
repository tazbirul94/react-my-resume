import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { LogOut, Home } from 'lucide-react'

const SECTIONS = [
  { path: 'basics', label: 'Basics' },
  { path: 'work', label: 'Work' },
  { path: 'education', label: 'Education' },
  { path: 'skills', label: 'Skills' },
  { path: 'languages', label: 'Languages' },
  { path: 'interests', label: 'Interests' },
  { path: 'projects', label: 'Projects' },
  { path: 'certifications', label: 'Certifications' },
  { path: 'testimonials', label: 'Testimonials' },
]

export function AdminLayout() {
  const { signOut } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border font-bold text-foreground tracking-tight">Admin Panel</div>
        <nav className="flex-1 p-2 space-y-1">
          <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
            <Home className="h-4 w-4" /> Dashboard
          </Link>
          {SECTIONS.map(s => (
            <Link key={s.path} to={`/admin/${s.path}`}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes(s.path) ? 'bg-apple-text text-apple-bg' : 'text-apple-text-2 hover:bg-apple-bg-2 hover:text-apple-text'}`}>
              {s.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
