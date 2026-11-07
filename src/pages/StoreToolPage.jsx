import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ToolTile from '../components/ToolTile.jsx'
import { ToolSettingsPanel, ToolSettingsPreview } from '../components/ToolSettings.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'

// صفحة الأداة في المتجر: تعريفها وإعداداتها، وزر الإضافة أو الإزالة ظاهر دائماً أسفل الشاشة
export default function StoreToolPage() {
  const { toolId } = useParams()
  const { isEnabled, addTool, removeTool } = useEnabledTools()
  const tool = getTool(toolId)

  if (!tool) return <Navigate to="/store" replace />
  const enabled = isEnabled(tool.id)

  let settings = null
  if (tool.Settings) settings = <tool.Settings />
  else if (import.meta.env.DEV) settings = <ToolSettingsPreview />

  return (
    <div className="page store-tool">
      <PageHeader title={tool.name} />

      <div className="store-hero">
        <ToolTile tool={tool} size="large" />
        <h2>{tool.name}</h2>
        <p>{tool.description}</p>
      </div>

      <ToolSettingsPanel tool={tool}>
        {settings ?? <p className="tool-settings-note is-wide">لا توجد إعدادات لهذه الأداة بعد.</p>}
      </ToolSettingsPanel>

      <div className="store-action-bar">
        <button
          type="button"
          className={`store-action pressable${enabled ? ' is-remove' : ''}`}
          onClick={() => (enabled ? removeTool(tool.id) : addTool(tool.id))}
        >
          {enabled ? 'إزالة الأداة' : 'إضافة الأداة'}
        </button>
      </div>
    </div>
  )
}
