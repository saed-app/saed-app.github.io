import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// ما يوفره المتصفح الحقيقي ولا توفره بيئة الاختبار
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
Element.prototype.scrollTo = () => {}

beforeEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
  delete document.documentElement.dataset.fontSize
})

afterEach(() => {
  cleanup()
  delete document.hidden
  vi.useRealTimers()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})
