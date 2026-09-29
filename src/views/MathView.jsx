import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import site from '../data/site'

const grades = [
  { g: 'چهارم', icon: '🌱' },
  { g: 'پنجم', icon: '🌿' },
  { g: 'ششم', icon: '🌳' },
  { g: 'هفتم', icon: '🔥' },
  { g: 'هشتم', icon: '⚡' },
  { g: 'نهم', icon: '💎' },
]

export default function MathView({ goBack }) {
  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">پکیج‌های آموزش ریاضی</h2>

      <motion.div
        className="price-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="price-cta-badge">📚 ویدیوهای آموزشی پایه‌به‌پایه</span>
        <div className="price-cta-amount">
          ۵۹۰,۰۰۰ <span>تومان / هر پایه</span>
        </div>
        <div className="price-cta-installment">همراه با آزمون و پاسخ تشریحی</div>
        <p className="price-cta-text">
          آموزش گام‌به‌گام مطالب کتاب درسی با بیانی ساده و تمرین‌های هدفمند — تدریس {site.instructor}
        </p>
        <ContactButton label="مشاوره خرید" />
      </motion.div>

      <h3 className="page-title" style={{ fontSize: '1.05rem' }}>انتخاب پایه</h3>

      <div className="grade-grid">
        {grades.map((g, i) => (
          <motion.div
            key={g.g}
            className="grade-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="grade-icon">{g.icon}</span>
            پایه {g.g}
            <span className="grade-soon">بزودی</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}