import { ShoppingCart } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'shopping',
  name: 'التسوق',
  description: 'ما تحتاج شراءه قبل أن تخرج.',
  family: 'clay',
  Icon: duotone(ShoppingCart),
  Page: ComingSoon,
  order: 12,
}
