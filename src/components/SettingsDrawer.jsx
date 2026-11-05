import { useEffect, useRef } from 'react'
import { BackIcon, ChevronStartIcon, CloseIcon } from './Icons.jsx'
import { SETTINGS_PAGES } from '../settings/pages.js'

// صفحة الإعدادات: تنزلق من اليسار ولا تملأ الشاشة، وفيها قائمة التصنيفات وصفحاتها الداخلية
export default function SettingsDrawer({ open, page, onOpenPage, onBack, onClose }) {
  const headerButton = useRef(null)
  const opener = useRef(null)

  // نبقي الصفحة الحالية ظاهرة أثناء انزلاق الدرج إلى الخارج
  const lastPage = useRef(null)
  if (open) lastPage.current = page
  const current = SETTINGS_PAGES.find((item) => item.id === lastPage.current)

  // نعيد التركيز إلى الزر الذي فتح الدرج عند إغلاقه
  useEffect(() => {
    if (!open) return undefined
    opener.current = document.activeElement
    return () => opener.current?.focus?.()
  }, [open])

  useEffect(() => {
    if (open) headerButton.current?.focus()
  }, [open, page])

  useEffect(() => {
    if (!open) return undefined
    function handleKey(event) {
      if (event.key !== 'Escape') return
      if (page) onBack()
      else onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, page, onBack, onClose])

  return (
    <div className={`drawer-root${open ? ' is-open' : ''}`} inert={!open}>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="settings-title">
        <div className="drawer-header">
          {current && (
            <button
              ref={headerButton}
              type="button"
              className="icon-button pressable"
              aria-label="رجوع"
              onClick={onBack}
            >
              <BackIcon />
            </button>
          )}
          <h2 id="settings-title" className={current ? 'is-inner' : undefined}>
            {current ? current.title : 'الإعدادات'}
          </h2>
          <button
            ref={current ? undefined : headerButton}
            type="button"
            className="icon-button pressable"
            aria-label="إغلاق الإعدادات"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-body" key={current?.id ?? 'menu'}>
          {current ? (
            <current.Page />
          ) : (
            <nav className="settings-group" aria-label="تصنيفات الإعدادات">
              {SETTINGS_PAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="settings-row settings-link pressable"
                  onClick={() => onOpenPage(item.id)}
                >
                  <span className="settings-row-icon">
                    <item.Icon size={20} />
                  </span>
                  <span className="settings-row-label">{item.title}</span>
                  <span className="settings-row-chevron">
                    <ChevronStartIcon size={18} />
                  </span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </aside>
    </div>
  )
}
