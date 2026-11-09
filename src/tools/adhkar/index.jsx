import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function AdhkarIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19.500 14.500a7.500 7.500 0 1 1-10-10 6 6 0 0 0 10 10z" />
    </Svg>
  )
}

export default {
  id: 'adhkar',
  name: 'الأذكار',
  description: 'أذكار يومك قريبة منك.',
  color: 'var(--tool-adhkar)',
  Icon: AdhkarIcon,
  Page: ComingSoon,
  order: 10,
}
