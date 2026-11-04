import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider, applyTheme, loadTheme } from './core/theme.jsx'
import { EnabledToolsProvider, loadEnabledTools } from './core/enabledTools.jsx'
import './styles/fonts.css'
import './styles/theme.css'
import './styles/app.css'

// يجعل حركة الضغط (:active) تعمل على متصفح iPhone
document.addEventListener('touchstart', () => {}, { passive: true })

// نقرأ الثيم المحفوظ قبل أول رسم حتى لا تومض الشاشة بالثيم الخطأ
async function start() {
  const [theme, enabledToolIds] = await Promise.all([loadTheme(), loadEnabledTools()])
  applyTheme(theme)
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider initialTheme={theme}>
        <EnabledToolsProvider initialIds={enabledToolIds}>
          <HashRouter>
            <App />
          </HashRouter>
        </EnabledToolsProvider>
      </ThemeProvider>
    </StrictMode>,
  )
}

start()
