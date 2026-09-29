import { useEffect, useState } from 'react'

export default function Typewriter({ text, speed = 60, delay = 0, className = '' }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setDisplay(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      {display}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  )
}