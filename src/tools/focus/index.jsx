import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function FocusIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="13.500" r="7" />
      <path d="M12 13.500V9.500M10 3.500h4" />
    </Svg>
  )
}

export default {
  id: 'focus',
  name: 'التركيز',
  description: 'وقت بلا مقاطعات لما يهمك.',
  color: 'var(--tool-focus)',
  Icon: FocusIcon,
  Page: ComingSoon,
  order: 7,
}
