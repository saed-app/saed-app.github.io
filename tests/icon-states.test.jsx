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

// أيقونات الأدوات رسم واحد كما في النسخة الأولى، ولا تمتلئ عند الضغط ولا عند فتح الأداة
const toolIconIsPlain = (element) => {
  const tile = element.querySelector('.tool-tile')
  return tile.querySelector('.state-icon') === null && tile.querySelectorAll('svg').length === 1
}

describe('أيقونات الأدوات بلا امتلاء', () => {
  it('شريط الأدوات: الأداة المفتوحة وغيرها برسم واحد', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready', 'soon'] })
    expect(toolIconIsPlain(button('أداة جاهزة'))).toBe(true)
    expect(toolIconIsPlain(button('أداة غير جاهزة'))).toBe(true)
  })

  it('عنوان صفحة الأداة والمتجر وصفحة التعريف برسم واحد', async () => {
    useScreen(375)
    const first = await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(toolIconIsPlain(document.querySelector('.page-header'))).toBe(true)
    first.unmount()
    const second = await renderApp({ route: '/store', tools: ['ready'] })
    expect(toolIconIsPlain(document.querySelector('.store-card'))).toBe(true)
    second.unmount()
    await renderApp({ route: '/store/ready', tools: ['ready'] })
    expect(toolIconIsPlain(document.querySelector('.store-hero'))).toBe(true)
  })
})

describe('حالتا أيقونات الواجهة', () => {

  it('لا يُحذف مؤشر الأداة المفتوحة', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(button('أداة جاهزة').classList.contains('is-active')).toBe(true)
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
