import Hero from "./components/Hero"
import TryToBreak from "./components/TryToBreak"

export default function App() {
  return (
    <>
      <header className="top"><div className="logo">SCALE UP</div></header>
      <main className="wrap">
        <Hero />
        <TryToBreak />
      </main>
    </>
  )
}