import { Group } from '@mantine/core'
import PerspectiveCard from './PerspectiveCard'

type Props = {
  selected: number
  setSelected: (index: number) => void
}

export default function ProjectHand({ selected, setSelected }: Props) {
  return (
    <Group justify="space-around" w="100%">
      <PerspectiveCard
        selected={selected === 0}
        style={{
          background: 'linear-gradient(45deg, #ccc771, #af4261)',
        }}
        onClick={() => (selected !== 0 ? setSelected(0) : setSelected(-1))}>
        <h2>PokeSmash</h2>
      </PerspectiveCard>
      <PerspectiveCard
        selected={selected === 1}
        style={{
          background: 'linear-gradient(45deg, #987ce3, #480e9f)',
        }}
        onClick={() => (selected !== 1 ? setSelected(1) : setSelected(-1))}>
        <h2>Deal or No Deal</h2>
      </PerspectiveCard>
      <PerspectiveCard
        selected={selected === 2}
        style={{
          background: 'linear-gradient(45deg, #75de98, #0c7524)',
        }}
        onClick={() => (selected !== 2 ? setSelected(2) : setSelected(-1))}>
        <h2>Peepo Sings</h2>
      </PerspectiveCard>
    </Group>
  )
}
