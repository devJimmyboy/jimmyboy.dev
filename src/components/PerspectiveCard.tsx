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
  zIndex: number
  dealDelay: number
}

export default function PerspectiveCard({ project, onClick, style, selected, handIndex, totalCards, zIndex, dealDelay }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const rotateX = useSpring(0, { stiffness: 280, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 280, damping: 22 })
  const liftY = useSpring(0, { stiffness: 320, damping: 26 })
  const [isHovered, setIsHovered] = React.useState(false)

  // Fan angle: spread cards across an arc
  const spread = Math.min(12, (totalCards - 1) * 3.5)
  const fanAngle = totalCards > 1
    ? -spread + (handIndex / (totalCards - 1)) * spread * 2
    : 0

  // Vertical arc: middle cards slightly lower
  const midOffset = (totalCards - 1) / 2
  const arcY = Math.abs(handIndex - midOffset) * -6

  useEffect(() => {
    liftY.set(selected ? -52 : 0)
  }, [selected])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const halfW = rect.width / 2
    const halfH = rect.height / 2
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    rotateY.set(((mouseX - halfW) / halfW) * 14)
    rotateX.set(((halfH - mouseY) / halfH) * 10)
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
      animate={{
        y: 0,
        rotate: fanAngle,
        opacity: 1,
      }}
      transition={{
        delay: dealDelay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.2, delay: dealDelay },
      }}>
      <motion.div
        className="balatro-card"
        style={{
          rotateX,
          rotateY,
          translateY: liftY,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        whileHover={{ scale: 1.06 }}
        transition={{ scale: { duration: 0.15 } }}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}>

        {/* Card face */}
        <div
          className="card-face"
          style={{
            background: project.gradient,
            borderColor: project.accentColor,
          }}>
          {/* Inner decorative border */}
          <div className="card-inner-border" style={{ borderColor: `${project.accentColor}66` }} />

          {/* Top-left rank + suit */}
          <div className="card-corner card-corner-tl" style={{ color: project.accentColor }}>
            <span className="card-rank">{project.rank}</span>
            <span className="card-suit-small">{project.suitSymbol}</span>
          </div>

          {/* Center suit symbol */}
          <div className="card-center">
            <span className="card-suit-large" style={{ color: project.accentColor }}>{project.suitSymbol}</span>
            <span className="card-center-name" style={{ color: project.accentColor }}>{project.name}</span>
          </div>

          {/* Bottom-right rank + suit (flipped) */}
          <div className="card-corner card-corner-br" style={{ color: project.accentColor }}>
            <span className="card-rank">{project.rank}</span>
            <span className="card-suit-small">{project.suitSymbol}</span>
          </div>

          {/* Selection glow */}
          {selected && (
            <motion.div
              className="card-selected-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ boxShadow: `0 0 30px 8px ${project.accentColor}88, inset 0 0 20px ${project.accentColor}33` }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
