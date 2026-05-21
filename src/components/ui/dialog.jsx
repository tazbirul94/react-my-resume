import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

export function Dialog({ open, onClose, title, children, className }) {
  const overlayRef = useRef(null)
  const mouseDownTarget = useRef(null)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onMouseDown={(e) => { mouseDownTarget.current = e.target }}
      onClick={(e) => { if (mouseDownTarget.current === overlayRef.current && e.target === overlayRef.current) onClose() }}
    >
      <div className={cn('relative w-full max-w-lg rounded-xl bg-card border border-border shadow-xl max-h-[90vh] overflow-y-auto', className)}>
        <div className="flex items-center justify-between p-6 pb-0">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="ml-auto p-1 rounded-md hover:bg-muted transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
