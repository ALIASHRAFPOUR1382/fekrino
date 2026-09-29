import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ParticleBackground from './components/ParticleBackground'
import HomeView from './views/HomeView'
import FreeView from './views/FreeView'
import ReviewsView from './views/ReviewsView'
import ResultsView from './views/ResultsView'
import TizhoushanView from './views/TizhoushanView'
import MathView from './views/MathView'
import VideoModal from './components/VideoModal'

const views = {
  home: HomeView,
  free: FreeView,
  reviews: ReviewsView,
  results: ResultsView,
  tizhoushan: TizhoushanView,
  math: MathView,
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [video, setVideo] = useState(null)
  // 🎯 اسم رو از history به navStack تغییر دادیم
  const [navStack, setNavStack] = useState(['home'])

  const goTo = (next) => {
    if (next === route) return
    setNavStack((h) => [...h, next])
    setRoute(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setNavStack((h) => {
      if (h.length <= 1) return ['home']
      const copy = [...h]
      copy.pop()
      setRoute(copy[copy.length - 1])
      return copy
    })
  }

  // کلید Back مرورگر
  useEffect(() => {
    const handler = () => goBack()
    window.addEventListener('popstate', handler)
    // 🎯 اینجا window.history صدا زده می‌شه، نه متغیر لوکال
    window.history.pushState({}, '')
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const CurrentView = views[route] || HomeView

  return (
    <div className="app-shell">
      <ParticleBackground />
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={route}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <CurrentView goTo={goTo} goBack={goBack} onPlay={setVideo} />
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="footer">
          <div className="footer-brand">مؤسسه فکرینو</div>
          <p>آموزش تخصصی ریاضی و هوش و استعداد تحلیلی</p>
          <a
            className="telegram-link"
            href="https://t.me/ali_ashrafpour"
            target="_blank"
            rel="noreferrer"
          >
            ✈ کانال تلگرام
          </a>
          <div className="footer-copy">© ۱۴۰۴ — تمامی حقوق محفوظ است</div>
        </footer>
      </div>
      <VideoModal video={video} onClose={() => setVideo(null)} />
    </div>
  )
}