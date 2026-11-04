import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5s6.5 6.8 6.5 11a6.5 6.5 0 0 1-13 0c0-4.2 6.5-11 6.5-11z" />
    </Svg>
  )
}

export default {
  id: 'water',
  name: 'شرب الماء',
  description: 'تابع ما تشربه من الماء كل يوم.',
  color: '#2C8FA8',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 5,
}
