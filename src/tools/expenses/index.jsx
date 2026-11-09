import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ExpensesIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="6.500" width="16" height="12" rx="2.500" />
      <path d="M4 10.500h16M15 14.500h1.500" />
    </Svg>
  )
}

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'اعرف أين يذهب مالك.',
  color: 'var(--tool-expenses)',
  Icon: ExpensesIcon,
  Page: ComingSoon,
  order: 4,
}
