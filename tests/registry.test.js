import { describe, expect, it } from 'vitest'
import { getTool, tools } from '../src/tools/registry.js'

describe('السجل المركزي للأدوات', () => {
  it('يكتشف الأدوات من مجلداتها تلقائياً', () => {
    expect(tools.length).toBeGreaterThan(0)
  })

  it('كل أداة فيها الحقول المطلوبة', () => {
    for (const tool of tools) {
      expect(typeof tool.id, 'id').toBe('string')
      expect(tool.name, `name: ${tool.id}`).toBeTruthy()
      expect(tool.description, `description: ${tool.id}`).toBeTruthy()
      expect(tool.color, `color: ${tool.id}`).toBeTruthy()
      expect(typeof tool.Icon, `Icon: ${tool.id}`).toBe('function')
      expect(typeof tool.Page, `Page: ${tool.id}`).toBe('function')
      expect(typeof tool.order, `order: ${tool.id}`).toBe('number')
    }
  })

  it('لا تتكرر معرّفات الأدوات', () => {
    const ids = tools.map((tool) => tool.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('الأدوات مرتبة حسب order', () => {
    const orders = tools.map((tool) => tool.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
  })

  it('يجد الأداة بمعرّفها ولا يجد غير الموجودة', () => {
    expect(getTool(tools[0].id)).toBe(tools[0])
    expect(getTool('no-such-tool')).toBeUndefined()
  })
})
