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

  // حالة الدرج وصفحته الداخلية محفوظتان في سجل التنقل،
  // فزر الرجوع في الجوال يرجع داخل الإعدادات بدل أن يخرج من الصفحة
  const settingsOpen = Boolean(location.state?.settingsOpen)
  const settingsPage = location.state?.settingsPage ?? null
  const leaving = useRef(false)

  useEffect(() => {
    leaving.current = false
  }, [settingsOpen, settingsPage])

  const openSettings = useCallback(() => {
    navigate(location.pathname, { state: { settingsOpen: true } })
  }, [navigate, location.pathname])

  const openSettingsPage = useCallback(
    (page) => {
      navigate(location.pathname, { state: { settingsOpen: true, settingsPage: page } })
    },
    [navigate, location.pathname],
  )

  // يمنع الرجوع خطوات زائدة إذا ضغط المستخدم مرتين بسرعة
  const goBackSteps = useCallback(
    (steps) => {
      if (leaving.current) return
      leaving.current = true
      navigate(-steps)
    },
    [navigate],
  )

  const settingsBack = useCallback(() => goBackSteps(1), [goBackSteps])
  const closeSettings = useCallback(
    () => goBackSteps(settingsPage ? 2 : 1),
    [goBackSteps, settingsPage],
  )

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
      <SettingsDrawer
        open={settingsOpen}
        page={settingsPage}
        onOpenPage={openSettingsPage}
        onBack={settingsBack}
        onClose={closeSettings}
      />
    </div>
  )
}
