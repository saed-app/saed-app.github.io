import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { storage } from '../data/storage.js'

const STORAGE_KEY = 'theme'
const ThemeContext = createContext(null)

export async function loadTheme() {
  const saved = await storage.get(STORAGE_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  // يلوّن شريط المتصفح في الجوال بلون خلفية الثيم
  const background = getComputedStyle(root).getPropertyValue('--bg').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background)
}

export function ThemeProvider({ initialTheme, children }) {
  const [theme, setThemeState] = useState(initialTheme)

  const setTheme = useCallback((next) => {
    setThemeState(next)
    applyTheme(next)
    storage.set(STORAGE_KEY, next).catch((error) => {
      console.warn('تعذر حفظ الثيم', error)
    })
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
