import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import SettingsScreen from '../src/components/SettingsScreen.jsx'
import { APP_VERSION } from '../src/config.js'
import { renderApp } from './helpers.jsx'

describe('رقم الإصدار', () => {
  it('يطابق package.json ويظهر في الإعدادات', async () => {
    const { version } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    expect(APP_VERSION).toBe(version)
    await renderApp({ ui: <SettingsScreen onOpenPage={() => {}} onBack={() => {}} /> })
    // الرقم معزول في عنصر خاص به حتى يظهر بالنقطة، فنقرأ السطر كاملاً
    expect(document.querySelector('.settings-version').textContent).toBe(`الإصدار ${version}`)
  })
})
