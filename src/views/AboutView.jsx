import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import StatsBanner from '../components/StatsBanner'
import TiltCard from '../components/TiltCard'
import site from '../data/site'

const resume = {
  education: [
    { degree: 'کارشناسی ارشد', field: 'هوش مصنوعی', place: 'دانشگاه تبریز', year: 'در حال تحصیل' },
    { degree: 'کارشناسی', field: 'مهندسی کامپیوتر', place: '—', year: '—' },
  ],
  experience: [
    { title: 'مدرس هوش و استعداد تحلیلی', place: 'مؤسسه فکرینو', year: '۱۳۹۸ تا کنون' },
    { title: 'تولید محتوای آموزشی', place: 'آپارات و اسپات‌پلیر', year: 'چندین سال' },
    { title: 'مشاور و برنامه‌ریز تحصیلی', place: 'همراه دانش‌آموزان تیزهوشان', year: '—' },
  ],
  skills: [
    'تدریس هوش و استعداد تحلیلی',
    'ریاضی پایه‌های چهارم تا نهم',
    'برنامه‌ریزی و مشاوره تحصیلی',
    'تحلیل آزمون تیزهوشان',
    'هوش مصنوعی و یادگیری ماشین',
  ],
  achievements: [
    `${site.stats.passRate}٪ قبولی دانش‌آموزان در آزمون تیزهوشان`,
    `${site.stats.sixthMatch}٪ تطابق برای پایه ششم`,
    `${site.stats.ninthMatch}٪ تطابق برای پایه نهم`,
    'بیش از ۵۰۰ دانش‌آموز در سراسر ایران',
    'همکاری با مؤسسات برتر آموزشی',
  ],
}

export default function AboutView({ goBack }) {
  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">درباره ما</h2>

      {/* کارت پروفایل */}
      <TiltCard className="profile-tilt">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar">
            <span>ع</span>
          </div>
          <h3>{site.instructor}</h3>
          <p className="profile-sub">مدرس هوش و استعداد تحلیلی · مؤسس فکرینو</p>
          <div className="profile-badges">
            <span>🎓 ارشد هوش مصنوعی</span>
            <span>🏆 +۵۰۰ دانش‌آموز</span>
            <span>⭐ ۹۶٪ قبولی</span>
          </div>
          <ContactButton label="تماس با استاد" />
        </motion.div>
      </TiltCard>

      <StatsBanner />

      {/* بیوگرافی */}
      <section className="about-section">
        <h3 className="about-title">درباره من</h3>
        <p className="about-text">
          من علی اشرفپور هستم، مدرس هوش و استعداد تحلیلی و بنیان‌گذار مؤسسه فکرینو.
          بیش از چند سال است که با عشق و علاقه در کنار دانش‌آموزان تیزهوش و خانواده‌هایشان هستم
          و مسیر آمادگی آزمون‌های تیزهوشان و کنکور فرهنگیان را برایشان هموار می‌کنم.
        </p>
        <p className="about-text">
          باور من این است که هر دانش‌آموزی با آموزش درست، تمرین هدفمند و پیگیری مستمر می‌تواند
          به بهترین نتیجه‌ها برسد. به همین دلیل دوره‌ای کامل و جامع طراحی کرده‌ام که شامل
          ویدیوهای آموزشی، آزمون‌های شبیه‌ساز و پشتیبانی مستقیم است.
        </p>
      </section>

      {/* تحصیلات */}
      <section className="about-section">
        <h3 className="about-title">🎓 تحصیلات</h3>
        <div className="about-list">
          {resume.education.map((e, i) => (
            <motion.div
              key={i}
              className="about-item"
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <strong>{e.degree} {e.field}</strong>
              <span>{e.place} — {e.year}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* سابقه تدریس */}
      <section className="about-section">
        <h3 className="about-title">💼 سابقه تدریس</h3>
        <div className="about-list">
          {resume.experience.map((e, i) => (
            <motion.div
              key={i}
              className="about-item"
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <strong>{e.title}</strong>
              <span>{e.place} — {e.year}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* مهارت‌ها */}
      <section className="about-section">
        <h3 className="about-title">⚡ مهارت‌ها</h3>
        <div className="skills-grid">
          {resume.skills.map((s, i) => (
            <motion.span
              key={i}
              className="skill-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </section>

      {/* افتخارات */}
      <section className="about-section">
        <h3 className="about-title">🏆 افتخارات</h3>
        <div className="about-list">
          {resume.achievements.map((a, i) => (
            <motion.div
              key={i}
              className="achievement-item"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="ach-icon">✓</span>
              {a}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA پایانی */}
      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>آماده‌اید شروع کنیم؟</h3>
        <p>برای مشاوره و ثبت‌نام، همین حالا تماس بگیرید</p>
        <ContactButton label="تماس و مشاوره" />
      </motion.div>
    </div>
  )
}