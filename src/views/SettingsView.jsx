import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import { getSettings, saveSettings, resetSettings } from '../lib/settings'

export default function SettingsView({ goBack }) {
  const [settings, setSettings] = useState(getSettings())

  const update = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const handleReset = () => {
    const def = resetSettings()
    setSettings(def)
  }

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">تنظیمات</h2>

      {/* تم */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="settings-title">🎨 حالت نمایش</h3>
        <div className="settings-options">
          {[
            { id: 'dark', label: 'تیره', icon: '🌙' },
            { id: 'light', label: 'روشن', icon: '☀️' },
            { id: 'auto', label: 'خودکار', icon: '🌗' },
          ].map((opt) => (
            <button
              key={opt.id}
              className={`settings-option ${settings.theme === opt.id ? 'active' : ''}`}
              onClick={() => update('theme', opt.id)}
            >
              <span className="settings-option-icon">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* فونت */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h3 className="settings-title">📝 اندازه فونت</h3>
        <div className="settings-options">
          {[
            { id: 'small', label: 'کوچک', size: '0.85rem' },
            { id: 'medium', label: 'متوسط', size: '1rem' },
            { id: 'large', label: 'بزرگ', size: '1.15rem' },
          ].map((opt) => (
            <button
              key={opt.id}
              className={`settings-option ${settings.fontSize === opt.id ? 'active' : ''}`}
              onClick={() => update('fontSize', opt.id)}
            >
              <span style={{ fontSize: opt.size }}>الف</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* حرکت */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="settings-title">✨ انیمیشن</h3>
        <div className="settings-row">
          <div>
            <strong>کاهش حرکت</strong>
            <small>برای دستگاه‌های کند</small>
          </div>
          <button
            className={`settings-toggle ${settings.reduceMotion ? 'on' : ''}`}
            onClick={() => update('reduceMotion', !settings.reduceMotion)}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </motion.div>

      {/* ریست */}
      <motion.div
        className="settings-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <button className="settings-reset" onClick={handleReset}>
          🔄 بازگشت به تنظیمات پیش‌فرض
        </button>
      </motion.div>

      <div className="settings-about">
        <p>مؤسسه فکرینو — نسخه ۲.۰.۰</p>
        <p>ساخته‌شده با ❤️</p>
      </div>
    </div>
  )
}