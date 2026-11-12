import { describe, expect, it, vi } from 'vitest'
import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { ToolChoice } from '../src/components/ToolSettings.jsx'
import { SUPPORT_EMAIL } from '../src/config.js'
import AppearancePage from '../src/settings/AppearancePage.jsx'
import SoundPage from '../src/settings/SoundPage.jsx'
import SupportPage from '../src/settings/SupportPage.jsx'
import { clickButton, readSaved, renderApp } from './helpers.jsx'

const toggle = (name) => screen.getByRole('switch', { name })
const isOn = (name) => toggle(name).getAttribute('aria-checked') === 'true'

describe('المظهر', () => {
  it('مفتاح الوضع الليلي يطبّقه ويحفظه، ثم يعيده', async () => {
    await renderApp({ ui: <AppearancePage /> })
    expect(isOn('الوضع الليلي')).toBe(false)

    fireEvent.click(toggle('الوضع الليلي'))
    expect(isOn('الوضع الليلي')).toBe(true)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(readSaved('theme')).toBe('dark')

    fireEvent.click(toggle('الوضع الليلي'))
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(readSaved('theme')).toBe('light')
  })

  it('حجم الخط يطبَّق ويُحفظ', async () => {
    await renderApp({ ui: <AppearancePage /> })
    fireEvent.change(screen.getByRole('combobox', { name: 'حجم الخط' }), {
      target: { value: 'large' },
    })
    expect(document.documentElement.dataset.fontSize).toBe('large')
    expect(readSaved('settings').fontSize).toBe('large')
  })

  it('حجم الخط فيه ثلاثة مقاسات فقط', async () => {
    await renderApp({ ui: <AppearancePage /> })
    expect(screen.getByRole('combobox', { name: 'حجم الخط' }).options).toHaveLength(3)
  })

  it('يحفظ بداية الأسبوع ونوع التاريخ', async () => {
    await renderApp({ ui: <AppearancePage /> })
    fireEvent.change(screen.getByRole('combobox', { name: 'بداية الأسبوع' }), {
      target: { value: 'saturday' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'نوع التاريخ' }), {
      target: { value: 'gregorian' },
    })
    expect(readSaved('settings').weekStart).toBe('saturday')
    expect(readSaved('settings').homeDate).toBe('gregorian')
  })
})

describe('الصوت والإشعارات', () => {
  it('المفتاحان يحفظان الاختيار', async () => {
    await renderApp({ ui: <SoundPage /> })
    expect(isOn('الصوت')).toBe(true)
    expect(isOn('الإشعارات')).toBe(false)

    fireEvent.click(toggle('الصوت'))
    fireEvent.click(toggle('الإشعارات'))
    expect(readSaved('settings').sounds).toBe(false)
    expect(readSaved('settings').notifications).toBe(true)
  })
})

describe('الدعم', () => {
  it('يعرض الأسئلة الشائعة', async () => {
    await renderApp({ ui: <SupportPage /> })
    expect(screen.getByText('كيف أضيف أداة؟')).toBeTruthy()
    expect(screen.getByText('أين تُحفظ بياناتي؟')).toBeTruthy()
  })

  it('البريد مخفي حتى يُطلب، ثم يُنسخ', async () => {
    const writeText = vi.fn().mockResolvedValue()
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })

    await renderApp({ ui: <SupportPage /> })
    expect(screen.queryByText(SUPPORT_EMAIL)).toBeNull()

    clickButton('راسلنا')
    expect(screen.getByText(SUPPORT_EMAIL)).toBeTruthy()

    clickButton('نسخ')
    expect(await screen.findByRole('button', { name: 'نُسخ' })).toBeTruthy()
    expect(writeText).toHaveBeenCalledWith(SUPPORT_EMAIL)
  })
})

describe('خيارات إعدادات الأدوات', () => {
  function Example() {
    const [value, setValue] = useState('a')
    return (
      <ToolChoice
        label="اختيار"
        value={value}
        onChange={setValue}
        options={[
          { value: 'a', label: 'أول' },
          { value: 'b', label: 'ثان' },
        ]}
      />
    )
  }

  it('يحدد الخيار المضغوط فقط', () => {
    render(<Example />)
    const checked = (name) => screen.getByRole('radio', { name }).getAttribute('aria-checked')
    expect(checked('أول')).toBe('true')

    fireEvent.click(screen.getByRole('radio', { name: 'ثان' }))
    expect(checked('أول')).toBe('false')
    expect(checked('ثان')).toBe('true')
  })
})
