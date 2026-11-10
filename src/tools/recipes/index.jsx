import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function RecipesLine(props) {
  return (
    <Svg {...props}>
      <path d="M6 3v6a2 2 0 0 0 4 0V3M8 3v18M17 3c-2 1-3 3.500-3 6.500 0 2 1 3.500 3 3.500v8z" />
    </Svg>
  )
}

function RecipesFill(props) {
  return (
    <Svg {...props} filled>
      <path d="M6 3v6a2 2 0 0 0 4 0V3z" />
      <path fill="none" d="M8 3v18" />
      <path d="M17 3c-2 1-3 3.500-3 6.500 0 2 1 3.500 3 3.500v8z" />
    </Svg>
  )
}

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  details: 'احفظ وصفاتك بمقاديرها وخطواتها، وارجع إليها عند الطبخ.',
  family: 'clay',
  Icon: dual(RecipesLine, RecipesFill, 1.08),
  Page: ComingSoon,
  order: 11,
}
