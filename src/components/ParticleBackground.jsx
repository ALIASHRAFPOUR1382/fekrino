import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let particles = []
    const mouse = { x: -9999, y: -9999, radius: 140 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.min(70, Math.floor(window.innerWidth / 22))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        hue: Math.random() > 0.5 ? 30 : 45,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // دفع توسط موس
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius
          p.vx += (dx / dist) * force * 0.35
          p.vy += (dy / dist) * force * 0.35
        }

        // اصطکاک
        p.vx *= 0.985
        p.vy *= 0.985

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 92%, 62%, 0.65)`
        ctx.fill()
      }

      // خطوط اتصال
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 130 * 130) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            const alpha = 0.18 * (1 - d2 / 16900)
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  )
}