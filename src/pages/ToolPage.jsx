import { Navigate, useParams } from 'react-router-dom'
import ComingSoon from '../components/ComingSoon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { ToolSettingsPanel, ToolSettingsPreview } from '../components/ToolSettings.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'

function useOpenTool() {
  const { toolId } = useParams()
  const { isEnabled } = useEnabledTools()
  const tool = getTool(toolId)
  return tool && isEnabled(toolId) ? tool : null
}

// تعرض صفحة أي أداة من السجل المركزي
export default function ToolPage() {
  const tool = useOpenTool()
  if (!tool) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader title={tool.name} tool={tool} />
      <tool.Page key={tool.id} />
    </div>
  )
}

// إعدادات الأداة: تُفتح من زر الشريط السفلي
export function ToolSettingsPage() {
  const tool = useOpenTool()
  if (!tool) return <Navigate to="/" replace />

  let settings = null
  if (tool.Settings) settings = <tool.Settings />
  else if (import.meta.env.DEV) settings = <ToolSettingsPreview />

  return (
    <div className="page">
      <PageHeader title={`إعدادات ${tool.name}`} tool={tool} />
      <ToolSettingsPanel tool={tool}>
        {settings ?? <p className="tool-settings-note is-wide">لا توجد إعدادات لهذه الأداة بعد.</p>}
      </ToolSettingsPanel>
    </div>
  )
}

// إحصائيات الأداة: تُفتح من زر الشريط السفلي
export function ToolStatsPage() {
  const tool = useOpenTool()
  if (!tool) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader title={`إحصائيات ${tool.name}`} tool={tool} />
      {tool.Stats ? <tool.Stats /> : <ComingSoon />}
    </div>
  )
}
