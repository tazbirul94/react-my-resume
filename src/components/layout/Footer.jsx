import { Heart } from 'lucide-react'

export function Footer({ basics }) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col items-center gap-3 text-center">
        <p className="font-display font-bold text-lg text-brand">{basics?.name || 'Resume'}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          &copy; {new Date().getFullYear()} — Built with
          <Heart className="h-3 w-3 text-brand fill-brand" />
          React &amp; Supabase
        </p>
      </div>
    </footer>
  )
}
