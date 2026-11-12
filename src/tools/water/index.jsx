import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function WaterLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5s6.5 6.8 6.5 11a6.5 6.5 0 0 1-13 0c0-4.2 6.5-11 6.5-11z" />
    </Svg>
  )
}

export default {
  id: 'water',
  name: 'الماء',
  description: 'كم كوباً شربت اليوم؟',
  details: 'سجّل كل كوب تشربه، وتابع ما شربته خلال يومك.',
  color: '#2C8FA8',
  family: 'blue',
  Icon: WaterLine,
  Page: ComingSoon,
  order: 5,
}
