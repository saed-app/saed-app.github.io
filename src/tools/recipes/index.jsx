import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function RecipesLine(props) {
  return (
    <Svg {...props}>
      <path d="M6 3v6a2 2 0 0 0 4 0V3M8 3v18M17 3c-2 1-3 3.5-3 6.5 0 2 1 3.5 3 3.5v8z" />
    </Svg>
  )
}

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  details: 'احفظ وصفاتك بمقاديرها وخطواتها، وارجع إليها عند الطبخ.',
  color: '#B0473E',
  family: 'clay',
  Icon: RecipesLine,
  Page: ComingSoon,
  order: 11,
}
