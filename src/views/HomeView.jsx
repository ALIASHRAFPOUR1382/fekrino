import { motion } from 'framer-motion'
import MenuCard from '../components/MenuCard'
import AnimatedCounter from '../components/AnimatedCounter'

const items = [
  { key:'free', icon:'▶', title:'آموزش‌های رایگان', subtitle:'نمونه تدریس‌های هوش، استعداد تحلیلی و ریاضی' },
  { key:'reviews', icon:'★', title:'تجربه و رضایت خانواده‌ها', subtitle:'بازخورد دانش‌آموزان و والدین' },
  { key:'results', icon:'🏆', title:'قبولی‌ها و نتایج', subtitle:'گالری نتایج و مسیر موفقیت دانش‌آموزان' },
  { key:'tizhoushan', icon:'🚀', title:'دوره جامع تیزهوشان', subtitle:'آموزش هدفمند برای آزمون‌های تیزهوشان' },
  { key:'math', icon:'∑', title:'آموزش ریاضی', subtitle:'دوره‌ها و محتوای آموزشی پایه‌به‌پایه' },
]

export default function HomeView({ goTo }) {
  return <div className="home">
    <motion.section className="hero-card" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}}>
      <div className="hero-orb orb-a"/><div className="hero-orb orb-b"/>
      <span className="eyebrow">FEKRINO • LEARN SMART</span>
      <h2>ذهن قوی، مسیر روشن‌تر.</h2>
      <p>اینجا قرار است هوش، استعداد تحلیلی و خلاقیت را هدفمند و عمیق یاد بگیری.</p>
      <div className="hero-actions">
        <button onClick={()=>goTo('tizhoushan')}>مشاهده دوره‌ها <span>←</span></button>
        <a href="https://t.me/ali_ashrafpour" target="_blank" rel="noreferrer">ارتباط با ما</a>
      </div>
    </motion.section>

    <section className="mini-stats">
      <div><b>+</b><AnimatedCounter to={500}/><span>دانش‌آموز</span></div>
      <div><b>۱۰۰٪</b><span>تمرکز بر یادگیری</span></div>
      <div><b>∞</b><span>مسیر رشد</span></div>
    </section>

    <div className="section-heading"><span>خدمات فکرینو</span><small>برای شروع انتخاب کن</small></div>
    {items.map((it,i)=><MenuCard key={it.key} {...it} delay={.08*i+.08} onClick={()=>goTo(it.key)}/>)}

    <motion.div className="signature-card" initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
      <span>مهندس علی اشرفپور</span>
      <small>دانشجوی ارشد هوش مصنوعی دانشگاه تبریز</small>
    </motion.div>
  </div>
}
