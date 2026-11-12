import { useState } from 'react'
import { useLock } from '../core/lock.jsx'
import PinPad from './PinPad.jsx'
import WipeData from './WipeData.jsx'

function LockScreen() {
  const { verifyPin, unlock } = useLock()
  const [error, setError] = useState('')
  const [forgot, setForgot] = useState(false)

  function handlePin(pin) {
    if (verifyPin(pin)) unlock()
    else setError('الرمز غير صحيح، جرّب مرة أخرى.')
  }

  return (
    <div className="lock-screen">
      <div className="topbar-title">ساعد</div>
      {forgot ? (
        <div className="lock-forgot">
          <WipeData onCancel={() => setForgot(false)} />
        </div>
      ) : (
        <PinPad
          title="اكتب رمزك"
          error={error}
          onComplete={handlePin}
          extra={
            <button type="button" className="text-button pressable" onClick={() => setForgot(true)}>
              نسيت الرمز؟
            </button>
          }
        />
      )}
    </div>
  )
}

// إذا كان التطبيق مقفلاً لا يُعرض محتواه أصلاً
export default function LockGate({ children }) {
  const { locked } = useLock()
  return locked ? <LockScreen /> : children
}
