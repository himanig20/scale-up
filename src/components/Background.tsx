import { useEffect, useRef } from "react"

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    let frame = 0
    let offset = 0
    let mouse = 0
    let targetScroll = 0
    let scrollProgress = 0
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.scale(devicePixelRatio, devicePixelRatio)
    }
    const move = (event: PointerEvent) => { mouse = event.clientX / window.innerWidth - 0.5 }
    const scroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight
      targetScroll = distance > 0 ? Math.min(1, window.scrollY / distance) : 0
    }
    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      scrollProgress += (targetScroll - scrollProgress) * 0.08
      context.clearRect(0, 0, width, height)
      context.strokeStyle = "rgba(255,46,147,.18)"
      context.lineWidth = 1
      const horizon = height * (0.62 - scrollProgress * 0.2)
      for (let x = -width; x < width * 2; x += 42) {
        context.beginPath()
        const perspective = (x - width / 2) * (0.08 + scrollProgress * 0.08)
        context.moveTo(width / 2 + perspective + mouse * 30, horizon)
        context.lineTo(x + mouse * 10, height + scrollProgress * 180)
        context.stroke()
      }
      for (let y = horizon; y < height + 28; y += 28) {
        context.beginPath()
        const lineY = y + offset - scrollProgress * 280
        context.moveTo(0, lineY)
        context.lineTo(width, lineY)
        context.stroke()
      }
      for (let x = -width / 2; x < width * 1.5; x += 76) {
        const buildingHeight = 24 + Math.abs(Math.sin(x * 0.07 + scrollProgress * 4)) * (100 + scrollProgress * 180)
        context.strokeStyle = x % 152 ? "rgba(46,242,255,.25)" : "rgba(255,46,147,.35)"
        context.strokeRect(x + mouse * 20, horizon - buildingHeight, 42, buildingHeight)
      }
      if (!reduced) offset = (offset + 0.6 + scrollProgress * 2) % 28
      frame = requestAnimationFrame(draw)
    }
    resize()
    draw()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", move)
    window.addEventListener("scroll", scroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="background" aria-hidden="true" />
}
