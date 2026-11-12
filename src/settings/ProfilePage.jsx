import { useState } from 'react'
import PinPad from '../components/PinPad.jsx'
import Toggle from '../components/Toggle.jsx'
import { useLock } from '../core/lock.jsx'
import { useSettings } from '../core/settings.jsx'

export default function ProfilePage() {
  const { name, updateSettings } = useSettings()
  const { hasPin, autoLock, verifyPin, setPin, removePin, setAutoLock } = useLock()

  // خطوات إدخال الرمز: new ثم confirm للإنشاء، وdisable أو change للتحقق من الرمز الحالي
  const [step, setStep] = useState(null)
  const [firstPin, setFirstPin] = useState('')
  const [error, setError] = useState('')

  function reset() {
    setStep(null)
    setFirstPin('')
    setError('')
  }

  function handlePin(pin) {
    setError('')
    if (step === 'new') {
      setFirstPin(pin)
      setStep('confirm')
    } else if (step === 'confirm') {
      if (pin === firstPin) {
        setPin(pin)
        reset()
      } else {
        setFirstPin('')
        setStep('new')
        setError('الرمزان غير متطابقين، جرّب مرة أخرى.')
      }
    } else if (!verifyPin(pin)) {
      setError('الرمز غير صحيح، جرّب مرة أخرى.')
    } else if (step === 'disable') {
      removePin()
      reset()
    } else {
      setStep('new')
    }
  }

  if (step) {
    const titles = {
      new: 'اختر رمزاً من 4 أرقام',
      confirm: 'اكتب الرمز مرة أخرى',
      disable: 'اكتب رمزك الحالي',
      change: 'اكتب رمزك الحالي',
    }
    return (
      <div className="settings-pin">
        <PinPad key={step} title={titles[step]} error={error} onComplete={handlePin} />
        <button type="button" className="text-button pressable" onClick={reset}>
          إلغاء
        </button>
      </div>
    )
  }

  return (
    <div className="settings-stack">
      <section>
        <h3 className="settings-title">الاسم</h3>
        <div className="settings-group">
          <input
            className="settings-input"
            type="text"
            value={name}
            maxLength={40}
            placeholder="اسمك"
            aria-label="الاسم"
            autoComplete="off"
            onChange={(event) => updateSettings({ name: event.target.value })}
          />
        </div>
        <p className="settings-hint">يبقى على جهازك فقط.</p>
      </section>

      <section>
        <h3 className="settings-title">قفل التطبيق</h3>
        <div className="settings-group">
          <div className="settings-row">
            <span className="settings-row-label">رمز القفل</span>
            <Toggle
              label="رمز القفل"
              checked={hasPin}
              onChange={(on) => setStep(on ? 'new' : 'disable')}
            />
          </div>
          {hasPin && (
            <>
              <div className="settings-row">
                <span className="settings-row-label">القفل عند الخروج</span>
                <Toggle
                  label="القفل عند الخروج"
                  checked={autoLock}
                  onChange={setAutoLock}
                />
              </div>
              <button
                type="button"
                className="settings-row settings-link pressable"
                onClick={() => setStep('change')}
              >
                <span className="settings-row-label">تغيير الرمز</span>
              </button>
            </>
          )}
        </div>
        <p className="settings-hint">
          يحمي من الفتح العابر، ولا يشفّر بياناتك. وإن نسيت الرمز فستحتاج إلى مسحها كلها.
        </p>
      </section>
    </div>
  )
}
