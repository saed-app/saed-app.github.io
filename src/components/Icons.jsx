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
import ShopFill from '@mingcute/react/core-filled/shop'
import SettingsFill from '@mingcute/react/core-filled/settings-3'
import ChartBarFill from '@mingcute/react/core-filled/chart-bar'
import SettingsHorizontalFill from '@mingcute/react/core-filled/settings-horizontal'
import UserFill from '@mingcute/react/core-filled/user-3'
import VolumeFill from '@mingcute/react/core-filled/volume'
import MapFill from '@mingcute/react/core-filled/map'
import DownloadFill from '@mingcute/react/core-filled/download-2'
import QuestionFill from '@mingcute/react/core-filled/question'
import InformationFill from '@mingcute/react/core-filled/information'
import MailFill from '@mingcute/react/core-filled/mail'
import SidebarRightFill from '@mingcute/react/core-filled/sidebar-right'

// كل أيقونات التطبيق من مكتبة MingCute. لكل أيقونة حالتان: Line عادةً، وFill عند الضغط أو عندما يكون المستخدم داخل ما تمثله.
// ملفاتها داخل التطبيق نفسه، فتعمل بدون إنترنت.
function line(Icon) {
  return function UiIcon({ size = 24, ...props }) {
    return <Icon size={size} aria-hidden="true" {...props} />
  }
}

// المكوّن المشترك للحالتين. الطبقتان فوق بعضهما فلا يتغير الحجم ولا المكان عند التبديل.
// active تعني أن المستخدم داخل ما تمثله الأيقونة، والضغط يتولاه CSS.
// scale: معامل بسيط لتوازن الأيقونة بصرياً مع بقية الأدوات
export function dual(LineIcon, FillIcon, scale = 1) {
  return function StateIcon({ size = 24, active = false }) {
    const pixels = Math.round(size * scale)
    return (
      <span className="state-icon" data-active={active} style={{ width: pixels, height: pixels }} aria-hidden="true">
        <LineIcon size={pixels} className="state-icon-line" />
        <FillIcon size={pixels} className="state-icon-fill" />
      </span>
    )
  }
}

export const SidebarIcon = dual(SidebarRightLine, SidebarRightFill)
export const PlusIcon = line(AddLine)
export const PersonIcon = dual(UserLine, UserFill)
export const StoreIcon = dual(ShopLine, ShopFill)
export const BackIcon = line(RightLine)
export const GearIcon = dual(SettingsLine, SettingsFill)
export const SoundIcon = dual(VolumeLine, VolumeFill)
export const GuideIcon = dual(MapLine, MapFill)
export const ChartIcon = dual(ChartBarLine, ChartBarFill)
export const ChevronUpIcon = line(UpLine)
export const DownloadIcon = dual(DownloadLine, DownloadFill)
export const CheckIcon = line(CheckLine)
export const ChevronDownIcon = line(DownLine)
export const HandIcon = line(FingerTapLine)
export const ChevronStartIcon = line(LeftLine)
export const SlidersIcon = dual(SettingsHorizontalLine, SettingsHorizontalFill)
export const HelpIcon = dual(QuestionLine, QuestionFill)
export const InfoIcon = dual(InformationLine, InformationFill)
export const MailIcon = dual(MailLine, MailFill)
export const BackspaceIcon = line(DeleteBackLine)
export const MoonIcon = line(MoonLine)
