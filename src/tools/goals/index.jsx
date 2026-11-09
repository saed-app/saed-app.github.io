import Target from '@mingcute/react/core-filled/target'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'ضع هدفك وتقدّم إليه خطوة خطوة.',
  details: 'حدد ما تريد الوصول إليه، وقسّمه إلى خطوات، وتابع تقدمك فيها.',
  family: 'berry',
  Icon: filled(Target, 0.95),
  Page: ComingSoon,
  order: 6,
}
