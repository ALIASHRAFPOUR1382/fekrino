import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    // اگه قبلاً نصب شده، نشون نده
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // ۵ ثانیه بعد از لود، دکمه رو نشون بده
      setTimeout(() => setVisible(true), 5000)
    }

    const installedHandler = () => {
      setInstalled(true)
      setVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', installedHandler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installedHandler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setVisible(false)
    }
    setDeferredPrompt(null)
  }

  const handleClose = () => setVisible(false)

  if (installed || !deferredPrompt) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pwa-install-banner"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
        >
          <button className="pwa-close" onClick={handleClose} aria-label="بستن">
            ✕
          </button>

          <div className="pwa-install-icon">📱</div>

          <div className="pwa-install-text">
            <strong>فکرینو رو نصب کن</strong>
            <span>مثل یه اپ روی گوشیت، سریع و آفلاین</span>
          </div>

          <button className="pwa-install-btn" onClick={handleInstall}>
            نصب
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}