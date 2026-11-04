import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ToolIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3.5 4.5h2.3l2 11h10l2-8H7M9 20h.01M17 20h.01" />
    </Svg>
  )
}

export default {
  id: 'shopping',
  name: 'قائمة التسوق',
  description: 'اكتب مشترياتك ولا تنسَ شيئاً.',
  color: '#7A6A2F',
  Icon: ToolIcon,
  Page: ComingSoon,
  order: 12,
}
