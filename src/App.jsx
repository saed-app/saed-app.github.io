import { useCallback, useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import Dock from './components/Dock.jsx'
import SettingsDrawer from './components/SettingsDrawer.jsx'
import { useEnabledTools } from './core/enabledTools.jsx'
import HomePage from './pages/HomePage.jsx'
import StorePage from './pages/StorePage.jsx'
import ToolPage from './pages/ToolPage.jsx'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { enabledTools } = useEnabledTools()
  const hasDock = enabledTools.length > 0

  // حالة الدرج محفوظة في سجل التنقل، فزر الرجوع في الجوال يغلقه بدل أن يخرج من الصفحة
  const settingsOpen = Boolean(location.state?.settingsOpen)
  const closing = useRef(false)

  useEffect(() => {
    closing.current = false
  }, [settingsOpen])

  const openSettings = useCallback(() => {
    navigate(location.pathname, { state: { settingsOpen: true } })
  }, [navigate, location.pathname])

  const closeSettings = useCallback(() => {
    // يمنع الرجوع خطوتين إذا ضغط المستخدم مرتين بسرعة
    if (closing.current) return
    closing.current = true
    navigate(-1)
  }, [navigate])

  return (
    <div className="app">
      <div className={`app-shell${hasDock ? ' has-dock' : ''}`} inert={settingsOpen}>
        <TopBar onOpenSettings={openSettings} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {hasDock && <Dock />}
      </div>
      <SettingsDrawer open={settingsOpen} onClose={closeSettings} />
    </div>
  )
}
