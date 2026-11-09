import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ToolTile from '../components/ToolTile.jsx'
import { tools } from '../tools/registry.js'

// قائمة الأدوات. الضغط على أداة يفتح صفحتها في المتجر، وفيها الإضافة أو الإزالة وإعداداتها
export default function StorePage() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <PageHeader title="المتجر" />
      <div className="store-list">
        {tools.map((tool) => (
          <button
            type="button"
            className="store-card pressable"
            key={tool.id}
            onClick={() => navigate(`/store/${tool.id}`)}
          >
            <ToolTile tool={tool} />
            <span className="store-card-text">
              <span className="store-card-name">{tool.name}</span>
              <span className="store-card-description">{tool.description}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
