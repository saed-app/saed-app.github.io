import { useState } from 'react'
import { useToolAdd } from '../../src/core/toolAdd.js'

// أدوات وهمية ثابتة، حتى لا تتأثر اختبارات الواجهة عند بناء الأدوات الحقيقية
const Icon = () => <svg aria-hidden="true" />

function ReadyPage() {
  const [count, setCount] = useState(0)
  useToolAdd(() => setCount((current) => current + 1))
  return <p>عدد الإضافات: {count}</p>
}

export const tools = [
  {
    id: 'ready',
    name: 'أداة جاهزة',
    description: 'وصف الأداة الجاهزة',
    details: 'شرح مبسط للأداة الجاهزة',
    family: 'blue',
    Icon,
    Page: ReadyPage,
    Settings: () => <p>محتوى إعدادات الأداة</p>,
    Stats: () => <p>محتوى إحصائيات الأداة</p>,
    supportsAdd: true,
    order: 1,
  },
  {
    id: 'soon',
    name: 'أداة غير جاهزة',
    description: 'وصف الأداة غير الجاهزة',
    family: 'clay',
    Icon,
    Page: () => <p>صفحة غير جاهزة</p>,
    order: 2,
  },
]

export function getTool(id) {
  return tools.find((tool) => tool.id === id)
}
