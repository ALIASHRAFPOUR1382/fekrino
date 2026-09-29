import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import TiltCard from '../components/TiltCard'
import ContactButton from '../components/ContactButton'
import StatsBanner from '../components/StatsBanner'
import tizhoushan from '../data/tizhoushan'
import site from '../data/site'

export default function TizhoushanView({ goBack }) {
  const [open, setOpen] = useState('kalami')
  const totalLessons = tizhoushan.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">پکیج جامع تیزهوشان</h2>

      <TiltCard className="price-cta-tilt">
        <motion.div
          className="price-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="price-cta-badge">🚀 دوره کامل ۱۴۰۵</span>
          <div className="price-cta-amount">
            {totalLessons} <span>جلسه ویدیویی HD</span>
          </div>
          <div className="price-cta-installment">
            ۱۰ بخش کامل + آزمون شبیه‌ساز + پشتیبانی مستقیم
          </div>
          <p className="price-cta-text">
            با تدریس {site.instructor} — تمام مباحث هوش و استعداد تحلیلی از پایه تا آزمون
          </p>
          <ContactButton label="دریافت اطلاعات و ثبت‌نام" />
        </motion.div>
      </TiltCard>

      <StatsBanner />

      <div className="feature-grid">
        {[
          { icon: '🎬', title: `${totalLessons} جلسه`, sub: 'کیفیت HD' },
          { icon: '📚', title: '۱۰ بخش', sub: 'هوش و تحلیل' },
          { icon: '📝', title: 'جزوه PDF', sub: 'رنگی و کامل' },
          { icon: '🎯', title: 'آزمون شبیه‌ساز', sub: 'تراز واقعی' },
          { icon: '📞', title: 'پشتیبانی', sub: 'مستقیم با استاد' },
          { icon: '♾️', title: 'دسترسی دائمی', sub: 'بدون محدودیت' },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="feature-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <span className="feature-icon">{f.icon}</span>
            <strong>{f.title}</strong>
            <small>{f.sub}</small>
          </motion.div>
        ))}
      </div>

      <h3 className="page-title" style={{ fontSize: '1.05rem' }}>سرفصل‌های دوره</h3>
      <p className="lessons-intro">
        در این دوره <strong>{totalLessons} جلسه</strong> در <strong>{tizhoushan.length} بخش</strong> ارائه می‌شود. برای مشاهده هر بخش کلیک کنید.
      </p>

      {tizhoushan.map((s, i) => (
        <motion.div
          key={s.id}
          className={`accordion ${open === s.id ? 'open' : ''}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.03, 0.3) }}
        >
          <div
            className="accordion-header"
            onClick={() => setOpen(open === s.id ? null : s.id)}
          >
            <span className="acc-icon">{s.icon}</span>
            <span className="acc-title">{s.title}</span>
            <span className="accordion-count">{s.count} جلسه</span>
            <span className="accordion-chevron">▼</span>
          </div>
          <AnimatePresence>
            {open === s.id && (
              <motion.div
                className="accordion-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {s.items.map((it, j) => (
                  <motion.div
                    key={it.n}
                    className="lesson-row locked"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.015 }}
                  >
                    <span className="lesson-num">{it.n}</span>
                    <span className="lesson-row-title">{it.title}</span>
                    <span className="lesson-lock">🔒</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>آماده شروع هستی؟</h3>
        <p>همین حالا با ما تماس بگیر و مسیر قبولی رو شروع کن</p>
        <ContactButton label="تماس و ثبت‌نام" />
      </motion.div>
    </div>
  )
}