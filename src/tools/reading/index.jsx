import BookOpen from '@mingcute/react/core-filled/book-open-text'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'كتبك وما وصلت إليه فيها.',
  details: 'أضف الكتب التي تقرؤها، وسجّل الصفحة التي وصلت إليها.',
  family: 'paper',
  Icon: filled(BookOpen, 1.03),
  Page: ComingSoon,
  order: 9,
}
