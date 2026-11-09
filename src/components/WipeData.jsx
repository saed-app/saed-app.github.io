import { useState } from 'react'
import { storage } from '../data/storage.js'

// زر مسح كل البيانات مع خطوة تأكيد، ويُستخدم في الإعدادات وشاشة القفل
export default function WipeData({ label = 'مسح كل البيانات', onCancel }) {
  const [confirming, setConfirming] = useState(Boolean(onCancel))

  async function wipe() {
    await storage.clear()
    // نعيد تشغيل التطبيق من البداية
    window.location.replace(window.location.pathname)
  }

  function cancel() {
    if (onCancel) onCancel()
    else setConfirming(false)
  }

  if (!confirming) {
    return (
      <button type="button" className="danger-button pressable" onClick={() => setConfirming(true)}>
        {label}
      </button>
    )
  }

  return (
    <div className="wipe-confirm" role="alertdialog" aria-labelledby="wipe-title">
      <p id="wipe-title">سيُمسح كل شيء من هذا الجهاز، ولا رجعة في ذلك.</p>
      <div className="wipe-actions">
        <button type="button" className="danger-button pressable" onClick={wipe}>
          نعم، امسح
        </button>
        <button type="button" className="cancel-button pressable" onClick={cancel}>
          إلغاء
        </button>
      </div>
    </div>
  )
}
