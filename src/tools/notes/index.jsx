import FilePenLine from '@mingcute/react/core-filled/file-pen-line'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'notes',
  name: 'الملاحظات',
  description: 'دوّن ما يخطر ببالك قبل أن يفوتك.',
  details: 'اكتب فكرتك في لحظتها، وصنّف ملاحظاتك لتجدها حين تحتاجها.',
  family: 'paper',
  Icon: filled(FilePenLine),
  Page: ComingSoon,
  order: 1,
}
