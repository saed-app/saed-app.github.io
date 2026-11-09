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
  const { name, homeDate } = useSettings()
  const today = useToday()
  const isEmpty = enabledTools.length === 0
  const trimmedName = name.trim()
  const greeting = trimmedName ? `أهلاً يا ${trimmedName}` : 'أهلاً بك'

  if (isEmpty) {
    return (
      <div className="page home">
        <h1>{greeting}</h1>
        <p>اختر ما تحتاجه، ودع الباقي.</p>
        <button type="button" className="add-tools pressable" onClick={() => navigate('/store')}>
          <PlusIcon size={20} />
          أضف أداة
        </button>
      </div>
    )
  }

  return (
    <div className="page home">
      <h1>{greeting}</h1>
      <div className="today-card">
        <span className="today-weekday">{WEEKDAY.format(today)}</span>
        {/* نوع التاريخ يُختار من الإعدادات: المظهر والتفضيلات */}
        <span className="today-date">
          {(homeDate === 'gregorian' ? GREGORIAN : HIJRI).format(today)}
        </span>
      </div>
    </div>
  )
}
