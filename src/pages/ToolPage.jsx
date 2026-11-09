import { Navigate, useParams } from 'react-router-dom'
import ComingSoon from '../components/ComingSoon.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ToolActions from '../components/ToolActions.jsx'
import { ToolSettingsPanel, ToolSettingsPreview } from '../components/ToolSettings.jsx'
import { useEnabledTools } from '../core/enabledTools.jsx'
import { getTool } from '../tools/registry.js'
import { useIsLaptop } from '../core/viewport.js'

// ما يظهر عند فتح صفحة إعدادات أو إحصائيات غير متوفرة بعد
const UNAVAILABLE = { title: 'غير متوفر بعد', text: 'سيصل قريباً.' }
const UNAVAILABLE_TITLES = { settings: 'إعدادات الأداة', stats: 'إحصائيات الأداة' }

function useOpenTool() {
  const { toolId } = useParams()
  const { isEnabled } = useEnabledTools()
  const tool = getTool(toolId)
  return tool && isEnabled(toolId) ? tool : null
}

// تعرض صفحة أي أداة من السجل المركزي
export default function ToolPage() {
  const tool = useOpenTool()
  const isLaptop = useIsLaptop()
  if (!tool) return <Navigate to="/" replace />

  // على اللابتوب: الأداة في الوسط وإعداداتها بطاقة صغيرة بجانبها
  if (isLaptop) {
    return (
      <div className="page">
        <PageHeader title={tool.name} tool={tool} action={<ToolActions tool={tool} />} />
        <div className="tool-layout">
          <div className="tool-layout-main">
            <tool.Page key={tool.id} />
          </div>
          <aside className="tool-layout-side" aria-label={`إعدادات ${tool.name}`}>
            <ToolSettingsCard tool={tool} />
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <PageHeader title={tool.name} tool={tool} />
      <tool.Page key={tool.id} />
    </div>
  )
}

function ToolSettingsCard({ tool }) {
  let settings = null
  if (tool.Settings) settings = <tool.Settings />
  else if (import.meta.env.DEV) settings = <ToolSettingsPreview />

  return (
    <ToolSettingsPanel tool={tool}>
      {settings ?? <p className="tool-settings-note is-wide">لا إعدادات لها بعد.</p>}
    </ToolSettingsPanel>
  )
}

// إعدادات الأداة: تُفتح من زر الشريط السفلي. وعلى اللابتوب هي جزء من صفحة الأداة
export function ToolSettingsPage() {
  const tool = useOpenTool()
  const isLaptop = useIsLaptop()
  if (!tool) return <Navigate to="/" replace />
  if (isLaptop) return <Navigate to={`/tool/${tool.id}`} replace />
  if (!tool.Settings) {
    return (
      <div className="page">
        <PageHeader title={`إعدادات ${tool.name}`} tool={tool} />
        <ComingSoon {...UNAVAILABLE} />
      </div>
    )
  }

  return (
    <div className="page">
      <PageHeader title={`إعدادات ${tool.name}`} tool={tool} />
      <ToolSettingsCard tool={tool} />
    </div>
  )
}

// إحصائيات الأداة: تُفتح من زر الشريط السفلي
export function ToolStatsPage() {
  const tool = useOpenTool()
  const isLaptop = useIsLaptop()
  if (!tool) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader
        title={`إحصائيات ${tool.name}`}
        tool={tool}
        action={isLaptop ? <ToolActions tool={tool} activePage="stats" /> : undefined}
      />
      {tool.Stats ? <tool.Stats /> : <ComingSoon {...UNAVAILABLE} />}
    </div>
  )
}

// زرا الإعدادات والإحصائيات في الرئيسية، حيث لا توجد أداة مفتوحة
export function UnavailablePage() {
  const { page } = useParams()
  const title = UNAVAILABLE_TITLES[page]
  if (!title) return <Navigate to="/" replace />

  return (
    <div className="page">
      <PageHeader title={title} />
      <ComingSoon {...UNAVAILABLE} />
    </div>
  )
}
