import WipeData from '../components/WipeData.jsx'

export default function DataPage() {
  return (
    <div className="settings-stack">
      <section>
        <h3 className="settings-title">مسح البيانات</h3>
        <p className="settings-hint settings-hint-top">
          يمسح الأدوات المضافة وبياناتها والإعدادات والاسم ورمز القفل من هذا الجهاز.
        </p>
        <WipeData />
      </section>
    </div>
  )
}
