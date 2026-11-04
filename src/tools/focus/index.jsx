import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 9v4.5l3 2M9.5 2.5h5M12 5a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
    </Svg>
  )
}

export default {
  id: 'focus',
  name: 'التركيز',
  description: 'مؤقت يساعدك على التركيز في عملك.',
  color: '#6B4FA0',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 7,
}
