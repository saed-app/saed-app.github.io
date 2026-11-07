import Logo from '../components/Logo.jsx'
import { useInstall } from '../core/install.js'

export default function InstallPage() {
  const { installed, canPrompt, needsManualSteps, install } = useInstall()

  return (
    <div className="install-page">
      <Logo size={84} />
      {installed && <p>ساعد مثبّت على جهازك. افتحه من أيقونته في أي وقت.</p>}

      {canPrompt && (
        <>
          <p>ثبّت ساعد على جهازك ليفتح كتطبيق مستقل من شاشتك الرئيسية، ويعمل حتى بدون إنترنت.</p>
          <button type="button" className="store-action pressable" onClick={install}>
            ثبّت الآن
          </button>
        </>
      )}

      {needsManualSteps && (
        <>
          <p>لتثبيت ساعد على iPhone أو iPad من متصفح Safari:</p>
          <ol className="install-steps">
            <li>اضغط زر المشاركة أسفل الشاشة.</li>
            <li>اختر «إضافة إلى الشاشة الرئيسية».</li>
            <li>اضغط «إضافة».</li>
          </ol>
        </>
      )}

      {!installed && !canPrompt && !needsManualSteps && (
        <p>
          افتح ساعد في متصفح Chrome أو Edge، ثم اختر «تثبيت التطبيق» من قائمة المتصفح. إن لم يظهر الخيار فقد يكون التطبيق مثبتاً
          مسبقاً.
        </p>
      )}
    </div>
  )
}
