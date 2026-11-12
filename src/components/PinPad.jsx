import { useEffect, useState } from 'react'
import { PIN_LENGTH } from '../core/lock.jsx'
import { BackspaceIcon } from './Icons.jsx'

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// لوحة إدخال الرمز، وتعمل باللمس وبلوحة مفاتيح الكمبيوتر
export default function PinPad({ title, error, onComplete, extra }) {
  const [digits, setDigits] = useState('')
  // يتغير مع كل محاولة حتى تتكرر حركة الاهتزاز عند كل خطأ
  const [attempt, setAttempt] = useState(0)

  function press(digit) {
    if (digits.length >= PIN_LENGTH) return
    const next = digits + digit
    if (next.length === PIN_LENGTH) {
      setDigits('')
      setAttempt((count) => count + 1)
      onComplete(next)
    } else {
      setDigits(next)
    }
  }

  function erase() {
    setDigits((current) => current.slice(0, -1))
  }

  useEffect(() => {
    function handleKey(event) {
      if (/^[0-9]$/.test(event.key)) press(event.key)
      else if (event.key === 'Backspace') erase()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  return (
    <div className="pinpad">
      <h3 className="pinpad-title">{title}</h3>
      <div
        className={`pinpad-dots${error ? ' has-error' : ''}`}
        key={attempt}
        role="img"
        aria-label={`تم إدخال ${digits.length} من ${PIN_LENGTH}`}
      >
        {Array.from({ length: PIN_LENGTH }, (_, index) => (
          <span key={index} className={index < digits.length ? 'is-filled' : ''} />
        ))}
      </div>
      <p className="pinpad-error" role="alert">
        {error}
      </p>
      <div className="pinpad-keys">
        {DIGITS.map((digit) => (
          <button key={digit} type="button" className="pinpad-key pressable" onClick={() => press(digit)}>
            {digit}
          </button>
        ))}
        <span />
        <button type="button" className="pinpad-key pressable" onClick={() => press('0')}>
          0
        </button>
        <button
          type="button"
          className="pinpad-key is-plain pressable"
          aria-label="حذف آخر رقم"
          onClick={erase}
        >
          <BackspaceIcon className="rtl-flip" />
        </button>
      </div>
      {extra}
    </div>
  )
}
