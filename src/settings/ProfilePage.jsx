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
        setError('الرمزان غير متطابقين، حاول من جديد.')
      }
    } else if (!verifyPin(pin)) {
      setError('الرمز غير صحيح.')
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
      confirm: 'أعد إدخال الرمز',
      disable: 'أدخل الرمز الحالي',
      change: 'أدخل الرمز الحالي',
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
            placeholder="اكتب اسمك"
            aria-label="الاسم"
            autoComplete="off"
            onChange={(event) => updateSettings({ name: event.target.value })}
          />
        </div>
        <p className="settings-hint">يُحفظ على جهازك فقط، ولا يوجد حساب ولا تسجيل دخول.</p>
      </section>

      <section>
        <h3 className="settings-title">قفل التطبيق</h3>
        <div className="settings-group">
          <div className="settings-row">
            <span className="settings-row-label">القفل برمز PIN</span>
            <Toggle
              label="القفل برمز PIN"
              checked={hasPin}
              onChange={(on) => setStep(on ? 'new' : 'disable')}
            />
          </div>
          {hasPin && (
            <>
              <div className="settings-row">
                <span className="settings-row-label">القفل فور الخروج من التطبيق</span>
                <Toggle
                  label="القفل فور الخروج من التطبيق"
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
          يمنع الفتح العابر فقط ولا يشفّر بياناتك. إذا نسيت الرمز فالحل الوحيد مسح كل البيانات.
        </p>
      </section>
    </div>
  )
}
