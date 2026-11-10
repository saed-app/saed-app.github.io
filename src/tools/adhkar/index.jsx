import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

// السبحة غير موجودة في MingCute، فهي مرسومة بشبكة 24 وبأسلوبها في الحالتين
function RosaryLine({ size = 46, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.600" aria-hidden="true">
      <circle cx="7.05" cy="14.65" r="1.700" />
      <circle cx="5" cy="9.7" r="1.700" />
      <circle cx="7.05" cy="4.75" r="1.700" />
      <circle cx="12" cy="2.7" r="1.700" />
      <circle cx="16.95" cy="4.75" r="1.700" />
      <circle cx="19" cy="9.7" r="1.700" />
      <circle cx="16.95" cy="14.65" r="1.700" />
      <circle cx="12" cy="17" r="1.800" />
      <path d="M12 20.300l1.700 2.500h-3.400z" strokeLinejoin="round" />
    </svg>
  )
}

function RosaryFill({ size = 46, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="7.05" cy="14.65" r="2.500" />
      <circle cx="5" cy="9.7" r="2.500" />
      <circle cx="7.05" cy="4.75" r="2.500" />
      <circle cx="12" cy="2.7" r="2.500" />
      <circle cx="16.95" cy="4.75" r="2.500" />
      <circle cx="19" cy="9.7" r="2.500" />
      <circle cx="16.95" cy="14.65" r="2.500" />
      <circle cx="12" cy="17" r="2.600" />
      <path d="M12 20.300l1.700 2.500h-3.400z" stroke="currentColor" strokeWidth="1.600" strokeLinejoin="round" />
    </svg>
  )
}

export default {
  id: 'adhkar',
  name: 'الأذكار',
  description: 'أذكار يومك قريبة منك.',
  details: 'أذكار الصباح والمساء وما تحب المداومة عليه، قريبة منك كل يوم.',
  family: 'green',
  Icon: dual(RosaryLine, RosaryFill, 0.81),
  Page: ComingSoon,
  order: 10,
}
