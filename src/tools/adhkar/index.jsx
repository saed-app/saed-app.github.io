import ComingSoon from '../../components/ComingSoon.jsx'

// السبحة غير موجودة في MingCute، فهي مرسومة بشبكة 24 وبامتلائها وزواياها الناعمة
function RosaryIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="7.37" cy="15.52" r="1.9" />
      <circle cx="4.91" cy="11.25" r="1.9" />
      <circle cx="5.76" cy="6.40" r="1.9" />
      <circle cx="9.54" cy="3.23" r="1.9" />
      <circle cx="14.46" cy="3.23" r="1.9" />
      <circle cx="18.24" cy="6.40" r="1.9" />
      <circle cx="19.09" cy="11.25" r="1.9" />
      <circle cx="16.63" cy="15.52" r="1.9" />
      <circle cx="12" cy="17.600" r="2" />
      <path
        d="M12 19.300l1.900 2.300h-3.800z"
        stroke="currentColor"
        strokeWidth="1.200"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default {
  id: 'adhkar',
  name: 'الأذكار',
  description: 'أذكار يومك قريبة منك.',
  details: 'أذكار الصباح والمساء وما تحب المداومة عليه، قريبة منك كل يوم.',
  family: 'green',
  Icon: RosaryIcon,
  Page: ComingSoon,
  order: 10,
}
