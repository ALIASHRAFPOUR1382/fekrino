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
          به زودی <span>در دسترس</span>
        </div>
        <div className="price-cta-installment">ثبت‌نام پیش از موعد</div>
        <p className="price-cta-text">
          پکیج‌های آموزش ریاضی پایه‌های چهارم تا نهم با تدریس {site.instructor} در حال آماده‌سازی است.
          برای اطلاع از زمان انتشار، با ما در تماس باشید.
        </p>
        <ContactButton label="اطلاع از زمان انتشار" />
      </motion.div>

      <h3 className="page-title" style={{ fontSize: '1.05rem' }}>پایه‌های در دسترس</h3>
      <p className="lessons-intro">
        پکیج‌های ریاضی هر پایه شامل ویدیوهای آموزشی، آزمون‌های مبحثی و پاسخ تشریحی خواهد بود.
      </p>

      <div className="grade-grid">
        {grades.map((g, i) => (
          <motion.div
            key={g.g}
            className="grade-card coming-soon"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="grade-icon">{g.icon}</span>
            پایه {g.g}
            <span className="grade-soon">🔒 به زودی</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>اطلاع از زمان انتشار</h3>
        <p>برای دریافت خبر انتشار پکیج‌های ریاضی با ما تماس بگیرید</p>
        <ContactButton label="تماس با ما" />
      </motion.div>
    </div>
  )
}