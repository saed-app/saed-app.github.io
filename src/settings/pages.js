import {
  DownloadIcon,
  GuideIcon,
  HelpIcon,
  InfoIcon,
  PersonIcon,
  SlidersIcon,
  SoundIcon,
  StoreIcon,
} from '../components/Icons.jsx'
import AboutPage from './AboutPage.jsx'
import AppearancePage from './AppearancePage.jsx'
import InstallPage from './InstallPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import SoundPage from './SoundPage.jsx'
import SupportPage from './SupportPage.jsx'

// لإضافة تصنيف عام جديد لاحقاً: أنشئ صفحته في هذا المجلد وأضف سطراً هنا.
// العنصر الذي فيه action لا يفتح صفحة بل ينفذ أمراً، مثل فتح الدليل التعريفي.
export const SETTINGS_PAGES = [
  { id: 'profile', title: 'ملفي', Icon: PersonIcon, Page: ProfilePage },
  // على اللابتوب لا يوجد الشريط السفلي، فالمتجر يُفتح من عمود الإعدادات
  { id: 'store', title: 'المتجر', Icon: StoreIcon, action: 'store', laptopOnly: true },
  { id: 'appearance', title: 'المظهر والتفضيلات', Icon: SlidersIcon, Page: AppearancePage },
  { id: 'sound', title: 'الصوت والإشعارات', Icon: SoundIcon, Page: SoundPage },
  { id: 'support', title: 'الدعم', Icon: HelpIcon, Page: SupportPage },
  { id: 'guide', title: 'دليل تعريفي', Icon: GuideIcon, action: 'guide' },
  // يختفي بعد تثبيت التطبيق على الجهاز
  { id: 'install', title: 'تثبيت التطبيق', Icon: DownloadIcon, Page: InstallPage, hideWhenInstalled: true },
  { id: 'about', title: 'حول التطبيق', Icon: InfoIcon, Page: AboutPage },
]
