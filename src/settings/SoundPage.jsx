import Toggle from '../components/Toggle.jsx'
import { useSettings } from '../core/settings.jsx'

export default function SoundPage() {
  const { sounds, notifications, updateSettings } = useSettings()

  return (
    <div className="settings-stack">
      <section>
        <div className="settings-group">
          <div className="settings-row">
            <span className="settings-row-label">الصوت</span>
            <Toggle label="الصوت" checked={sounds} onChange={(on) => updateSettings({ sounds: on })} />
          </div>
          <div className="settings-row">
            <span className="settings-row-label">الإشعارات</span>
            <Toggle
              label="الإشعارات"
              checked={notifications}
              onChange={(on) => updateSettings({ notifications: on })}
            />
          </div>
        </div>
        <p className="settings-hint">سيعملان حين يصبح ساعد تطبيقاً كاملاً.</p>
      </section>
    </div>
  )
}
