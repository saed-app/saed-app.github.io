// صفحة مؤقتة للأداة التي لها اسم وأيقونة فقط. عند بنائها فعلياً نستبدل بها صفحتها الحقيقية
export default function ComingSoon({ title = 'قريباً', text = 'نجهّزها لك الآن.' }) {
  return (
    <div className="coming-soon">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}
