import { useNavigate } from 'react-router-dom'
import { ChartIcon, PlusIcon } from './Icons.jsx'

// على اللابتوب لا يوجد الشريط السفلي، فزر الإحصائيات في عنوان صفحة الأداة.
// وصفحة + هي الصفحة المفتوحة نفسها، فزرها يظهر فقط إن كانت الأداة تبدأ فيها عنصراً جديداً
export default function ToolActions({ tool }) {
  const navigate = useNavigate()
  const toolHome = `/tool/${tool.id}`

  return (
    <div className="tool-actions">
      <button
        type="button"
        className="icon-button pressable"
        aria-label="إحصائيات الأداة"
        onClick={() => navigate(`${toolHome}/stats`)}
      >
        <ChartIcon size={22} />
      </button>
      {tool.supportsAdd && (
        <button
          type="button"
          className="icon-button tool-action-add pressable"
          aria-label={`إضافة جديدة في ${tool.name}`}
          onClick={() => navigate(toolHome, { replace: true, state: { toolAdd: Date.now() } })}
        >
          <PlusIcon size={22} />
        </button>
      )}
    </div>
  )
}
