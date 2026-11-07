import { useLocation, useNavigate } from 'react-router-dom'
import { BackIcon } from './Icons.jsx'
import ToolTile from './ToolTile.jsx'

// عنوان الصفحات الداخلية، ومع tool تظهر أيقونة الأداة بجانب اسمها
export default function PageHeader({ title, tool }) {
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
      {tool && <ToolTile tool={tool} size="small" />}
      <h1>{title}</h1>
    </div>
  )
}
