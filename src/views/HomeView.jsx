import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MenuCard from '../components/MenuCard'
import StatsBanner from '../components/StatsBanner'
import Typewriter from '../components/Typewriter'
import Reveal from '../components/Reveal'
import site from '../data/site'

const items = [
  // آموزش
  { key: 'free', icon: '▶', title: 'آموزش‌های رایگان', subtitle: '۹ جلسه نمونه از دوره هوش' },
  { key: 'tizhoushan', icon: '🚀', title: 'دوره جامع تیزهوشان', subtitle: '۹۶ جلسه کامل ویدیویی' },
  { key: 'math', icon: '∑', title: 'آموزش ریاضی', subtitle: 'پکیج‌های پایه‌به‌پایه' },

  // تمرین و ارزیابی
  { key: 'quiz', icon: '📝', title: 'آزمون و تمرین', subtitle: '۸ آزمون هوش با پاسخ تشریحی' },
  { key: 'field', icon: '🎓', title: 'انتخاب رشته', subtitle: 'کشف رشته مناسب پایه دهم' },
  { key: 'tools', icon: '🧮', title: 'درصدساز آزمون', subtitle: 'محاسبه سریع درصد و نمره خام' },
  { key: 'progress', icon: '🏆', title: 'پیشرفت من', subtitle: 'مدال‌ها و آمار شخصی' },

  // مشاوره
  { key: 'aichat', icon: '🤖', title: 'دستیار هوشمند', subtitle: 'پاسخ سریع به سوالات و حل مسائل' },
  { key: 'consult', icon: '📞', title: 'دریافت مشاوره', subtitle: 'مشاوره رایگان با کارشناسان' },
  { key: 'articles', icon: '📖', title: 'مقالات مشاوره‌ای', subtitle: 'راهنمای موفقیت در تیزهوشان' },

  // درباره
  { key: 'results', icon: '🎯', title: 'قبولی‌ها و نتایج', subtitle: 'گالری کارنامه‌های برتر' },
  { key: 'reviews', icon: '⭐', title: 'رضایت خانواده‌ها', subtitle: 'بازخورد واقعی دانش‌آموزان' },
  { key: 'about', icon: '👤', title: 'درباره مؤسسه', subtitle: 'رزومه مهندس علی اشرفپور' },

  // تنظیمات
  { key: 'settings', icon: '⚙️', title: 'تنظیمات', subtitle: 'تم، فونت و حالت نمایش' },
]

export default function HomeView({ goTo }) {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -60])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.4])

  return (
    <div className="home">
      <motion.section
        ref={heroRef}
        className="hero-card"
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="hero-orb orb-a"
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb orb-b"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <span className="eyebrow">FEKRINO • LEARN SMART</span>
        <h2>
          <Typewriter text="ذهن قوی،" speed={80} />
          <br />
          <Typewriter text="مسیر روشن‌تر." speed={80} delay={900} />
        </h2>
        <p>
          با {site.stats.passRate}٪ قبولی دانش‌آموزان، همراه شما در مسیر تیزهوشان و کنکور فرهنگیان
        </p>

        <div className="hero-actions">
          <motion.button
            onClick={() => goTo('tizhoushan')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="glow-btn"
          >
            مشاهده دوره‌ها <span>←</span>
          </motion.button>
          <a href={site.telLink} className="hero-contact">
            📞 {site.phoneDisplay}
          </a>
        </div>
      </motion.section>

      <Reveal delay={0.1}>
        <StatsBanner />
      </Reveal>

      <Reveal delay={0.15}>
        <div className="section-heading">
          <span>خدمات فکرینو</span>
          <small>برای شروع انتخاب کن</small>
        </div>
      </Reveal>

      {items.map((it, i) => (
        <MenuCard key={it.key} {...it} delay={0.06 * i + 0.08} onClick={() => goTo(it.key)} />
      ))}

      <Reveal delay={0.1}>
        <div className="signature-card">
          <span>{site.instructor}</span>
          <small>دانشجوی ارشد هوش مصنوعی دانشگاه تبریز</small>
        </div>
      </Reveal>
    </div>
  )
}