import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/BackButton'
import ContactButton from '../components/ContactButton'
import { getSmartReply, quickSuggestions } from '../lib/smartBot'

const welcomeMessage = `سلام! 👋 من دستیار هوشمند مؤسسه فکرینو هستم.

می‌تونم درباره دوره‌ها، آزمون‌ها، ثبت‌نام و حتی حل مسائل ریاضی بهت کمک کنم. بپرس!`

export default function AIChatView({ goBack }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcomeMessage },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  // اسکرول خودکار
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const userMessage = (text || input).trim()
    if (!userMessage) return

    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setTyping(true)

    // تاخیر مصنوعی برای حس طبیعی
    const delay = 500 + Math.random() * 800

    setTimeout(() => {
      const reply = getSmartReply(userMessage, newMessages)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      setTyping(false)
    }, delay)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: welcomeMessage }])
    setInput('')
    setTyping(false)
  }

  const isWelcome = messages.length <= 1

  return (
    <div className="ai-view">
      <BackButton onClick={goBack} />
      <h2 className="page-title">دستیار هوشمند فکرینو</h2>

      <div className="ai-chat-window">
        {/* هدر */}
        <div className="ai-chat-header">
          <div className="ai-header-info">
            <div className="ai-avatar">🤖</div>
            <div>
              <strong>دستیار فکرینو</strong>
              <span className="ai-status">
                <span className="ai-dot" />
                آنلاین همیشه
              </span>
            </div>
          </div>
          <button className="ai-reset" onClick={resetChat} title="گفتگوی جدید">
            🔄
          </button>
        </div>

        {/* پیام‌ها */}
        <div className="ai-chat-body" ref={bodyRef}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              className={`ai-msg ${m.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i === 0 ? 0 : 0.05 }}
            >
              {m.content.split('\n').map((line, li) => (
                <span key={li}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.div>
          ))}

          {typing && (
            <div className="ai-msg assistant typing">
              <span className="typing-dots">
                <span />
                <span />
                <span />
              </span>
            </div>
          )}
        </div>

        {/* پیشنهادها - فقط اول چت */}
        {isWelcome && !typing && (
          <div className="ai-suggestions">
            {quickSuggestions.map((s) => (
              <button
                key={s}
                className="ai-suggestion"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ورودی */}
        <form className="ai-input" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="سوالت رو بنویس..."
            rows={1}
            disabled={typing}
          />
          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="ارسال"
          >
            {typing ? '⏳' : '➤'}
          </button>
        </form>
      </div>

      <div className="ai-note">
        💡 این دستیار هوشمند فکرینو هست. برای مسائل مهم، با ۰۹۹۲۳۴۶۲۷۱۱ تماس بگیر
      </div>

      <motion.div
        className="final-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3>سوال پیچیده‌تر داری؟</h3>
        <p>با معلم انسانی ما صحبت کن</p>
        <ContactButton label="تماس با استاد" />
      </motion.div>
    </div>
  )
}