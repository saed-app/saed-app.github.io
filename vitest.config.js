import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// إعدادات الاختبارات فقط، ومنفصلة عن vite.config.js حتى لا تمس بناء التطبيق
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    setupFiles: ['tests/setup.js'],
  },
})
