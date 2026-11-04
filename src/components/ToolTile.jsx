// أيقونة الأداة داخل مربع مدور بلونها، وتُستخدم في المتجر والشريط العائم
export default function ToolTile({ tool }) {
  return (
    <span className="tool-tile" style={{ background: tool.color }}>
      <tool.Icon size={28} />
    </span>
  )
}
