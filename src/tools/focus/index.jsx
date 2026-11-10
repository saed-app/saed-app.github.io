import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function FocusLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 9v4.5l3 2M9.5 2.5h5M12 5a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
    </Svg>
  )
}

function FocusFill(props) {
  return (
    <Svg {...props} filled>
      <circle cx="12" cy="13" r="8" />
      <path fill="none" d="M9.500 2.500h5" />
      <path className="tool-cut" d="M12 9v4.500l3 2" />
    </Svg>
  )
}

export default {
  id: 'focus',
  name: 'التركيز',
  description: 'وقت بلا مقاطعات لما يهمك.',
  details: 'اختر مدة للعمل بلا مقاطعات، وخذ راحة قصيرة بعدها.',
  color: '#6B4FA0',
  family: 'indigo',
  Icon: dual(FocusLine, FocusFill),
  Page: ComingSoon,
  order: 7,
}
