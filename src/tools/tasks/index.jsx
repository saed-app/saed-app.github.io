import { ListChecks } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  family: 'blue',
  Icon: duotone(ListChecks),
  Page: ComingSoon,
  order: 3,
}
