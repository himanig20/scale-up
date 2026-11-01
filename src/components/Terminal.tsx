import { useEffect, useRef, useState } from "react"

const lines = [
  ["03:09:41 api-1 GET /checkout 200 112ms", ""],
  ["03:10:30 api-1 slow query 2.8s: SELECT * FROM orders", "warn"],
  ["03:11:05 db-1 connections 498/500", "warn"],
  ["03:11:40 api-3 ERROR timeout waiting for db", "error"],
  ["03:12:18 db-1 CPU 99%, disk reads 40x normal", "error"],
  ["> what is the root cause?_", ""],
]

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    let timer: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      let index = 0
      timer = window.setInterval(() => {
        index += 1
        setVisible(index)
        if (index === lines.length) window.clearInterval(timer)
      }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700)
      observer.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      if (timer !== undefined) window.clearInterval(timer)
    }
  }, [])
  return <div className="term m" ref={ref}>{lines.slice(0, visible).map(([line, className]) => <div className={className} key={line}>{line}</div>)}</div>
}
