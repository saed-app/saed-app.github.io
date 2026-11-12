import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import PinPad from '../src/components/PinPad.jsx'
import ProfilePage from '../src/settings/ProfilePage.jsx'
import { clickButton, enterPin, readSaved, renderApp, save } from './helpers.jsx'

const welcome = () => screen.queryByRole('heading', { name: 'أهلاً بك' })
const pinToggle = () => screen.getByRole('switch', { name: 'رمز القفل' })

async function createPin(pin) {
  fireEvent.click(pinToggle())
  enterPin(pin)
  enterPin(pin)
}

async function setUpLockedApp(pin) {
  const { unmount } = await renderApp({ ui: <ProfilePage /> })
  await createPin(pin)
  unmount()
  await renderApp()
}

describe('لوحة الرمز', () => {
  it('تنتظر أربعة أرقام ثم تسلّم الرمز', () => {
    const onComplete = vi.fn()
    render(<PinPad title="رمز" onComplete={onComplete} />)
    enterPin('123')
    expect(onComplete).not.toHaveBeenCalled()
    enterPin('4')
    expect(onComplete).toHaveBeenCalledWith('1234')
  })

  it('زر الحذف يمسح آخر رقم', () => {
    const onComplete = vi.fn()
    render(<PinPad title="رمز" onComplete={onComplete} />)
    enterPin('12')
    clickButton('حذف آخر رقم')
    enterPin('345')
    expect(onComplete).toHaveBeenCalledWith('1345')
  })

  it('تعمل بلوحة مفاتيح الكمبيوتر', () => {
    const onComplete = vi.fn()
    render(<PinPad title="رمز" onComplete={onComplete} />)
    for (const key of ['9', '8', 'Backspace', '7', '6', '5']) fireEvent.keyDown(window, { key })
    expect(onComplete).toHaveBeenCalledWith('9765')
  })
})

describe('ملفي', () => {
  it('يحفظ الاسم', async () => {
    await renderApp({ ui: <ProfilePage /> })
    fireEvent.change(screen.getByRole('textbox', { name: 'الاسم' }), { target: { value: 'أحمد' } })
    expect(readSaved('settings').name).toBe('أحمد')
  })

  it('إنشاء الرمز: لا يحفظ الرمز نفسه، ويفعّل القفل', async () => {
    await renderApp({ ui: <ProfilePage /> })
    await createPin('1234')
    expect(pinToggle().getAttribute('aria-checked')).toBe('true')
    const lock = readSaved('lock')
    expect(lock.hash).toBeTruthy()
    expect(JSON.stringify(lock)).not.toContain('1234')
  })

  it('الرمزان المختلفان لا يفعّلان القفل ويظهران خطأ', async () => {
    await renderApp({ ui: <ProfilePage /> })
    fireEvent.click(pinToggle())
    enterPin('1234')
    enterPin('9999')
    expect(screen.getByRole('alert').textContent).toBe('الرمزان غير متطابقين، جرّب مرة أخرى.')
    expect(readSaved('lock')).toBeNull()
  })

  it('الإلغاء أثناء الإنشاء لا يفعّل القفل', async () => {
    await renderApp({ ui: <ProfilePage /> })
    fireEvent.click(pinToggle())
    enterPin('1234')
    clickButton('إلغاء')
    expect(pinToggle().getAttribute('aria-checked')).toBe('false')
    expect(readSaved('lock')).toBeNull()
  })

  it('إيقاف القفل يحتاج الرمز الصحيح', async () => {
    await renderApp({ ui: <ProfilePage /> })
    await createPin('1234')

    fireEvent.click(pinToggle())
    enterPin('0000')
    expect(screen.getByRole('alert').textContent).toBe('الرمز غير صحيح، جرّب مرة أخرى.')
    expect(readSaved('lock')).not.toBeNull()

    enterPin('1234')
    expect(pinToggle().getAttribute('aria-checked')).toBe('false')
    expect(readSaved('lock')).toBeNull()
  })

  it('تغيير الرمز: القديم يتوقف والجديد يعمل', async () => {
    const { unmount } = await renderApp({ ui: <ProfilePage /> })
    await createPin('1234')
    clickButton('تغيير الرمز')
    enterPin('1234')
    enterPin('5678')
    enterPin('5678')
    unmount()

    await renderApp()
    enterPin('1234')
    expect(welcome()).toBeNull()
    enterPin('5678')
    expect(welcome()).toBeTruthy()
  })

  it('يحفظ خيار القفل فور الخروج', async () => {
    await renderApp({ ui: <ProfilePage /> })
    await createPin('1234')
    expect(readSaved('lock').autoLock).toBe(true)
    fireEvent.click(screen.getByRole('switch', { name: 'اقفل ساعد عند الخروج' }))
    expect(readSaved('lock').autoLock).toBe(false)
  })
})

describe('شاشة القفل', () => {
  it('دون رمز لا تظهر', async () => {
    await renderApp()
    expect(welcome()).toBeTruthy()
  })

  it('تخفي التطبيق حتى يُدخل الرمز الصحيح', async () => {
    await setUpLockedApp('1234')
    expect(welcome()).toBeNull()

    enterPin('0000')
    expect(screen.getByRole('alert').textContent).toBe('الرمز غير صحيح، جرّب مرة أخرى.')
    expect(welcome()).toBeNull()

    enterPin('1234')
    expect(welcome()).toBeTruthy()
  })

  it('تعود عند الخروج من التطبيق إذا كان القفل التلقائي مفعلاً', async () => {
    await setUpLockedApp('1234')
    enterPin('1234')

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    fireEvent(document, new Event('visibilitychange'))
    expect(await screen.findByText('اكتب رمزك')).toBeTruthy()
  })

  it('لا تعود عند الخروج إذا كان القفل التلقائي موقفاً', async () => {
    await setUpLockedApp('1234')
    save('lock', { ...readSaved('lock'), autoLock: false })
    document.body.innerHTML = ''
    await renderApp()
    enterPin('1234')

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    fireEvent(document, new Event('visibilitychange'))
    expect(screen.queryByText('اكتب رمزك')).toBeNull()
    expect(welcome()).toBeTruthy()
  })

  it('«نسيت الرمز»: الإلغاء يعيد إلى لوحة الرمز دون مسح', async () => {
    await setUpLockedApp('1234')
    clickButton('نسيت الرمز؟')
    expect(screen.getByRole('alertdialog')).toBeTruthy()

    clickButton('إلغاء')
    expect(screen.getByText('اكتب رمزك')).toBeTruthy()
    expect(readSaved('lock')).not.toBeNull()
  })

  it('«نسيت الرمز»: التأكيد يمسح بيانات التطبيق فقط ويعيد التشغيل', async () => {
    const replace = vi.fn()
    vi.stubGlobal('location', { pathname: '/app/', replace })
    localStorage.setItem('other-app', 'باقٍ')
    await setUpLockedApp('1234')

    clickButton('نسيت الرمز؟')
    clickButton('امسح كل شيء')
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith('/app/'))

    expect(readSaved('lock')).toBeNull()
    expect(readSaved('settings')).toBeNull()
    expect(localStorage.getItem('other-app')).toBe('باقٍ')
  })
})
