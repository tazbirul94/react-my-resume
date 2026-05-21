import { cn } from '@/lib/utils'

export function Card({ className, hover = true, children, ...props }) {
  return (
    <div
      className={cn(
        'apple-card',
        hover && 'cursor-default',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn('flex flex-col space-y-1.5 mb-5', className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn('font-semibold leading-none', className)}
      style={{ fontSize: 'var(--type-card-h)', color: 'rgb(var(--text-primary))' }}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return <div className={cn('', className)} {...props}>{children}</div>
}
