import { GearIcon } from './Icons.jsx'
import Logo from './Logo.jsx'
import { useIsLaptop } from '../core/viewport.js'

// الشريط العلوي: الشعار والاسم في المنتصف، والإعدادات العامة على يمين الشاشة فعلياً في الجوال والتابلت، وعلى اللابتوب هي عمود ثابت
export default function TopBar({ onOpenSettings }) {
  const isLaptop = useIsLaptop()

  return (
    <header className="topbar">
      <span aria-hidden="true" />
      <div className="topbar-brand">
        <Logo size={28} />
        <span className="topbar-title">ساعد</span>
      </div>
      {isLaptop ? (
        <span aria-hidden="true" />
      ) : (
        <button
          type="button"
          className="icon-button pressable"
          aria-label="الإعدادات"
          onClick={onOpenSettings}
        >
          <GearIcon />
        </button>
      )}
    </header>
  )
}
