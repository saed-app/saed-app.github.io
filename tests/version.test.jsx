import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import SettingsScreen from '../src/components/SettingsScreen.jsx'
import { APP_VERSION } from '../src/config.js'
import { renderApp } from './helpers.jsx'

describe('رقم الإصدار', () => {
  it('يطابق package.json ويظهر في الإعدادات', async () => {
    const { version } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    expect(APP_VERSION).toBe(version)
    await renderApp({ ui: <SettingsScreen onOpenPage={() => {}} onBack={() => {}} /> })
    expect(screen.getByText(`الإصدار ${version}`)).toBeTruthy()
  })
})
