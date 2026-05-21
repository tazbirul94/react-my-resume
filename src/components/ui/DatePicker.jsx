import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, parseISO, isValid } from 'date-fns'
import { CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function parseValue(value) {
  if (!value) return undefined
  const d = parseISO(value)
  return isValid(d) ? d : undefined
}

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function DatePicker({ label, value, onChange, placeholder = 'Pick a date', clearable = true, className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = parseValue(value)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(date) {
    onChange(date ? format(date, 'yyyy-MM-dd') : null)
    setOpen(false)
  }

  return (
    <div className={cn('relative space-y-1', className)} ref={ref}>
      {label && (
        <label className="block text-sm font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: 40,
          padding: '0 12px',
          borderRadius: 8,
          border: `1px solid rgb(var(--apple-border))`,
          background: 'rgb(var(--bg-primary))',
          color: selected ? 'rgb(var(--text-primary))' : 'rgb(var(--text-tertiary))',
          fontSize: 14,
          cursor: 'pointer',
          transition: 'border-color 150ms, box-shadow 150ms',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgb(var(--accent))'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--accent)/0.12)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgb(var(--apple-border))'; e.currentTarget.style.boxShadow = 'none' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CalendarIcon size={14} style={{ color: 'rgb(var(--text-tertiary))', flexShrink: 0 }} />
          {selected ? format(selected, 'dd MMM yyyy') : placeholder}
        </span>
        {clearable && selected && (
          <X
            size={13}
            style={{ color: 'rgb(var(--text-tertiary))', flexShrink: 0, cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); onChange(null) }}
          />
        )}
      </button>

      {/* Popover */}
      {open && (
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 'calc(100% + 6px)',
            left: 0,
            minWidth: 288,
            background: 'rgb(var(--bg-primary))',
            border: '1px solid rgb(var(--apple-border))',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
            padding: 16,
            userSelect: 'none',
          }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected}
            captionLayout="dropdown"
            fromYear={1990}
            toYear={new Date().getFullYear() + 2}
            components={{
              Chevron: ({ orientation }) =>
                orientation === 'left'
                  ? <ChevronLeft size={14} />
                  : <ChevronRight size={14} />,
            }}
            classNames={{
              root: 'rdp-custom',
              months: '',
              month: '',
              month_caption: 'rdp-caption',
              dropdowns: 'rdp-dropdowns',
              dropdown_root: 'rdp-dropdown-root',
              dropdown: 'rdp-dropdown',
              nav: 'rdp-nav',
              button_previous: 'rdp-nav-btn',
              button_next: 'rdp-nav-btn',
              weekdays: 'rdp-weekdays',
              weekday: 'rdp-weekday',
              weeks: 'rdp-weeks',
              week: 'rdp-week',
              day: 'rdp-day',
              day_button: 'rdp-day-btn',
              selected: 'rdp-selected',
              today: 'rdp-today',
              outside: 'rdp-outside',
              disabled: 'rdp-disabled',
              range_start: '',
              range_end: '',
            }}
          />
        </div>
      )}

      <style>{`
        .rdp-custom { font-family: inherit; font-size: 13px; }

        .rdp-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 8px;
        }

        .rdp-dropdowns {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          justify-content: center;
        }

        .rdp-dropdown-root { position: relative; }

        .rdp-dropdown {
          appearance: none;
          -webkit-appearance: none;
          border: 1px solid rgb(var(--apple-border));
          background: rgb(var(--bg-secondary));
          color: rgb(var(--text-primary));
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          font-family: inherit;
        }
        .rdp-dropdown:focus {
          border-color: rgb(var(--accent));
          box-shadow: 0 0 0 2px rgba(var(--accent)/0.15);
        }

        .rdp-nav {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .rdp-nav-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid rgb(var(--apple-border));
          background: rgb(var(--bg-secondary));
          color: rgb(var(--text-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 120ms, color 120ms;
          padding: 0;
        }
        .rdp-nav-btn:hover {
          background: rgb(var(--bg-tertiary));
          color: rgb(var(--text-primary));
        }

        .rdp-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 4px;
        }

        .rdp-weekday {
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: rgb(var(--text-tertiary));
          padding: 4px 0;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .rdp-weeks { display: flex; flex-direction: column; gap: 2px; }

        .rdp-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }

        .rdp-day { display: flex; align-items: center; justify-content: center; }

        .rdp-day-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: rgb(var(--text-primary));
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          transition: background 100ms, color 100ms;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          outline: none;
        }
        .rdp-day-btn:hover {
          background: rgb(var(--bg-secondary));
        }
        .rdp-day-btn:focus-visible {
          box-shadow: 0 0 0 2px rgb(var(--accent));
        }

        .rdp-selected .rdp-day-btn {
          background: rgb(var(--text-primary)) !important;
          color: rgb(var(--bg-primary)) !important;
          font-weight: 600;
        }

        .rdp-today .rdp-day-btn {
          color: rgb(var(--accent));
          font-weight: 600;
        }
        .rdp-today.rdp-selected .rdp-day-btn {
          color: rgb(var(--bg-primary)) !important;
        }

        .rdp-outside .rdp-day-btn {
          color: rgb(var(--text-tertiary));
          opacity: 0.45;
        }

        .rdp-disabled .rdp-day-btn {
          opacity: 0.25;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
