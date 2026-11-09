import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function WaterIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.500s6 6.200 6 10.500a6 6 0 0 1-12 0c0-4.300 6-10.500 6-10.500z" />
    </Svg>
  )
}

export default {
  id: 'water',
  name: 'الماء',
  description: 'كم كوباً شربت اليوم؟',
  color: 'var(--tool-water)',
  Icon: WaterIcon,
  Page: ComingSoon,
  order: 5,
}
