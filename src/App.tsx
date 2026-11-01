import Hero from "./components/Hero"
import TryToBreak from "./components/TryToBreak"

export default function App() {
  return (
    <>
      <div className="stream" aria-hidden="true" />
      <header className="top">
        <div className="logo">SCALE UP</div>
        <nav className="m">
          <a href="#try">&gt; play</a>
          <a href="#loop">&gt; concepts</a>
          <a href="#cast">&gt; cast</a>
        </nav>
        <div className="clock m">SYSTEM ONLINE</div>
      </header>
      <main className="wrap">
        <Hero />
        <TryToBreak />
        <section>
          <div className="k">WHY YOU FORGET</div>
          <h2>Reading about caches doesn’t make them stick.</h2>
          <p>
            Watching a video on load balancing feels like learning. Then the
            interviewer asks you to design something and your mind goes blank.
            The fix is simple: see the thing fail first, and the answer has
            somewhere to land.
          </p>
        </section>
        <section id="loop">
          <div className="k">THE LOOP</div>
          <h2>Build. Break. Learn. Repeat.</h2>
          <div className="steps">
            {[
              ["01", "Build.", "Drag servers, databases and caches onto a city grid and wire them together."],
              ["02", "Break.", "Traffic floods in as glowing packets. Something overheats, queues up, or goes dark."],
              ["03", "Learn.", "A short card explains what just happened in words you could say to an interviewer."],
            ].map(([number, title, copy]) => (
              <div className="step" key={number}>
                <div className="num m">{number}</div>
                <div><b>{title}</b><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="k">PLAYGROUND</div>
          <h2>Drag the pieces. Wire your own city.</h2>
          <p>Grab any block and move it. The links follow. This is where levels will happen.</p>
          <div className="pg">
            <div className="link l1" aria-hidden="true" />
            <div className="link l2" aria-hidden="true" />
            <div className="link l3" aria-hidden="true" />
            {["CLIENTS", "LOAD BALANCER", "SERVER A", "SERVER B", "DATABASE"].map((node, i) => (
              <div className={`nd node-${i}`} key={node}>{node}</div>
            ))}
          </div>
        </section>
        <section id="cast">
          <div className="k">THE CAST</div>
          <h2>Your team is a mess. Naturally.</h2>
          <div className="cast">
            {[
              ["The Visionary", "Changes the plan mid-level. Wants it on Mars by Friday.", "var(--mg)"],
              ["Grumpy Senior Engineer", "Explains concepts. Roasts your single point of failure.", "var(--cy)"],
              ["The Investor", "Hates overengineering. Loves a low cloud bill.", "var(--am)"],
              ["The Intern", "Asks the naive questions you should be asking.", "var(--tx)"],
            ].map(([name, copy, color]) => (
              <div className="card cast-card" key={name}>
                <b style={{ color }}>{name}</b><span>{copy}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="k">THREE WAYS TO PLAY</div>
          <h2>Not every level is a build.</h2>
          <div className="modes">
            <div className="card"><b className="cy">Build</b><span>Design from scratch as your product grows from garage to global.</span></div>
            <div className="card"><b className="rd">Incident</b><span>It’s 3 AM. Read the logs, find the root cause, patch the design.</span></div>
            <div className="card"><b className="am">Launch Day</b><span>Run a worldwide launch from mission control and keep every region up.</span></div>
          </div>
        </section>
        <section>
          <div className="k">A TASTE OF 3 AM</div>
          <h2>Something is wrong with the database.</h2>
          <div className="term m">
            <div>03:09:41 api-1 GET /checkout 200 112ms</div>
            <div className="warn">03:10:30 api-1 slow query 2.8s: SELECT * FROM orders</div>
            <div className="warn">03:11:05 db-1 connections 498/500</div>
            <div className="error">03:11:40 api-3 ERROR timeout waiting for db</div>
            <div className="error">03:12:18 db-1 CPU 99%, disk reads 40x normal</div>
            <div>&gt; what is the root cause?_</div>
          </div>
        </section>
        <footer>
          <h2>Ready when you are.</h2>
          <p>Level 1 is being built. Come back soon, or follow along with the project.</p>
          <button className="btn" disabled>Level 1 coming soon</button>
        </footer>
      </main>
    </>
  )
}