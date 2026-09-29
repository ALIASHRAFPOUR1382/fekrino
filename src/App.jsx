import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import ParticleBackground from './components/ParticleBackground'
import FloatingOrbs from './components/FloatingOrbs'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'
import SEOHead from './components/SEOHead'
import ChatBot from './components/ChatBot'
import CustomCursor from './components/CustomCursor'
import PWAInstall from './components/PWAInstall'
import Drawer from './components/Drawer'
import HomeView from './views/HomeView'
import FreeView from './views/FreeView'
import ReviewsView from './views/ReviewsView'
import ResultsView from './views/ResultsView'
import TizhoushanView from './views/TizhoushanView'
import MathView from './views/MathView'
import AboutView from './views/AboutView'
import QuizView from './views/QuizView'
import ToolsView from './views/ToolsView'
import ArticlesView from './views/ArticlesView'
import ConsultView from './views/ConsultView'
import ProgressView from './views/ProgressView'
import AIChatView from './views/AIChatView'
import SettingsView from './views/SettingsView'
import FieldChoiceView from './views/FieldChoiceView'
import VideoModal from './components/VideoModal'
import site from './data/site'
import { applySettings, getSettings } from './lib/settings'

const views = {
  home: HomeView,
  free: FreeView,
  quiz: QuizView,
  aichat: AIChatView,
  progress: ProgressView,
  tools: ToolsView,
  articles: ArticlesView,
  consult: ConsultView,
  reviews: ReviewsView,
  results: ResultsView,
  tizhoushan: TizhoushanView,
  math: MathView,
  about: AboutView,
  settings: SettingsView,
  field: FieldChoiceView,
}

export default function App() {
  const [route, setRoute] = useState('home')
  const [video, setVideo] = useState(null)
  const [navStack, setNavStack] = useState(['home'])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // اعمال تنظیمات اولیه
  useEffect(() => {
    applySettings(getSettings())
  }, [])

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

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

  useEffect(() => {
    const handler = () => goBack()
    window.addEventListener('popstate', handler)
    window.history.pushState({}, '')
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const CurrentView = views[route] || HomeView

  return (
    <>
      <SEOHead route={route} />
      <CustomCursor />

      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <div className="app-shell">
        <FloatingOrbs />
        <ParticleBackground />
        <ScrollProgress />

        <div className="app-container">
          <Header onOpenMenu={() => setDrawerOpen(true)} />

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
            <div className="footer-top">
              <div className="footer-col">
                <div className="footer-brand">
                  <span className="footer-brand-mark">ف</span>
                  {site.brand}
                </div>
                <p>{site.tagline}</p>
              </div>

              <div className="footer-col">
                <h4>دسترسی سریع</h4>
                <ul className="footer-links">
                  <li onClick={() => goTo('tizhoushan')}>دوره تیزهوشان</li>
                  <li onClick={() => goTo('quiz')}>آزمون آنلاین</li>
                  <li onClick={() => goTo('field')}>انتخاب رشته</li>
                  <li onClick={() => goTo('aichat')}>دستیار هوشمند</li>
                  <li onClick={() => goTo('progress')}>پیشرفت من</li>
                  <li onClick={() => goTo('tools')}>درصدساز</li>
                  <li onClick={() => goTo('articles')}>مقالات</li>
                  <li onClick={() => goTo('free')}>آموزش‌های رایگان</li>
                  <li onClick={() => goTo('results')}>نتایج قبولی</li>
                  <li onClick={() => goTo('about')}>درباره ما</li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>تماس با ما</h4>
                <a className="footer-contact" href={site.telLink}>
                  📞 {site.phoneDisplay}
                </a>
                <p className="footer-note">
                  برای مشاوره و ثبت‌نام با ما تماس بگیرید
                </p>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© ۱۴۰۴ — {site.brand} | تمامی حقوق محفوظ است</span>
              <span className="footer-credit">با تدریس {site.instructor}</span>
            </div>
          </footer>
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        goTo={goTo}
        currentRoute={route}
      />

      <ScrollToTop />
      <VideoModal video={video} onClose={() => setVideo(null)} />
      <ChatBot />
      <PWAInstall />
    </>
  )
}