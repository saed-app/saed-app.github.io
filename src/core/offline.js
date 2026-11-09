import { reloadOnce, showUpdate, watchForUpdates } from './update.js'

// تسجيل الـ service worker: هو ما يحفظ ملفات التطبيق على الجهاز ليعمل بدون إنترنت،
// ويجلب النسخة الجديدة ثم ينتظر موافقة المستخدم من شريط التحديث.
// داخل Capacitor (التطبيق الحقيقي) لا نحتاجه، لأن الملفات موجودة داخل التطبيق نفسه.
export async function registerOffline() {
  if (window.Capacitor || !('serviceWorker' in navigator)) return
  // في وضع التطوير لا يوجد service worker، فالملف الافتراضي غير متاح
  if (import.meta.env.DEV) return
  const { registerSW } = await import('virtual:pwa-register')
  const activate = registerSW({
    immediate: true,
    onNeedRefresh: () => showUpdate(() => activate(true)),
    onNeedReload: reloadOnce,
    onRegisteredSW: (_url, registration) => {
      if (registration) watchForUpdates(() => registration.update())
    },
  })
}
