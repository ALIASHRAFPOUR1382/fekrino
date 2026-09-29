import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ReviewCarousel from '../components/ReviewCarousel'
import AnimatedCounter from '../components/AnimatedCounter'
import reviews from '../data/reviews'

export default function ReviewsView({ goBack, goTo }) {
  return (
    <div>
      <BackButton onClick={goBack} />
      <h2 className="page-title">نظرات والدین</h2>
      <p className="reviews-intro">
        مجموعه‌ی {reviews.length} پیام واقعی از والدین و دانش‌آموزانی که با مؤسسه فکرینو همراه شده‌اند. کارت‌ها را به چپ و راست بکشید.
      </p>

      <div className="reviews-stats">
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span className="num">+<AnimatedCounter to={500} /></span>
          <span className="lbl">دانش‌آموز</span>
        </motion.div>
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="num"><AnimatedCounter to={49} /></span>
          <span className="lbl">امتیاز (از ۵۰)</span>
        </motion.div>
        <motion.div className="reviews-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <span className="num">+<AnimatedCounter to={90} suffix="٪" /></span>
          <span className="lbl">رضایت پکیج‌ها</span>
        </motion.div>
      </div>

      <ReviewCarousel />

      <div className="reviews-cta">
        <p>برای مشاهده کارنامه و مسیر قبولی دانش‌آموزان، به گالری نتایج سر بزنید.</p>
        <button className="back-btn" style={{ margin: 0 }} onClick={() => goTo('results')}>
          مشاهده نتایج قبولی ⟵
        </button>
      </div>
    </div>
  )
}