import { Stack } from '@mantine/core'
import NavBar from './components/NavBar'
import ProjectHand from './components/ProjectHand'
import { useState } from 'react'
import DetailsPanel from './components/DetailsPanel'

export default function App() {
  const [selected, setSelected] = useState(-1)
  return (
    <>
      <Stack w="100vw" h="100vh" justify="center" align="center" pb="3em" pt="6em">
        <NavBar />
        <ProjectHand selected={selected} setSelected={setSelected} />
        <DetailsPanel selected={selected} />
      </Stack>
      <div style={{ position: 'absolute', bottom: 2, left: 2, color: '#7b7b7b', fontWeight: 600, fontSize: '0.9em' }}>This website is a work in progress. Please judge sparingly :)</div>
    </>
  )
}
