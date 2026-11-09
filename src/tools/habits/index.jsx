import RepeatLine from '@mingcute/react/core-regular/repeat'
import RepeatFill from '@mingcute/react/core-filled/repeat'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  details: 'أضف عادة تريد الالتزام بها، وسجّل إنجازها كل يوم، وتابع استمرارك مع الوقت.',
  family: 'green',
  Icon: dual(RepeatLine, RepeatFill, 1.11),
  Page: ComingSoon,
  order: 2,
}
