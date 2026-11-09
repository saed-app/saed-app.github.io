import CalendarLine from '@mingcute/react/core-regular/calendar-2'
import CalendarFill from '@mingcute/react/core-filled/calendar-2'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'appointments',
  name: 'المواعيد',
  description: 'مواعيدك أمامك فلا تفوتك.',
  details: 'احفظ مواعيدك بتواريخها وأوقاتها، فتراها كلها في مكان واحد.',
  family: 'indigo',
  Icon: dual(CalendarLine, CalendarFill, 1.08),
  Page: ComingSoon,
  order: 8,
}
