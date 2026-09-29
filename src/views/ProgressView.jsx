import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import achievements from '../data/achievements'
import { getStats, getHistory, resetStats } from '../lib/storage'

export default function ProgressView({ goBack }) {
  const [stats, setStats] = useState(getStats())
  const [history, setHistory] = useState(getHistory())
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    setStats(getStats())
    setHistory(getHistory())
  }, [])

  const unlocked = useMemo(
    () => achievements.filter((a) => a.condition(stats)),
    [stats]
  )

  const unlockedIds = new Set(unlocked.map((a) => a.id))

  const handleReset = () => {
    resetStats()
    setStats(getStats())
    setHistory([])
    setConfirmReset(false)
  }

  const progressPercent = Math.round((unlocked.length / achievements.length) * 100)

  if (stats.totalCompleted === 0) {
    return (
      <div>
        <BackButton onClick={goBack} />
        <h2 className="page-title">پیشرفت من</h2>

        <motion.div
          className="progress-empty"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="progress-empty-icon">🎯</div>
          <h3>هنوز آزمونی ندادی!</h3>
          <p>
            اولین آزمونت رو بده تا پیشرفتت اینجا نمایش داده بشه و مدال بگیری.
          </p>
        </motion.div>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>آماده شروع هستی؟</h3>
          <p>برو به بخش آزمون و تمرین، اولین آزمونت رو بده</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">پیشرفت من</h2>

      {/* کارت اصلی */}
      <motion.div
        className="progress-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="progress-hero-circle">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" className="progress-bg" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              className="progress-fg"
              strokeDasharray={327}
              initial={{ strokeDashoffset: 327 }}
              animate={{
                strokeDashoffset: 327 - (327 * stats.avgPercent) / 100,
              }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          </svg>
          <div className="progress-center">
            <strong>{stats.avgPercent}٪</strong>
            <span>میانگین</span>
          </div>
        </div>

        <div className="progress-hero-info">
          <h3>عالی پیش می‌ری! 🚀</h3>
          <p>
            تو {stats.totalCompleted} آزمون دادی و {unlocked.length} مدال از{' '}
            {achievements.length} مدال رو گرفتی
          </p>
        </div>
      </motion.div>

      {/* آمار سریع */}
      <div className="progress-stats">
        <div className="progress-stat">
          <span className="ps-num">{stats.totalCompleted}</span>
          <span className="ps-lbl">آزمون</span>
        </div>
        <div className="progress-stat">
          <span className="ps-num">{stats.perfectScores}</span>
          <span className="ps-lbl">نمره کامل</span>
        </div>
        <div className="progress-stat">
          <span className="ps-num">{stats.streak}</span>
          <span className="ps-lbl">روز پیوسته</span>
        </div>
        <div className="progress-stat">
          <span className="ps-num">
            {stats.fastestTime > 0 ? `${Math.floor(stats.fastestTime / 60)}:${String(stats.fastestTime % 60).padStart(2, '0')}` : '—'}
          </span>
          <span className="ps-lbl">سریع‌ترین</span>
        </div>
      </div>

      {/* نوار پیشرفت مدال‌ها */}
      <div className="progress-badge-bar">
        <div className="pbb-info">
          <span>مدال‌های تو</span>
          <strong>
            {unlocked.length} / {achievements.length}
          </strong>
        </div>
        <div className="pbb-track">
          <motion.div
            className="pbb-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* دستاوردها */}
      <h3 className="page-title" style={{ fontSize: '1.05rem', marginTop: 24 }}>
        🏆 مدال‌ها
      </h3>

      <div className="achievements-grid">
        {achievements.map((a, i) => {
          const isUnlocked = unlockedIds.has(a.id)
          return (
            <motion.div
              key={a.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3 }}
            >
              <div className="ach-icon-big">
                {isUnlocked ? a.icon : '🔒'}
              </div>
              <div className="ach-title">{a.title}</div>
              <div className="ach-desc">{a.desc}</div>
            </motion.div>
          )
        })}
      </div>

      {/* تاریخچه */}
      {history.length > 0 && (
        <>
          <h3 className="page-title" style={{ fontSize: '1.05rem', marginTop: 24 }}>
            📜 تاریخچه آزمون‌ها
          </h3>

          <div className="progress-history">
            {history.slice(0, 10).map((h, i) => (
              <motion.div
                key={i}
                className="history-row"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="history-info">
                  <strong>{h.quizTitle}</strong>
                  <span>
                    {new Date(h.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                <div className={`history-score ${h.percent >= 70 ? 'good' : h.percent >= 50 ? 'mid' : 'low'}`}>
                  {h.percent}٪
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* دکمه ریست */}
      <motion.div
        className="progress-reset"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {!confirmReset ? (
          <button
            className="progress-reset-btn"
            onClick={() => setConfirmReset(true)}
          >
            🗑 پاک کردن پیشرفت
          </button>
        ) : (
          <div className="progress-reset-confirm">
            <p>مطمئنی؟ همه مدال‌ها و تاریخچه پاک می‌شه!</p>
            <div className="progress-reset-actions">
              <button className="reset-yes" onClick={handleReset}>
                بله، پاک کن
              </button>
              <button className="reset-no" onClick={() => setConfirmReset(false)}>
                انصراف
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>می‌خوای پیشرفتت سریع‌تر باشه؟</h3>
        <p>با دوره جامع فکرینو، هوش و استعداد تحلیلی رو حرفه‌ای یاد بگیر</p>
        <ContactButton label="مشاوره رایگان" />
      </motion.div>
    </div>
  )
}