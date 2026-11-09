import { CookingPot } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  family: 'clay',
  Icon: duotone(CookingPot),
  Page: ComingSoon,
  order: 11,
}
