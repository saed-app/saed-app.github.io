const ICON_SIZES = { small: 22, medium: 28, large: 40 }

// لون الأداة نفسها إن حدّدته في ملفها، وإلا فلون عائلتها
export function tileStyle(tool) {
  if (!tool.color) return undefined
  return { background: tool.color, '--tile-bg': tool.color, color: 'var(--on-tool)' }
}

// أيقونة الأداة داخل مربع مدور بلونها، وتُستخدم في المتجر والشريط العائم والعناوين
export default function ToolTile({ tool, size = 'medium', active = false }) {
  return (
    <span className={`tool-tile is-${size}`} data-family={tool.family} style={tileStyle(tool)}>
      <tool.Icon size={ICON_SIZES[size]} active={active} />
    </span>
  )
}
