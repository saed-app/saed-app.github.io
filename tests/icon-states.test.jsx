import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { clickButton, renderApp } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

function useScreen(width) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('min-width: 1024px') ? width >= 1024 : false,
    addEventListener() {},
    removeEventListener() {},
  }))
}

const stateOf = (element) => element.querySelector('.state-icon').dataset.active
const button = (name) => screen.getByRole('button', { name })

describe('حالتا الأيقونة', () => {
  it('الأيقونة تحمل الحالتين دائماً، فلا يتغير مكانها عند التبديل', async () => {
    useScreen(375)
    await renderApp({ tools: ['ready'] })
    const icon = button('أداة جاهزة').querySelector('.state-icon')
    expect(icon.querySelector('[data-kind="line"]')).toBeTruthy()
    expect(icon.querySelector('[data-kind="fill"]')).toBeTruthy()
  })

  it('شريط الأدوات: الأداة المفتوحة Fill والباقي Line', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready', 'soon'] })
    expect(stateOf(button('أداة جاهزة'))).toBe('true')
    expect(stateOf(button('أداة غير جاهزة'))).toBe('false')
  })

  it('لا يُحذف مؤشر الأداة المفتوحة', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(button('أداة جاهزة').classList.contains('is-active')).toBe(true)
  })

  it('عنوان صفحة الأداة Fill', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(stateOf(document.querySelector('.page-header'))).toBe('true')
  })

  it('المتجر Line، وصفحة تعريف الأداة Fill', async () => {
    useScreen(375)
    const { unmount } = await renderApp({ route: '/store', tools: ['ready'] })
    expect(stateOf(document.querySelector('.store-card'))).toBe('false')
    unmount()
    await renderApp({ route: '/store/ready', tools: ['ready'] })
    expect(stateOf(document.querySelector('.store-hero'))).toBe('true')
  })

  it('زر الإعدادات Fill في صفحة الإعدادات فقط', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(stateOf(button('إعدادات الأداة'))).toBe('false')
    clickButton('إعدادات الأداة')
    await waitFor(() => expect(stateOf(button('إعدادات الأداة'))).toBe('true'))
    expect(stateOf(button('إحصائيات الأداة'))).toBe('false')
  })

  it('زر الإحصائيات Fill في صفحة الإحصائيات', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready/stats', tools: ['ready'] })
    expect(stateOf(button('إحصائيات الأداة'))).toBe('true')
  })

  it('اللابتوب: زر الإحصائيات في العنوان Fill عند فتحها', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/ready/stats', tools: ['ready'] })
    expect(stateOf(button('إحصائيات الأداة'))).toBe('true')
  })

  it('اللابتوب: الصفحة المفتوحة في عمود الإعدادات Fill', async () => {
    useScreen(1440)
    await renderApp()
    expect(stateOf(button('الدعم'))).toBe('false')
    fireEvent.click(button('الدعم'))
    await screen.findByRole('heading', { name: 'الدعم' })
    clickButton('رجوع')
    await screen.findByRole('heading', { name: 'الإعدادات' })
    expect(stateOf(button('الدعم'))).toBe('false')
  })

  it('اللابتوب: سطر المتجر Fill عندما يكون المتجر مفتوحاً', async () => {
    useScreen(1440)
    await renderApp({ route: '/store' })
    expect(stateOf(button('المتجر'))).toBe('true')
  })
})
