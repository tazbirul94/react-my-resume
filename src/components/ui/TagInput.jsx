import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TagInput({ value = [], onChange, label, placeholder = 'Type and press Enter or ,', className }) {
  const [input, setInput] = useState('')

  const add = (raw) => {
    const chip = raw.trim()
    if (chip && !value.includes(chip)) onChange([...value, chip])
    setInput('')
  }

  const remove = (chip) => onChange(value.filter(c => c !== chip))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) }
    if (e.key === 'Backspace' && !input && value.length) remove(value[value.length - 1])
  }

  return (
    <div className={cn('space-y-1', className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <div className="flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-md border border-border bg-background px-3 py-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2">
        {value.map(chip => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-foreground"
          >
            {chip}
            <button
              type="button"
              onClick={() => remove(chip)}
              className="rounded-full opacity-60 hover:opacity-100 transition-opacity"
              aria-label={`Remove ${chip}`}
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => add(input)}
          placeholder={value.length ? '' : placeholder}
          className="flex-1 min-w-[8rem] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}
