import { useSyncExternalStore } from 'react'

// نقاط التحول، ويجب أن تطابق ما في نهاية styles/app.css:
//   الجوال: أقل من 768، والتابلت: من 768 إلى 1023، واللابتوب: من 1024 فأكثر
const LAPTOP_QUERY = '(min-width: 1024px)'

function subscribe(callback) {
  const media = window.matchMedia(LAPTOP_QUERY)
  media.addEventListener?.('change', callback)
  return () => media.removeEventListener?.('change', callback)
}

function getIsLaptop() {
  return window.matchMedia(LAPTOP_QUERY).matches
}

// لما يختلف تركيب الصفحة نفسه بين الجوال واللابتوب. أما الفروق الشكلية فمكانها CSS
export function useIsLaptop() {
  return useSyncExternalStore(subscribe, getIsLaptop)
}
