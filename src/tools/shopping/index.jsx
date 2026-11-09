import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ShoppingIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 10h16l-1.500 9.500h-13z" />
      <path d="M8 10l3-6M16 10l-3-6M9.500 14v2M14.500 14v2" />
    </Svg>
  )
}

export default {
  id: 'shopping',
  name: 'التسوق',
  description: 'ما تحتاج شراءه قبل أن تخرج.',
  color: 'var(--tool-shopping)',
  Icon: ShoppingIcon,
  Page: ComingSoon,
  order: 12,
}
