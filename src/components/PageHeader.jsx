import { useLocation, useNavigate } from 'react-router-dom'
import { BackIcon } from './Icons.jsx'

export default function PageHeader({ title }) {
  const navigate = useNavigate()
  const location = useLocation()

  function goBack() {
    // إذا فُتحت الصفحة مباشرة ولا يوجد ما نرجع إليه نذهب إلى الرئيسية
    if (location.key === 'default') navigate('/', { replace: true })
    else navigate(-1)
  }

  return (
    <div className="page-header">
      <button type="button" className="icon-button pressable" aria-label="رجوع" onClick={goBack}>
        <BackIcon />
      </button>
      <h1>{title}</h1>
    </div>
  )
}
