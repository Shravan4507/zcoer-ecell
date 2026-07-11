import Lightfall from './components/background/Lightfall'
import './App.css'

function App() {
  return (
    <>
      {/* Fixed global background */}
      <div className="lightfall-bg">
        <Lightfall
          colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
          backgroundColor="#0A29FF"
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={false}
          mouseStrength={0.5}
          mouseRadius={1}
        />
      </div>

      <div className="coming-soon">
        <h1>Coming Soon...</h1>
      </div>
    </>
  )
}

export default App
