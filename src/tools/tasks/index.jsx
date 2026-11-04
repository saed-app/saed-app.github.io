import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </Svg>
  )
}

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'رتّب مهامك اليومية وأنجزها.',
  color: '#3F6FB5',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 3,
}
