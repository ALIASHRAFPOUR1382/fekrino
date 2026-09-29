import { motion } from 'framer-motion'

const orbs = [
  { size: 300, x: '10%', y: '5%', color: '#f97316', delay: 0, duration: 14 },
  { size: 250, x: '75%', y: '30%', color: '#facc15', delay: 2, duration: 18 },
  { size: 220, x: '20%', y: '70%', color: '#c2410c', delay: 1, duration: 16 },
  { size: 200, x: '80%', y: '85%', color: '#eab308', delay: 3, duration: 20 },
]

export default function FloatingOrbs() {
  return (
    <div className="floating-orbs" aria-hidden="true">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="orb"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle, ${o.color}55, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}