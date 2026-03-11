import React, { useEffect, useRef } from 'react'
import { motion, useSpring } from 'motion/react'

export type ProjectData = {
  index: number
  name: string
  rank: string
  suit: string
  suitSymbol: string
  color: string
  accentColor: string
  gradient: string
}

type Props = {
  project: ProjectData
  onClick?: () => void
  style?: React.CSSProperties
  selected: boolean
  handIndex: number
  totalCards: number
  cardWidth: number
  zIndex: number
  dealDelay: number
}

export default function PerspectiveCard({ project, onClick, style, selected, handIndex, totalCards, cardWidth, zIndex, dealDelay }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prevSelected = useRef(false)

  const rotateX = useSpring(0, { stiffness: 260, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 260, damping: 20 })
  const liftY = useSpring(0, { stiffness: 320, damping: 26 })
  const [isHovered, setIsHovered] = React.useState(false)

  // Fan angle: spread cards across an arc
  const spread = Math.min(12, (totalCards - 1) * 3.5)
  const fanAngle = totalCards > 1 ? -spread + (handIndex / (totalCards - 1)) * spread * 2 : 0

  // Vertical arc: outer cards sit slightly higher than centre
  const midOffset = (totalCards - 1) / 2
  const arcY = Math.abs(handIndex - midOffset) * -5

  useEffect(() => {
    const wasSelected = prevSelected.current
    prevSelected.current = selected

    liftY.set(selected ? -60 : 0)

    if (selected && !wasSelected) {
      // Jiggle sequence on selection
      rotateX.set(-10)
      rotateY.set(8)
      const t1 = setTimeout(() => { rotateX.set(7);  rotateY.set(-10) }, 120)
      const t2 = setTimeout(() => { rotateX.set(-4); rotateY.set(5)  }, 240)
      const t3 = setTimeout(() => { rotateX.set(2);  rotateY.set(-3) }, 360)
      const t4 = setTimeout(() => { rotateX.set(0);  rotateY.set(0)  }, 480)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
    } else if (!selected && wasSelected) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }, [selected])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const halfW = rect.width / 2
    const halfH = rect.height / 2
    rotateY.set(((e.clientX - rect.left - halfW) / halfW) * 14)
    rotateX.set(((halfH - (e.clientY - rect.top)) / halfH) * 10)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="balatro-card-wrapper"
      style={{
        zIndex: selected ? 1000 : isHovered ? 500 : zIndex,
        rotate: fanAngle,
        translateY: arcY,
        position: 'absolute',
        transformOrigin: 'bottom center',
        ...style,
      }}
      initial={{
        y: '-110vh',
        rotate: fanAngle + (Math.random() * 20 - 10),
        opacity: 0,
      }}
      animate={{ y: 0, rotate: fanAngle, opacity: 1 }}
      transition={{
        delay: dealDelay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.2, delay: dealDelay },
      }}>
      <motion.div
        className="balatro-card"
        style={{
          width: cardWidth,
          rotateX,
          rotateY,
          translateY: liftY,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        whileHover={{ scale: 1.07 }}
        transition={{ scale: { duration: 0.15 } }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}>

        <div
          className="card-face"
          style={{ background: project.gradient, borderColor: project.accentColor }}>
          <div className="card-inner-border" style={{ borderColor: `${project.accentColor}55` }} />

          <div className="card-corner card-corner-tl" style={{ color: project.accentColor }}>
            <span className="card-rank">{project.rank}</span>
            <span className="card-suit-small">{project.suitSymbol}</span>
          </div>

          <div className="card-center">
            <span className="card-suit-large" style={{ color: project.accentColor }}>{project.suitSymbol}</span>
            <span className="card-center-name" style={{ color: project.accentColor }}>{project.name}</span>
          </div>

          <div className="card-corner card-corner-br" style={{ color: project.accentColor }}>
            <span className="card-rank">{project.rank}</span>
            <span className="card-suit-small">{project.suitSymbol}</span>
          </div>

          {selected && (
            <motion.div
              className="card-selected-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ boxShadow: `0 0 28px 6px ${project.accentColor}77, inset 0 0 18px ${project.accentColor}22` }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
