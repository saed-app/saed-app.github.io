import { useEffect, useRef } from 'react'
import { BackIcon, ChevronStartIcon } from './Icons.jsx'
import { SETTINGS_PAGES } from '../settings/pages.js'
import { isInstalled } from '../core/install.js'
import { useIsLaptop } from '../core/viewport.js'
import { APP_VERSION } from '../config.js'

// صفحة الإعدادات: تملأ التطبيق، وفيها قائمة التصنيفات وصفحاتها الداخلية.
// زر الرجوع يعيد من الصفحة الداخلية إلى القائمة، ومن القائمة إلى التطبيق.
export default function SettingsScreen({ page, onOpenPage, onBack, onOpenGuide, onOpenStore, inert }) {
  const backButton = useRef(null)
  const screen = useRef(null)
  const current = SETTINGS_PAGES.find((item) => item.id === page && item.Page)
  const installed = isInstalled()
  const isLaptop = useIsLaptop()
  const items = SETTINGS_PAGES.filter(
    (item) => !(item.hideWhenInstalled && installed) && !(item.laptopOnly && !isLaptop),
  )

  useEffect(() => {
    backButton.current?.focus()
    screen.current?.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    if (inert) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') onBack()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onBack, inert])

  function openItem(item) {
    if (item.action === 'guide') onOpenGuide()
    else if (item.action === 'store') onOpenStore()
    else onOpenPage(item.id)
  }

  return (
    <>
      <div className="settings-scrim" onClick={onBack} aria-hidden="true" />
      <div
        className="settings-screen"
        ref={screen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        inert={inert}
      >
        <header className="settings-header">
          <button
            ref={backButton}
            type="button"
            className="icon-button pressable"
            aria-label="رجوع"
            onClick={onBack}
          >
            <BackIcon />
          </button>
          <h1 id="settings-title">{current ? current.title : 'الإعدادات'}</h1>
        </header>
  
        <div className="settings-content" key={current?.id ?? 'menu'}>
          {current ? (
            <current.Page />
          ) : (
            <>
            <nav className="settings-group" aria-label="تصنيفات الإعدادات">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="settings-row settings-link pressable"
                  onClick={() => openItem(item)}
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
            <p className="settings-version">الإصدار {APP_VERSION}</p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
