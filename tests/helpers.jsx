import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from '../src/App.jsx'
import LockGate from '../src/components/LockGate.jsx'
import { EnabledToolsProvider, loadEnabledTools } from '../src/core/enabledTools.jsx'
import { LockProvider, loadLock } from '../src/core/lock.jsx'
import { SettingsProvider, applyFontSize, loadSettings } from '../src/core/settings.jsx'
import { ThemeProvider, applyTheme, loadTheme } from '../src/core/theme.jsx'

export function readSaved(key) {
  const raw = localStorage.getItem(`saed:${key}`)
  return raw === null ? null : JSON.parse(raw)
}

export function save(key, value) {
  localStorage.setItem(`saed:${key}`, JSON.stringify(value))
}

function CurrentPath() {
  return <span data-testid="path">{useLocation().pathname}</span>
}

export function currentPath() {
  return screen.getByTestId('path').textContent
}

// يقرأ المحفوظ ثم يرسم التطبيق بالترتيب نفسه الموجود في main.jsx.
// أي استدعاء جديد يشبه إعادة فتح التطبيق بما حُفظ في المرة السابقة.
export async function renderApp({ route = '/', tools, settings, ui } = {}) {
  save('settings', { tourSeen: true, ...readSaved('settings'), ...settings })
  if (tools) save('enabledTools', tools)

  const [theme, loadedSettings, lock, enabledIds] = await Promise.all([
    loadTheme(),
    loadSettings(),
    loadLock(),
    loadEnabledTools(),
  ])
  applyTheme(theme)
  applyFontSize(loadedSettings.fontSize)

  return render(
    <ThemeProvider initialTheme={theme}>
      <SettingsProvider initialSettings={loadedSettings}>
        <LockProvider initialLock={lock}>
          <EnabledToolsProvider initialIds={enabledIds}>
            <MemoryRouter initialEntries={[route]}>
              <LockGate>{ui ?? <App />}</LockGate>
              <CurrentPath />
            </MemoryRouter>
          </EnabledToolsProvider>
        </LockProvider>
      </SettingsProvider>
    </ThemeProvider>,
  )
}

export function clickButton(name) {
  fireEvent.click(screen.getByRole('button', { name }))
}

export function enterPin(pin) {
  for (const digit of pin) clickButton(digit)
}
