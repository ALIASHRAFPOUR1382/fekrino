import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import lessons from '../data/lessons'

export default function FreeView({ goBack, onPlay }) {
  const [filter, setFilter] = useState('all')
  const filtered = lessons.filter((l) => filter === 'all' || l.cat === filter)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">تدریس‌های رایگان</h2>
      <p className="lessons-intro">
        نمونه تدریس‌های مهندس علی اشرفپور از مباحث هوش و ریاضی؛ با لمس هر ویدیو مستقیم پخش می‌شود.
      </p>

      <div className="lesson-filters">
        {[
          { key: 'all', label: 'همه' },
          { key: 'hoosh', label: 'مباحث هوش' },
          { key: 'riazi', label: 'مباحث ریاضی' },
        ].map((c) => (
          <button
            key={c.key}
            className={`lesson-filter-chip ${filter === c.key ? 'active' : ''}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filter === 'all' && <div className="lesson-group-title">مباحث هوش</div>}
      {filtered
        .filter((l) => filter === 'all' ? l.cat === 'hoosh' : l.cat === filter)
        .map((l, i) => (
          <motion.div
            key={l.hash}
            className="lesson-card"
            onClick={() => onPlay(l)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.5) }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="lesson-icon">▶</div>
            <div className="lesson-info">
              <div className="lesson-cat">{l.group}</div>
              <div className="lesson-title">{l.title}</div>
            </div>
            <span className="lesson-play-btn">پخش ▶</span>
          </motion.div>
        ))}

      {filter === 'all' && <div className="lesson-group-title">مباحث ریاضی</div>}
      {filter === 'all' &&
        lessons
          .filter((l) => l.cat === 'riazi')
          .map((l, i) => (
            <motion.div
              key={l.hash}
              className="lesson-card"
              onClick={() => onPlay(l)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5) }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="lesson-icon">▶</div>
              <div className="lesson-info">
                <div className="lesson-cat">{l.group}</div>
                <div className="lesson-title">{l.title}</div>
              </div>
              <span className="lesson-play-btn">پخش ▶</span>
            </motion.div>
          ))}
    </div>
  )
}