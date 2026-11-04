import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { storage } from '../data/storage.js'
import { getTool } from '../tools/registry.js'

const STORAGE_KEY = 'enabledTools'
const EnabledToolsContext = createContext(null)

// الأدوات التي أضافها المستخدم، بالترتيب الذي اختاره في الشريط العائم
export async function loadEnabledTools() {
  const saved = await storage.get(STORAGE_KEY, [])
  if (!Array.isArray(saved)) return []
  // نتجاهل أي أداة حُذف ملفها من التطبيق
  return saved.filter((id) => getTool(id))
}

export function EnabledToolsProvider({ initialIds, children }) {
  const [ids, setIds] = useState(initialIds)

  const update = useCallback((next) => {
    setIds(next)
    storage.set(STORAGE_KEY, next).catch((error) => {
      console.warn('تعذر حفظ الأدوات', error)
    })
  }, [])

  const value = useMemo(
    () => ({
      enabledTools: ids.map(getTool),
      isEnabled: (id) => ids.includes(id),
      addTool: (id) => {
        if (!ids.includes(id)) update([...ids, id])
      },
      // الإزالة تخفي الأداة فقط، أما بياناتها فتبقى محفوظة إن أعادها المستخدم
      removeTool: (id) => update(ids.filter((other) => other !== id)),
      reorderTools: update,
    }),
    [ids, update],
  )

  return <EnabledToolsContext.Provider value={value}>{children}</EnabledToolsContext.Provider>
}

export function useEnabledTools() {
  return useContext(EnabledToolsContext)
}
