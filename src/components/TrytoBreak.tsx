import { useState } from "react"
import { simulate } from "../engine/simulate"

export default function TryToBreak() {
  const [users, setUsers] = useState(12)
  const [balanced, setBalanced] = useState(false)

  const servers = simulate(users, balanced ? 3 : 1)
  const down = servers[0].status === "down"

  let message = "Fine for now. Keep dragging the slider up."
  if (!balanced && down) {
    message = "One server can’t hold this many users. In an interview, this is where they ask: “so what now?”"
  } else if (balanced && down) {
    message = "Even three servers have limits. This is where caching comes in."
  } else if (balanced) {
    message = "Traffic is split three ways. You just learned load balancing."
  }

  return (
    <div className="card">
      <div className="k" style={{ color: "var(--rd)" }}>TRY TO BREAK IT</div>
      <div>{(users * 1000).toLocaleString("en-US")} users online</div>
      <input
        type="range" min={1} max={120} value={users}
        onChange={(e) => setUsers(Number(e.target.value))}
      />
      <div className="srvs">
        {servers.map((s) => (
          <div key={s.name} className={`srv ${s.status}`}>
            Server {s.name}<br />
            {s.status === "down" ? "DOWN" : Math.round(s.load) + "%"}
          </div>
        ))}
      </div>
      <p>{message}</p>
      <button className="btn" onClick={() => setBalanced(!balanced)}>
        {balanced ? "Remove the load balancer" : "Add a load balancer"}
      </button>
    </div>
  )
}