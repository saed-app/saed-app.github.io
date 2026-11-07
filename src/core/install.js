import { useEffect, useState } from 'react'

// المتصفح يرسل حدث beforeinstallprompt مرة واحدة عند فتح الصفحة، فنلتقطه مبكراً ونحفظه
let savedPrompt = null
const listeners = new Set()

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  savedPrompt = event
  listeners.forEach((listener) => listener())
})

window.addEventListener('appinstalled', () => {
  savedPrompt = null
  listeners.forEach((listener) => listener())
})

export function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
}

// iPhone وiPad لا يدعمان زر التثبيت، فالتثبيت يدوي من زر المشاركة في Safari
export function isAppleDevice() {
  const ua = navigator.userAgent
  return /iPhone|iPad|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)
}

export function useInstall() {
  const [, refresh] = useState(0)

  useEffect(() => {
    const listener = () => refresh((count) => count + 1)
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const installed = isInstalled()
  return {
    installed,
    canPrompt: Boolean(savedPrompt) && !installed,
    needsManualSteps: !installed && !savedPrompt && isAppleDevice(),
    async install() {
      if (!savedPrompt) return false
      savedPrompt.prompt()
      const { outcome } = await savedPrompt.userChoice
      savedPrompt = null
      listeners.forEach((listener) => listener())
      return outcome === 'accepted'
    },
  }
}
