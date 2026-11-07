import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { useSettings } from '../core/settings.jsx'
import { ChevronSideIcon } from './Icons.jsx'
import ToolTile from './ToolTile.jsx'

const LONG_PRESS_MS = 380
const MOVE_TOLERANCE = 8
const EDGE_ZONE = 36
const EDGE_SPEED = 6

// الشريط العائم: وسيلة التنقل الوحيدة بين الأدوات.
// الضغط يفتح الأداة، والضغط المطول ثم السحب يغيّر مكانها، والسحب السريع يمرّر الشريط.
export default function Dock() {
  const { enabledTools, reorderTools } = useEnabledTools()
  const { dockCollapsed, updateSettings } = useSettings()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const activeId = useMatch('/tool/:toolId')?.params.toolId

  const scroller = useRef(null)
  const press = useRef(null)
  const dragGeometry = useRef(null)
  const ignoreClick = useRef(false)
  const frame = useRef(0)
  const previousCount = useRef(enabledTools.length)
  const [drag, setDrag] = useState(null)

  const ids = enabledTools.map((tool) => tool.id)

  // عند إضافة أداة جديدة نمرّر لإظهارها، وعند فتح أداة نتأكد أنها ظاهرة
  useEffect(() => {
    const count = enabledTools.length
    const items = scroller.current?.children
    if (!items) return
    if (count > previousCount.current) {
      items[count - 1]?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
    }
    previousCount.current = count
  }, [enabledTools.length])

  useEffect(() => {
    if (!activeId) return
    scroller.current
      ?.querySelector(`[data-tool="${activeId}"]`)
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' })
  }, [activeId])

  // المستمعان التاليان يحتاجان preventDefault، لذا يُضافان يدوياً
  useEffect(() => {
    const el = scroller.current
    if (!el) return undefined

    // عجلة الفأرة تمرّر الشريط أفقياً على الكمبيوتر
    function handleWheel(event) {
      if (el.scrollWidth <= el.clientWidth) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      // الواجهة من اليمين لليسار، فالتقدم في الشريط يعني التحرك نحو اليسار
      el.scrollLeft -= event.deltaY
    }

    // يمنع الجوال من تمرير الشريط أثناء سحب أداة
    function handleTouchMove(event) {
      if (dragGeometry.current) event.preventDefault()
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => () => {
    clearTimeout(press.current?.timer)
    cancelAnimationFrame(frame.current)
  }, [])

  // يحسب مكان الأداة المسحوبة والترتيب المؤقت حسب موضع الإصبع
  const updateDrag = useCallback(() => {
    const geometry = dragGeometry.current
    if (!geometry) return
    const el = scroller.current
    const rect = el.getBoundingClientRect()
    const shift = el.scrollLeft - geometry.scrollStart
    const fingerX = Math.min(Math.max(geometry.lastX - geometry.grabOffset, rect.left), rect.right)

    let target = 0
    let best = Infinity
    geometry.centers.forEach((center, index) => {
      const distance = Math.abs(fingerX - (center - shift))
      if (distance < best) {
        best = distance
        target = index
      }
    })

    const order = geometry.ids.filter((id) => id !== geometry.id)
    order.splice(target, 0, geometry.id)
    geometry.order = order
    setDrag({
      id: geometry.id,
      order,
      centers: geometry.centers,
      ids: geometry.ids,
      offset: fingerX - (geometry.centers[geometry.ids.indexOf(geometry.id)] - shift),
    })
  }, [])

  // عند اقتراب الإصبع من طرف الشريط يتحرك تلقائياً للوصول إلى الأدوات المخفية
  const tick = useCallback(() => {
    const geometry = dragGeometry.current
    if (!geometry) return
    const el = scroller.current
    const rect = el.getBoundingClientRect()
    const before = el.scrollLeft
    if (geometry.lastX < rect.left + EDGE_ZONE) el.scrollLeft -= EDGE_SPEED
    else if (geometry.lastX > rect.right - EDGE_ZONE) el.scrollLeft += EDGE_SPEED
    if (el.scrollLeft !== before) updateDrag()
    frame.current = requestAnimationFrame(tick)
  }, [updateDrag])

  function beginDrag() {
    const current = press.current
    if (!current) return
    current.mode = 'drag'
    ignoreClick.current = true
    navigator.vibrate?.(12)

    const el = scroller.current
    const items = [...el.children]
    const centers = items.map((item) => {
      const rect = item.getBoundingClientRect()
      return rect.left + rect.width / 2
    })
    const index = ids.indexOf(current.id)
    dragGeometry.current = {
      id: current.id,
      ids,
      centers,
      scrollStart: el.scrollLeft,
      grabOffset: current.lastX - centers[index],
      lastX: current.lastX,
    }
    updateDrag()
    frame.current = requestAnimationFrame(tick)
  }

  function endDrag(commit) {
    cancelAnimationFrame(frame.current)
    const geometry = dragGeometry.current
    dragGeometry.current = null
    setDrag(null)
    if (commit && geometry?.order) reorderTools(geometry.order)
  }

  function handlePointerDown(event, id) {
    if (event.button !== 0) return
    ignoreClick.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
    press.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      scrollStart: scroller.current.scrollLeft,
      mouse: event.pointerType === 'mouse',
      mode: 'press',
      timer: setTimeout(beginDrag, LONG_PRESS_MS),
    }
  }

  function handlePointerMove(event) {
    const current = press.current
    if (!current) return
    current.lastX = event.clientX

    if (current.mode === 'press') {
      const movedX = Math.abs(event.clientX - current.startX)
      const movedY = Math.abs(event.clientY - current.startY)
      if (movedX > MOVE_TOLERANCE || movedY > MOVE_TOLERANCE) {
        clearTimeout(current.timer)
        ignoreClick.current = true
        // في الجوال يتولى المتصفح التمرير، أما الفأرة فنمرّر لها يدوياً
        current.mode = current.mouse ? 'scroll' : 'none'
      }
    }

    if (current.mode === 'scroll') {
      scroller.current.scrollLeft = current.scrollStart - (event.clientX - current.startX)
    } else if (current.mode === 'drag') {
      dragGeometry.current.lastX = event.clientX
      updateDrag()
    }
  }

  function handlePointerEnd(commit) {
    const current = press.current
    if (!current) return
    clearTimeout(current.timer)
    press.current = null
    if (current.mode === 'drag') endDrag(commit)
  }

  function openTool(event, id) {
    // detail = 0 يعني أن الضغط من لوحة المفاتيح
    if (event.detail !== 0 && ignoreClick.current) {
      ignoreClick.current = false
      return
    }
    // بين الأدوات نستبدل الصفحة حتى يرجع زر الرجوع إلى الرئيسية مباشرة
    navigate(`/tool/${id}`, { replace: pathname.startsWith('/tool/') })
  }

  // Shift مع الأسهم يغيّر مكان الأداة من لوحة المفاتيح
  function handleKeyDown(event, id) {
    if (!event.shiftKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
    event.preventDefault()
    const from = ids.indexOf(id)
    const to = from + (event.key === 'ArrowLeft' ? 1 : -1)
    if (to < 0 || to >= ids.length) return
    const next = [...ids]
    next.splice(from, 1)
    next.splice(to, 0, id)
    reorderTools(next)
  }

  function itemStyle(id, index) {
    if (!drag) return undefined
    if (id === drag.id) return { transform: `translateX(${drag.offset}px)` }
    const shownAt = drag.order.indexOf(id)
    return { transform: `translateX(${drag.centers[shownAt] - drag.centers[index]}px)` }
  }

  return (
    <div className={`dock-wrap${dockCollapsed ? ' is-collapsed' : ''}`}>
      <nav className={`dock${drag ? ' is-dragging' : ''}`} aria-label="الأدوات">
        {/* السهم الثابت: يطوي الشريط إلى دائرة على اليمين ويفتحه من جديد */}
        <button
          type="button"
          className="dock-toggle pressable"
          aria-expanded={!dockCollapsed}
          aria-controls="dock-tools"
          aria-label={dockCollapsed ? 'إظهار شريط الأدوات' : 'إخفاء شريط الأدوات'}
          onClick={() => updateSettings({ dockCollapsed: !dockCollapsed })}
        >
          <ChevronSideIcon direction={dockCollapsed ? 'left' : 'right'} size={22} />
        </button>
        <span className="dock-divider" aria-hidden="true" />
        <div className="dock-scroll" id="dock-tools" ref={scroller} hidden={dockCollapsed}>
          {enabledTools.map((tool, index) => (
            <button
              key={tool.id}
              type="button"
              data-tool={tool.id}
              className={`dock-item${tool.id === activeId ? ' is-active' : ''}${
                drag?.id === tool.id ? ' is-held' : ''
              }`}
              style={itemStyle(tool.id, index)}
              aria-label={tool.name}
              aria-current={tool.id === activeId ? 'page' : undefined}
              onPointerDown={(event) => handlePointerDown(event, tool.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={() => handlePointerEnd(true)}
              onPointerCancel={() => handlePointerEnd(false)}
              onContextMenu={(event) => event.preventDefault()}
              onClick={(event) => openTool(event, tool.id)}
              onKeyDown={(event) => handleKeyDown(event, tool.id)}
            >
              <ToolTile tool={tool} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
