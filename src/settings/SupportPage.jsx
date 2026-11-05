import { HelpIcon, MailIcon } from '../components/Icons.jsx'
import { SUPPORT_EMAIL } from '../config.js'
import packageInfo from '../../package.json'

const FAQ = [
  {
    question: 'كيف أضيف أداة؟',
    answer: 'افتح المتجر من الأيقونة أعلى يمين الشاشة، ثم اضغط «إضافة» بجانب الأداة التي تريدها.',
  },
  {
    question: 'كيف أزيل أداة؟',
    answer: 'افتح المتجر واضغط «إزالة» بجانب الأداة، وستبقى بياناتها محفوظة إن أعدتها لاحقاً.',
  },
  {
    question: 'كيف أغيّر ترتيب الأدوات؟',
    answer: 'اضغط مطولاً على الأداة في الشريط السفلي، ثم اسحبها إلى المكان الذي تريده.',
  },
  {
    question: 'لماذا تظهر بعض الأدوات بعبارة «قريباً»؟',
    answer: 'لأنها لم تكتمل بعد، وستعمل تلقائياً عند إطلاقها في تحديث قادم.',
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

function mailLink(subject, body) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function contactLink() {
  return mailLink('استفسار عن تطبيق ساعد', 'السلام عليكم،\n\nأود الاستفسار عن:\n')
}

// معلومات الجهاز تظهر للمستخدم داخل الرسالة قبل أن يقرر إرسالها
function bugReportLink() {
  const details = [
    `نسخة التطبيق: ${packageInfo.version}`,
    `الشاشة: ${window.screen.width}×${window.screen.height}`,
    `المتصفح: ${navigator.userAgent}`,
  ].join('\n')
  return mailLink(
    'بلاغ عن مشكلة في تطبيق ساعد',
    `السلام عليكم،\n\nالمشكلة التي واجهتها:\n\n\nالخطوات التي سبقتها:\n\n\n---\n${details}\n`,
  )
}

export default function SupportPage() {
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
          <a className="settings-row settings-link pressable" href={contactLink()}>
            <span className="settings-row-icon">
              <MailIcon size={20} />
            </span>
            <span className="settings-row-label">راسل الدعم</span>
          </a>
          <a className="settings-row settings-link pressable" href={bugReportLink()}>
            <span className="settings-row-icon">
              <HelpIcon size={20} />
            </span>
            <span className="settings-row-label">الإبلاغ عن مشكلة</span>
          </a>
        </div>
        <p className="settings-hint">
          تُفتح رسالة جاهزة في تطبيق البريد لتراجعها قبل الإرسال. يضيف زر البلاغ نسخة التطبيق ومعلومات جهازك إلى الرسالة.
        </p>
      </section>
    </div>
  )
}
