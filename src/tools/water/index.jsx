import { Drop } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'water',
  name: 'الماء',
  description: 'كم كوباً شربت اليوم؟',
  family: 'blue',
  Icon: duotone(Drop),
  Page: ComingSoon,
  order: 5,
}
