import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function ExpensesLine(props) {
  return (
    <Svg {...props}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V17a2.5 2.5 0 0 0 2.5 2.5H20V8H6.5A2.5 2.5 0 0 1 4 7.5zM16 13.7h.01" />
    </Svg>
  )
}

function ExpensesFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M4 7.500A2.500 2.500 0 0 1 6.500 5H18v3h2v11.500H6.500A2.500 2.500 0 0 1 4 17z" />
      <path className="tool-cut" d="M20 8H6.500A2.500 2.500 0 0 1 4 7.500M16 13.700h.01" />
    </Svg>
  )
}

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'اعرف أين يذهب مالك.',
  details: 'سجّل ما تصرفه أولاً بأول، وشاهد أين يذهب مالك كل شهر.',
  color: '#A8552F',
  family: 'clay',
  Icon: dual(ExpensesLine, ExpensesFill),
  Page: ComingSoon,
  order: 4,
}
