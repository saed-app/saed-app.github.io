import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function AdhkarLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
    </Svg>
  )
}

export default {
  id: 'adhkar',
  name: 'الأذكار',
  description: 'أذكار يومك قريبة منك.',
  details: 'أذكار الصباح والمساء وما تحب المداومة عليه، قريبة منك كل يوم.',
  color: '#2F7F7A',
  family: 'green',
  Icon: AdhkarLine,
  Page: ComingSoon,
  order: 10,
}
