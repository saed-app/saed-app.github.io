import { useEffect, useRef, useSyncExternalStore } from 'react'

// تنبيه التحديث: يعرف هل توجد نسخة جديدة، ويحفظ كل شيء قبل إعادة التحميل.
// تسجيل الـ service worker نفسه في core/offline.js.

const CHECK_EVERY_MS = 30 * 60 * 1000

let visible = false
let activateNewVersion = null
let updating = false
let reloading = false
const listeners = new Set()
const savers = new Set()

function setVisible(next) {
  visible = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useUpdateAvailable() {
  return useSyncExternalStore(subscribe, () => visible)
}

// activate تفعّل النسخة التي تنتظر
export function showUpdate(activate) {
  activateNewVersion = activate
  setVisible(true)
}

// الإغلاق لهذه الجلسة فقط، فالنسخة الجديدة تبقى تنتظر ويعود الشريط في الفتح القادم
export function dismissUpdate() {
  setVisible(false)
}

// أي صفحة فيها كتابة لم تُحفظ بعد تستدعي هذا وتمرر دالة تحفظها
export function useSaveBeforeUpdate(save) {
  const latestSave = useRef(save)

  useEffect(() => {
    latestSave.current = save
  })

  useEffect(() => {
    const run = () => latestSave.current()
    savers.add(run)
    return () => savers.delete(run)
  }, [])
}

async function saveEverything() {
  // الحقول التي تحفظ عند الخروج منها تحفظ الآن
  document.activeElement?.blur?.()
  await Promise.all([...savers].map((save) => save()))
}

// يعيد false إذا تعذر الحفظ، وعندها لا نعيد التحميل حتى لا تضيع الكتابة
export async function applyUpdate() {
  if (updating || !activateNewVersion) return true
  updating = true
  try {
    await saveEverything()
    await activateNewVersion()
    return true
  } catch (error) {
    updating = false
    console.warn('تعذر التحديث', error)
    return false
  }
}

// يُستدعى عندما تتولى النسخة الجديدة التطبيق، وقد يُستدعى أكثر من مرة
export async function reloadOnce() {
  if (reloading) return
  reloading = true
  try {
    await saveEverything()
  } catch (error) {
    reloading = false
    console.warn('تعذر الحفظ قبل التحديث', error)
    return
  }
  window.location.reload()
}

// عند فتح التطبيق يفحص المتصفح بنفسه. وهذا يفحص عند الرجوع إليه وكل فترة أثناء استخدامه
export function watchForUpdates(check) {
  function run() {
    if (document.hidden || navigator.onLine === false) return
    Promise.resolve(check()).catch(() => {})
  }
  document.addEventListener('visibilitychange', run)
  window.addEventListener('focus', run)
  const timer = setInterval(run, CHECK_EVERY_MS)
  return () => {
    document.removeEventListener('visibilitychange', run)
    window.removeEventListener('focus', run)
    clearInterval(timer)
  }
}
