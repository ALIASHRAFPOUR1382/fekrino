import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import ReviewCarousel from '../components/ReviewCarousel'
import AnimatedCounter from '../components/AnimatedCounter'
import ContactButton from '../components/ContactButton'
import reviews from '../data/reviews'
import site from '../data/site'

const categories = [
  { key: 'all', label: 'همه', icon: '⭐' },
  { key: 'tizhoushan', label: 'تیزهوشان', icon: '🚀' },
  { key: 'math', label: 'ریاضی', icon: '➗' },
  { key: 'content', label: 'پکیج و محتوا', icon: '📚' },
  { key: 'support', label: 'مشاوره و پشتیبانی', icon: '💬' },
]

export default function ReviewsView({ goBack, goTo }) {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = useMemo(
    () => reviews.filter((r) => filter === 'all' || r.cat === filter),
    [filter]
  )

  const visible = showAll ? filtered : filtered.slice(0, 12)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">نظرات والدین و دانش‌آموزان</h2>
      <p className="reviews-intro">
        مجموعه‌ی {reviews.length} پیام واقعی از خانواده‌هایی که با مؤسسه فکرینو و استاد
        {' '}{site.instructor} همراه بوده‌اند.
      </p>

      {/* آمار */}
      <div className="reviews-stats">
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="num">+<AnimatedCounter to={500} /></span>
          <span className="lbl">دانش‌آموز</span>
        </motion.div>
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="num"><AnimatedCounter to={96} suffix="٪" /></span>
          <span className="lbl">رضایت کلی</span>
        </motion.div>
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="num">+<AnimatedCounter to={90} suffix="٪" /></span>
          <span className="lbl">رضایت پکیج‌ها</span>
        </motion.div>
      </div>

      {/* کاروسل بهترین‌ها */}
      <h3 className="section-mini-title">✨ نظرات برگزیده</h3>
      <ReviewCarousel />

      {/* فیلتر دسته‌بندی */}
      <h3 className="section-mini-title">📋 همه نظرات</h3>
      <div className="review-filters">
        {categories.map((c) => (
          <button
            key={c.key}
            className={`review-filter-chip ${filter === c.key ? 'active' : ''}`}
            onClick={() => { setFilter(c.key); setShowAll(false) }}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* لیست نظرات */}
      <div className="reviews-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((r, i) => (
            <motion.div
              key={`${filter}-${i}-${r.text.slice(0, 20)}`}
              className="review-card-v2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              whileHover={{ y: -4 }}
              layout
            >
              <div className="review-top">
                <div className="review-avatar">{r.initial}</div>
                <div className="review-who">
                  <strong>{r.who}</strong>
                  <span className="review-grade">{r.grade}</span>
                </div>
              </div>
              <div className="review-stars">★★★★★</div>
              <div className="review-text">{r.text}</div>
              <span className="review-tag">{r.tag}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!showAll && filtered.length > 12 && (
        <motion.button
          className="show-more-btn"
          onClick={() => setShowAll(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          نمایش {filtered.length - 12} نظر دیگر ↓
        </motion.button>
      )}

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>شما هم می‌خواید این مسیر رو تجربه کنید؟</h3>
        <p>برای مشاوره و ثبت‌نام، همین حالا با ما تماس بگیرید</p>
        <ContactButton label="تماس و مشاوره" />
      </motion.div>
    </div>
  )
}