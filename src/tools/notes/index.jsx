import { NotePencil } from '@phosphor-icons/react'
import ComingSoon from '../../components/ComingSoon.jsx'
import { duotone } from '../../components/Icons.jsx'

export default {
  id: 'notes',
  name: 'الملاحظات',
  description: 'دوّن ما يخطر ببالك قبل أن يفوتك.',
  details: 'اكتب فكرتك في لحظتها، وصنّف ملاحظاتك لتجدها حين تحتاجها.',
  family: 'paper',
  Icon: duotone(NotePencil),
  Page: ComingSoon,
  order: 1,
}
