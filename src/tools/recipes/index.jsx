import { CookingPot } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  details: 'احفظ وصفاتك بمقاديرها وخطواتها، وارجع إليها عند الطبخ.',
  family: 'clay',
  Icon: duotone(CookingPot),
  Page: ComingSoon,
  order: 11,
}
