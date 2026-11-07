import { useId } from 'react'

// رسم ساعة رملية ذهبية: إطار معدني، ورمل يتساقط بهدوء
function HourglassArt() {
  const id = useId()
  return (
    <svg className="hourglass" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9C7213" />
          <stop offset="0.45" stopColor="#E8C75A" />
          <stop offset="1" stopColor="#B98D1B" />
        </linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1D78A" />
          <stop offset="1" stopColor="#C99A2E" />
        </linearGradient>
      </defs>
      {/* الزجاج */}
      <path
        d="M30 20h36c0 14-10 20-14 28c4 8 14 14 14 28H30c0-14 10-20 14-28c-4-8-14-14-14-28z"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      {/* الرمل في الأعلى والأسفل */}
      <path d="M36 28h24c-2 6-8 10-12 15c-4-5-10-9-12-15z" fill={`url(#${id}-sand)`} />
      <path d="M33 74c2-8 9-12 15-14c6 2 13 6 15 14z" fill={`url(#${id}-sand)`} />
      {/* خيط الرمل المتساقط */}
      <path className="hourglass-stream" d="M48 44v24" stroke="#D9B04A" strokeWidth="2.200" strokeLinecap="round" />
      {/* الإطار المعدني */}
      <rect x="24" y="13" width="48" height="8" rx="4" fill={`url(#${id}-metal)`} />
      <rect x="24" y="75" width="48" height="8" rx="4" fill={`url(#${id}-metal)`} />
    </svg>
  )
}

// صفحة مؤقتة للأداة التي لها اسم وأيقونة فقط. عند بنائها فعلياً نستبدل بها صفحتها الحقيقية
export default function ComingSoon() {
  return (
    <div className="coming-soon">
      <HourglassArt />
      <h2>قريباً</h2>
      <p>نعمل على هذه الأداة، وستكون جاهزة لك قريباً.</p>
    </div>
  )
}
