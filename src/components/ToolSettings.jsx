import { useState } from 'react'
import { CheckIcon } from './Icons.jsx'
import Toggle from './Toggle.jsx'

// أدوات بناء إعدادات الأدوات. شكلها مختلف عمداً عن إعدادات التطبيق:
// لوحة ملونة بلون الأداة، وكل إعداد بطاقة مستقلة، والخيارات أزرار صغيرة بدل القوائم.
//
// مثال داخل ملف أداة:
//   Settings: () => (
//     <>
//       <ToolSetting label="إظهار التاريخ"><Toggle ... /></ToolSetting>
//       <ToolSetting label="الترتيب"><ToolChoice options={...} value={...} onChange={...} /></ToolSetting>
//     </>
//   )

export function ToolSettingsPanel({ tool, children }) {
  return (
    <section className="tool-settings">
      <header className="tool-settings-head">
        <h3>إعدادات {tool.name}</h3>
      </header>
      <div className="tool-settings-grid">{children}</div>
    </section>
  )
}

export function ToolSetting({ label, hint, wide, children }) {
  return (
    <div className={`tool-setting${wide ? ' is-wide' : ''}`}>
      <span className="tool-setting-label">{label}</span>
      {hint && <span className="tool-setting-hint">{hint}</span>}
      <div className="tool-setting-control">{children}</div>
    </div>
  )
}

export function ToolChoice({ label, options, value, onChange }) {
  return (
    <div className="tool-choice" role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={`tool-choice-option pressable${selected ? ' is-selected' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {selected && <CheckIcon size={14} />}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

// معاينة شكل الإعدادات لأداة ليس لها إعدادات بعد. تظهر أثناء التطوير فقط ولا تُحفظ
export function ToolSettingsPreview() {
  const [sort, setSort] = useState('newest')
  const [showDate, setShowDate] = useState(true)
  const [view, setView] = useState('list')

  return (
    <>
      <p className="tool-settings-note is-wide">معاينة للشكل فقط، تظهر لك أثناء التطوير ولا يراها المستخدمون.</p>
      <ToolSetting label="الترتيب" wide>
        <ToolChoice
          label="الترتيب"
          options={[
            { value: 'newest', label: 'الأحدث' },
            { value: 'oldest', label: 'الأقدم' },
            { value: 'name', label: 'الاسم' },
          ]}
          value={sort}
          onChange={setSort}
        />
      </ToolSetting>
      <ToolSetting label="إظهار التاريخ" hint="بجانب كل عنصر">
        <Toggle label="إظهار التاريخ" checked={showDate} onChange={setShowDate} />
      </ToolSetting>
      <ToolSetting label="طريقة العرض">
        <ToolChoice
          label="طريقة العرض"
          options={[
            { value: 'list', label: 'قائمة' },
            { value: 'grid', label: 'شبكة' },
          ]}
          value={view}
          onChange={setView}
        />
      </ToolSetting>
    </>
  )
}
