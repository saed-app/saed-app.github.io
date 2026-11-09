// شعار ساعد: حلقة تكاد تكتمل، والنقطة في الفراغ هي ما تضيفه أنت.
// النقطة تقع على محيط الحلقة نفسه في منتصف الفراغ، والفراغ يتسع لها مع مسافة متساوية من الطرفين.
export const LOGO_RING = 'M34.19 14.13A18 18 0 1 0 49.87 29.81'
export const LOGO_DOT = { cx: 44.73, cy: 19.27, r: 5 }

export default function Logo({ size = 64, title }) {
  return (
    <svg
      shapeRendering="geometricPrecision"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      <path d={LOGO_RING} fill="none" stroke="var(--logo-ring)" strokeWidth="8" strokeLinecap="round" />
      <circle {...LOGO_DOT} fill="var(--logo-dot)" />
    </svg>
  )
}
