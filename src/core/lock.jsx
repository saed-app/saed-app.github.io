import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { storage } from '../data/storage.js'

const STORAGE_KEY = 'lock'
const LockContext = createContext(null)

export const PIN_LENGTH = 4

// لا نحفظ الرمز نفسه بل بصمة منه. هذا قفل يمنع الفتح العابر فقط ولا يشفّر البيانات،
// فرمز من 4 أرقام لا يحمي من شخص لديه وصول تقني إلى الجهاز.
function hashPin(pin, salt) {
  const text = `${salt}:${pin}`
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i)
    h1 = Math.imul(h1 ^ code, 2654435761)
    h2 = Math.imul(h2 ^ code, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}

export async function loadLock() {
  const saved = await storage.get(STORAGE_KEY)
  return saved?.hash ? saved : null
}

export function LockProvider({ initialLock, children }) {
  const [lock, setLock] = useState(initialLock)
  const [locked, setLocked] = useState(Boolean(initialLock))

  const save = useCallback((next) => {
    setLock(next)
    const saving = next ? storage.set(STORAGE_KEY, next) : storage.remove(STORAGE_KEY)
    saving.catch((error) => console.warn('تعذر حفظ القفل', error))
  }, [])

  // القفل التلقائي عند الخروج من التطبيق
  useEffect(() => {
    if (!lock?.autoLock) return undefined
    function handleVisibility() {
      if (document.hidden) setLocked(true)
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [lock])

  const value = useMemo(
    () => ({
      locked,
      hasPin: Boolean(lock),
      autoLock: lock?.autoLock ?? true,
      verifyPin: (pin) => Boolean(lock) && hashPin(pin, lock.salt) === lock.hash,
      unlock: () => setLocked(false),
      setPin: (pin) => {
        const salt = Math.random().toString(36).slice(2)
        save({ salt, hash: hashPin(pin, salt), autoLock: lock?.autoLock ?? true })
      },
      removePin: () => save(null),
      setAutoLock: (autoLock) => {
        if (lock) save({ ...lock, autoLock })
      },
    }),
    [lock, locked, save],
  )

  return <LockContext.Provider value={value}>{children}</LockContext.Provider>
}

export function useLock() {
  return useContext(LockContext)
}
