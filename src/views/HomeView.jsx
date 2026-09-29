import { motion } from 'framer-motion'
import MenuCard from '../components/MenuCard'
import AnimatedCounter from '../components/AnimatedCounter'
import StatsBanner from '../components/StatsBanner'
import ContactButton from '../components/ContactButton'
import site from '../data/site'

const items = [
  { key: 'free', icon: '▶', title: 'آموزش‌های رایگان', subtitle: '۹ جلسه نمونه از دوره هوش و ریاضی' },
  { key: 'reviews', icon: '★', title: 'تجربه و رضایت خانواده‌ها', subtitle: 'بازخورد واقعی دانش‌آموزان و والدین' },
  { key: 'results', icon: '🏆', title: 'قبولی‌ها و نتایج', subtitle: 'گالری کارنامه‌های برتر تیزهوشان' },
  { key: 'tizhoushan', icon: '🚀', title: 'دوره جامع تیزهوشان', subtitle: '۹۶ جلسه کامل با تدریس مهندس اشرفپور' },
  { key: 'math', icon: '∑', title: 'آموزش ریاضی', subtitle: 'پکیج‌های ویدیویی پایه‌به‌پایه' },
  { key: 'about', icon: '👤', title: 'درباره ما', subtitle: 'رزومه و سابقه مهندس علی اشرفپور' },
]

export default function HomeView({ goTo }) {
  return (
    <div className="home">
      <motion.section
        className="hero-card"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-orb orb-a" />
        <div className="hero-orb orb-b" />
        <span className="eyebrow">FEKRINO • LEARN SMART</span>
        <h2>ذهن قوی، مسیر روشن‌تر.</h2>
        <p>
          با {site.stats.passRate}٪ قبولی دانش‌آموزان، همراه شما در مسیر تیزهوشان و کنکور فرهنگیان
        </p>
        <div className="hero-actions">
          <button onClick={() => goTo('tizhoushan')}>
            مشاهده دوره‌ها <span>←</span>
          </button>
          <a href={site.telLink} className="hero-contact">
            📞 {site.phoneDisplay}
          </a>
        </div>
      </motion.section>

      <StatsBanner />

      <div className="section-heading">
        <span>خدمات فکرینو</span>
        <small>برای شروع انتخاب کن</small>
      </div>
      {items.map((it, i) => (
        <MenuCard key={it.key} {...it} delay={0.06 * i + 0.08} onClick={() => goTo(it.key)} />
      ))}

      <motion.div
        className="signature-card"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span>{site.instructor}</span>
        <small>دانشجوی ارشد هوش مصنوعی دانشگاه تبریز</small>
      </motion.div>
    </div>
  )
}