import Repeat from '@mingcute/react/core-filled/repeat'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  details: 'أضف عادة تريد الالتزام بها، وسجّل إنجازها كل يوم، وتابع استمرارك مع الوقت.',
  family: 'green',
  Icon: filled(Repeat, 1.05),
  Page: ComingSoon,
  order: 2,
}
