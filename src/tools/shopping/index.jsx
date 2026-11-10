import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function ShoppingLine(props) {
  return (
    <Svg {...props}>
      <path d="M3.500 4.500h2.300l2 11h10l2-8H7M9 20h.01M17 20h.01" />
    </Svg>
  )
}

function ShoppingFill(props) {
  return (
    <Svg {...props} filled>
      <path fill="none" d="M3.500 4.500h2.300l.5 3" />
      <path d="M6.300 7.500h13.500l-2 8h-10z" />
      <circle cx="9" cy="20" r="1.400" />
      <circle cx="17" cy="20" r="1.400" />
    </Svg>
  )
}

export default {
  id: 'shopping',
  name: 'التسوق',
  description: 'ما تحتاج شراءه قبل أن تخرج.',
  details: 'اكتب ما تحتاج شراءه، وعلّم ما اشتريته وأنت في السوق.',
  family: 'clay',
  Icon: dual(ShoppingLine, ShoppingFill, 0.98),
  Page: ComingSoon,
  order: 12,
}
