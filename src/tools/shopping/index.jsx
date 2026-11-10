import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function ShoppingLine(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 4.5h2.3l2 11h10l2-8H7M9 20h.01M17 20h.01" />
    </Svg>
  )
}

function ShoppingFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M7 7.500h12.800l-2 8h-10z" />
      <path fill="none" d="M3.500 4.500h2.300L7 11M9 20h.01M17 20h.01" />
    </Svg>
  )
}

export default {
  id: 'shopping',
  name: 'التسوق',
  description: 'ما تحتاج شراءه قبل أن تخرج.',
  details: 'اكتب ما تحتاج شراءه، وعلّم ما اشتريته وأنت في السوق.',
  color: '#7A6A2F',
  family: 'clay',
  Icon: dual(ShoppingLine, ShoppingFill),
  Page: ComingSoon,
  order: 12,
}
