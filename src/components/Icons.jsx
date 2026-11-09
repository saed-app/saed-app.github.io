import AddLine from '@mingcute/react/core-regular/add'
import ChartBarLine from '@mingcute/react/core-regular/chart-bar'
import CheckLine from '@mingcute/react/core-regular/check'
import DeleteBackLine from '@mingcute/react/core-regular/delete-back'
import DownLine from '@mingcute/react/core-regular/down'
import DownloadLine from '@mingcute/react/core-regular/download-2'
import FingerTapLine from '@mingcute/react/core-regular/finger-tap'
import InformationLine from '@mingcute/react/core-regular/information'
import LeftLine from '@mingcute/react/core-regular/left'
import MailLine from '@mingcute/react/core-regular/mail'
import MapLine from '@mingcute/react/core-regular/map'
import MoonLine from '@mingcute/react/core-regular/moon'
import QuestionLine from '@mingcute/react/core-regular/question'
import RightLine from '@mingcute/react/core-regular/right'
import SettingsLine from '@mingcute/react/core-regular/settings-3'
import SettingsHorizontalLine from '@mingcute/react/core-regular/settings-horizontal'
import ShopLine from '@mingcute/react/core-regular/shop'
import SidebarRightLine from '@mingcute/react/core-regular/sidebar-right'
import UpLine from '@mingcute/react/core-regular/up'
import UserLine from '@mingcute/react/core-regular/user-3'
import VolumeLine from '@mingcute/react/core-regular/volume'

// كل أيقونات التطبيق من مكتبة MingCute: Line للواجهة، وFill للأدوات.
// ملفاتها داخل التطبيق نفسه، فتعمل بدون إنترنت.
function line(Icon) {
  return function UiIcon({ size = 24, ...props }) {
    return <Icon size={size} aria-hidden="true" {...props} />
  }
}

// scale: معامل بسيط لتوازن الأيقونة بصرياً مع بقية الأدوات
export function filled(Icon, scale = 1) {
  return function ToolIcon({ size = 46, ...props }) {
    return <Icon size={Math.round(size * scale)} aria-hidden="true" {...props} />
  }
}

export const SidebarIcon = line(SidebarRightLine)
export const PlusIcon = line(AddLine)
export const PersonIcon = line(UserLine)
export const StoreIcon = line(ShopLine)
export const BackIcon = line(RightLine)
export const GearIcon = line(SettingsLine)
export const SoundIcon = line(VolumeLine)
export const GuideIcon = line(MapLine)
export const ChartIcon = line(ChartBarLine)
export const ChevronUpIcon = line(UpLine)
export const DownloadIcon = line(DownloadLine)
export const CheckIcon = line(CheckLine)
export const ChevronDownIcon = line(DownLine)
export const HandIcon = line(FingerTapLine)
export const ChevronStartIcon = line(LeftLine)
export const SlidersIcon = line(SettingsHorizontalLine)
export const HelpIcon = line(QuestionLine)
export const InfoIcon = line(InformationLine)
export const MailIcon = line(MailLine)
export const BackspaceIcon = line(DeleteBackLine)
export const MoonIcon = line(MoonLine)
