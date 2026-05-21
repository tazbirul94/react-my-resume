import { Navbar } from './Navbar'

export function Layout({ children, basics }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar name={basics?.name?.split(' ')[0] || 'Resume'} />
      <main>{children}</main>
    </div>
  )
}
