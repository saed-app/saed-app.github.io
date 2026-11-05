import {
  DataIcon,
  HelpIcon,
  InfoIcon,
  PersonIcon,
  SlidersIcon,
} from '../components/Icons.jsx'
import AboutPage from './AboutPage.jsx'
import AppearancePage from './AppearancePage.jsx'
import DataPage from './DataPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import SupportPage from './SupportPage.jsx'

// لإضافة تصنيف عام جديد لاحقاً: أنشئ صفحته في هذا المجلد وأضف سطراً هنا
export const SETTINGS_PAGES = [
  { id: 'profile', title: 'ملفي', Icon: PersonIcon, Page: ProfilePage },
  { id: 'appearance', title: 'المظهر والتفضيلات', Icon: SlidersIcon, Page: AppearancePage },
  { id: 'support', title: 'الدعم', Icon: HelpIcon, Page: SupportPage },
  { id: 'data', title: 'البيانات', Icon: DataIcon, Page: DataPage },
  { id: 'about', title: 'حول التطبيق', Icon: InfoIcon, Page: AboutPage },
]
