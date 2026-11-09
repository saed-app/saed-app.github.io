import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { clickButton, readSaved, renderApp } from './helpers.jsx'

vi.mock('../src/tools/registry.js', () => import('./fixtures/registry.jsx'))

function useScreen(width) {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query.includes('min-width: 1024px') ? width >= 1024 : false,
    addEventListener() {},
    removeEventListener() {},
  }))
}

function walkTour() {
  const titles = [screen.getByRole('heading', { level: 2 }).textContent]
  while (screen.queryByRole('button', { name: 'التالي' })) {
    clickButton('التالي')
    titles.push(screen.getByRole('heading', { level: 2 }).textContent)
  }
  return titles
}

describe('الدليل التعريفي للابتوب', () => {
  it('يشرح الإعدادات والمتجر وزر + بطريقة اللابتوب', async () => {
    useScreen(1440)
    await renderApp({ settings: { tourSeen: false } })
    expect(document.querySelector('.tour-phone.is-laptop')).toBeTruthy()
    expect(walkTour()).toContain('إعدادات الأداة')
    clickButton('ابدأ')
    expect(readSaved('settings').tourSeen).toBe(true)
  })

  it('الجوال يبقى برسم الجوال', async () => {
    useScreen(375)
    await renderApp({ settings: { tourSeen: false } })
    expect(document.querySelector('.tour-phone.is-laptop')).toBeNull()
    expect(walkTour()).toContain('إعدادات الأداة وإحصائياتها')
  })
})
