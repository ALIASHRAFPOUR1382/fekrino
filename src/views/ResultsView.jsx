import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import StatsBanner from '../components/StatsBanner'
import ContactButton from '../components/ContactButton'
import results from '../data/results'

export default function ResultsView({ goBack }) {
  const [year, setYear] = useState('1404')
  const [query, setQuery] = useState('')
  const [school, setSchool] = useState('all')

  const list = results[year] || []

  const schools = ['all', ...new Set(list.map((r) => r.school).filter(Boolean))]

  const filtered = list.filter((r) => {
    const matchQ = !query || r.name?.includes(query) || r.school?.includes(query)
    const matchS = school === 'all' || r.school === school
    return matchQ && matchS
  })

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">نتایج و قبولی‌ها</h2>

      <StatsBanner />

      <div className="results-stats">
        <div className="stat-box">
          <span className="num">{results['1404'].length + results['1405'].length}</span>
          <span className="lbl">قبولی ثبت‌شده</span>
        </div>
        <div className="stat-box">
          <span className="num">+۱۰</span>
          <span className="lbl">مدرسه برتر</span>
        </div>
        <div className="stat-box">
          <span className="num">۱۰۰٪</span>
          <span className="lbl">تطابق ششم</span>
        </div>
        <div className="stat-box">
          <span className="num">۹۴٪</span>
          <span className="lbl">تطابق نهم</span>
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

      <div className="result-search">
        <input
          type="text"
          placeholder="جستجوی نام یا مدرسه..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={school} onChange={(e) => setSchool(e.target.value)}>
          {schools.map((s) => (
            <option key={s} value={s}>
              {s === 'all' ? 'همه مدارس' : s}
            </option>
          ))}
        </select>
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
          {filtered.length === 0 && (
            <div className="result-empty">
              <span className="big-icon">🎯</span>
              {list.length === 0 ? 'به‌زودی نتایج این سال منتشر می‌شود.' : 'نتیجه‌ای یافت نشد.'}
            </div>
          )}
          {filtered.map((r, i) => (
            <motion.div
              key={i}
              className={`photo-result-card ${r.img ? '' : 'no-photo'}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              whileHover={{ scale: 1.02, y: -3 }}
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

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>شما هم می‌توانید جزو این افتخارات باشید</h3>
        <p>برای مشاوره و ثبت‌نام، همین حالا با ما تماس بگیرید</p>
        <ContactButton label="تماس و مشاوره" />
      </motion.div>
    </div>
  )
}