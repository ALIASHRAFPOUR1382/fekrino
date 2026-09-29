import { useState } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import site from '../data/site'

export default function ConsultView({ goBack }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    grade: 'ششم',
    topic: 'آمادگی تیزهوشان',
    note: '',
  })

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = () => {
    // درخواست رو به تلگرام یا شماره می‌فرستیم
    const msg = `درخواست مشاوره%0A─────────%0A👤 نام: ${form.name}%0A📞 تلفن: ${form.phone}%0A📚 پایه: ${form.grade}%0A📌 موضوع: ${form.topic}%0A📝 توضیحات: ${form.note}`
    const waLink = `https://wa.me/98${site.phone.slice(1)}?text=${msg}`
    window.open(waLink, '_blank')
    setStep(3)
  }

  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">دریافت مشاوره</h2>

      <motion.div
        className="consult-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="quiz-hero-badge">📞 مشاوره رایگان</span>
        <h3>با کارشناسان فکرینو صحبت کن</h3>
        <p>
          فرم زیر رو پر کن تا در کمترین زمان با تو تماس بگیریم
        </p>
      </motion.div>

      {step === 1 && (
        <motion.div
          className="consult-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="form-group">
            <label>👤 نام و نام خانوادگی *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="مثلاً علی محمدی"
            />
          </div>

          <div className="form-group">
            <label>📞 شماره تماس *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
            />
          </div>

          <div className="form-group">
            <label>📚 پایه تحصیلی</label>
            <div className="form-chips">
              {['چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم'].map((g) => (
                <button
                  key={g}
                  className={`form-chip ${form.grade === g ? 'active' : ''}`}
                  onClick={() => update('grade', g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>📌 موضوع مشاوره</label>
            <div className="form-chips">
              {[
                'آمادگی تیزهوشان',
                'ریاضی',
                'هوش و استعداد',
                'برنامه‌ریزی',
                'رفع استرس',
                'سایر',
              ].map((t) => (
                <button
                  key={t}
                  className={`form-chip ${form.topic === t ? 'active' : ''}`}
                  onClick={() => update('topic', t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>📝 توضیحات (اختیاری)</label>
            <textarea
              value={form.note}
              onChange={(e) => update('note', e.target.value)}
              placeholder="هر توضیح اضافه‌ای که فکر می‌کنی کمک می‌کنه..."
              rows={3}
            />
          </div>

          <motion.button
            className="form-submit"
            onClick={handleSubmit}
            disabled={!form.name || !form.phone}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            📞 ثبت درخواست مشاوره
          </motion.button>

          <div className="consult-alert">
            ⚡ بعد از ثبت، از طریق واتساپ به ما متصل می‌شی
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          className="consult-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="success-icon">✅</div>
          <h3>درخواست شما ثبت شد!</h3>
          <p>به‌زودی با شما تماس می‌گیریم</p>
          <p className="success-note">
            اگه واتساپ باز نشد، مستقیم با ما تماس بگیر:
          </p>
          <a className="footer-contact" href={site.telLink}>
            📞 {site.phoneDisplay}
          </a>
        </motion.div>
      )}
    </div>
  )
}