const ICON_SIZES = { small: 32, medium: 46, large: 64 }

// أيقونة الأداة داخل مربع مدور بلونها، وتُستخدم في المتجر والشريط العائم والعناوين
export default function ToolTile({ tool, size = 'medium' }) {
  return (
    <span className={`tool-tile is-${size}`} data-family={tool.family}>
      <tool.Icon size={ICON_SIZES[size]} />
    </span>
  )
}
