import { HourglassIcon } from './Icons.jsx'

// صفحة مؤقتة للأداة التي لها اسم وأيقونة فقط. عند بنائها فعلياً نستبدل بها صفحتها الحقيقية
export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <span className="coming-soon-icon">
        <HourglassIcon size={34} />
      </span>
      <h2>قريباً</h2>
      <p>نعمل على هذه الأداة، وستكون جاهزة لك قريباً.</p>
    </div>
  )
}
