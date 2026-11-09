import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function RecipesIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 11.500h16a8 8 0 0 1-16 0z" />
      <path d="M9.500 7.500c0-1.500 1-1.500 1-3M14 7.500c0-1.500 1-1.500 1-3" />
    </Svg>
  )
}

export default {
  id: 'recipes',
  name: 'الوصفات',
  description: 'وصفاتك التي تحبها، محفوظة.',
  color: 'var(--tool-recipes)',
  Icon: RecipesIcon,
  Page: ComingSoon,
  order: 11,
}
