import { Button, Group } from '@mantine/core'

type Props = {}

export default function NavBar({}: Props) {
  return (
    <Group
      style={{
        position: 'fixed',
        width: '100vw',
        height: '5rem',
        padding: '0 1rem',
        background: 'linear-gradient(180deg, #1c1c1c,#1c1c1c, transparent)',
        top: 0,
        zIndex: 100,
        // borderBottom: '1px solid #c9c9c9',
      }}>
      <h1>Jimmyboy.dev</h1>
      <div style={{ flexGrow: 1 }} />
      <Button component="a" variant="transparent" href="mailto:jimmy@jimmyboy.dev">
        Contact
      </Button>
    </Group>
  )
}
