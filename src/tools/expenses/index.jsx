import WalletLine from '@mingcute/react/core-regular/wallet'
import WalletFill from '@mingcute/react/core-filled/wallet'
import ComingSoon from '../../components/ComingSoon.jsx'
import { dual } from '../../components/Icons.jsx'

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'اعرف أين يذهب مالك.',
  details: 'سجّل ما تصرفه أولاً بأول، وشاهد أين يذهب مالك كل شهر.',
  family: 'clay',
  Icon: dual(WalletLine, WalletFill, 1.1),
  Page: ComingSoon,
  order: 4,
}
