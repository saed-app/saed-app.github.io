import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import BottomBar from './components/BottomBar.jsx'
import SettingsScreen from './components/SettingsScreen.jsx'
import Tour from './components/Tour.jsx'
import { useSettings } from './core/settings.jsx'
import { useIsLaptop } from './core/viewport.js'
import HomePage from './pages/HomePage.jsx'
import StorePage from './pages/StorePage.jsx'
import StoreToolPage from './pages/StoreToolPage.jsx'
import ToolPage, { ToolSettingsPage, ToolStatsPage } from './pages/ToolPage.jsx'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tourSeen, updateSettings } = useSettings()
  // الشريط السفلي يظهر في الرئيسية وصفحات الأدوات فقط، ويختفي في المتجر
  const isLaptop = useIsLaptop()
  const hasBar = location.pathname === '/' || location.pathname.startsWith('/tool/')

  // الدليل التعريفي يظهر تلقائياً في أول مرة فقط، ويُفتح بعدها من الإعدادات
  const [tourOpen, setTourOpen] = useState(!tourSeen)

  const closeTour = useCallback(() => {
    setTourOpen(false)
    if (!tourSeen) updateSettings({ tourSeen: true })
  }, [tourSeen, updateSettings])

  // حالة الإعدادات وصفحتها الداخلية محفوظتان في سجل التنقل،
  // فزر الرجوع في الجوال يعمل مثل زر الرجوع داخل الإعدادات
  const settingsOpen = Boolean(location.state?.settingsOpen)
  const settingsPage = location.state?.settingsPage ?? null
  const leaving = useRef(false)
  const settingsOpener = useRef(null)

  useEffect(() => {
    leaving.current = false
  }, [settingsOpen, settingsPage])

  // عند الخروج من الإعدادات نعيد التركيز إلى زر الترس
  useEffect(() => {
    if (!settingsOpen) settingsOpener.current?.focus?.()
  }, [settingsOpen])

  const openSettings = useCallback(() => {
    settingsOpener.current = document.activeElement
    navigate(location.pathname, { state: { settingsOpen: true } })
  }, [navigate, location.pathname])

  const openSettingsPage = useCallback(
    (page) => {
      navigate(location.pathname, { state: { settingsOpen: true, settingsPage: page } })
    },
    [navigate, location.pathname],
  )

  // يمنع الرجوع خطوتين إذا ضغط المستخدم مرتين بسرعة
  const settingsBack = useCallback(() => {
    if (leaving.current) return
    leaving.current = true
    navigate(-1)
  }, [navigate])

  return (
    <div className="app">
      <div
        className={`app-shell${hasBar ? ' has-dock' : ''}`}
        hidden={settingsOpen && !isLaptop}
        inert={settingsOpen || tourOpen}
      >
        <TopBar onOpenSettings={openSettings} />
        <main className="app-main">
          {/* المفتاح يعيد تشغيل حركة الظهور الخفيفة عند فتح كل صفحة */}
          <div className="route-view" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/:toolId" element={<StoreToolPage />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
            <Route path="/tool/:toolId/settings" element={<ToolSettingsPage />} />
            <Route path="/tool/:toolId/stats" element={<ToolStatsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </div>
        </main>
        {hasBar && <BottomBar />}
      </div>
      {settingsOpen && (
        <SettingsScreen
          page={settingsPage}
          onOpenPage={openSettingsPage}
          onBack={settingsBack}
          onOpenGuide={() => setTourOpen(true)}
          onOpenStore={() => navigate('/store', { replace: true })}
          inert={tourOpen}
        />
      )}
      {tourOpen && <Tour onClose={closeTour} />}
    </div>
  )
}
