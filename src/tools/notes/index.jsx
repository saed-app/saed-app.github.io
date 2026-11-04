import { Svg } from '../../components/Icons.jsx'

function NotesIcon(props) {
  return (
    <Svg {...props}>
      <path d="M7 3.800h7.500L19 8.300V18a2.200 2.200 0 0 1-2.200 2.200H7A2.200 2.200 0 0 1 4.800 18V6A2.200 2.200 0 0 1 7 3.800z" />
      <path d="M14.200 4v4.500H19M8.500 12.500h7M8.500 16h4.500" />
    </Svg>
  )
}

// صفحة فارغة مؤقتاً: محتوى الأداة في المرحلة 3
function NotesPage() {
  return null
}

export default {
  id: 'notes',
  name: 'الملاحظات',
  description: 'اكتب ملاحظاتك بسرعة وصنّفها وتابع إحصائياتها.',
  color: '#B5822A',
  Icon: NotesIcon,
  Page: NotesPage,
  order: 1,
}
