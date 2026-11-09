import { Wallet } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'اعرف أين يذهب مالك.',
  family: 'clay',
  Icon: duotone(Wallet),
  Page: ComingSoon,
  order: 4,
}
