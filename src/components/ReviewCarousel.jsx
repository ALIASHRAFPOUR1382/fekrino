import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import reviews from '../data/reviews'

export default function ReviewCarousel() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = () => {
      const cards = el.querySelectorAll('.review-card')
      const center = el.scrollLeft + el.clientWidth / 2
      let best = 0, bestDist = Infinity
      cards.forEach((c, i) => {
        const cx = c.offsetLeft + c.offsetWidth / 2
        const d = Math.abs(cx - center)
        if (d < bestDist) { bestDist = d; best = i }
      })
      setActive(best)
    }
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <div className="review-carousel" ref={ref}>
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.6) }}
          >
            <div className="review-top">
              <div className="review-avatar">{r.initial}</div>
              <div className="review-who">
                <strong>{r.who}</strong>
                <span className="review-grade">{r.grade}</span>
              </div>
            </div>
            <div className="review-stars">★★★★★</div>
            <div className="review-text">{r.text}</div>
            <span className="review-tag">{r.tag}</span>
          </motion.div>
        ))}
      </div>
      <div className="carousel-dots">
        {reviews.map((_, i) => (
          <span key={i} className={i === active ? 'active' : ''} />
        ))}
      </div>
    </>
  )
}