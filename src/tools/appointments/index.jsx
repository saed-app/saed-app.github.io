import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function AppointmentsLine(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 5h11A2.5 2.5 0 0 1 20 7.5v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-10A2.5 2.5 0 0 1 6.5 5zM8 3v4M16 3v4M4 10h16" />
    </Svg>
  )
}

function AppointmentsFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M6.500 5h11A2.500 2.500 0 0 1 20 7.500v10a2.500 2.500 0 0 1-2.500 2.500h-11A2.500 2.500 0 0 1 4 17.500v-10A2.500 2.500 0 0 1 6.500 5z" />
      <path fill="none" d="M8 3v2M16 3v2" />
      <path className="tool-cut" d="M8 5v2M16 5v2M4 10h16" />
    </Svg>
  )
}

export default {
  id: 'appointments',
  name: 'المواعيد',
  description: 'مواعيدك أمامك فلا تفوتك.',
  details: 'احفظ مواعيدك بتواريخها وأوقاتها، فتراها كلها في مكان واحد.',
  color: '#C0623A',
  family: 'indigo',
  Icon: dual(AppointmentsLine, AppointmentsFill),
  Page: ComingSoon,
  order: 8,
}
