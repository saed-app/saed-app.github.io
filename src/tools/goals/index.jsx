import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12h.01" />
    </Svg>
  )
}

export default {
  id: 'goals',
  name: 'الأهداف',
  description: 'حدد أهدافك وتابع تقدمك نحوها.',
  color: '#9B3D5C',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 6,
}
