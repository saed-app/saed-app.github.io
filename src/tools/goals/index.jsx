import TargetLine from '@mingcute/react/core-regular/target'
import TargetFill from '@mingcute/react/core-filled/target'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'ضع هدفك وتقدّم إليه خطوة خطوة.',
  details: 'حدد ما تريد الوصول إليه، وقسّمه إلى خطوات، وتابع تقدمك فيها.',
  family: 'berry',
  Icon: dual(TargetLine, TargetFill, 0.95),
  Page: ComingSoon,
  order: 6,
}
