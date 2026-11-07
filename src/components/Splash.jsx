import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

const SHOW_MS = 900
const FADE_MS = 350

// شاشة البداية: الشعار واسم التطبيق لحظة فتحه، ثم تختفي بهدوء
export default function Splash() {
  const [phase, setPhase] = useState('shown')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fade = setTimeout(() => setPhase('fading'), reduce ? 300 : SHOW_MS)
    const done = setTimeout(() => setPhase('gone'), (reduce ? 300 : SHOW_MS) + FADE_MS)
    return () => {
      clearTimeout(fade)
      clearTimeout(done)
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div className={`splash${phase === 'fading' ? ' is-fading' : ''}`} aria-hidden="true">
      <div className="splash-mark">
        <Logo size={108} />
      </div>
      <div className="splash-name">ساعد</div>
    </div>
  )
}
