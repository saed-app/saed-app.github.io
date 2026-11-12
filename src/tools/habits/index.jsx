import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function HabitsLine(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M8.300 12.300l2.500 2.500 4.900-5.200" />
    </Svg>
  )
}

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  details: 'أضف عادة تريد الالتزام بها، وسجّل إنجازها كل يوم، وتابع استمرارك مع الوقت.',
  color: '#2F7D4F',
  family: 'green',
  Icon: HabitsLine,
  Page: ComingSoon,
  order: 2,
}
