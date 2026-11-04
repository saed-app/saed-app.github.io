import { useLocation, useNavigate } from 'react-router-dom'
import { PersonIcon, StoreIcon } from './Icons.jsx'

// ترتيب الشريط ثابت على الشاشة فعلياً (الحساب يساراً والمتجر يميناً) بغض النظر عن اتجاه اللغة
export default function TopBar({ onOpenSettings }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function openStore() {
    if (pathname !== '/store') navigate('/store')
  }

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-button avatar pressable"
        aria-label="الحساب والإعدادات"
        onClick={onOpenSettings}
      >
        <PersonIcon />
      </button>
      <div className="topbar-title">ساعد</div>
      <button
        type="button"
        className="icon-button pressable"
        aria-label="المتجر"
        onClick={openStore}
      >
        <StoreIcon />
      </button>
    </header>
  )
}
