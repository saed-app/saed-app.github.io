import { Repeat } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'habits',
  name: 'العادات',
  description: 'عادة صغيرة كل يوم تصنع فرقاً.',
  details: 'أضف عادة تريد الالتزام بها، وسجّل إنجازها كل يوم، وتابع استمرارك مع الوقت.',
  family: 'green',
  Icon: duotone(Repeat),
  Page: ComingSoon,
  order: 2,
}
