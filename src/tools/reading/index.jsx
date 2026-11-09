import { BookOpen } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'كتبك وما وصلت إليه فيها.',
  details: 'أضف الكتب التي تقرؤها، وسجّل الصفحة التي وصلت إليها.',
  family: 'paper',
  Icon: duotone(BookOpen),
  Page: ComingSoon,
  order: 9,
}
