import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function HabitsIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 12a8 8 0 1 1-3.200-6.400" />
      <path d="M9 11.500l3 3 8-8.500" />
    </Svg>
  )
}

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  color: 'var(--tool-habits)',
  Icon: HabitsIcon,
  Page: ComingSoon,
  order: 2,
}
