import ComingSoon from '../../components/ComingSoon.jsx'

// السبحة غير موجودة في Phosphor، فهي مرسومة بنمط duotone نفسه: حبات وشرّابة
function RosaryIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <circle cx="105" cy="154" r="15" />
      <circle cx="71" cy="125" r="15" />
      <circle cx="63" cy="81" r="15" />
      <circle cx="86" cy="41" r="15" />
      <circle cx="128" cy="26" r="15" />
      <circle cx="170" cy="41" r="15" />
      <circle cx="193" cy="81" r="15" />
      <circle cx="185" cy="125" r="15" />
      <circle cx="151" cy="154" r="15" />
      <circle cx="128" cy="176" r="16" />
      <path d="M128 196l-20 42h40z" opacity="0.2" />
      <path d="M128 196l-20 42h40z" fill="none" stroke="currentColor" strokeWidth="16" strokeLinejoin="round" />
    </svg>
  )
}

export default {
  id: 'adhkar',
  name: 'الأذكار',
  description: 'أذكار يومك قريبة منك.',
  family: 'green',
  Icon: RosaryIcon,
  Page: ComingSoon,
  order: 10,
}
