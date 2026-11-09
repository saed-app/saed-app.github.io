import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function AppointmentsIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4.500" y="5.500" width="15" height="14.500" rx="2.500" />
      <path d="M4.500 10.500h15M8.500 3.500v4M15.500 3.500v4" />
    </Svg>
  )
}

export default {
  id: 'appointments',
  name: 'المواعيد',
  description: 'مواعيدك أمامك فلا تفوتك.',
  color: 'var(--tool-appointments)',
  Icon: AppointmentsIcon,
  Page: ComingSoon,
  order: 8,
}
