import PageHeader from '../components/PageHeader.jsx'
import ToolTile from '../components/ToolTile.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { tools } from '../tools/registry.js'

export default function StorePage() {
  const { isEnabled, addTool, removeTool } = useEnabledTools()

  return (
    <div className="page">
      <PageHeader title="المتجر" />
      <div className="store-list">
        {tools.map((tool) => {
          const enabled = isEnabled(tool.id)
          return (
            <article className="store-card" key={tool.id}>
              <ToolTile tool={tool} />
              <div className="store-card-text">
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </div>
              <button
                type="button"
                className={`store-action pressable${enabled ? ' is-remove' : ''}`}
                aria-label={`${enabled ? 'إزالة' : 'إضافة'} ${tool.name}`}
                onClick={() => (enabled ? removeTool(tool.id) : addTool(tool.id))}
              >
                {enabled ? 'إزالة' : 'إضافة'}
              </button>
            </article>
          )
        })}
      </div>
    </div>
  )
}
