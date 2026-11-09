import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function NotesIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 4H7.500A1.500 1.500 0 0 0 6 5.500v13A1.500 1.500 0 0 0 7.500 20h9a1.500 1.500 0 0 0 1.500-1.500V8z" />
      <path d="M9.500 12.500h5M9.500 16h3" />
    </Svg>
  )
}

export default {
  id: 'notes',
  name: 'الملاحظات',
  description: 'دوّن ما يخطر ببالك قبل أن يفوتك.',
  color: 'var(--tool-notes)',
  Icon: NotesIcon,
  Page: ComingSoon,
  order: 1,
}
