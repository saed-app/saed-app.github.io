import Calendar from '@mingcute/react/core-filled/calendar-2'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'appointments',
  name: 'المواعيد',
  description: 'مواعيدك أمامك فلا تفوتك.',
  details: 'احفظ مواعيدك بتواريخها وأوقاتها، فتراها كلها في مكان واحد.',
  family: 'indigo',
  Icon: filled(Calendar, 1.08),
  Page: ComingSoon,
  order: 8,
}
