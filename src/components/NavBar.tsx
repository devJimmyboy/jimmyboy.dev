import { ActionIcon, Group } from '@mantine/core'
import { Icon } from '@iconify/react'
type Props = {}

export default function NavBar({}: Props) {
  return (
    <Group
      style={{
        position: 'fixed',
        width: '100vw',
        height: '5rem',
        padding: '0 1rem',
        background: 'linear-gradient(180deg, #1c1c1cc2,#1c1c1ca6, transparent)',
        top: 0,
        zIndex: 100,
        // borderBottom: '1px solid #c9c9c9',
      }}>
      <h1>Jimmyboy.dev</h1>
      <div style={{ flexGrow: 1 }} />
      <ActionIcon.Group>
        <ActionIcon component="a" href="https://github.com/devJimmyboy" variant="transparent" style={{ fontSize: '2em', width: '1.5em', height: '1.5em' }}>
          <Icon icon="fa-brands:github" style={{ filter: 'drop-shadow(0 0 4px #313131)' }} />
        </ActionIcon>
        <ActionIcon component="a" href="mailto:jimmy@jimmyboy.dev" variant="transparent" style={{ fontSize: '2em', width: '1.5em', height: '1.5em' }}>
          <Icon icon="fa-solid:envelope" style={{ filter: 'drop-shadow(0 0 4px #313131)' }} />
        </ActionIcon>
      </ActionIcon.Group>
    </Group>
  )
}
