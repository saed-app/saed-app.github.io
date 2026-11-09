import { useState } from 'react'
import { applyUpdate, dismissUpdate, useUpdateAvailable } from '../core/update.js'
import { CloseIcon } from './Icons.jsx'

// شريط «يوجد تحديث جديد»: جزء من تدفق الصفحة أسفل الشريط العلوي، فلا يغطي شيئاً
export default function UpdateBanner() {
  const available = useUpdateAvailable()
  const [busy, setBusy] = useState(false)

  if (!available) return null

  async function handleUpdate() {
    setBusy(true)
    const started = await applyUpdate()
    if (!started) setBusy(false)
  }

  return (
    <div className="update-banner" role="status">
      <span className="update-banner-text">يوجد تحديث جديد</span>
      <button type="button" className="update-banner-action pressable" disabled={busy} onClick={handleUpdate}>
        {busy ? 'جارٍ التحديث…' : 'تحديث الآن'}
      </button>
      <button
        type="button"
        className="update-banner-close pressable"
        aria-label="إغلاق تنبيه التحديث"
        onClick={dismissUpdate}
      >
        <CloseIcon size={18} />
      </button>
    </div>
  )
}
