const ICON_SIZES = { small: 22, medium: 28, large: 40 }

// أيقونة الأداة داخل مربع مدور بلونها، وتُستخدم في المتجر والشريط العائم والعناوين
export default function ToolTile({ tool, size = 'medium' }) {
  return (
    <span className={`tool-tile is-${size}`} style={{ background: tool.color }}>
      <tool.Icon size={ICON_SIZES[size]} />
    </span>
  )
}
