import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { BackIcon, ChevronStartIcon } from './Icons.jsx'
import { SETTINGS_PAGES } from '../settings/pages.js'
import { isInstalled } from '../core/install.js'
import { useIsLaptop } from '../core/viewport.js'
import { APP_VERSION } from '../config.js'

// الإعدادات: في الجوال والتابلت صفحة تملأ التطبيق، وزر الرجوع يعيد من الصفحة الداخلية إلى القائمة،
// ومن القائمة إلى التطبيق. وعلى اللابتوب (panel) عمود ثابت على اليمين، وزر الرجوع للصفحات الداخلية فقط.
export default function SettingsScreen({ page, onOpenPage, onBack, onOpenGuide, onOpenStore, inert, panel }) {
  const { pathname } = useLocation()
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
    if (inert || panel) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') onBack()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onBack, inert, panel])

  function openItem(item) {
    if (item.action === 'guide') onOpenGuide()
    else if (item.action === 'store') onOpenStore()
    else onOpenPage(item.id)
  }

  const Root = panel ? 'aside' : 'div'
  const rootProps = panel
    ? { 'aria-labelledby': 'settings-title' }
    : { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'settings-title' }

  return (
    <Root className={`settings-screen${panel ? ' is-panel' : ''}`} ref={screen} inert={inert} {...rootProps}>
      <header className="settings-header">
        {(!panel || current) && (
          <button
            ref={backButton}
            type="button"
            className="icon-button pressable"
            aria-label="رجوع"
            onClick={onBack}
          >
            <BackIcon />
          </button>
        )}
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
                    <item.Icon
                      size={20}
                      active={item.action === 'store' ? pathname.startsWith('/store') : item.id === page}
                    />
                  </span>
                  <span className="settings-row-label">{item.title}</span>
                  <span className="settings-row-chevron">
                    <ChevronStartIcon size={18} />
                  </span>
                </button>
              ))}
            </nav>
            <p className="settings-version">
              الإصدار <span className="ltr-num">{APP_VERSION}</span>
            </p>
          </>
        )}
      </div>
    </Root>
  )
}
