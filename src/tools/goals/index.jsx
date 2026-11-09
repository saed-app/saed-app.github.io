import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function GoalsIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.500 20.500V4" />
      <path d="M6.500 4.500h11l-2.700 4 2.700 4h-11" />
    </Svg>
  )
}

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'ضع هدفك وتقدّم إليه خطوة خطوة.',
  color: 'var(--tool-goals)',
  Icon: GoalsIcon,
  Page: ComingSoon,
  order: 6,
}
