// السجل المركزي للأدوات.
// لإضافة أداة جديدة: أنشئ الملف src/tools/<اسم-الأداة>/index.jsx وسيظهر تلقائياً في المتجر،
// دون تعديل أي ملف آخر في التطبيق. انظر tools/notes/index.jsx مثالاً.
//
// كل ملف أداة يصدّر كائناً فيه:
//   id          معرّف ثابت بالإنجليزية (لا يتغير بعد النشر لأن البيانات مرتبطة به)
//   name        اسم الأداة
//   description وصف قصير يظهر في قائمة المتجر
//   details     شرح مبسط يظهر في صفحة التعريف بالأداة
//   family      اسم عائلتها اللونية من theme.css، مثل paper أو blue
//   Icon        أيقونتها: duotone(اسم الأيقونة) من Phosphor
//   Page        مكوّن صفحتها (الأداة نفسها)
//   Settings    اختياري: مكوّن إعداداتها، ويُفتح من زر إعدادات الأداة في الشريط السفلي
//   Stats       اختياري: مكوّن إحصائياتها، ويُفتح من زر الإحصائيات في الشريط السفلي
//   supportsAdd اختياري: true إذا كان زر + يضيف فيها، وتستدعي صفحتها useToolAdd من core/toolAdd.js
//   order       ترتيبها في المتجر

const modules = import.meta.glob('./*/index.jsx', { eager: true })

export const tools = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

export function getTool(id) {
  return tools.find((tool) => tool.id === id)
}
