import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-brand text-white hover:bg-brand-dark shadow-sm hover:shadow-brand/25 hover:shadow-md',
  outline: 'border border-brand/40 text-brand hover:border-brand hover:bg-brand/5',
  ghost: 'hover:bg-muted hover:text-foreground',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  secondary: 'bg-muted text-foreground hover:bg-muted/70',
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-11 px-7 text-base',
  icon: 'h-9 w-9',
}

const base = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50'

export function Button({ variant = 'default', size = 'md', className, children, asChild, ...props }) {
  const cls = cn(base, variants[variant], sizes[size], className)

  if (asChild && children) {
    const child = children
    if (typeof child === 'object' && child !== null) {
      const Tag = child.type || 'a'
      return (
        <Tag
          {...child.props}
          {...props}
          className={cn(cls, child.props?.className)}
        />
      )
    }
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
