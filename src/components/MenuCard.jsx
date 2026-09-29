import { motion } from 'framer-motion'

export default function MenuCard({ icon, title, subtitle, delay = 0, onClick }) {
  return (
    <motion.div
      className="menu-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="icon"
        whileHover={{ rotate: -6, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="info">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <span className="arrow">◀</span>
    </motion.div>
  )
}