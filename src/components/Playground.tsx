import { useEffect, useRef, useState } from "react"

const initialPositions = [
  { left: "4%", top: "42%" }, { left: "26%", top: "42%" },
  { left: "52%", top: "10%" }, { left: "52%", top: "74%" }, { left: "76%", top: "42%" },
]

export default function Playground() {
  const areaRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const [positions, setPositions] = useState(initialPositions)
  const [centers, setCenters] = useState<[number, number][]>([
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
  ])
  const [, refresh] = useState(0)
  const [dragging, setDragging] = useState<number | null>(null)

  useEffect(() => {
    const update = () => refresh((value) => value + 1)
    const frame = requestAnimationFrame(update)
    window.addEventListener("resize", update)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", update) }
  }, [])

  useEffect(() => {
    setCenters(nodeRefs.current.map((node) => node
      ? [node.offsetLeft + node.offsetWidth / 2, node.offsetTop + node.offsetHeight / 2]
      : [0, 0]))
  }, [positions])

  useEffect(() => {
    if (dragging === null) return
    const move = (event: PointerEvent) => {
      const area = areaRef.current
      const node = nodeRefs.current[dragging]
      if (!area || !node) return
      const bounds = area.getBoundingClientRect()
      const left = Math.max(0, Math.min(bounds.width - node.offsetWidth, event.clientX - bounds.left - node.offsetWidth / 2))
      const top = Math.max(0, Math.min(bounds.height - node.offsetHeight, event.clientY - bounds.top - node.offsetHeight / 2))
      setPositions((current) => current.map((position, index) => index === dragging ? { left: `${left}px`, top: `${top}px` } : position))
    }
    const end = () => setDragging(null)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", end)
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end) }
  }, [dragging])

  const edges = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]]
  return (
    <div className="pg" ref={areaRef}>
      <svg className="playground-lines" aria-hidden="true">
        {edges.map(([from, to]) => {
          const [ax, ay] = centers[from]
          const [bx, by] = centers[to]
          const midpoint = (ax + bx) / 2
          return <path key={`${from}-${to}`} d={`M${ax} ${ay} C${midpoint} ${ay} ${midpoint} ${by} ${bx} ${by}`} />
        })}
      </svg>
      {["CLIENTS", "LOAD BALANCER", "SERVER A", "SERVER B", "DATABASE"].map((node, index) => (
        <div
          className={`nd node-${index}`}
          key={node}
          ref={(element) => { nodeRefs.current[index] = element }}
          style={{ left: positions[index].left, top: positions[index].top }}
          onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setDragging(index) }}
        >{node}</div>
      ))}
    </div>
  )
}
