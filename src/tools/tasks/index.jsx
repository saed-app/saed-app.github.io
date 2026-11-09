import ComingSoon from '../../components/ComingSoon.jsx'
import { Svg } from '../../components/Icons.jsx'

function TasksIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4.500 7.500l1.500 1.500 2.500-3M4.500 15.500l1.500 1.500 2.500-3" />
      <path d="M12 8h7.500M12 16h7.500" />
    </Svg>
  )
}

export default {
  id: 'tasks',
  name: 'المهام',
  description: 'ما عليك اليوم، في مكان واحد.',
  color: 'var(--tool-tasks)',
  Icon: TasksIcon,
  Page: ComingSoon,
  order: 3,
}
