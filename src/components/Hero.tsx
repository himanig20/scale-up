import TryToBreak from "./TryToBreak"

export default function Hero() {
  const line = "Better now than in the interview."
  return (
    <section className="hero">
      <div>
        <div className="k">SYSTEM DESIGN, AS A GAME</div>
        <h1>Your design will break. <span className="glitch" data-t={line}>{line}</span></h1>
        <p>Run a startup in a neon city. Watch traffic crush your architecture, work out why, and fix it. Every concept you need, learned by breaking things first.</p>
        <div className="actions">
          <a className="btn" href="#try">Try to break it</a>
          <a className="btn outline" href="#loop">How it works</a>
        </div>
      </div>
      <TryToBreak />
    </section>
  )
}