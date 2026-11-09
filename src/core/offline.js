// تسجيل الـ service worker: هو ما يحفظ ملفات التطبيق على الجهاز ليعمل بدون إنترنت،
// ويجلب النسخة الجديدة تلقائياً عند نشرها ويفعّلها فوراً.
// داخل Capacitor (التطبيق الحقيقي) لا نحتاجه، لأن الملفات موجودة داخل التطبيق نفسه.
export async function registerOffline() {
  if (window.Capacitor || !('serviceWorker' in navigator)) return
  // في وضع التطوير لا يوجد service worker، فالملف الافتراضي غير متاح
  if (import.meta.env.DEV) return
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      if (!registration) return
      // التطبيق المفتوح لا يكتشف التحديث وحده، فنفحص عند الرجوع إليه وكل نصف ساعة
      const check = () => {
        if (!document.hidden && navigator.onLine !== false) registration.update().catch(() => {})
      }
      document.addEventListener('visibilitychange', check)
      setInterval(check, 30 * 60 * 1000)
    },
  })
}
