import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import Confetti from '../components/Confetti'
import MagneticButton from '../components/MagneticButton'
import quizzes from '../data/quizzes'

export default function QuizView({ goBack }) {
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setShowConfetti(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const backToList = () => {
    setActiveQuiz(null)
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
    setShowConfetti(false)
  }

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === activeQuiz.questions[current].answer) {
      setScore((s) => s + 1)
    }
  }

  const nextQuestion = () => {
    if (current + 1 >= activeQuiz.questions.length) {
      const finalPercent = Math.round(((score + 0) / activeQuiz.questions.length) * 100)
      setFinished(true)
      if (finalPercent >= 70) {
        setShowConfetti(true)
      }
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // ============ لیست آزمون‌ها ============
  if (!activeQuiz) {
    return (
      <div>
        <BackButton onClick={goBack} />
        <h2 className="page-title">آزمون و تمرین</h2>

        <motion.div
          className="quiz-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="quiz-hero-badge">📝 آزمون آنلاین</span>
          <h3>خودت رو محک بزن</h3>
          <p>
            {quizzes.length} آزمون استاندارد هوش و استعداد تحلیلی با پاسخ تشریحی و نمره‌دهی خودکار
          </p>
        </motion.div>

        <div className="quiz-grid">
          {quizzes.map((quiz, i) => (
            <motion.div
              key={quiz.id}
              className="quiz-card"
              onClick={() => startQuiz(quiz)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="quiz-icon">{quiz.icon}</div>
              <div className="quiz-info">
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <div className="quiz-meta">
                  <span>📝 {quiz.questions.length} سوال</span>
                  <span>⏱ {quiz.duration} دقیقه</span>
                  <span>📚 پایه {quiz.grade}</span>
                </div>
              </div>
              <span className="quiz-arrow">▶</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>می‌خوای آزمون واقعی بدی؟</h3>
          <p>برای شرکت در آزمون‌های شبیه‌ساز فکرینو، با ما تماس بگیر</p>
          <ContactButton label="تماس با ما" />
        </motion.div>
      </div>
    )
  }

  // ============ نتیجه آزمون ============
  if (finished) {
    const percent = Math.round((score / activeQuiz.questions.length) * 100)
    const message =
      percent >= 90 ? '🏆 فوق‌العاده! تو یک نابغه‌ای!' :
      percent >= 70 ? '🎯 عالی بود! ادامه بده!' :
      percent >= 50 ? '👍 خوب بود، ولی جای پیشرفت داری!' :
      '💪 ناامید نشو! تمرین بیشتر = موفقیت!'

    return (
      <div>
        <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

        <BackButton onClick={backToList} />
        <h2 className="page-title">نتیجه آزمون</h2>

        <motion.div
          className="quiz-result-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="quiz-result-circle" style={{ '--percent': `${percent}%` }}>
            <span className="quiz-result-percent">{percent}٪</span>
          </div>
          <h3 className="quiz-result-title">{message}</h3>
          <p className="quiz-result-stats">
            {score} از {activeQuiz.questions.length} پاسخ صحیح
          </p>

          <div className="quiz-result-actions">
            <MagneticButton
              className="quiz-btn-primary"
              onClick={() => startQuiz(activeQuiz)}
            >
              🔄 دوباره تلاش کن
            </MagneticButton>
            <MagneticButton
              className="quiz-btn-secondary"
              onClick={backToList}
            >
              📚 آزمون‌های دیگر
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="final-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>می‌خوای در سطح بالاتری آزمون بدی؟</h3>
          <p>آزمون‌های شبیه‌ساز فکرینو با تراز واقعی</p>
          <ContactButton label="ثبت‌نام در آزمون" />
        </motion.div>
      </div>
    )
  }

  // ============ صفحه سوال ============
  const q = activeQuiz.questions[current]
  const progress = ((current + 1) / activeQuiz.questions.length) * 100

  return (
    <div>
      <BackButton onClick={backToList} />

      <div className="quiz-progress-bar">
        <motion.div
          className="quiz-progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="quiz-progress-text">
        سوال {current + 1} از {activeQuiz.questions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="quiz-question-card"
        >
          <div className="quiz-q-header">
            <span className="quiz-q-badge">
              {activeQuiz.icon} {activeQuiz.title}
            </span>
            <span className="quiz-q-diff">{q.difficulty || 'متوسط'}</span>
          </div>

          <h3 className="quiz-q-text">{q.q}</h3>

          <div className="quiz-options">
            {q.options.map((opt, idx) => {
              let cls = 'quiz-option'
              if (answered) {
                if (idx === q.answer) cls += ' correct'
                else if (idx === selected) cls += ' wrong'
                else cls += ' disabled'
              }
              return (
                <motion.button
                  key={idx}
                  className={cls}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  whileHover={!answered ? { scale: 1.01 } : {}}
                  whileTap={!answered ? { scale: 0.99 } : {}}
                >
                  <span className="quiz-opt-num">{idx + 1}</span>
                  <span className="quiz-opt-text">{opt}</span>
                  {answered && idx === q.answer && (
                    <span className="quiz-opt-icon">✓</span>
                  )}
                  {answered && idx === selected && idx !== q.answer && (
                    <span className="quiz-opt-icon">✕</span>
                  )}
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                className="quiz-explanation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="quiz-explanation-title">
                  {selected === q.answer ? '✅ آفرین! پاسخ صحیح' : '📖 توضیح:'}
                </div>
                <p>{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <motion.button
              className="quiz-next-btn"
              onClick={nextQuestion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {current + 1 >= activeQuiz.questions.length
                ? 'مشاهده نتیجه 🎯'
                : 'سوال بعدی →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}