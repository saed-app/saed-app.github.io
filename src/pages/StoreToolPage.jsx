import { Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ToolTile from '../components/ToolTile.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'

// صفحة الأداة في المتجر: التعريف بها وزر الإضافة أو الإزالة ظاهر دائماً أسفل الشاشة
export default function StoreToolPage() {
  const { toolId } = useParams()
  const { isEnabled, addTool, removeTool } = useEnabledTools()
  const tool = getTool(toolId)

  if (!tool) return <Navigate to="/store" replace />
  const enabled = isEnabled(tool.id)

  return (
    <div className="page store-tool">
      <PageHeader title={tool.name} />

      <div className="store-hero">
        <ToolTile tool={tool} size="large" />
        <div className="store-hero-text">
          <h2>{tool.name}</h2>
          <p>{tool.description}</p>
        </div>
      </div>

      {tool.details && (
        <section className="store-about">
          <h3>عن هذه الأداة</h3>
          <p>{tool.details}</p>
        </section>
      )}

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
