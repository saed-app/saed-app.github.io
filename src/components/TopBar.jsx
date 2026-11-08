import { GearIcon } from './Icons.jsx'
import Logo from './Logo.jsx'

// الشريط العلوي: الشعار والاسم في المنتصف، والإعدادات العامة على يمين الشاشة فعلياً
export default function TopBar({ onOpenSettings }) {
  return (
    <header className="topbar">
      <span aria-hidden="true" />
      <div className="topbar-brand">
        <Logo size={28} />
        <span className="topbar-title">ساعد</span>
      </div>
      <button
        type="button"
        className="icon-button pressable"
        aria-label="الإعدادات"
        onClick={onOpenSettings}
      >
        <GearIcon />
      </button>
    </header>
  )
}
