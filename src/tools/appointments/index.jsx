import { CalendarDots } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'appointments',
  name: 'المواعيد',
  description: 'مواعيدك أمامك فلا تفوتك.',
  family: 'indigo',
  Icon: duotone(CalendarDots),
  Page: ComingSoon,
  order: 8,
}
