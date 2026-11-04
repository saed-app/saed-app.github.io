import { useRef, useState } from 'react'

// مفتاح تشغيل بشكل iPhone: يعمل بالضغط وبالسحب وبلوحة المفاتيح
export default function Toggle({ checked, onChange, label }) {
  const [preview, setPreview] = useState(null)
  const [pressed, setPressed] = useState(false)
  const drag = useRef(null)
  const ignoreClick = useRef(false)

  // هل موضع الإصبع في جهة "التشغيل"؟ الاتجاه معكوس في الواجهة العربية كما في iPhone
  function isOnSide(event) {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const middle = rect.left + rect.width / 2
    const rtl = getComputedStyle(el).direction === 'rtl'
    return rtl ? event.clientX < middle : event.clientX > middle
  }

  function handlePointerDown(event) {
    ignoreClick.current = false
    drag.current = { startX: event.clientX, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
    setPressed(true)
  }

  function handlePointerMove(event) {
    const current = drag.current
    if (!current) return
    if (!current.moved && Math.abs(event.clientX - current.startX) < 4) return
    current.moved = true
    setPreview(isOnSide(event))
  }

  function handlePointerUp(event) {
    const current = drag.current
    drag.current = null
    setPressed(false)
    setPreview(null)
    if (current?.moved) {
      ignoreClick.current = true
      const next = isOnSide(event)
      if (next !== checked) onChange(next)
    }
  }

  function handlePointerCancel() {
    drag.current = null
    setPressed(false)
    setPreview(null)
  }

  function handleClick(event) {
    // detail = 0 يعني أن الضغط من لوحة المفاتيح
    if (event.detail !== 0 && ignoreClick.current) {
      ignoreClick.current = false
      return
    }
    onChange(!checked)
  }

  const shownOn = preview ?? checked

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle${shownOn ? ' is-on' : ''}${pressed ? ' is-pressed' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClick={handleClick}
    >
      <span className="toggle-thumb" />
    </button>
  )
}
