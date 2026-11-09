import {
  Backspace,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  ChartBar,
  Check,
  DownloadSimple,
  Envelope,
  Gear,
  HandTap,
  Info,
  MapTrifold,
  Moon,
  Plus,
  Question,
  SidebarSimple,
  SlidersHorizontal,
  SpeakerHigh,
  Storefront,
  User,
} from '@phosphor-icons/react'

// كل أيقونات التطبيق من مكتبة Phosphor: regular للواجهة، وduotone للأدوات.
// ملفاتها داخل التطبيق نفسه، فتعمل بدون إنترنت.
function regular(Icon) {
  return function UiIcon({ size = 24, ...props }) {
    return <Icon size={size} weight="regular" aria-hidden="true" {...props} />
  }
}

export function duotone(Icon) {
  return function ToolIcon({ size = 28, ...props }) {
    return <Icon size={size} weight="duotone" aria-hidden="true" {...props} />
  }
}

export const SidebarIcon = regular(SidebarSimple)
export const PlusIcon = regular(Plus)
export const PersonIcon = regular(User)
export const StoreIcon = regular(Storefront)
export const BackIcon = regular(CaretRight)
export const GearIcon = regular(Gear)
export const SoundIcon = regular(SpeakerHigh)
export const GuideIcon = regular(MapTrifold)
export const ChartIcon = regular(ChartBar)
export const ChevronUpIcon = regular(CaretUp)
export const DownloadIcon = regular(DownloadSimple)
export const CheckIcon = regular(Check)
export const ChevronDownIcon = regular(CaretDown)
export const HandIcon = regular(HandTap)
export const ChevronStartIcon = regular(CaretLeft)
export const SlidersIcon = regular(SlidersHorizontal)
export const HelpIcon = regular(Question)
export const InfoIcon = regular(Info)
export const MailIcon = regular(Envelope)
export const BackspaceIcon = regular(Backspace)
export const MoonIcon = regular(Moon)
