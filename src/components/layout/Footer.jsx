export function Footer({ basics }) {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
      <p>
        &copy; {new Date().getFullYear()} {basics?.name || 'Resume'}. Built with React + Supabase.
      </p>
    </footer>
  )
}
