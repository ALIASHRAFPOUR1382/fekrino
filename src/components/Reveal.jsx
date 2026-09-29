import { motion } from 'framer-motion'

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.6,
  once = true,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}