import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function NotesLine(props) {
  return (
    <Svg {...props}>
      <path d="M7 3.800h7.500L19 8.300V18a2.200 2.200 0 0 1-2.200 2.200H7A2.200 2.200 0 0 1 4.800 18V6A2.200 2.200 0 0 1 7 3.800z" />
      <path d="M14.200 4v4.500H19M8.500 12.500h7M8.500 16h4.500" />
    </Svg>
  )
}

export default {
  id: 'notes',
  name: 'الملاحظات',
  description: 'دوّن ما يخطر ببالك قبل أن يفوتك.',
  details: 'اكتب فكرتك في لحظتها، وصنّف ملاحظاتك لتجدها حين تحتاجها.',
  color: '#B5822A',
  family: 'paper',
  Icon: NotesLine,
  Page: ComingSoon,
  order: 1,
}
