import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import LockGate from './components/LockGate.jsx'
import { ThemeProvider, applyTheme, loadTheme } from './core/theme.jsx'
import { SettingsProvider, applyFontSize, loadSettings } from './core/settings.jsx'
import { LockProvider, loadLock } from './core/lock.jsx'
import { EnabledToolsProvider, loadEnabledTools } from './core/enabledTools.jsx'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/app.css'

// يجعل حركة الضغط (:active) تعمل على متصفح iPhone
document.addEventListener('touchstart', () => {}, { passive: true })

// نقرأ المحفوظ قبل أول رسم حتى لا تومض الشاشة بالثيم أو حجم الخط الخطأ
async function start() {
  const [theme, settings, lock, enabledToolIds] = await Promise.all([
    loadTheme(),
    loadSettings(),
    loadLock(),
    loadEnabledTools(),
  ])
  applyTheme(theme)
  applyFontSize(settings.fontSize)
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider initialTheme={theme}>
        <SettingsProvider initialSettings={settings}>
          <LockProvider initialLock={lock}>
            <EnabledToolsProvider initialIds={enabledToolIds}>
              <HashRouter>
                <LockGate>
                  <App />
                </LockGate>
              </HashRouter>
            </EnabledToolsProvider>
          </LockProvider>
        </SettingsProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}

start()
