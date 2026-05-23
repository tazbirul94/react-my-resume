import { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'

export function EmojiPickerInput({ value, onChange, label = 'Emoji', optional = true }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="space-y-1" ref={containerRef} style={{ position: 'relative' }}>
      <label className="text-sm font-medium">
        {label}{optional && <span className="text-muted-foreground font-normal"> (optional)</span>}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          style={{
            width: 40, height: 40, borderRadius: 8, fontSize: 20,
            border: '1px solid hsl(var(--border))',
            background: open ? 'hsl(var(--muted))' : 'hsl(var(--background))',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
          title="Pick emoji"
        >
          {value || '＋'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            style={{
              fontSize: 11, color: 'rgb(var(--text-secondary))', background: 'none',
              border: 'none', cursor: 'pointer', padding: '2px 4px',
            }}
          >
            Clear
          </button>
        )}
        {!value && (
          <span style={{ fontSize: 12, color: 'rgb(var(--text-secondary))' }}>
            Click to pick emoji
          </span>
        )}
      </div>
      {open && (
        <div style={{ position: 'absolute', zIndex: 50, top: 'calc(100% + 4px)', left: 0 }}>
          <EmojiPicker
            onEmojiClick={(e) => { onChange(e.emoji); setOpen(false) }}
            skinTonesDisabled
            searchPlaceholder="Search emoji…"
            height={350}
            width={300}
          />
        </div>
      )}
    </div>
  )
}
