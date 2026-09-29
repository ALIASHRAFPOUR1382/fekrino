import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'

export default function ToolsView({ goBack }) {
  const [correct, setCorrect] = useState('')
  const [wrong, setWrong] = useState('')
  const [empty, setEmpty] = useState('')
  const [penalty, setPenalty] = useState(1) // ضریب نمره منفی

  const result = useMemo(() => {
    const c = parseInt(correct) || 0
    const w = parseInt(wrong) || 0
    const e = parseInt(empty) || 0
    const total = c + w + e

    if (total === 0) return null

    const rawScore = c - (w * penalty) / 3
    const percent = Math.max(0, (rawScore / total) * 100)
    const answered = c + w
    const correctPercent = answered > 0 ? (c / answered) * 100 : 0

    return {
      total,
      correct: c,
      wrong: w,
      empty: e,
      answered,
      percent: percent.toFixed(2),
      correctPercent: correctPercent.toFixed(1),
      rawScore: rawScore.toFixed(2),
    }
  }, [correct, wrong, empty, penalty])

  const reset = () => {
    setCorrect('')
    setWrong('')
    setEmpty('')
  }

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">درصدساز آزمون</h2>

      <motion.div
        className="tool-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="quiz-hero-badge">🧮 محاسبه‌گر نمره</span>
        <h3>درصد و تراز خودت رو حساب کن</h3>
        <p>
          تعداد پاسخ‌های صحیح، غلط و نزده رو وارد کن تا درصد دقیق و نمره خامت رو ببینی.
        </p>
      </motion.div>

      <div className="tool-card">
        <div className="tool-inputs">
          <div className="tool-input-group">
            <label>✅ پاسخ صحیح</label>
            <input
              type="number"
              min="0"
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
              placeholder="0"
              dir="ltr"
            />
          </div>

          <div className="tool-input-group">
            <label>❌ پاسخ غلط</label>
            <input
              type="number"
              min="0"
              value={wrong}
              onChange={(e) => setWrong(e.target.value)}
              placeholder="0"
              dir="ltr"
            />
          </div>

          <div className="tool-input-group">
            <label>⭕ نزده</label>
            <input
              type="number"
              min="0"
              value={empty}
              onChange={(e) => setEmpty(e.target.value)}
              placeholder="0"
              dir="ltr"
            />
          </div>
        </div>

        <div className="tool-penalty">
          <label>ضریب نمره منفی:</label>
          <div className="penalty-options">
            {[
              { v: 0, label: 'بدون منفی' },
              { v: 1, label: 'یک‌سوم (۱/۳)' },
              { v: 2, label: 'دوسوم (۲/۳)' },
            ].map((p) => (
              <button
                key={p.v}
                className={`penalty-chip ${penalty === p.v ? 'active' : ''}`}
                onClick={() => setPenalty(p.v)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <motion.div
            className="tool-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="tool-result-circle" style={{ '--p': `${result.percent}%` }}>
              <span className="tool-percent">{result.percent}٪</span>
              <span className="tool-percent-lbl">درصد</span>
            </div>

            <div className="tool-stats">
              <div className="tool-stat">
                <span className="tool-stat-num">{result.total}</span>
                <span className="tool-stat-lbl">کل سوالات</span>
              </div>
              <div className="tool-stat">
                <span className="tool-stat-num">{result.correctPercent}٪</span>
                <span className="tool-stat-lbl">دقت پاسخ‌ها</span>
              </div>
              <div className="tool-stat">
                <span className="tool-stat-num">{result.rawScore}</span>
                <span className="tool-stat-lbl">نمره خام</span>
              </div>
            </div>

            <div className="tool-breakdown">
              <div className="tb-row tb-correct">
                <span>✅ صحیح</span>
                <strong>{result.correct}</strong>
              </div>
              <div className="tb-row tb-wrong">
                <span>❌ غلط</span>
                <strong>{result.wrong}</strong>
              </div>
              <div className="tb-row tb-empty">
                <span>⭕ نزده</span>
                <strong>{result.empty}</strong>
              </div>
              <div className="tb-row tb-answered">
                <span>📝 پاسخ داده</span>
                <strong>{result.answered}</strong>
              </div>
            </div>

            <div className="tool-message">
              {parseFloat(result.percent) >= 85 && '🏆 فوق‌العاده! آماده‌ی قبولی هستی!'}
              {parseFloat(result.percent) >= 70 && parseFloat(result.percent) < 85 && '🎯 خیلی خوب! با کمی تمرین بهتر هم می‌شی.'}
              {parseFloat(result.percent) >= 50 && parseFloat(result.percent) < 70 && '👍 خوبه، ولی جای پیشرفت داری.'}
              {parseFloat(result.percent) < 50 && '💪 ناامید نشو! با تمرین منظم پیشرفت می‌کنی.'}
            </div>

            <button className="tool-reset" onClick={reset}>
              🔄 پاک کردن
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>می‌خوای درصدت رو بالاتر ببری؟</h3>
        <p>با دوره جامع فکرینو، هوش و استعداد تحلیلی رو حرفه‌ای یاد بگیر</p>
        <ContactButton label="مشاوره رایگان" />
      </motion.div>
    </div>
  )
}