import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.500.5-8 2zM12 6.5v14" />
    </Svg>
  )
}

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'تابع كتبك وصفحات قراءتك.',
  color: '#4F7A3A',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 9,
}
