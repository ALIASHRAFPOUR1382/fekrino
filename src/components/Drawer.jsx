import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import site from '../data/site'

const menuGroups = [
  {
    title: '📚 آموزش',
    items: [
      { key: 'free', icon: '▶', label: 'آموزش‌های رایگان' },
      { key: 'tizhoushan', icon: '🚀', label: 'دوره جامع تیزهوشان' },
      { key: 'math', icon: '∑', label: 'آموزش ریاضی' },
    ],
  },
  {
    title: '📝 تمرین و ارزیابی',
    items: [
      { key: 'quiz', icon: '📝', label: 'آزمون و تمرین' },
      { key: 'tools', icon: '🧮', label: 'درصدساز آزمون' },
      { key: 'progress', icon: '🏆', label: 'پیشرفت من' },
    ],
  },
  {
    title: '💬 مشاوره و پشتیبانی',
    items: [
      { key: 'aichat', icon: '🤖', label: 'دستیار هوشمند' },
      { key: 'consult', icon: '📞', label: 'دریافت مشاوره' },
      { key: 'articles', icon: '📖', label: 'مقالات مشاوره‌ای' },
    ],
  },
  {
    title: 'ℹ️ درباره ما',
    items: [
      { key: 'results', icon: '🎯', label: 'قبولی‌ها و نتایج' },
      { key: 'reviews', icon: '⭐', label: 'رضایت خانواده‌ها' },
      { key: 'about', icon: '👤', label: 'درباره مؤسسه' },
    ],
  },
  {
    title: '⚙️ تنظیمات',
    items: [
      { key: 'settings', icon: '⚙️', label: 'تنظیمات' },
    ],
  },
  {
    title: '📚 آموزش',
    items: [
      { key: 'free', icon: '▶', label: 'آموزش‌های رایگان' },
      { key: 'tizhoushan', icon: '🚀', label: 'دوره جامع تیزهوشان' },
      { key: 'math', icon: '∑', label: 'آموزش ریاضی' },
    ],
  },
  {
    title: '📝 تمرین و ارزیابی',
    items: [
      { key: 'quiz', icon: '📝', label: 'آزمون و تمرین' },
      { key: 'field', icon: '🎓', label: 'انتخاب رشته' },     // ← جدید
      { key: 'tools', icon: '🧮', label: 'درصدساز آزمون' },
      { key: 'progress', icon: '🏆', label: 'پیشرفت من' },
    ],
  },
  {
    title: '💬 مشاوره و پشتیبانی',
    items: [
      { key: 'aichat', icon: '🤖', label: 'دستیار هوشمند' },
      { key: 'consult', icon: '📞', label: 'دریافت مشاوره' },
      { key: 'articles', icon: '📖', label: 'مقالات مشاوره‌ای' },
    ],
  },
  {
    title: 'ℹ️ درباره ما',
    items: [
      { key: 'results', icon: '🎯', label: 'قبولی‌ها و نتایج' },
      { key: 'reviews', icon: '⭐', label: 'رضایت خانواده‌ها' },
      { key: 'about', icon: '👤', label: 'درباره مؤسسه' },
    ],
  },
  {
    title: '⚙️ تنظیمات',
    items: [
      { key: 'settings', icon: '⚙️', label: 'تنظیمات' },
    ],
  },
]

export default function Drawer({ open, onClose, goTo, currentRoute }) {
  // قفل اسکرول وقتی منو بازه
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // بستن با Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleSelect = (key) => {
    goTo(key)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            {/* هدر */}
            <div className="drawer-header">
              <div className="drawer-brand">
                <span className="drawer-mark">ف</span>
                <div>
                  <strong>{site.brand}</strong>
                  <small>منوی اصلی</small>
                </div>
              </div>
              <button
                className="drawer-close"
                onClick={onClose}
                aria-label="بستن"
              >
                ✕
              </button>
            </div>

            {/* تماس سریع */}
            <a className="drawer-contact" href={site.telLink}>
              <span>📞</span>
              <div>
                <strong>تماس مستقیم</strong>
                <small dir="ltr">{site.phoneDisplay}</small>
              </div>
            </a>

            {/* گروه‌ها */}
            <nav className="drawer-nav">
              {menuGroups.map((group, gi) => (
                <motion.div
                  key={gi}
                  className="drawer-group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + gi * 0.05 }}
                >
                  <div className="drawer-group-title">{group.title}</div>
                  {group.items.map((item) => (
                    <button
                      key={item.key}
                      className={`drawer-item ${currentRoute === item.key ? 'active' : ''}`}
                      onClick={() => handleSelect(item.key)}
                    >
                      <span className="drawer-item-icon">{item.icon}</span>
                      <span className="drawer-item-label">{item.label}</span>
                      {currentRoute === item.key && (
                        <span className="drawer-item-dot" />
                      )}
                    </button>
                  ))}
                </motion.div>
              ))}
            </nav>

            {/* فوتر */}
            <div className="drawer-footer">
              <p>© ۱۴۰۴ — {site.brand}</p>
              <small>با تدریس {site.instructor}</small>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

