export function Svg({ children, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function PersonIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8.5" r="3.75" />
      <path d="M4.75 20c.9-3.7 3.8-5.5 7.25-5.5s6.35 1.8 7.25 5.5" />
    </Svg>
  )
}

export function StoreIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5.2 8.5h13.6l1 10.1a2 2 0 0 1-2 2.2H6.2a2 2 0 0 1-2-2.2z" />
      <path d="M8.5 11V7a3.5 3.5 0 0 1 7 0v4" />
    </Svg>
  )
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </Svg>
  )
}

export function BackIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 5.5L16 12l-6.500 6.500" />
    </Svg>
  )
}

// الأيقونات التالية مأخوذة من مكتبة Lucide (رخصة ISC)
export function GearIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12.220 2h-.440a2 2 0 0 0-2 2v.180a2 2 0 0 1-1 1.730l-.430.250a2 2 0 0 1-2 0l-.150-.080a2 2 0 0 0-2.730.730l-.220.380a2 2 0 0 0 .730 2.730l.150.100a2 2 0 0 1 1 1.720v.510a2 2 0 0 1-1 1.740l-.150.090a2 2 0 0 0-.730 2.730l.220.380a2 2 0 0 0 2.730.730l.150-.080a2 2 0 0 1 2 0l.430.250a2 2 0 0 1 1 1.730V20a2 2 0 0 0 2 2h.440a2 2 0 0 0 2-2v-.180a2 2 0 0 1 1-1.730l.430-.250a2 2 0 0 1 2 0l.150.080a2 2 0 0 0 2.730-.730l.220-.390a2 2 0 0 0-.730-2.730l-.150-.080a2 2 0 0 1-1-1.740v-.500a2 2 0 0 1 1-1.740l.150-.090a2 2 0 0 0 .730-2.730l-.220-.380a2 2 0 0 0-2.730-.730l-.150.080a2 2 0 0 1-2 0l-.430-.250a2 2 0 0 1-1-1.730V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  )
}

export function SoundIcon(props) {
  return (
    <Svg {...props}>
      <path d="M11 5L6 9H3v6h3l5 4V5zM15.500 8.500a5 5 0 0 1 0 7M18.500 5.500a9 9 0 0 1 0 13" />
    </Svg>
  )
}

export function GuideIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 6.500C10.500 5 8 4.500 4 4.500v14c4 0 6.500.500 8 2 1.500-1.500 4-2 8-2v-14c-4 0-6.500.500-8 2zM12 6.500v14" />
    </Svg>
  )
}

export function HourglassIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6.500 3.500h11M6.500 20.500h11M7.500 3.500c0 4.500 4.500 6 4.500 8.500s-4.500 4-4.500 8.500M16.500 3.500c0 4.500-4.500 6-4.500 8.500s4.500 4 4.500 8.500" />
    </Svg>
  )
}

export function DownloadIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v11M7.500 10.500L12 15l4.500-4.500M5 19.500h14" />
    </Svg>
  )
}

export function CheckIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5.500 12.500l4 4 9-9.500" />
    </Svg>
  )
}

export function ChevronSideIcon({ direction = 'left', ...props }) {
  return (
    <Svg {...props}>
      <path d={direction === 'left' ? 'M14.500 5.500L8 12l6.500 6.500' : 'M9.500 5.500L16 12l-6.500 6.500'} />
    </Svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 9.500l6 6 6-6" />
    </Svg>
  )
}

export function HandIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22 14a8 8 0 0 1-8 8M18 11v-1a2 2 0 0 0-4 0M14 10V9a2 2 0 0 0-4 0v1M10 9.500V4a2 2 0 0 0-4 0v10M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.800 0-4.500-.860-5.990-2.340l-3.600-3.600a2 2 0 0 1 2.830-2.820L7 15"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1.600"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronStartIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14.5 5.5L8 12l6.5 6.5" />
    </Svg>
  )
}

export function SlidersIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4" />
    </Svg>
  )
}

export function HelpIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.5a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.200 1-1.200 1.800M12 16.800h.01" />
    </Svg>
  )
}

export function DataIcon(props) {
  return (
    <Svg {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.500 6v12c0 1.700 3.400 3 7.500 3s7.500-1.300 7.500-3V6M4.500 12c0 1.700 3.400 3 7.500 3s7.500-1.300 7.500-3" />
    </Svg>
  )
}

export function InfoIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11.500v5M12 7.800h.01" />
    </Svg>
  )
}

export function MailIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5.500 5.500h13A2.500 2.500 0 0 1 21 8v8a2.500 2.500 0 0 1-2.500 2.500h-13A2.500 2.500 0 0 1 3 16V8a2.500 2.500 0 0 1 2.500-2.500z" />
      <path d="M3.500 7.500L12 13l8.500-5.500" />
    </Svg>
  )
}

export function BackspaceIcon(props) {
  return (
    <Svg {...props}>
      <path d="M9 5.500h9.500A2.500 2.500 0 0 1 21 8v8a2.500 2.500 0 0 1-2.500 2.500H9L3 12z" />
      <path d="M11.500 9.500l5 5M16.500 9.500l-5 5" />
    </Svg>
  )
}

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19.5 14.2A8 8 0 0 1 9.8 4.500a8 8 0 1 0 9.700 9.700z" />
    </Svg>
  )
}
