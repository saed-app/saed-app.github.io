import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// زر + في الشريط السفلي يرسل إشارة إلى صفحة الأداة المفتوحة.
// أي أداة تريد الزر تضع في ملفها supportsAdd: true، وتستدعي في صفحتها:
//   useToolAdd(() => { افتح نموذج إنشاء عنصر جديد })
export function useToolAdd(handler) {
  const location = useLocation()
  const navigate = useNavigate()
  const token = location.state?.toolAdd
  const latestHandler = useRef(handler)
  const handledToken = useRef(null)

  useEffect(() => {
    latestHandler.current = handler
  })

  useEffect(() => {
    if (!token || handledToken.current === token) return
    handledToken.current = token
    // نمسح الإشارة حتى لا تتكرر عند إعادة تحميل الصفحة
    navigate(location.pathname, { replace: true, state: null })
    latestHandler.current()
  }, [token, navigate, location.pathname])
}
