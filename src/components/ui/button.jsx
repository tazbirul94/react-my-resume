import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-apple-text text-apple-bg shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.07)] hover:opacity-90 active:opacity-80',
  outline: 'border border-apple-border bg-transparent text-apple-text-2 hover:bg-apple-bg-2 hover:text-apple-text',
  ghost: 'bg-transparent text-apple-text-2 hover:bg-apple-bg-2 hover:text-apple-text',
  destructive: 'bg-red-500/90 text-white hover:bg-red-500 shadow-sm active:bg-red-600',
  secondary: 'bg-apple-bg-2 text-apple-text hover:bg-apple-bg-3 border border-apple-border',
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-11 px-7 text-base',
  icon: 'h-9 w-9',
}

const base = 'inline-flex items-center justify-center rounded-lg font-medium tracking-[-0.01em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-text/30 disabled:opacity-40'

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
