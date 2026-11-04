import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3M4 7.5V17a2.5 2.5 0 0 0 2.5 2.5H20V8H6.5A2.5 2.5 0 0 1 4 7.5zM16 13.7h.01" />
    </Svg>
  )
}

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'سجّل مصروفاتك وتابعها.',
  color: '#A8552F',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 4,
}
