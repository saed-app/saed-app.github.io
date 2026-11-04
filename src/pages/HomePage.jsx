import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../components/Icons.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'

export default function HomePage() {
  const navigate = useNavigate()
  const { enabledTools } = useEnabledTools()
  const isEmpty = enabledTools.length === 0

  return (
    <div className="page home">
      <h1>مرحباً بك في ساعد</h1>
      <p>{isEmpty ? 'أضف الأدوات التي تحتاجها فقط.' : 'اختر أداة من الشريط في الأسفل.'}</p>
      {isEmpty && (
        <button type="button" className="add-tools pressable" onClick={() => navigate('/store')}>
          <span className="add-tools-circle">
            <PlusIcon size={56} />
          </span>
          <span className="add-tools-label">أدوات</span>
        </button>
      )}
    </div>
  )
}
