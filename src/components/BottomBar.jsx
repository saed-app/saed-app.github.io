import { useEffect, useRef, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'
import { ChartIcon, ChevronUpIcon, PlusIcon, SlidersIcon, StoreIcon } from './Icons.jsx'
import ToolsSheet from './ToolsSheet.jsx'

// الشريط السفلي: خمسة أزرار ثابتة. من اليمين إلى اليسار:
// سهم لوحة الأدوات، إعدادات الأداة، زر +، إحصائيات الأداة، المتجر.
export default function BottomBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isEnabled } = useEnabledTools()
  const toolId = useMatch('/tool/:toolId/*')?.params.toolId
  const activeTool = toolId && isEnabled(toolId) ? getTool(toolId) : null

  const [sheetOpen, setSheetOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(0)

  // تُغلق اللوحة عند الانتقال إلى أي صفحة
  useEffect(() => {
    setSheetOpen(false)
  }, [pathname])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  useEffect(() => {
    if (!sheetOpen) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') setSheetOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [sheetOpen])

  function showToast(message) {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2200)
  }

  const toolHome = activeTool ? `/tool/${activeTool.id}` : null

  // في الرئيسية لا توجد أداة مفتوحة، فالأزرار الثلاثة ترفع لوحة الأدوات لتختار واحدة
  function openToolPage(page) {
    if (!activeTool) {
      setSheetOpen(true)
      return
    }
    const target = `${toolHome}/${page}`
    if (pathname === target) navigate(toolHome, { replace: true })
    else navigate(target, { replace: pathname !== toolHome })
  }

  function handleAdd() {
    if (!activeTool) {
      setSheetOpen(true)
      return
    }
    if (!activeTool.supportsAdd) {
      showToast('هذه الأداة قريباً')
      return
    }
    navigate(toolHome, {
      replace: pathname.startsWith('/tool/'),
      state: { toolAdd: Date.now() },
    })
  }

  function selectTool(id) {
    setSheetOpen(false)
    navigate(`/tool/${id}`, { replace: pathname.startsWith('/tool/') })
  }

  const onSettings = Boolean(toolHome) && pathname === `${toolHome}/settings`
  const onStats = Boolean(toolHome) && pathname === `${toolHome}/stats`

  return (
    <>
      <div
        className={`sheet-scrim${sheetOpen ? ' is-open' : ''}`}
        onClick={() => setSheetOpen(false)}
        aria-hidden="true"
      />
      <ToolsSheet
        open={sheetOpen}
        activeId={activeTool?.id}
        onSelect={selectTool}
        onOpenStore={() => navigate('/store')}
      />

      {toast && (
        <div className="bar-toast" role="status">
          {toast}
        </div>
      )}

      <nav className="bottom-bar" aria-label="الشريط السفلي">
        <button
          type="button"
          className={`bar-button bar-arrow pressable${sheetOpen ? ' is-open' : ''}`}
          aria-expanded={sheetOpen}
          aria-controls="tools-sheet"
          aria-label={sheetOpen ? 'إغلاق لوحة الأدوات' : 'فتح لوحة الأدوات'}
          onClick={() => setSheetOpen((open) => !open)}
        >
          <ChevronUpIcon size={24} />
        </button>
        <button
          type="button"
          className={`bar-button pressable${onSettings ? ' is-current' : ''}`}
          aria-label="إعدادات الأداة"
          aria-current={onSettings ? 'page' : undefined}
          onClick={() => openToolPage('settings')}
        >
          <SlidersIcon size={24} />
        </button>
        <button
          type="button"
          className="bar-button bar-add pressable"
          aria-label={activeTool ? `إضافة جديدة في ${activeTool.name}` : 'اختر أداة'}
          onClick={handleAdd}
        >
          <PlusIcon size={28} />
        </button>
        <button
          type="button"
          className={`bar-button pressable${onStats ? ' is-current' : ''}`}
          aria-label="إحصائيات الأداة"
          aria-current={onStats ? 'page' : undefined}
          onClick={() => openToolPage('stats')}
        >
          <ChartIcon size={24} />
        </button>
        <button
          type="button"
          className="bar-button pressable"
          aria-label="المتجر"
          onClick={() => navigate('/store')}
        >
          <StoreIcon size={24} />
        </button>
      </nav>
    </>
  )
}
