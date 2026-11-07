import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'

// تعرض صفحة أي أداة من السجل المركزي
export default function ToolPage() {
  const { toolId } = useParams()
  const { isEnabled } = useEnabledTools()
  const tool = getTool(toolId)

  if (!tool || !isEnabled(toolId)) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader title={tool.name} tool={tool} />
      <tool.Page key={tool.id} />
    </div>
  )
}
