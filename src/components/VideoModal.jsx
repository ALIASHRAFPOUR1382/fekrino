import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [video, onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="video-modal-box"
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal-header">
              <div className="video-modal-title">{video.title}</div>
              <button className="video-modal-close" onClick={onClose}>✕</button>
            </div>
            <div className="video-modal-frame-wrap">
              <iframe
                src={`https://www.aparat.com/video/video/embed/videohash/${video.hash}/vt/frame`}
                title={video.title}
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}