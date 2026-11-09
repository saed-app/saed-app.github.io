import { Timer } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'focus',
  name: 'التركيز',
  description: 'وقت بلا مقاطعات لما يهمك.',
  family: 'indigo',
  Icon: duotone(Timer),
  Page: ComingSoon,
  order: 7,
}
