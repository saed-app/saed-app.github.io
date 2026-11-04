import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function HabitsIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M8.300 12.300l2.500 2.500 4.900-5.200" />
    </Svg>
  )
}

export default {
  id: 'habits',
  name: 'متابع العادات',
  description: 'أنشئ عاداتك، وتابع إنجازها، واطّلع على تقاريرها.',
  color: '#2F7D4F',
  Icon: HabitsIcon,
  Page: ComingSoon,
  order: 2,
}
