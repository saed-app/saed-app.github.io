import ListCheckLine from '@mingcute/react/core-regular/list-check-2'
import ListCheckFill from '@mingcute/react/core-filled/list-check-2'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  details: 'اكتب ما عليك فعله، وعلّم ما أنجزته، فيبقى يومك واضحاً أمامك.',
  family: 'blue',
  Icon: dual(ListCheckLine, ListCheckFill, 1.09),
  Page: ComingSoon,
  order: 3,
}
