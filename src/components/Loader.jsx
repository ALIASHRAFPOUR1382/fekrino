import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="loader-mark"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        ف
      </motion.div>
      <motion.div
        className="loader-bar"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.p
        className="loader-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        مؤسسه فکرینو
      </motion.p>
    </motion.div>
  )
}