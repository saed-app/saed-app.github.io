import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { clickButton, currentPath, readSaved, renderApp, save } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

const bottomBar = () => screen.queryByRole('navigation', { name: 'الشريط السفلي' })
const sheet = () => document.getElementById('tools-sheet')

describe('الرئيسية', () => {
  it('دون أدوات: ترحيب وزر «أدوات» يفتح المتجر', async () => {
    await renderApp()
    expect(screen.getByRole('heading', { name: 'مرحباً بك في ساعد' })).toBeTruthy()
    clickButton('أدوات')
    expect(await screen.findByRole('heading', { name: 'المتجر' })).toBeTruthy()
  })

  it('يرحب بالاسم المحفوظ', async () => {
    await renderApp({ settings: { name: '  أحمد ' } })
    expect(screen.getByRole('heading', { name: 'مرحباً بك يا أحمد' })).toBeTruthy()
  })

  it('مع وجود أدوات: يعرض اليوم والتاريخ الهجري', async () => {
    vi.useFakeTimers({ toFake: ['Date'], now: new Date('2026-11-09T12:00:00') })
    await renderApp({ tools: ['ready'] })
    expect(screen.getByText('الاثنين')).toBeTruthy()
    expect(document.querySelector('.today-date').textContent).toContain('1448')
    expect(screen.queryByRole('button', { name: 'أدوات' })).toBeNull()
  })

  it('يعرض التاريخ الميلادي حسب الإعداد', async () => {
    vi.useFakeTimers({ toFake: ['Date'], now: new Date('2026-11-09T12:00:00') })
    await renderApp({ tools: ['ready'], settings: { homeDate: 'gregorian' } })
    expect(document.querySelector('.today-date').textContent).toContain('2026')
  })
})

describe('المتجر', () => {
  it('يعرض كل الأدوات، وعلامة «مضافة» للمضافة فقط', async () => {
    await renderApp({ route: '/store', tools: ['ready'] })
    expect(screen.getByText('وصف الأداة الجاهزة')).toBeTruthy()
    expect(screen.getByText('وصف الأداة غير الجاهزة')).toBeTruthy()
    expect(screen.getAllByText('مضافة')).toHaveLength(1)
  })

  it('الضغط على أداة يفتح صفحة التعريف بها', async () => {
    await renderApp({ route: '/store' })
    fireEvent.click(screen.getByText('أداة جاهزة'))
    expect(await screen.findByRole('button', { name: 'إضافة الأداة' })).toBeTruthy()
    expect(currentPath()).toBe('/store/ready')
  })

  it('يضيف الأداة ويحفظها، ثم يزيلها', async () => {
    await renderApp({ route: '/store/ready' })
    clickButton('إضافة الأداة')
    expect(await screen.findByRole('button', { name: 'إزالة الأداة' })).toBeTruthy()
    expect(readSaved('enabledTools')).toEqual(['ready'])

    clickButton('إزالة الأداة')
    expect(await screen.findByRole('button', { name: 'إضافة الأداة' })).toBeTruthy()
    expect(readSaved('enabledTools')).toEqual([])
  })

  it('إزالة الأداة لا تمس بياناتها', async () => {
    save('ready-data', ['عنصر'])
    await renderApp({ route: '/store/ready', tools: ['ready'] })
    clickButton('إزالة الأداة')
    expect(await screen.findByRole('button', { name: 'إضافة الأداة' })).toBeTruthy()
    expect(readSaved('ready-data')).toEqual(['عنصر'])
  })

  it('الأداة غير الموجودة تعيد إلى المتجر', async () => {
    await renderApp({ route: '/store/nothing' })
    expect(await screen.findByRole('heading', { name: 'المتجر' })).toBeTruthy()
  })

  it('الشريط السفلي مخفي في المتجر', async () => {
    await renderApp({ route: '/store' })
    expect(bottomBar()).toBeNull()
  })
})

describe('صفحة الأداة والشريط السفلي', () => {
  it('الأداة غير المضافة تعيد إلى الرئيسية', async () => {
    await renderApp({ route: '/tool/ready' })
    await waitFor(() => expect(currentPath()).toBe('/'))
  })

  it('المسار غير المعروف يعيد إلى الرئيسية', async () => {
    await renderApp({ route: '/nowhere' })
    await waitFor(() => expect(currentPath()).toBe('/'))
  })

  it('يعرض الأداة المضافة والشريط السفلي', async () => {
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(screen.getByRole('heading', { name: 'أداة جاهزة' })).toBeTruthy()
    expect(bottomBar().querySelectorAll('button')).toHaveLength(5)
  })

  it('زر + يصل إلى الأداة التي تدعم الإضافة', async () => {
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    clickButton('إضافة جديدة في أداة جاهزة')
    expect(await screen.findByText('عدد الإضافات: 1')).toBeTruthy()
  })

  it('زر + يعيد من إعدادات الأداة إلى صفحتها الأساسية', async () => {
    await renderApp({ route: '/tool/ready/settings', tools: ['ready'] })
    clickButton('إضافة جديدة في أداة جاهزة')
    expect(await screen.findByText('عدد الإضافات: 0')).toBeTruthy()
    expect(currentPath()).toBe('/tool/ready')
  })

  it('زر + في الأداة غير الجاهزة يبقى في صفحتها دون رسالة', async () => {
    await renderApp({ route: '/tool/soon', tools: ['soon'] })
    clickButton('إضافة جديدة في أداة غير جاهزة')
    expect(screen.queryByRole('status')).toBeNull()
    expect(currentPath()).toBe('/tool/soon')
  })

  it('زر إعدادات الأداة يفتحها، وضغطه مرة أخرى يعيد إلى الأداة', async () => {
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    clickButton('إعدادات الأداة')
    expect(await screen.findByText('محتوى إعدادات الأداة')).toBeTruthy()
    clickButton('إعدادات الأداة')
    expect(await screen.findByText('عدد الإضافات: 0')).toBeTruthy()
  })

  it('زر الإحصائيات يفتح إحصائيات الأداة', async () => {
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    clickButton('إحصائيات الأداة')
    expect(await screen.findByText('محتوى إحصائيات الأداة')).toBeTruthy()
  })

  it('زر المتجر يفتح المتجر', async () => {
    await renderApp({ tools: ['ready'] })
    clickButton('المتجر')
    expect(await screen.findByRole('heading', { name: 'المتجر' })).toBeTruthy()
  })
})

describe('لوحة الأدوات', () => {
  const isOpen = () => sheet().classList.contains('is-open')

  it('السهم يفتحها ويغلقها', async () => {
    await renderApp({ tools: ['ready'] })
    expect(isOpen()).toBe(false)
    clickButton('فتح لوحة الأدوات')
    expect(isOpen()).toBe(true)
    clickButton('إغلاق لوحة الأدوات')
    expect(isOpen()).toBe(false)
  })

  it.each(['إعدادات الأداة', 'اختر أداة', 'إحصائيات الأداة'])(
    'في الرئيسية يرفعها زر «%s»',
    async (name) => {
      await renderApp({ tools: ['ready'] })
      clickButton(name)
      expect(isOpen()).toBe(true)
    },
  )

  it('زر Escape يغلقها', async () => {
    await renderApp({ tools: ['ready'] })
    clickButton('فتح لوحة الأدوات')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(isOpen()).toBe(false)
  })

  it('الضغط على أداة يفتحها ويغلق اللوحة', async () => {
    await renderApp({ tools: ['ready'] })
    clickButton('فتح لوحة الأدوات')
    clickButton('أداة جاهزة')
    expect(await screen.findByText('عدد الإضافات: 0')).toBeTruthy()
    expect(currentPath()).toBe('/tool/ready')
    expect(isOpen()).toBe(false)
  })

  it('دون أدوات تعرض رسالة وزر المتجر', async () => {
    await renderApp()
    expect(screen.getByText('لم تضف أي أداة بعد.')).toBeTruthy()
    clickButton('افتح المتجر')
    expect(await screen.findByRole('heading', { name: 'المتجر' })).toBeTruthy()
  })

  it('Shift مع السهم يغيّر الترتيب ويحفظه', async () => {
    await renderApp({ tools: ['ready', 'soon'] })
    fireEvent.keyDown(screen.getByRole('button', { name: 'أداة جاهزة' }), {
      key: 'ArrowLeft',
      shiftKey: true,
    })
    expect(readSaved('enabledTools')).toEqual(['soon', 'ready'])
  })
})

describe('الدليل التعريفي', () => {
  it('يظهر أول مرة، وزر التخطي يخفيه ويحفظ ذلك', async () => {
    await renderApp({ settings: { tourSeen: false } })
    clickButton('تخطي')
    expect(screen.queryByRole('button', { name: 'تخطي' })).toBeNull()
    expect(readSaved('settings').tourSeen).toBe(true)
  })

  it('لا يظهر بعد مشاهدته', async () => {
    await renderApp()
    expect(screen.queryByRole('button', { name: 'تخطي' })).toBeNull()
  })

  it('يتنقل بين الخطوات حتى زر «ابدأ»', async () => {
    await renderApp({ settings: { tourSeen: false } })
    const firstTitle = screen.getByRole('heading', { level: 2 }).textContent
    clickButton('التالي')
    expect(screen.getByRole('heading', { level: 2 }).textContent).not.toBe(firstTitle)
    clickButton('السابق')
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(firstTitle)

    while (screen.queryByRole('button', { name: 'التالي' })) clickButton('التالي')
    clickButton('ابدأ')
    expect(screen.queryByRole('button', { name: 'تخطي' })).toBeNull()
    expect(readSaved('settings').tourSeen).toBe(true)
  })
})

describe('الإعدادات العامة', () => {
  const sections = [
    'ملفي',
    'المظهر والتفضيلات',
    'الصوت والإشعارات',
    'الدعم',
    'دليل تعريفي',
    'تثبيت التطبيق',
    'حول التطبيق',
  ]

  it('الترس يفتح القائمة بكل أقسامها', async () => {
    await renderApp()
    clickButton('الإعدادات')
    expect(await screen.findByRole('heading', { name: 'الإعدادات' })).toBeTruthy()
    for (const name of sections) expect(screen.getByRole('button', { name })).toBeTruthy()
  })

  it('الرجوع: من الصفحة الداخلية إلى القائمة ثم إلى التطبيق', async () => {
    await renderApp()
    clickButton('الإعدادات')
    fireEvent.click(await screen.findByRole('button', { name: 'الدعم' }))
    expect(await screen.findByRole('heading', { name: 'الدعم' })).toBeTruthy()

    clickButton('رجوع')
    expect(await screen.findByRole('heading', { name: 'الإعدادات' })).toBeTruthy()

    clickButton('رجوع')
    expect(await screen.findByRole('heading', { name: 'مرحباً بك في ساعد' })).toBeTruthy()
  })

  it('«دليل تعريفي» يفتح الدليل', async () => {
    await renderApp()
    clickButton('الإعدادات')
    fireEvent.click(await screen.findByRole('button', { name: 'دليل تعريفي' }))
    expect(screen.getByRole('button', { name: 'تخطي' })).toBeTruthy()
  })

  it('يخفي «تثبيت التطبيق» بعد تثبيته', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query.includes('display-mode'),
      addEventListener() {},
      removeEventListener() {},
    }))
    await renderApp()
    clickButton('الإعدادات')
    await screen.findByRole('heading', { name: 'الإعدادات' })
    expect(screen.queryByRole('button', { name: 'تثبيت التطبيق' })).toBeNull()
  })
})
