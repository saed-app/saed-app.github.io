import { useEffect, useRef } from 'react'
import { useTheme } from '../core/theme.jsx'
import { CloseIcon, MoonIcon } from './Icons.jsx'
import Toggle from './Toggle.jsx'

function AppearanceSection() {
  const { theme, setTheme } = useTheme()
  return (
    <section className="settings-group" aria-label="المظهر">
      <div className="settings-row">
        <span className="settings-row-icon">
          <MoonIcon size={20} />
        </span>
        <span className="settings-row-label">الوضع الليلي</span>
        <Toggle
          label="الوضع الليلي"
          checked={theme === 'dark'}
          onChange={(on) => setTheme(on ? 'dark' : 'light')}
        />
      </div>
    </section>
  )
}

// لإضافة إعداد عام جديد لاحقاً: أنشئ قسماً مثل AppearanceSection وأضفه إلى هذه القائمة
const SECTIONS = [AppearanceSection]

export default function SettingsDrawer({ open, onClose }) {
  const closeButton = useRef(null)
  const opener = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    opener.current = document.activeElement
    closeButton.current?.focus()

    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      opener.current?.focus?.()
    }
  }, [open, onClose])

  return (
    <div className={`drawer-root${open ? ' is-open' : ''}`} inert={!open}>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="drawer-header">
          <h2 id="settings-title">الإعدادات</h2>
          <button
            ref={closeButton}
            type="button"
            className="icon-button pressable"
            aria-label="إغلاق الإعدادات"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-body">
          {SECTIONS.map((Section) => (
            <Section key={Section.name} />
          ))}
        </div>
      </aside>
    </div>
  )
}
