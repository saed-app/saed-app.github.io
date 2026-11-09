import BookOpenLine from '@mingcute/react/core-regular/book-open-text'
import BookOpenFill from '@mingcute/react/core-filled/book-open-text'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'كتبك وما وصلت إليه فيها.',
  details: 'أضف الكتب التي تقرؤها، وسجّل الصفحة التي وصلت إليها.',
  family: 'paper',
  Icon: dual(BookOpenLine, BookOpenFill, 1.03),
  Page: ComingSoon,
  order: 9,
}
