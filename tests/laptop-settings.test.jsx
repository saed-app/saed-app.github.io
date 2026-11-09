import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { clickButton, currentPath, readSaved, renderApp } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

function useScreen(width) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('min-width: 1024px') ? width >= 1024 : false,
    addEventListener() {},
    removeEventListener() {},
  }))
}

const panel = () => document.querySelector('.settings-screen.is-panel')
const shell = () => document.querySelector('.app-shell')
const isOpen = () => document.getElementById('tools-sheet').classList.contains('is-open')

describe('عمود الإعدادات على اللابتوب', () => {
  it('ظاهر تلقائياً بجانب التطبيق، ولا يوجد زر ترس', async () => {
    useScreen(1440)
    await renderApp()
    expect(panel()).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'الإعدادات' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'أهلاً بك' })).toBeTruthy()
    expect(shell().hidden).toBe(false)
    expect(screen.queryByRole('button', { name: 'الإعدادات' })).toBeNull()
  })

  it('زر الإغلاق يخفيه ويفتحه، ويُحفظ الاختيار', async () => {
    useScreen(1440)
    const { unmount } = await renderApp()
    clickButton('إغلاق الإعدادات')
    expect(panel()).toBeNull()
    expect(readSaved('settings').sidebarOpen).toBe(false)

    unmount()
    await renderApp()
    expect(panel()).toBeNull()

    clickButton('فتح الإعدادات')
    expect(panel()).toBeTruthy()
    expect(readSaved('settings').sidebarOpen).toBe(true)
  })

  it('الصفحة الداخلية لها زر رجوع إلى القائمة، والقائمة ليس لها', async () => {
    useScreen(1440)
    await renderApp()
    expect(screen.queryByRole('button', { name: 'رجوع' })).toBeNull()
    clickButton('الدعم')
    expect(await screen.findByRole('heading', { name: 'الدعم' })).toBeTruthy()
    clickButton('رجوع')
    expect(await screen.findByRole('heading', { name: 'الإعدادات' })).toBeTruthy()
  })

  it('المتجر يُفتح من العمود ويبقى العمود ظاهراً', async () => {
    useScreen(1440)
    await renderApp()
    clickButton('المتجر')
    await waitFor(() => expect(currentPath()).toBe('/store'))
    expect(panel()).toBeTruthy()
  })
})

describe('إغلاق شريط الأدوات في الجوال', () => {
  it('الضغط على مكان فارغ يغلقه ويعيد السهم', async () => {
    useScreen(375)
    await renderApp({ tools: ['ready'] })
    clickButton('فتح الأدوات')
    expect(isOpen()).toBe(true)
    fireEvent.pointerDown(document.querySelector('.app-main'))
    expect(isOpen()).toBe(false)
    expect(screen.getByRole('button', { name: 'فتح الأدوات' })).toBeTruthy()
  })

  it('الضغط داخل الشريط نفسه لا يغلقه قبل اختيار أداة', async () => {
    useScreen(375)
    await renderApp({ tools: ['ready'] })
    clickButton('فتح الأدوات')
    fireEvent.pointerDown(screen.getByRole('button', { name: 'أداة جاهزة' }))
    expect(isOpen()).toBe(true)
  })

  it('على اللابتوب لا يغلقه الضغط على الصفحة', async () => {
    useScreen(1440)
    await renderApp({ tools: ['ready'] })
    clickButton('فتح الأدوات')
    fireEvent.pointerDown(document.querySelector('.app-main'))
    expect(isOpen()).toBe(true)
  })
})
