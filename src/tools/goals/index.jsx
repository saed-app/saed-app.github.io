import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function GoalsLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01" />
    </Svg>
  )
}

function GoalsFill(props) {
  return (
    <Svg {...props} filled>
      <circle cx="12" cy="12" r="8.500" />
      <circle className="tool-cut" cx="12" cy="12" r="4" />
      <path className="tool-cut" d="M12 12h.01" />
    </Svg>
  )
}

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'ضع هدفك وتقدّم إليه خطوة خطوة.',
  details: 'حدد ما تريد الوصول إليه، وقسّمه إلى خطوات، وتابع تقدمك فيها.',
  color: '#9B3D5C',
  family: 'berry',
  Icon: dual(GoalsLine, GoalsFill),
  Page: ComingSoon,
  order: 6,
}
