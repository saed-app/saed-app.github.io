import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg, dual } from '../../components/Icons.jsx'

function TasksLine(props) {
  return (
    <Svg {...props}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </Svg>
  )
}

function TasksFill(props) {
  return (
    <Svg {...props} filled>
      <rect x="2.500" y="2.500" width="19" height="19" rx="4" />
      <path className="tool-cut" d="M9 6h11M9 12h11M9 18h11M4.500 6h.01M4.500 12h.01M4.500 18h.01" />
    </Svg>
  )
}

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  details: 'اكتب ما عليك فعله، وعلّم ما أنجزته، فيبقى يومك واضحاً أمامك.',
  color: '#3F6FB5',
  family: 'blue',
  Icon: dual(TasksLine, TasksFill),
  Page: ComingSoon,
  order: 3,
}
