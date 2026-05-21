import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-brand/10 text-brand border-brand/20',
  secondary: 'bg-muted text-muted-foreground border-transparent',
  outline: 'border-border text-foreground',
}

export function Badge({ variant = 'default', className, children, ...props }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', variants[variant], className)} {...props}>
      {children}
    </span>
  )
}
