import { useLocation, useNavigate } from 'react-router-dom'
import { GearIcon, StoreIcon } from './Icons.jsx'

// ترتيب الشريط ثابت على الشاشة فعلياً (المتجر يساراً والإعدادات يميناً) بغض النظر عن اتجاه اللغة
export default function TopBar({ onOpenSettings }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function openStore() {
    if (pathname !== '/store') navigate('/store')
  }

  return (
    <header className="topbar">
      <button type="button" className="icon-button pressable" aria-label="المتجر" onClick={openStore}>
        <StoreIcon />
      </button>
      <div className="topbar-title">ساعد</div>
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
