import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import reviews from '../data/reviews'

const featured = reviews.filter((_, i) => i % 4 === 0).slice(0, 8)

export default function ReviewCarousel() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // autoplay
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      const el = ref.current
      if (!el) return
      const next = (active + 1) % featured.length
      const cards = el.querySelectorAll('.review-card')
      const target = cards[next]
      if (target) {
        el.scrollTo({
          left: target.offsetLeft - el.clientWidth / 2 + target.offsetWidth / 2,
          behavior: 'smooth',
        })
      }
    }, 4500)
    return () => clearInterval(t)
  }, [active, paused])

  // تشخیص کارت فعال هنگام اسکرول
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

  const goToIndex = (i) => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll('.review-card')
    const target = cards[i]
    if (target) {
      el.scrollTo({
        left: target.offsetLeft - el.clientWidth / 2 + target.offsetWidth / 2,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className="carousel-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="review-carousel" ref={ref}>
        {featured.map((r, i) => (
          <motion.div
            key={i}
            className="review-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.5) }}
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
        {featured.map((_, i) => (
          <span
            key={i}
            className={i === active ? 'active' : ''}
            onClick={() => goToIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}