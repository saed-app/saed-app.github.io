import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // مسارات نسبية حتى يعمل التطبيق لاحقاً داخل Capacitor
  base: './',
  // host: true يسمح بفتح التطبيق من الجوال على نفس شبكة الواي فاي
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
