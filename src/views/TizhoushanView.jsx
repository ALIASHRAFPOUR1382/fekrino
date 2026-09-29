import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'

const sections = [
  { title: 'هوش تصویری و تجسمی', count: 14, items: ['دوران‌ها', 'شمارش مکعب', 'تاس‌ها', 'گسترده‌ها', 'تقارن'] },
  { title: 'هوش کلامی و منطقی', count: 12, items: ['مسائل الفبایی', 'استدلال منطقی', 'متن‌های تحلیلی', 'قوانین شرطی'] },
  { title: 'هوش ریاضی و محاسباتی', count: 18, items: ['اصل ضرب', 'اصل لانه کبوتری', 'دنباله‌ها', 'احتمال', 'مسائل پیشرفته'] },
  { title: 'آزمون‌های شبیه‌ساز', count: 8, items: ['آزمون‌های جمع‌بندی', 'آزمون آنلاین هفتگی', 'آزمون تراز کانون'] },
]

export default function TizhoushanView({ goBack }) {
  const [open, setOpen] = useState(0)

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">پکیج جامع تیزهوشان</h2>

      <motion.div
        className="price-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="price-cta-badge">🚀 پکیج کامل هوش و استعداد تحلیلی</span>
        <div className="price-cta-amount">
          دوره جامع <span>فکرینو</span>
        </div>
        <div className="price-cta-installment">برای دریافت شرایط ثبت‌نام و جزئیات دوره</div>
        <p className="price-cta-text">
          آموزش هوش و استعداد تحلیلی، تمرین هدفمند، آزمون‌های شبیه‌ساز و پشتیبانی آموزشی
        </p>
        <a className="price-cta-call" href="https://t.me/ali_ashrafpour" target="_blank" rel="noreferrer">
          ✈ دریافت اطلاعات و ثبت‌نام
        </a>
      </motion.div>

      <h3 className="page-title" style={{ fontSize: '1.05rem' }}>سرفصل‌های پکیج</h3>

      {sections.map((s, i) => (
        <div key={i} className={`accordion ${open === i ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setOpen(open === i ? -1 : i)}>
            {s.title}
            <span className="accordion-count">{s.count} جلسه</span>
            <span className="accordion-chevron">▼</span>
          </div>
          <div className="accordion-body">
            <ul>
              {s.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}