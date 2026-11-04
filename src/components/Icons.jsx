function Svg({ children, size = 24 }) {
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

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M19.5 14.2A8 8 0 0 1 9.8 4.500a8 8 0 1 0 9.700 9.700z" />
    </Svg>
  )
}
