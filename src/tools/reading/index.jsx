import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function ReadingLine(props) {
  return (
    <Svg {...props}>
      <path d="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.500.5-8 2zM12 6.5v14" />
    </Svg>
  )
}

function ReadingFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M12 6.500C10.500 5 8 4.500 4 4.500v14c4 0 6.500.5 8 2 1.500-1.500 4-2 8-2v-14c-4 0-6.500.5-8 2z" />
      <path className="tool-cut" d="M12 6.500v14" />
    </Svg>
  )
}

export default {
  id: 'reading',
  name: 'القراءة',
  description: 'كتبك وما وصلت إليه فيها.',
  details: 'أضف الكتب التي تقرؤها، وسجّل الصفحة التي وصلت إليها.',
  color: '#4F7A3A',
  family: 'paper',
  Icon: dual(ReadingLine, ReadingFill),
  Page: ComingSoon,
  order: 9,
}
