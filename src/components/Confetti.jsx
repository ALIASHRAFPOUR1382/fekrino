import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = ['#facc15', '#f97316', '#c2410c', '#eab308', '#fb923c', '#10b981']

export default function Confetti({ show, onComplete }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!show) return

    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotate: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.4,
      duration: 2 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
    }))
    setPieces(newPieces)

    const timeout = setTimeout(() => {
      setPieces([])
      onComplete?.()
    }, 4000)

    return () => clearTimeout(timeout)
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {pieces.length > 0 && (
        <div className="confetti-container" aria-hidden="true">
          {pieces.map((p) => (
            <motion.div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size * 0.4,
                background: p.color,
                borderRadius: 2,
              }}
              initial={{ y: `${p.y}vh`, rotate: 0, opacity: 1 }}
              animate={{
                y: '110vh',
                rotate: p.rotate + 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}