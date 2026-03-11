import NavBar from './components/NavBar'
import ProjectHand from './components/ProjectHand'
import { useState } from 'react'
import DetailsPanel from './components/DetailsPanel'

export default function App() {
  const [selected, setSelected] = useState(-1)

  return (
    <>
      <NavBar />

      {/* Full-screen layout anchored to bottom so details panel pushes cards up */}
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '3.5rem',
          paddingTop: '5rem',
          boxSizing: 'border-box',
          gap: '1.5rem',
        }}>
        <ProjectHand selected={selected} setSelected={setSelected} />
        <DetailsPanel selected={selected} />
      </div>

      <div style={{ position: 'fixed', bottom: 4, left: 6, color: '#5a5a6a', fontWeight: 600, fontSize: '0.78em', pointerEvents: 'none' }}>
        Work in progress — judge sparingly :)
      </div>
    </>
  )
}
