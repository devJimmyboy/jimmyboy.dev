import { useEffect, useState } from 'react'
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

/** Mirrors the card size formula in CSS so layout math is always in sync. */
function computeCardWidth(vw: number): number {
  if (vw <= 480) return Math.min(130, Math.max(85, vw * 0.24))
  return Math.min(260, Math.max(160, vw * 0.15))
}

function useCardWidth() {
  const [cardWidth, setCardWidth] = useState(() => computeCardWidth(window.innerWidth))
  useEffect(() => {
    const onResize = () => setCardWidth(computeCardWidth(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return cardWidth
}

export default function ProjectHand({ selected, setSelected }: Props) {
  const total = projects.length
  const cardWidth = useCardWidth()

  const overlapFactor = 0.52
  const totalWidth = cardWidth + (total - 1) * cardWidth * overlapFactor

  return (
    <div
      className="project-hand"
      style={{
        position: 'relative',
        width: `min(${totalWidth}px, 92vw)`,
        // Height accommodates card + lift headroom for selected card
        height: cardWidth * 1.4 + 70,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
      {projects.map((project, i) => {
        const offsetX = (i - (total - 1) / 2) * (cardWidth * overlapFactor)
        return (
          <PerspectiveCard
            key={project.index}
            project={project}
            selected={selected === i}
            handIndex={i}
            totalCards={total}
            cardWidth={cardWidth}
            zIndex={i + 1}
            dealDelay={i * 0.12}
            style={{ left: `calc(50% + ${offsetX}px - ${cardWidth / 2}px)` }}
            onClick={() => setSelected(selected !== i ? i : -1)}
          />
        )
      })}
    </div>
  )
}
