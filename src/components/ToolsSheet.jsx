import { useCallback, useEffect, useRef, useState } from 'react'
import { useEnabledTools } from '../core/enabledTools.jsx'
import ToolTile from './ToolTile.jsx'
import { useIsLaptop } from '../core/viewport.js'

const LONG_PRESS_MS = 380
const MOVE_TOLERANCE = 8
const EDGE_ZONE = 44
const EDGE_SPEED = 6

// شريط الأدوات: عمود طويل في الجوال والتابلت، وصف أفقي على اللابتوب، ويظهر بالضغط على السهم.
// الضغط على أداة يفتحها، والضغط المطول ثم السحب يغيّر مكانها، والسحب السريع يمرّر الشريط.
export default function ToolsSheet({ open, activeId, onSelect, onOpenStore }) {
  const { enabledTools, reorderTools } = useEnabledTools()
  // عمودي في الجوال والتابلت، وأفقي على اللابتوب
  const isLaptop = useIsLaptop()
  const axis = useRef(isLaptop ? 'scrollLeft' : 'scrollTop')
  axis.current = isLaptop ? 'scrollLeft' : 'scrollTop'
  const grid = useRef(null)
  const press = useRef(null)
  const dragGeometry = useRef(null)
  const ignoreClick = useRef(false)
  const frame = useRef(0)
  const [drag, setDrag] = useState(null)

  const ids = enabledTools.map((tool) => tool.id)

  // يمنع الجوال من تمرير الشريط أثناء سحب أداة
  useEffect(() => {
    const el = grid.current
    if (!el) return undefined
    function handleTouchMove(event) {
      if (dragGeometry.current) event.preventDefault()
    }
    el.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => el.removeEventListener('touchmove', handleTouchMove)
  }, [])

  useEffect(
    () => () => {
      clearTimeout(press.current?.timer)
      cancelAnimationFrame(frame.current)
    },
    [],
  )

  // يحسب مكان الأداة المسحوبة والترتيب المؤقت حسب موضع الإصبع
  const updateDrag = useCallback(() => {
    const geometry = dragGeometry.current
    if (!geometry) return
    const el = grid.current
    const rect = el.getBoundingClientRect()
    const shift = el[axis.current] - geometry.scrollStart
    const shiftX = axis.current === 'scrollLeft' ? shift : 0
    const shiftY = axis.current === 'scrollTop' ? shift : 0
    const fingerX = Math.min(Math.max(geometry.lastX - geometry.grabX, rect.left), rect.right)
    const fingerY = Math.min(Math.max(geometry.lastY - geometry.grabY, rect.top), rect.bottom)

    let target = 0
    let best = Infinity
    geometry.centers.forEach((center, index) => {
      const distance = Math.hypot(fingerX - (center.x - shiftX), fingerY - (center.y - shiftY))
      if (distance < best) {
        best = distance
        target = index
      }
    })

    const order = geometry.ids.filter((id) => id !== geometry.id)
    order.splice(target, 0, geometry.id)
    geometry.order = order
    const home = geometry.centers[geometry.ids.indexOf(geometry.id)]
    setDrag({
      id: geometry.id,
      order,
      centers: geometry.centers,
      offsetX: fingerX - (home.x - shiftX),
      offsetY: fingerY - (home.y - shiftY),
    })
  }, [])

  // عند اقتراب الإصبع من طرف الشريط يتحرك تلقائياً للوصول إلى الأدوات المخفية
  const tick = useCallback(() => {
    const geometry = dragGeometry.current
    if (!geometry) return
    const el = grid.current
    const rect = el.getBoundingClientRect()
    const key = axis.current
    const before = el[key]
    const [position, start, end] =
      key === 'scrollLeft'
        ? [geometry.lastX, rect.left, rect.right]
        : [geometry.lastY, rect.top, rect.bottom]
    if (position < start + EDGE_ZONE) el[key] -= EDGE_SPEED
    else if (position > end - EDGE_ZONE) el[key] += EDGE_SPEED
    if (el[key] !== before) updateDrag()
    frame.current = requestAnimationFrame(tick)
  }, [updateDrag])

  function beginDrag() {
    const current = press.current
    if (!current) return
    current.mode = 'drag'
    ignoreClick.current = true
    navigator.vibrate?.(12)

    const el = grid.current
    const centers = [...el.children].map((item) => {
      const rect = item.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })
    const home = centers[ids.indexOf(current.id)]
    dragGeometry.current = {
      id: current.id,
      ids,
      centers,
      scrollStart: el[axis.current],
      grabX: current.lastX - home.x,
      grabY: current.lastY - home.y,
      lastX: current.lastX,
      lastY: current.lastY,
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
      lastY: event.clientY,
      scrollStart: grid.current[axis.current],
      mouse: event.pointerType === 'mouse',
      mode: 'press',
      timer: setTimeout(beginDrag, LONG_PRESS_MS),
    }
  }

  function handlePointerMove(event) {
    const current = press.current
    if (!current) return
    current.lastX = event.clientX
    current.lastY = event.clientY

    if (current.mode === 'press') {
      const moved = Math.hypot(event.clientX - current.startX, event.clientY - current.startY)
      if (moved > MOVE_TOLERANCE) {
        clearTimeout(current.timer)
        ignoreClick.current = true
        // في الجوال يتولى المتصفح التمرير، أما الفأرة فنمرّر لها يدوياً
        current.mode = current.mouse ? 'scroll' : 'none'
      }
    }

    if (current.mode === 'scroll') {
      grid.current[axis.current] =
        current.scrollStart -
        (axis.current === 'scrollLeft' ? event.clientX - current.startX : event.clientY - current.startY)
    } else if (current.mode === 'drag') {
      dragGeometry.current.lastX = event.clientX
      dragGeometry.current.lastY = event.clientY
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

  function handleClick(event, id) {
    // detail = 0 يعني أن الضغط من لوحة المفاتيح
    if (event.detail !== 0 && ignoreClick.current) {
      ignoreClick.current = false
      return
    }
    onSelect(id)
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
    if (id === drag.id) return { transform: `translate(${drag.offsetX}px, ${drag.offsetY}px)` }
    const shownAt = drag.order.indexOf(id)
    const dx = drag.centers[shownAt].x - drag.centers[index].x
    const dy = drag.centers[shownAt].y - drag.centers[index].y
    return { transform: `translate(${dx}px, ${dy}px)` }
  }

  return (
    <div
      id="tools-sheet"
      className={`tools-sheet${open ? ' is-open' : ''}${drag ? ' is-dragging' : ''}`}
      inert={!open}
      role="dialog"
      aria-label="أدواتي"
    >
      {enabledTools.length === 0 ? (
        <div className="tools-sheet-empty">
          <p>لم تضف أي أداة بعد.</p>
          <button type="button" className="store-action pressable" onClick={onOpenStore}>
            افتح المتجر
          </button>
        </div>
      ) : (
        <div className="tools-sheet-grid" ref={grid}>
          {enabledTools.map((tool, index) => (
            <button
              key={tool.id}
              type="button"
              className={`sheet-item${tool.id === activeId ? ' is-active' : ''}${
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
              onClick={(event) => handleClick(event, tool.id)}
              onKeyDown={(event) => handleKeyDown(event, tool.id)}
            >
              <ToolTile tool={tool} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
