import DropLine from '@mingcute/react/core-regular/drop'
import DropFill from '@mingcute/react/core-filled/drop'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'water',
  name: 'الماء',
  description: 'كم كوباً شربت اليوم؟',
  details: 'سجّل كل كوب تشربه، وتابع ما شربته خلال يومك.',
  family: 'blue',
  Icon: dual(DropLine, DropFill, 1.08),
  Page: ComingSoon,
  order: 5,
}
