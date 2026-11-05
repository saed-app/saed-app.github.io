import { MoonIcon } from '../components/Icons.jsx'
import Segmented from '../components/Segmented.jsx'
import Toggle from '../components/Toggle.jsx'
import { useSettings } from '../core/settings.jsx'
import { useTheme } from '../core/theme.jsx'

const FONT_SIZES = [
  { value: 'small', label: 'صغير' },
  { value: 'medium', label: 'متوسط' },
  { value: 'large', label: 'كبير' },
  { value: 'xlarge', label: 'كبير جداً' },
]

const WEEK_STARTS = [
  { value: 'saturday', label: 'السبت' },
  { value: 'sunday', label: 'الأحد' },
  { value: 'monday', label: 'الإثنين' },
]

export default function AppearancePage() {
  const { theme, setTheme } = useTheme()
  const { fontSize, weekStart, haptics, sounds, updateSettings } = useSettings()

  return (
    <div className="settings-stack">
      <section>
        <h3 className="settings-title">المظهر</h3>
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
        </div>
      </section>

      <section>
        <h3 className="settings-title" id="font-size-title">
          حجم الخط
        </h3>
        <Segmented
          name="font-size"
          labelledBy="font-size-title"
          options={FONT_SIZES}
          value={fontSize}
          onChange={(value) => updateSettings({ fontSize: value })}
        />
      </section>

      <section>
        <h3 className="settings-title" id="week-start-title">
          بداية الأسبوع
        </h3>
        <Segmented
          name="week-start"
          labelledBy="week-start-title"
          options={WEEK_STARTS}
          value={weekStart}
          onChange={(value) => updateSettings({ weekStart: value })}
        />
        <p className="settings-hint">ستعتمد عليها الأدوات التي تعرض الأيام والتقارير.</p>
      </section>

      <section>
        <h3 className="settings-title">الاهتزاز والأصوات</h3>
        <div className="settings-group">
          <div className="settings-row">
            <span className="settings-row-label">الاهتزاز</span>
            <Toggle
              label="الاهتزاز"
              checked={haptics}
              onChange={(on) => updateSettings({ haptics: on })}
            />
          </div>
          <div className="settings-row">
            <span className="settings-row-label">الأصوات</span>
            <Toggle
              label="الأصوات"
              checked={sounds}
              onChange={(on) => updateSettings({ sounds: on })}
            />
          </div>
        </div>
        <p className="settings-hint">يعمل الاهتزاز حيث يدعمه الجهاز، وستستخدم الأدوات الأصوات عند بنائها.</p>
      </section>
    </div>
  )
}
