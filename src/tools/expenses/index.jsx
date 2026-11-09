import Wallet from '@mingcute/react/core-filled/wallet'
import ComingSoon from '../../components/ComingSoon.jsx'
import { filled } from '../../components/Icons.jsx'

export default {
  id: 'expenses',
  name: 'المصروفات',
  description: 'اعرف أين يذهب مالك.',
  details: 'سجّل ما تصرفه أولاً بأول، وشاهد أين يذهب مالك كل شهر.',
  family: 'clay',
  Icon: filled(Wallet, 1.1),
  Page: ComingSoon,
  order: 4,
}
