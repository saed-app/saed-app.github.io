import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function HabitsLine(props) {
  return (
    <Svg {...props}>
      <path d="M17 2.500L20.500 6 17 9.500M3.500 11.500V9a3 3 0 0 1 3-3h14M7 21.500L3.500 18 7 14.500M20.500 12.500V15a3 3 0 0 1-3 3h-14" />
    </Svg>
  )
}

function HabitsFill(props) {
  return (
    <Svg {...props} filled>
      <path fill="none" strokeWidth="2.400" d="M17 2.500L20.500 6 17 9.500M3.500 11.500V9a3 3 0 0 1 3-3h14M7 21.500L3.500 18 7 14.500M20.500 12.500V15a3 3 0 0 1-3 3h-14" />
    </Svg>
  )
}

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  details: 'أضف عادة تريد الالتزام بها، وسجّل إنجازها كل يوم، وتابع استمرارك مع الوقت.',
  family: 'green',
  Icon: dual(HabitsLine, HabitsFill, 0.87),
  Page: ComingSoon,
  order: 2,
}
