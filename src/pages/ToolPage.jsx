import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { GearIcon } from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'

// تعرض صفحة أي أداة من السجل المركزي. إعداداتها في صفحتها بالمتجر، والترس اختصار إليها
export default function ToolPage() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const { isEnabled } = useEnabledTools()
  const tool = getTool(toolId)

  if (!tool || !isEnabled(toolId)) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader
        title={tool.name}
        tool={tool}
        action={
          <button
            type="button"
            className="icon-button pressable"
            aria-label={`إعدادات ${tool.name}`}
            onClick={() => navigate(`/store/${tool.id}`)}
          >
            <GearIcon size={20} />
          </button>
        }
      />
      <tool.Page key={tool.id} />
    </div>
  )
}
