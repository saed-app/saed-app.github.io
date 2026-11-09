import ListCheck from '@mingcute/react/core-filled/list-check-2'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  details: 'اكتب ما عليك فعله، وعلّم ما أنجزته، فيبقى يومك واضحاً أمامك.',
  family: 'blue',
  Icon: filled(ListCheck, 1.05),
  Page: ComingSoon,
  order: 3,
}
