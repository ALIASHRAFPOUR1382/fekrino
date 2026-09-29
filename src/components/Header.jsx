import { motion } from 'framer-motion'
import site from '../data/site'

export default function Header() {
  return (
    <motion.header
      className="header"
      initial={{ y: -35, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="brand-mark"
        initial={{ scale: 0.5, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        whileHover={{ rotate: 10, scale: 1.08 }}
      >
        ف
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {site.brand}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {site.tagline}
      </motion.p>

      <motion.span
        className="header-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55 }}
      >
        ✦ با مدیریت {site.instructor}
      </motion.span>
    </motion.header>
  )
}