import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getReply, suggestions } from '../data/chatbot'
import site from '../data/site'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `سلام! 👋 من دستیار هوشمند فکرینو هستم.\nچطور می‌تونم کمکت کنم؟`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  // اسکرول خودکار
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, typing, open])

  const sendMessage = (text) => {
    if (!text.trim()) return

    const userMsg = { role: 'user', text: text.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    // تاخیر مصنوعی برای حس طبیعی
    setTimeout(() => {
      const reply = getReply(text)
      setMessages((m) => [...m, { role: 'bot', text: reply }])
      setTyping(false)
    }, 700)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* دکمه شناور */}
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chat-fab"
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="چت با ما"
          >
            <span className="chat-fab-icon">💬</span>
            <span className="chat-fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* پنجره چت */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {/* هدر */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">ف</div>
                <div>
                  <strong>دستیار فکرینو</strong>
                  <span className="chat-status">
                    <span className="chat-dot" />
                    آنلاین
                  </span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* بدنه پیام‌ها */}
            <div className="chat-body" ref={bodyRef}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`chat-msg ${m.role}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i === 0 ? 0 : 0.05 }}
                >
                  {m.text.split('\n').map((line, li) => (
                    <span key={li}>{line}<br /></span>
                  ))}
                </motion.div>
              ))}

              {typing && (
                <div className="chat-msg bot typing">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              )}
            </div>

            {/* پیشنهادها */}
            {messages.length <= 1 && (
              <div className="chat-suggestions">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="chat-suggestion"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ورودی */}
            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="پیامت رو بنویس..."
                autoFocus
              />
              <button type="submit" disabled={!input.trim()} aria-label="ارسال">
                ➤
              </button>
            </form>

            {/* دکمه تماس اضطراری */}
            <a className="chat-call" href={site.telLink}>
              📞 تماس مستقیم با استاد
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}