// هذا هو المكان الوحيد في التطبيق الذي يقرأ البيانات ويحفظها.
// لاحقاً عند الانتقال إلى Supabase نغيّر هذا الملف فقط.
// كل الدوال غير متزامنة (async) لأن قاعدة البيانات الخارجية ستحتاج وقتاً للرد،
// وبهذا لن تتغير طريقة استدعائها في بقية التطبيق.

const PREFIX = 'saed:'

export const storage = {
  async get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      return raw === null ? fallback : JSON.parse(raw)
    } catch {
      return fallback
    }
  },

  async set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  },

  async remove(key) {
    localStorage.removeItem(PREFIX + key)
  },
}
