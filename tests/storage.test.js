import { describe, expect, it } from 'vitest'
import { storage } from '../src/data/storage.js'

describe('الحفظ والقراءة', () => {
  it('يحفظ القيمة ويقرؤها كما هي', async () => {
    await storage.set('item', { a: 1, list: ['x'] })
    expect(await storage.get('item')).toEqual({ a: 1, list: ['x'] })
  })

  it('يضيف بادئة التطبيق إلى اسم المفتاح', async () => {
    await storage.set('item', 1)
    expect(localStorage.getItem('saed:item')).toBe('1')
  })

  it('يعيد القيمة الاحتياطية إذا لم يوجد شيء محفوظ', async () => {
    expect(await storage.get('missing')).toBeNull()
    expect(await storage.get('missing', 'بديل')).toBe('بديل')
  })

  it('يعيد القيمة الاحتياطية إذا كان المحفوظ تالفاً', async () => {
    localStorage.setItem('saed:broken', '{not json')
    expect(await storage.get('broken', 'بديل')).toBe('بديل')
  })

  it('يحذف مفتاحاً واحداً', async () => {
    await storage.set('one', 1)
    await storage.set('two', 2)
    await storage.remove('one')
    expect(await storage.get('one')).toBeNull()
    expect(await storage.get('two')).toBe(2)
  })

  it('المسح الكامل لا يمس بيانات غير التطبيق', async () => {
    await storage.set('mine', 1)
    localStorage.setItem('other-app', 'باقٍ')
    await storage.clear()
    expect(await storage.get('mine')).toBeNull()
    expect(localStorage.getItem('other-app')).toBe('باقٍ')
  })
})
