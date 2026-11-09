import { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'
import { useIsLaptop } from '../core/viewport.js'
import { ChartIcon, ChevronUpIcon, PlusIcon, SlidersIcon, StoreIcon } from './Icons.jsx'
import ToolsSheet from './ToolsSheet.jsx'

// الشريط السفلي في الجوال والتابلت: خمسة أزرار ثابتة، وعلى اللابتوب يبقى السهم وحده. من اليمين إلى اليسار:
// سهم لوحة الأدوات، إعدادات الأداة، زر +، إحصائيات الأداة، المتجر.
export default function BottomBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isEnabled } = useEnabledTools()
  const toolId = useMatch('/tool/:toolId/*')?.params.toolId
  const activeTool = toolId && isEnabled(toolId) ? getTool(toolId) : null

  const isLaptop = useIsLaptop()
  const [sheetOpen, setSheetOpen] = useState(false)

  // يُغلق الشريط عند الانتقال إلى أي صفحة
  useEffect(() => {
    setSheetOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!sheetOpen) return undefined
    function handleKey(event) {
      if (event.key === 'Escape') setSheetOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [sheetOpen])

  const toolHome = activeTool ? `/tool/${activeTool.id}` : null

  // في الرئيسية لا توجد أداة مفتوحة، فالأزرار الثلاثة ترفع شريط الأدوات لتختار واحدة
  function openToolPage(page) {
    if (!activeTool) {
      setSheetOpen(true)
      return
    }
    const target = `${toolHome}/${page}`
    if (pathname === target) navigate(toolHome, { replace: true })
    else navigate(target, { replace: pathname !== toolHome })
  }

  // لكل أداة ثلاث صفحات: + صفحتها الأساسية، وعلى يمينها إعداداتها، وعلى يسارها إحصائياتها
  function handleAdd() {
    if (!activeTool) {
      setSheetOpen(true)
      return
    }
    if (pathname !== toolHome) {
      navigate(toolHome, { replace: true })
      return
    }
    // وهو في صفحة + أصلاً: الأداة التي تدعم ذلك تبدأ عنصراً جديداً
    if (activeTool.supportsAdd) navigate(toolHome, { replace: true, state: { toolAdd: Date.now() } })
  }

  function selectTool(id) {
    setSheetOpen(false)
    navigate(`/tool/${id}`, { replace: pathname.startsWith('/tool/') })
  }

  const onSettings = Boolean(toolHome) && pathname === `${toolHome}/settings`
  const onStats = Boolean(toolHome) && pathname === `${toolHome}/stats`
  const onHome = Boolean(toolHome) && pathname === toolHome

  return (
    <>
      <ToolsSheet
        open={sheetOpen}
        activeId={activeTool?.id}
        onSelect={selectTool}
        onOpenStore={() => navigate('/store')}
      />

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
        {!isLaptop && (
          <>
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
          aria-current={onHome ? 'page' : undefined}
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
          </>
        )}
      </nav>
    </>
  )
}
