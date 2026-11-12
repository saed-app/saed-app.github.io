import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import SettingsScreen from '../src/components/SettingsScreen.jsx'
import PinPad from '../src/components/PinPad.jsx'
import { APP_VERSION } from '../src/config.js'
import { renderApp } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

// كل ملفات الكود والتنسيق داخل src
function sourceFiles(dir = join(process.cwd(), 'src')) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.(css|jsx?|html)$/.test(name) ? [path] : []
  })
}

const ARABIC_INDIC_DIGITS = /[٠-٩۰-۹]/

describe('قواعد العربية', () => {
  afterEach(() => vi.useRealTimers())

  it('لا تباعد أحرف ولا خط مائل في أي مكان', () => {
    for (const file of sourceFiles()) {
      const text = readFileSync(file, 'utf8')
      expect(text, file).not.toMatch(/letter-spacing|letterSpacing|italic|<em>|<i>/)
    }
  })

  it('ارتفاع السطر: النصوص 1.7 على الأقل والعناوين حوالي 1.25، ولا أرقام مباشرة خارج theme.css', () => {
    const theme = readFileSync(join(process.cwd(), 'src/styles/theme.css'), 'utf8')
    const body = Number(theme.match(/--lh-body:\s*([\d.]+)/)[1])
    const heading = Number(theme.match(/--lh-heading:\s*([\d.]+)/)[1])
    expect(body).toBeGreaterThanOrEqual(1.7)
    expect(heading).toBeGreaterThanOrEqual(1.2)
    expect(heading).toBeLessThanOrEqual(1.3)

    const app = readFileSync(join(process.cwd(), 'src/styles/app.css'), 'utf8')
    for (const [, value] of app.matchAll(/line-height:\s*([^;]+);/g)) {
      expect(value).toMatch(/^(var\(--lh-(body|heading)\)|inherit)$/)
    }
  })

  it('رقم الإصدار بالنقطة ومعزول من اليسار إلى اليمين', async () => {
    await renderApp({ ui: <SettingsScreen onOpenPage={() => {}} onBack={() => {}} /> })
    const number = document.querySelector('.settings-version .ltr-num')
    expect(number.textContent).toBe(APP_VERSION)
    expect(number.textContent).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('التاريخ الهجري بالأرقام 0 1 2 3', async () => {
    vi.useFakeTimers({ toFake: ['Date'], now: new Date('2026-11-09T12:00:00') })
    await renderApp({ tools: ['ready'] })
    const hijri = document.querySelector('.today-date').textContent
    expect(hijri).toMatch(/\d/)
    expect(hijri).not.toMatch(ARABIC_INDIC_DIGITS)
  })

  it('التاريخ الميلادي بالأرقام 0 1 2 3', async () => {
    vi.useFakeTimers({ toFake: ['Date'], now: new Date('2026-11-09T12:00:00') })
    await renderApp({ tools: ['ready'], settings: { homeDate: 'gregorian' } })
    const gregorian = document.querySelector('.today-date').textContent
    expect(gregorian).toMatch(/\d/)
    expect(gregorian).not.toMatch(ARABIC_INDIC_DIGITS)
  })

  it('زر حذف آخر رقم ينعكس لأن له اتجاهاً', async () => {
    await renderApp({ ui: <PinPad title="رمز" onComplete={() => {}} /> })
    const icon = screen.getByRole('button', { name: 'حذف آخر رقم' }).querySelector('svg')
    expect(icon.getAttribute('class')).toContain('rtl-flip')
  })
})
