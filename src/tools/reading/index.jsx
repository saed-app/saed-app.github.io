import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function ReadingIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 7c-2-1.500-4.500-2-7.500-2v13c3 0 5.500.5 7.500 2 2-1.500 4.500-2 7.500-2V5c-3 0-5.500.5-7.500 2z" />
      <path d="M12 7v13" />
    </Svg>
  )
}

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'كتبك وما وصلت إليه فيها.',
  color: 'var(--tool-reading)',
  Icon: ReadingIcon,
  Page: ComingSoon,
  order: 9,
}
