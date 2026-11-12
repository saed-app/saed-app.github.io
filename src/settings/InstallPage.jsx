import Logo from '../components/Logo.jsx'
import { useInstall } from '../core/install.js'

// كلمة إنجليزية داخل نص عربي: اتجاهها معزول وحجمها متناسق
function Latin({ children }) {
  return (
    <bdi className="latin" lang="en">
      {children}
    </bdi>
  )
}

export default function InstallPage() {
  const { installed, canPrompt, needsManualSteps, install } = useInstall()

  return (
    <div className="install-page">
      <Logo size={84} />
      {installed && <p>ساعد مثبّت على جهازك.</p>}

      {canPrompt && (
        <>
          <p>ثبّته ليفتح من شاشتك الرئيسية، ويعمل بلا إنترنت.</p>
          <button type="button" className="store-action pressable" onClick={install}>
            ثبّت الآن
          </button>
        </>
      )}

      {needsManualSteps && (
        <>
          <p>
            في <Latin>iPhone</Latin> أو <Latin>iPad</Latin>، افتح ساعد في <Latin>Safari</Latin> ثم:
          </p>
          <ol className="install-steps">
            <li>اضغط زر المشاركة أسفل الشاشة.</li>
            <li>اختر «إضافة إلى الشاشة الرئيسية».</li>
            <li>اضغط «إضافة».</li>
          </ol>
        </>
      )}

      {!installed && !canPrompt && !needsManualSteps && (
        <p>
          في <Latin>Chrome</Latin> أو <Latin>Edge</Latin>، اختر «تثبيت التطبيق» من قائمة المتصفح.
        </p>
      )}
    </div>
  )
}
