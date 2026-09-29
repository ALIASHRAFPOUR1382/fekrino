import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import articles from '../data/articles'

const categories = ['همه', 'مطالعه', 'تست‌زنی', 'روانشناسی', 'خانواده', 'انتخاب مسیر']

export default function ArticlesView({ goBack }) {
  const [cat, setCat] = useState('همه')
  const [openId, setOpenId] = useState(null)

  const filtered = cat === 'همه' ? articles : articles.filter((a) => a.category === cat)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">مقالات مشاوره‌ای</h2>

      <motion.div
        className="articles-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="quiz-hero-badge">📖 مرکز مشاوره فکرینو</span>
        <h3>راهنمای کامل موفقیت در تیزهوشان</h3>
        <p>
          مقالات تخصصی درباره روش مطالعه، تست‌زنی، کنترل استرس و همراهی والدین
        </p>
      </motion.div>

      <div className="article-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`review-filter-chip ${cat === c ? 'active' : ''}`}
            onClick={() => { setCat(c); setOpenId(null) }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="articles-list">
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            className={`article-card ${openId === a.id ? 'open' : ''}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div
              className="article-header"
              onClick={() => setOpenId(openId === a.id ? null : a.id)}
            >
              <span className="article-icon">{a.icon}</span>
              <div className="article-info">
                <h4>{a.title}</h4>
                <div className="article-meta">
                  <span className="article-cat">{a.category}</span>
                  <span className="article-time">⏱ {a.readTime} دقیقه</span>
                </div>
              </div>
              <span className={`article-chevron ${openId === a.id ? 'rotate' : ''}`}>▼</span>
            </div>

            <div className="article-excerpt">{a.excerpt}</div>

            <AnimatePresence>
              {openId === a.id && (
                <motion.div
                  className="article-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {a.content.split('\n').filter((p) => p.trim()).map((p, pi) => (
                    <p key={pi} className={p.startsWith('**') ? 'article-subtitle' : ''}>
                      {p.trim().startsWith('**')
                        ? p.replace(/\*\*/g, '')
                        : p}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>نیاز به مشاوره شخصی داری؟</h3>
        <p>برای دریافت مشاوره رایگان، با ما تماس بگیر</p>
        <ContactButton label="درخواست مشاوره" />
      </motion.div>
    </div>
  )
}