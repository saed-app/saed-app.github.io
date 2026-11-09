const ICON_SIZES = { small: 26, medium: 36, large: 52 }

// أيقونة الأداة داخل مربع مدور بلونها، وتُستخدم في المتجر والشريط العائم والعناوين
export default function ToolTile({ tool, size = 'medium' }) {
  return (
    <span className={`tool-tile is-${size}`} data-family={tool.family}>
      <tool.Icon size={ICON_SIZES[size]} />
    </span>
  )
}
