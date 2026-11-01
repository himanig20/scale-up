export default function Hero() {
  const line = "Better now than in the interview."
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="k">SYSTEM DESIGN, AS A GAME</div>
      <h1>
        Your design will break.{" "}
        <span className="glitch" data-t={line}>{line}</span>
      </h1>
      <p>
        Run a startup in a neon city. Watch traffic crush your architecture,
        work out why, and fix it.
      </p>
      <button className="btn">Try to break it</button>
    </section>
  )
}