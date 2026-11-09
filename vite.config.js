import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // يجعل التطبيق قابلاً للتثبيت، ويحفظ ملفاته على الجهاز ليعمل بدون إنترنت
    VitePWA({
      // نسجل الـ service worker بأنفسنا في main.jsx حتى نتجنبه داخل Capacitor
      injectRegister: false,
      // النسخة الجديدة تُحمَّل في الخلفية وتنتظر موافقة المستخدم من شريط التحديث
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png', 'licenses/*.txt'],
      manifest: {
        name: 'ساعد',
        short_name: 'ساعد',
        description: 'مساحتك الخاصة لتنظيم يومك: اجمع الأدوات التي تحتاجها فقط في مكان واحد.',
        lang: 'ar',
        dir: 'rtl',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,txt}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  // مسارات نسبية حتى يعمل التطبيق لاحقاً داخل Capacitor
  base: './',
  // host: true يسمح بفتح التطبيق من الجوال على نفس شبكة الواي فاي
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
