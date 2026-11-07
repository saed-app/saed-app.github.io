import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { storage } from '../data/storage.js'

const STORAGE_KEY = 'settings'
const SettingsContext = createContext(null)

const DEFAULTS = {
  name: '',
  fontSize: 'medium',
  weekStart: 'sunday',
  sounds: true,
  notifications: false,
  tourSeen: false,
}

const FONT_SIZES = ['small', 'medium', 'large']

export async function loadSettings() {
  const saved = await storage.get(STORAGE_KEY, {})
  const settings = { ...DEFAULTS, ...saved }
  // حذفنا مقاس «كبير جداً»، فمن اختاره سابقاً ينتقل إلى «كبير»
  if (!FONT_SIZES.includes(settings.fontSize)) settings.fontSize = 'large'
  return settings
}

export function applyFontSize(fontSize) {
  document.documentElement.dataset.fontSize = fontSize
}

// الإعدادات العامة للتطبيق كله. أما إعدادات كل أداة فتبقى في صفحتها
export function SettingsProvider({ initialSettings, children }) {
  const [settings, setSettings] = useState(initialSettings)

  const updateSettings = useCallback(
    (patch) => {
      const next = { ...settings, ...patch }
      setSettings(next)
      if (patch.fontSize) applyFontSize(patch.fontSize)
      storage.set(STORAGE_KEY, next).catch((error) => {
        console.warn('تعذر حفظ الإعدادات', error)
      })
    },
    [settings],
  )

  const value = useMemo(() => ({ ...settings, updateSettings }), [settings, updateSettings])
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  return useContext(SettingsContext)
}
