import { ChevronDownIcon, MoonIcon } from '../components/Icons.jsx'
import Toggle from '../components/Toggle.jsx'
import { useSettings } from '../core/settings.jsx'
import { useTheme } from '../core/theme.jsx'

const FONT_SIZES = [
  { value: 'small', label: 'صغير' },
  { value: 'medium', label: 'متوسط' },
  { value: 'large', label: 'كبير' },
]

const WEEK_DAYS = [
  { value: 'saturday', label: 'السبت' },
  { value: 'sunday', label: 'الأحد' },
  { value: 'monday', label: 'الإثنين' },
  { value: 'tuesday', label: 'الثلاثاء' },
  { value: 'wednesday', label: 'الأربعاء' },
  { value: 'thursday', label: 'الخميس' },
  { value: 'friday', label: 'الجمعة' },
]

// سطر فيه الاسم والقيمة الحالية مع سهم، والضغط عليه يفتح قائمة الجهاز الأصلية
function SelectRow({ label, value, options, onChange }) {
  const current = options.find((option) => option.value === value)
  return (
    <label className="settings-row select-row pressable">
      <span className="settings-row-label">{label}</span>
      <span className="select-value" aria-hidden="true">
        {current?.label}
        <ChevronDownIcon size={18} />
      </span>
      <select value={value} aria-label={label} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()
  const { fontSize, weekStart, updateSettings } = useSettings()

  return (
    <div className="settings-stack">
      <div className="settings-group">
        <div className="settings-row">
          <span className="settings-row-icon">
            <MoonIcon size={20} />
          </span>
          <span className="settings-row-label">الوضع الليلي</span>
          <Toggle
            label="الوضع الليلي"
            checked={theme === 'dark'}
            onChange={(on) => setTheme(on ? 'dark' : 'light')}
          />
        </div>
        <SelectRow
          label="حجم الخط"
          value={fontSize}
          options={FONT_SIZES}
          onChange={(value) => updateSettings({ fontSize: value })}
        />
        <SelectRow
          label="بداية الأسبوع"
          value={weekStart}
          options={WEEK_DAYS}
          onChange={(value) => updateSettings({ weekStart: value })}
        />
      </div>
    </div>
  )
}
