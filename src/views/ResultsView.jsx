import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import results from '../data/results'

export default function ResultsView({ goBack }) {
  const [year, setYear] = useState('1405')
  const list = results[year] || []

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">نتایج و قبولی‌ها</h2>

      <div className="results-stats">
        <div className="stat-box">
          <span className="num">{results['1404'].length + results['1405'].length}</span>
          <span className="lbl">قبولی ثبت‌شده</span>
        </div>
        <div className="stat-box">
          <span className="num">+۱۰</span>
          <span className="lbl">مدرسه برتر</span>
        </div>
      </div>

      <div className="year-tabs">
        <button
          className={`year-tab ${year === '1404' ? 'active' : ''}`}
          onClick={() => setYear('1404')}
        >
          قبولی‌های ۱۴۰۴
        </button>
        <button
          className={`year-tab ${year === '1405' ? 'active' : ''}`}
          onClick={() => setYear('1405')}
        >
          قبولی‌های ۱۴۰۵
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={year}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="result-list"
        >
          {list.length === 0 && (
            <div className="result-empty">
              <span className="big-icon">🎯</span>
              به‌زودی نتایج این سال منتشر می‌شود.
            </div>
          )}
          {list.map((r, i) => (
            <motion.div
              key={i}
              className={`photo-result-card ${r.img ? '' : 'no-photo'}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              whileHover={{ scale: 1.01 }}
            >
              {r.img ? (
                <img className="pr-img" src={r.img} alt={r.name} loading="lazy" />
              ) : (
                <div className="pr-avatar">{(r.name || '؟').charAt(0)}</div>
              )}
              <div className="pr-info">
                {r.name && <div className="pr-name">{r.name}</div>}
                <div className="pr-school">{r.school}</div>
              </div>
              <span className="pr-badge">✓ قبول</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}