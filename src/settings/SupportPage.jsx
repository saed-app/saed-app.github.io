import { useState } from 'react'
import { MailIcon } from '../components/Icons.jsx'
import { SUPPORT_EMAIL } from '../config.js'

const FAQ = [
  {
    question: 'كيف أضيف أداة؟',
    answer: 'افتح المتجر من الزر أسفل يسار الشاشة، أو من الإعدادات على الكمبيوتر، ثم اضغط على الأداة واختر «إضافة الأداة».',
  },
  {
    question: 'كيف أزيل أداة؟',
    answer: 'افتح المتجر، واضغط على الأداة، ثم اختر «إزالة الأداة». وستبقى بياناتها محفوظة إن أعدتها لاحقاً.',
  },
  {
    question: 'كيف أغيّر ترتيب الأدوات؟',
    answer: 'اضغط السهم أسفل الشاشة ليظهر شريط الأدوات، ثم اضغط مطولاً على الأداة واسحبها إلى المكان الذي تريده.',
  },
  {
    question: 'أين تُحفظ بياناتي؟',
    answer: 'على جهازك داخل المتصفح فقط. وإذا مسحت بيانات المتصفح فستُمسح بيانات التطبيق معها.',
  },
  {
    question: 'نسيت رمز القفل، ماذا أفعل؟',
    answer: 'اضغط «نسيت الرمز» في شاشة القفل. الحل الوحيد هو مسح كل البيانات، لأنها محفوظة على جهازك فقط.',
  },
]

// النسخ عبر المتصفح يحتاج اتصالاً آمناً، فنستخدم طريقة احتياطية إن لم يتوفر
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.append(field)
    field.select()
    const copied = document.execCommand('copy')
    field.remove()
    return copied
  }
}

export default function SupportPage() {
  const [showEmail, setShowEmail] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    setCopied(await copyText(SUPPORT_EMAIL))
  }

  return (
    <div className="settings-stack">
      <section>
        <h3 className="settings-title">الأسئلة الشائعة</h3>
        <div className="settings-group">
          {FAQ.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h3 className="settings-title">تواصل معنا</h3>
        <div className="settings-group">
          <button
            type="button"
            className="settings-row settings-link pressable"
            aria-expanded={showEmail}
            onClick={() => setShowEmail((open) => !open)}
          >
            <span className="settings-row-icon">
              <MailIcon size={20} />
            </span>
            <span className="settings-row-label">راسل الدعم</span>
          </button>
          {showEmail && (
            <div className="support-email">
              <span className="support-email-address" dir="ltr">
                {SUPPORT_EMAIL}
              </span>
              <button type="button" className="copy-button pressable" onClick={handleCopy}>
                {copied ? 'تم النسخ' : 'نسخ'}
              </button>
            </div>
          )}
        </div>
        <p className="settings-hint">
          انسخ العنوان وأرسل لنا من بريدك استفسارك، أو أي مشكلة واجهتك.
        </p>
      </section>
    </div>
  )
}
