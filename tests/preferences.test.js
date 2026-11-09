import { describe, expect, it } from 'vitest'
import { loadSettings } from '../src/core/settings.jsx'
import { loadTheme } from '../src/core/theme.jsx'
import { loadEnabledTools } from '../src/core/enabledTools.jsx'
import { tools } from '../src/tools/registry.js'
import { save } from './helpers.jsx'

describe('تحميل الإعدادات', () => {
  it('يستخدم القيم الافتراضية عند أول فتح', async () => {
    expect(await loadSettings()).toEqual({
      name: '',
      fontSize: 'medium',
      weekStart: 'sunday',
      sounds: true,
      notifications: false,
      tourSeen: false,
      homeDate: 'hijri',
    })
  })

  it('يدمج المحفوظ مع القيم الافتراضية', async () => {
    save('settings', { name: 'أحمد' })
    const settings = await loadSettings()
    expect(settings.name).toBe('أحمد')
    expect(settings.fontSize).toBe('medium')
  })

  it('ينقل مقاس الخط الملغى إلى «كبير»', async () => {
    save('settings', { fontSize: 'xlarge' })
    expect((await loadSettings()).fontSize).toBe('large')
  })
})

describe('تحميل الوضع الليلي', () => {
  it('الوضع النهاري هو الافتراضي', async () => {
    expect(await loadTheme()).toBe('light')
  })

  it('يقرأ الوضع الليلي المحفوظ', async () => {
    save('theme', 'dark')
    expect(await loadTheme()).toBe('dark')
  })

  it('يتجاهل أي قيمة غير معروفة', async () => {
    save('theme', 'blue')
    expect(await loadTheme()).toBe('light')
  })
})

describe('تحميل الأدوات المضافة', () => {
  it('القائمة فارغة عند أول فتح', async () => {
    expect(await loadEnabledTools()).toEqual([])
  })

  it('يحافظ على ترتيب المستخدم ويتجاهل أداة حُذف ملفها', async () => {
    const [first, second] = tools
    save('enabledTools', [second.id, 'deleted-tool', first.id])
    expect(await loadEnabledTools()).toEqual([second.id, first.id])
  })

  it('يتجاهل المحفوظ إذا لم يكن قائمة', async () => {
    save('enabledTools', 'تالف')
    expect(await loadEnabledTools()).toEqual([])
  })
})
