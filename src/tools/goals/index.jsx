import { Target } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'ضع هدفك وتقدّم إليه خطوة خطوة.',
  details: 'حدد ما تريد الوصول إليه، وقسّمه إلى خطوات، وتابع تقدمك فيها.',
  family: 'berry',
  Icon: duotone(Target),
  Page: ComingSoon,
  order: 6,
}
