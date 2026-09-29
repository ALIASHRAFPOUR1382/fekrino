import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import site from '../data/site'

export default function StatsBanner({ compact = false }) {
  const items = [
    { to: site.stats.passRate, suffix: '٪', label: 'قبولی کلی' },
    { to: site.stats.sixthMatch, suffix: '٪', label: 'تطابق پایه ششم' },
    { to: site.stats.ninthMatch, suffix: '٪', label: 'تطابق پایه نهم' },
    { to: site.stats.students, suffix: '+', label: 'دانش‌آموز' },
  ]

  return (
    <motion.div
      className={`stats-banner ${compact ? 'compact' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="stats-banner-item"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <span className="stats-banner-num">
            <AnimatedCounter to={it.to} suffix={it.suffix} />
          </span>
          <span className="stats-banner-lbl">{it.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}