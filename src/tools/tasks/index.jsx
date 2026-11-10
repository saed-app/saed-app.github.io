import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function TasksLine(props) {
  return (
    <Svg {...props}>
      <path d="M9 6h11M9 12h11M9 18h11M4.500 6h.01M4.500 12h.01M4.500 18h.01" />
    </Svg>
  )
}

function TasksFill(props) {
  return (
    <Svg {...props} filled>
      <path fill="none" strokeWidth="2.400" d="M9.500 6H20M9.500 12H20M9.500 18H20" />
      <circle cx="4.500" cy="6" r="1" />
      <circle cx="4.500" cy="12" r="1" />
      <circle cx="4.500" cy="18" r="1" />
    </Svg>
  )
}

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  details: 'اكتب ما عليك فعله، وعلّم ما أنجزته، فيبقى يومك واضحاً أمامك.',
  family: 'blue',
  Icon: dual(TasksLine, TasksFill, 1.13),
  Page: ComingSoon,
  order: 3,
}
