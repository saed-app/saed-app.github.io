import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function WaterLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.500s6.500 6.800 6.500 11a6.500 6.500 0 0 1-13 0c0-4.200 6.500-11 6.500-11z" />
    </Svg>
  )
}

function WaterFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M12 3.500s6.500 6.800 6.500 11a6.500 6.500 0 0 1-13 0c0-4.200 6.500-11 6.500-11z" />
    </Svg>
  )
}

export default {
  id: 'water',
  name: 'الماء',
  description: 'كم كوباً شربت اليوم؟',
  details: 'سجّل كل كوب تشربه، وتابع ما شربته خلال يومك.',
  family: 'blue',
  Icon: dual(WaterLine, WaterFill, 1.03),
  Page: ComingSoon,
  order: 5,
}
