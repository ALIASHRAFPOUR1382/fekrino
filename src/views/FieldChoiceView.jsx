import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import { fields, questions } from '../data/fieldQuestions'

export default function FieldChoiceView({ goBack }) {
  const [step, setStep] = useState('intro')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers]
    newAnswers[current] = optionIndex
    setAnswers(newAnswers)

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setStep('result')
      } else {
        setCurrent((c) => c + 1)
      }
    }, 250)
  }

  const handleBack = () => {
    if (current > 0) {
      setCurrent((c) => c - 1)
    }
  }

  const reset = () => {
    setStep('intro')
    setCurrent(0)
    setAnswers([])
  }

  // ============ محاسبه نتیجه ============
  const result = useMemo(() => {
    if (answers.length < questions.length) return null

    const scores = { math: 0, science: 0, humanities: 0, tech: 0 }

    answers.forEach((optIdx, qi) => {
      if (optIdx === undefined) return
      const option = questions[qi].options[optIdx]
      for (const [field, score] of Object.entries(option.scores)) {
        scores[field] += score
      }
    })

    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    const percentages = {}
    for (const [field, score] of Object.entries(scores)) {
      percentages[field] = Math.round((score / total) * 100)
    }

    const sorted = Object.entries(percentages)
      .map(([id, percent]) => ({ ...fields[id], percent }))
      .sort((a, b) => b.percent - a.percent)

    return {
      top: sorted[0],
      all: sorted,
    }
  }, [answers])

  // ============ معرفی ============
  if (step === 'intro') {
    return (
      <div>
        <BackButton onClick={goBack} />
        <h2 className="page-title">انتخاب رشته</h2>

        <motion.div
          className="field-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="quiz-hero-badge">🎓 آزمون استعدادیابی</span>
          <h3>رشته مناسب خودت رو کشف کن</h3>
          <p>
            با پاسخ به {questions.length} سوال، بهترین رشته تحصیلی برای پایه دهم رو پیدا می‌کنی.
          </p>
        </motion.div>

        <div className="field-info-grid">
          {Object.values(fields).map((f, i) => (
            <motion.div
              key={f.id}
              className="field-info-card"
              style={{ borderTopColor: f.color }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="field-info-icon" style={{ background: f.color + '22', color: f.color }}>
                {f.icon}
              </span>
              <strong>{f.title}</strong>
              <small>{f.desc}</small>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="field-start-btn"
          onClick={() => setStep('quiz')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          شروع آزمون ({questions.length} سوال) →
        </motion.button>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>نیاز به مشاوره تخصصی داری؟</h3>
          <p>با مشاوران ما تماس بگیر تا با هم بهترین انتخاب رو داشته باشی</p>
          <ContactButton label="مشاوره انتخاب رشته" />
        </motion.div>
      </div>
    )
  }

  // ============ نتیجه ============
  if (step === 'result' && result) {
    return (
      <div>
        <BackButton onClick={reset} />
        <h2 className="page-title">نتیجه آزمون</h2>

        <motion.div
          className="field-result-hero"
          style={{ '--color': result.top.color }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="field-result-icon">{result.top.icon}</div>
          <span className="field-result-badge">رشته پیشنهادی</span>
          <h3>{result.top.title}</h3>
          <p>{result.top.desc}</p>
          <div className="field-result-percent">
            <span>{result.top.percent}٪</span>
            <small>تطابق</small>
          </div>
        </motion.div>

        {/* نمودار نتایج */}
        <h3 className="section-mini-title">📊 تطابق با همه رشته‌ها</h3>
        <div className="field-scores">
          {result.all.map((f, i) => (
            <motion.div
              key={f.id}
              className="field-score-row"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="field-score-icon" style={{ color: f.color }}>
                {f.icon}
              </span>
              <div className="field-score-info">
                <div className="field-score-name">
                  <strong>{f.title}</strong>
                  <span>{f.percent}٪</span>
                </div>
                <div className="field-score-bar">
                  <motion.div
                    className="field-score-fill"
                    style={{ background: f.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${f.percent}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* مشاغل پیشنهادی */}
        <h3 className="section-mini-title">💼 مشاغل پیشنهادی</h3>
        <div className="field-jobs">
          {result.top.jobs.map((job, i) => (
            <motion.span
              key={job}
              className="field-job-chip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              {job}
            </motion.span>
          ))}
        </div>

        <div className="field-actions">
          <button className="field-btn-primary" onClick={reset}>
            🔄 دوباره امتحان بده
          </button>
        </div>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>می‌خوای مطمئن‌تر انتخاب کنی؟</h3>
          <p>با مشاوران فکرینو صحبت کن — مشاوره رایگان</p>
          <ContactButton label="مشاوره تخصصی" />
        </motion.div>
      </div>
    )
  }

  // ============ سوالات ============
  const q = questions[current]
  const progress = ((current + 1) / questions.length) * 100

  return (
    <div>
      <BackButton onClick={current > 0 ? handleBack : () => setStep('intro')} />

      <div className="quiz-progress-bar">
        <motion.div
          className="quiz-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="quiz-progress-text">
        سوال {current + 1} از {questions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="field-question-card"
        >
          <span className="field-q-num">سوال {current + 1}</span>
          <h3 className="field-q-text">{q.q}</h3>

          <div className="field-options">
            {q.options.map((opt, idx) => (
              <motion.button
                key={idx}
                className={`field-option ${answers[current] === idx ? 'selected' : ''}`}
                onClick={() => handleAnswer(idx)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="field-opt-letter">
                  {['الف', 'ب', 'ج', 'د'][idx]}
                </span>
                <span className="field-opt-text">{opt.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="field-dots">
        {questions.map((_, i) => (
          <span
            key={i}
            className={`field-dot ${answers[i] !== undefined ? 'answered' : ''} ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}