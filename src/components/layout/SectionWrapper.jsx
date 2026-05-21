import { cn } from '@/lib/utils'

export function SectionWrapper({ id, title, subtitle, className, children, dark = false }) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 px-4',
        dark ? 'bg-slate-900 dark:bg-slate-950 text-white' : 'bg-background',
        className
      )}
    >
      <div className="max-w-5xl mx-auto">
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
            <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-brand" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
