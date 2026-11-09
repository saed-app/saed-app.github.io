import { describe, expect, it, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { clickButton, currentPath, renderApp } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

function useScreen(width) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('min-width: 1024px') ? width >= 1024 : false,
    addEventListener() {},
    removeEventListener() {},
  }))
}

const barButtons = () =>
  screen.getByRole('navigation', { name: 'الشريط السفلي' }).querySelectorAll('button')
const shell = () => document.querySelector('.app-shell')

describe('اللابتوب', () => {
  it('يبقى السهم وحده في الشريط السفلي', async () => {
    useScreen(1440)
    await renderApp({ tools: ['ready'] })
    expect(barButtons()).toHaveLength(1)
    clickButton('فتح الأدوات')
    expect(document.getElementById('tools-sheet').classList.contains('is-open')).toBe(true)
  })

  it('صفحة الأداة تعرض الأداة وإعداداتها معاً', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(screen.getByText('عدد الإضافات: 0')).toBeTruthy()
    expect(screen.getByRole('complementary', { name: 'إعدادات أداة جاهزة' })).toBeTruthy()
    expect(screen.getByText('محتوى إعدادات الأداة')).toBeTruthy()
  })

  it('زر + في عنوان الأداة يصل إليها', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    clickButton('إضافة جديدة في أداة جاهزة')
    expect(await screen.findByText('عدد الإضافات: 1')).toBeTruthy()
  })

  it('الأداة التي لا تبدأ عنصراً جديداً ليس لها زر +', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/soon', tools: ['soon'] })
    expect(screen.queryByRole('button', { name: 'إضافة جديدة في أداة غير جاهزة' })).toBeNull()
    expect(screen.getByRole('button', { name: 'إحصائيات الأداة' })).toBeTruthy()
  })

  it('زر الإحصائيات في العنوان يفتحها', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    clickButton('إحصائيات الأداة')
    expect(await screen.findByText('محتوى إحصائيات الأداة')).toBeTruthy()
  })

  it('صفحة الإعدادات المنفصلة تعود إلى صفحة الأداة', async () => {
    useScreen(1440)
    await renderApp({ route: '/tool/ready/settings', tools: ['ready'] })
    await waitFor(() => expect(currentPath()).toBe('/tool/ready'))
  })

})

describe('الجوال يبقى كما هو', () => {
  it('خمسة أزرار في الشريط السفلي', async () => {
    useScreen(375)
    await renderApp({ tools: ['ready'] })
    expect(barButtons()).toHaveLength(5)
  })

  it('صفحة الأداة دون عمود إعدادات، والإعدادات صفحة منفصلة', async () => {
    useScreen(375)
    await renderApp({ route: '/tool/ready', tools: ['ready'] })
    expect(screen.queryByRole('complementary')).toBeNull()
    expect(screen.queryByText('محتوى إعدادات الأداة')).toBeNull()
    clickButton('إعدادات الأداة')
    expect(await screen.findByText('محتوى إعدادات الأداة')).toBeTruthy()
  })

  it('الإعدادات صفحة كاملة، والمتجر ليس فيها', async () => {
    useScreen(375)
    await renderApp()
    clickButton('الإعدادات')
    await screen.findByRole('heading', { name: 'الإعدادات' })
    expect(shell().hidden).toBe(true)
    expect(screen.queryByRole('button', { name: 'المتجر' })).toBeNull()
  })
})
