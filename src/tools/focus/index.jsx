import Stopwatch from '@mingcute/react/core-filled/stopwatch'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'focus',
  name: 'التركيز',
  description: 'وقت بلا مقاطعات لما يهمك.',
  details: 'اختر مدة للعمل بلا مقاطعات، وخذ راحة قصيرة بعدها.',
  family: 'indigo',
  Icon: filled(Stopwatch, 1.03),
  Page: ComingSoon,
  order: 7,
}
