import { useId } from 'react'

// شعار ساعد: حلقة ذهبية تكاد تكتمل، والنقطة في الفراغ هي ما تضيفه أنت.
// النقطة تقع على محيط الحلقة نفسه في منتصف الفراغ، والفراغ يتسع لها مع مسافة متساوية من الطرفين.
export const LOGO_RING = 'M34.19 14.13A18 18 0 1 0 49.87 29.81'
export const LOGO_DOT = { cx: 44.73, cy: 19.27, r: 5 }

export default function Logo({ size = 64, dot = 'var(--logo-dot)', title }) {
  const id = useId()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9C7213" />
          <stop offset="0.45" stopColor="#E8C75A" />
          <stop offset="1" stopColor="#B98D1B" />
        </linearGradient>
      </defs>
      <path
        d={LOGO_RING}
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle {...LOGO_DOT} fill={dot} />
    </svg>
  )
}
