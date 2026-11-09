import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { APP_VERSION } from '../src/config.js'
import { clickButton, renderApp } from './helpers.jsx'
import SettingsScreen from '../src/components/SettingsScreen.jsx'

// حالة التنبيه محفوظة داخل الملف نفسه، فنعيد تحميله لكل اختبار
let update
let UpdateBanner

beforeEach(async () => {
  vi.resetModules()
  update = await import('../src/core/update.js')
  UpdateBanner = (await import('../src/components/UpdateBanner.jsx')).default
})

const show = (activate = vi.fn().mockResolvedValue()) => {
  act(() => update.showUpdate(activate))
  return activate
}

describe('شريط التحديث', () => {
  it('لا يظهر دون نسخة جديدة', () => {
    render(<UpdateBanner />)
    expect(screen.queryByText('يوجد تحديث جديد')).toBeNull()
  })

  it('يظهر عند وجود نسخة جديدة', () => {
    render(<UpdateBanner />)
    show()
    expect(screen.getByText('يوجد تحديث جديد')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'تحديث الآن' })).toBeTruthy()
  })

  it('«تحديث الآن» يفعّل النسخة مرة واحدة مهما تكرر الضغط', async () => {
    render(<UpdateBanner />)
    const activate = show()
    const button = screen.getByRole('button', { name: 'تحديث الآن' })
    await act(async () => {
      fireEvent.click(button)
      fireEvent.click(button)
    })
    expect(activate).toHaveBeenCalledTimes(1)
  })

  it('زر الإغلاق يخفيه دون تفعيل النسخة', () => {
    render(<UpdateBanner />)
    const activate = show()
    clickButton('إغلاق تنبيه التحديث')
    expect(screen.queryByText('يوجد تحديث جديد')).toBeNull()
    expect(activate).not.toHaveBeenCalled()
  })

  it('يعود بعد الإغلاق عند اكتشاف النسخة في فتح جديد', () => {
    render(<UpdateBanner />)
    show()
    clickButton('إغلاق تنبيه التحديث')
    show()
    expect(screen.getByText('يوجد تحديث جديد')).toBeTruthy()
  })
})

describe('الحفظ قبل التحديث', () => {
  function Draft({ save }) {
    update.useSaveBeforeUpdate(save)
    return null
  }

  it('يحفظ أولاً ثم يفعّل النسخة', async () => {
    const order = []
    const save = vi.fn(async () => order.push('save'))
    render(
      <>
        <Draft save={save} />
        <UpdateBanner />
      </>,
    )
    show(async () => order.push('activate'))
    await act(async () => clickButton('تحديث الآن'))
    expect(order).toEqual(['save', 'activate'])
  })

  it('إذا تعذر الحفظ لا يفعّل النسخة ويبقى الزر متاحاً', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const save = vi.fn().mockRejectedValue(new Error('فشل'))
    render(
      <>
        <Draft save={save} />
        <UpdateBanner />
      </>,
    )
    const activate = show()
    await act(async () => clickButton('تحديث الآن'))
    expect(activate).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'تحديث الآن' }).disabled).toBe(false)
  })

  it('يُخرج المؤشر من الحقل حتى يُحفظ ما كُتب فيه', async () => {
    const blur = vi.fn()
    function Field() {
      const [, setValue] = useState('')
      return <input aria-label="حقل" onBlur={blur} onChange={(e) => setValue(e.target.value)} />
    }
    render(
      <>
        <Field />
        <UpdateBanner />
      </>,
    )
    screen.getByRole('textbox', { name: 'حقل' }).focus()
    show()
    await act(async () => clickButton('تحديث الآن'))
    expect(blur).toHaveBeenCalled()
  })

  it('إعادة التحميل تحدث مرة واحدة فقط', async () => {
    const reload = vi.fn()
    vi.stubGlobal('location', { reload })
    await Promise.all([update.reloadOnce(), update.reloadOnce()])
    await update.reloadOnce()
    expect(reload).toHaveBeenCalledTimes(1)
  })
})

describe('اكتشاف النسخة الجديدة', () => {
  it('يفحص عند الرجوع إلى التطبيق', () => {
    const check = vi.fn().mockResolvedValue()
    const stop = update.watchForUpdates(check)
    document.dispatchEvent(new Event('visibilitychange'))
    expect(check).toHaveBeenCalledTimes(1)
    stop()
  })

  it('لا يفحص والتطبيق في الخلفية', () => {
    const check = vi.fn().mockResolvedValue()
    const stop = update.watchForUpdates(check)
    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(check).not.toHaveBeenCalled()
    stop()
  })

  it('يفحص كل فترة أثناء الاستخدام', () => {
    vi.useFakeTimers()
    const check = vi.fn().mockResolvedValue()
    const stop = update.watchForUpdates(check)
    vi.advanceTimersByTime(30 * 60 * 1000)
    expect(check).toHaveBeenCalledTimes(1)
    stop()
  })

  it('لا يتعطل إذا فشل الفحص بلا إنترنت', async () => {
    const check = vi.fn().mockRejectedValue(new Error('offline'))
    const stop = update.watchForUpdates(check)
    window.dispatchEvent(new Event('focus'))
    await waitFor(() => expect(check).toHaveBeenCalled())
    stop()
  })
})

describe('الإعدادات والإصدار', () => {
  it('وضع الموافقة مفعّل وليس التحديث الصامت', () => {
    const config = readFileSync(join(process.cwd(), 'vite.config.js'), 'utf8')
    expect(config).toContain("registerType: 'prompt'")
    expect(config).not.toContain("registerType: 'autoUpdate'")
  })

  it('رقم الإصدار يطابق package.json ويظهر في الإعدادات', async () => {
    const { version } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    expect(APP_VERSION).toBe(version)
    await renderApp({ ui: <SettingsScreen onOpenPage={() => {}} onBack={() => {}} /> })
    expect(screen.getByText(`الإصدار ${version}`)).toBeTruthy()
  })
})
