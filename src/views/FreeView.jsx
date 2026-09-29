import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import lessons from '../data/lessons'
import site from '../data/site'

export default function FreeView({ goBack, onPlay }) {
  const [filter, setFilter] = useState('all')

  const groups = [...new Set(lessons.map((l) => l.group))]
  const filtered = lessons.filter((l) => filter === 'all' || l.group === filter)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">تدریس‌های رایگان</h2>
      <p className="lessons-intro">
        نمونه تدریس‌های {site.instructor} از مباحث هوش و استعداد تحلیلی؛ با لمس هر ویدیو مستقیم پخش می‌شود.
      </p>

      <div className="lesson-filters">
        <button
          className={`lesson-filter-chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          همه ({lessons.length})
        </button>
        {groups.map((g) => {
          const count = lessons.filter((l) => l.group === g).length
          return (
            <button
              key={g}
              className={`lesson-filter-chip ${filter === g ? 'active' : ''}`}
              onClick={() => setFilter(g)}
            >
              {g} ({count})
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="result-empty">
          <span className="big-icon">🎬</span>
          ویدیویی در این دسته یافت نشد.
        </div>
      ) : (
        filtered.map((l, i) => (
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
        ))
      )}
    </div>
  )
}