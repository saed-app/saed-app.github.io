import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { ChartIcon, PlusIcon } from './Icons.jsx'

// على اللابتوب لا يوجد الشريط السفلي، فزرا + والإحصائيات في عنوان صفحة الأداة
export default function ToolActions({ tool }) {
  const navigate = useNavigate()
  const toolHome = `/tool/${tool.id}`
  const [toast, setToast] = useState('')
  const toastTimer = useRef(0)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  function handleAdd() {
    if (tool.supportsAdd) {
      navigate(toolHome, { replace: true, state: { toolAdd: Date.now() } })
      return
    }
    setToast('هذه الأداة قريباً')
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2200)
  }

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
      <button
        type="button"
        className="icon-button tool-action-add pressable"
        aria-label={`إضافة جديدة في ${tool.name}`}
        onClick={handleAdd}
      >
        <PlusIcon size={22} />
      </button>
      {toast &&
        createPortal(
          <div className="bar-toast" role="status">
            {toast}
          </div>,
          document.body,
        )}
    </div>
  )
}
