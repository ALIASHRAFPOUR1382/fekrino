import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // فقط روی دسکتاپ
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)

      const target = e.target
      const interactive = target.closest('button, a, .menu-card, .lesson-card, .quiz-card, .quiz-option, .review-card, input, select, textarea')
      setHovering(!!interactive)
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        className={`custom-cursor-dot ${hovering ? 'hover' : ''} ${visible ? 'visible' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`custom-cursor-ring ${hovering ? 'hover' : ''} ${visible ? 'visible' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </>
  )
}