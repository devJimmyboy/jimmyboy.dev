import PerspectiveCard, { ProjectData } from './PerspectiveCard'

type Props = {
  selected: number
  setSelected: (index: number) => void
}

const projects: ProjectData[] = [
  {
    index: 0,
    name: 'PokeSmash',
    rank: 'A',
    suit: 'spades',
    suitSymbol: '♠',
    color: '#ccc771',
    accentColor: '#f0e080',
    gradient: 'linear-gradient(145deg, #2a2318 0%, #3d3420 40%, #1e1a10 100%)',
  },
  {
    index: 1,
    name: 'Crypto Tracker',
    rank: 'K',
    suit: 'hearts',
    suitSymbol: '♥',
    color: '#ff69a1',
    accentColor: '#ff8fbf',
    gradient: 'linear-gradient(145deg, #2a1520 0%, #3d1f2e 40%, #1e0f18 100%)',
  },
  {
    index: 2,
    name: 'Deal or No Deal',
    rank: 'Q',
    suit: 'diamonds',
    suitSymbol: '♦',
    color: '#987ce3',
    accentColor: '#b89ff0',
    gradient: 'linear-gradient(145deg, #1a1530 0%, #251e42 40%, #100f20 100%)',
  },
  {
    index: 3,
    name: 'Peepo Sings',
    rank: 'J',
    suit: 'clubs',
    suitSymbol: '♣',
    color: '#75de98',
    accentColor: '#90f0b0',
    gradient: 'linear-gradient(145deg, #0f2018 0%, #172d20 40%, #0a1810 100%)',
  },
]

export default function ProjectHand({ selected, setSelected }: Props) {
  const total = projects.length

  // Horizontal overlap: each card offset so they fan/overlap
  const cardWidth = 160 // px, approximate rendered card width
  const overlapFactor = 0.55 // how much each card overlaps the previous
  const totalWidth = cardWidth + (total - 1) * cardWidth * overlapFactor

  return (
    <div
      className="project-hand"
      style={{
        position: 'relative',
        width: `min(${totalWidth}px, 90vw)`,
        height: 'clamp(220px, 38vh, 320px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
      {projects.map((project, i) => {
        // Center the fan
        const offsetX = (i - (total - 1) / 2) * (cardWidth * overlapFactor)

        return (
          <PerspectiveCard
            key={project.index}
            project={project}
            selected={selected === i}
            handIndex={i}
            totalCards={total}
            zIndex={i + 1}
            dealDelay={i * 0.12}
            style={{
              left: `calc(50% + ${offsetX}px - ${cardWidth / 2}px)`,
            }}
            onClick={() => setSelected(selected !== i ? i : -1)}
          />
        )
      })}
    </div>
  )
}
