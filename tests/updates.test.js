import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('التحديث الفوري', () => {
  const read = (file) => readFileSync(join(process.cwd(), file), 'utf8')

  it('النسخة الجديدة تعمل دون انتظار إغلاق النوافذ', () => {
    const config = read('vite.config.js')
    expect(config).toContain('skipWaiting: true')
    expect(config).toContain('clientsClaim: true')
  })

  it('التطبيق يفحص وجود تحديث عند الرجوع إليه', () => {
    const offline = read('src/core/offline.js')
    expect(offline).toContain('visibilitychange')
    expect(offline).toContain('registration.update()')
  })
})
