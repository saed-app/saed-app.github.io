import SoupPotLine from '@mingcute/react/core-regular/soup-pot-2'
import SoupPotFill from '@mingcute/react/core-filled/soup-pot-2'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  details: 'احفظ وصفاتك بمقاديرها وخطواتها، وارجع إليها عند الطبخ.',
  family: 'clay',
  Icon: dual(SoupPotLine, SoupPotFill, 1.03),
  Page: ComingSoon,
  order: 11,
}
