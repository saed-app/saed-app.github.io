import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../components/Icons.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { useSettings } from '../core/settings.jsx'

const HIJRI = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const GREGORIAN = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const WEEKDAY = new Intl.DateTimeFormat('ar', { weekday: 'long' })

// تاريخ اليوم، ويتحدث عند العودة إلى التطبيق في يوم جديد
function useToday() {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    function refresh() {
      if (!document.hidden) setToday(new Date())
    }
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [])
  return today
}

export default function HomePage() {
  const navigate = useNavigate()
  const { enabledTools } = useEnabledTools()
  const { name } = useSettings()
  const today = useToday()
  const isEmpty = enabledTools.length === 0
  const trimmedName = name.trim()
  const greeting = trimmedName ? `مرحباً بك يا ${trimmedName}` : 'مرحباً بك في ساعد'

  if (isEmpty) {
    return (
      <div className="page home">
        <h1>{greeting}</h1>
        <p>أضف الأدوات التي تحتاجها فقط.</p>
        <button type="button" className="add-tools pressable" onClick={() => navigate('/store')}>
          <span className="add-tools-circle">
            <PlusIcon size={56} />
          </span>
          <span className="add-tools-label">أدوات</span>
        </button>
      </div>
    )
  }

  return (
    <div className="page home">
      <h1>{greeting}</h1>
      <div className="today-card">
        <span className="today-weekday">{WEEKDAY.format(today)}</span>
        <span className="today-hijri">{HIJRI.format(today)}</span>
        <span className="today-gregorian">{GREGORIAN.format(today)}</span>
      </div>
    </div>
  )
}
