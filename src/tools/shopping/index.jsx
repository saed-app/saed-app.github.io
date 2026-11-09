import ShoppingCartLine from '@mingcute/react/core-regular/shopping-cart-1'
import ShoppingCartFill from '@mingcute/react/core-filled/shopping-cart-1'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'shopping',
  name: 'التسوق',
  description: 'ما تحتاج شراءه قبل أن تخرج.',
  details: 'اكتب ما تحتاج شراءه، وعلّم ما اشتريته وأنت في السوق.',
  family: 'clay',
  Icon: dual(ShoppingCartLine, ShoppingCartFill, 0.95),
  Page: ComingSoon,
  order: 12,
}
