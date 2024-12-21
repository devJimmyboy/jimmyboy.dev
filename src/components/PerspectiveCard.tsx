import React, { useEffect } from 'react'
import { motion, useAnimationFrame, useSpring } from 'motion/react'

type Props = {
  onClick?: () => void
  style?: React.CSSProperties
  selected: boolean
}

export default function PerspectiveCard({ onClick, style, children, selected }: React.PropsWithChildren<Props>) {
  const rotateX = useSpring(0, {
    stiffness: 300,
    damping: 20,
  })
  const rotateY = useSpring(0, {
    stiffness: 300,
    damping: 20,
  })
  const translateY = useSpring(0, {
    stiffness: 300,
    damping: 20,
  })
  const [isHovered, setIsHovered] = React.useState(false)

  useEffect(() => {
    translateY.set(selected ? -30 : 0)
  }, [selected])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const halfCardWidth = card.offsetWidth / 2
    const halfCardHeight = card.offsetHeight / 2
    const mouseX = e.clientX - card.offsetLeft
    const mouseY = e.clientY - card.offsetTop
    const rY = (mouseX - halfCardWidth) / 10
    const rX = (halfCardHeight - mouseY) / 10
    rotateX.set(rX)
    rotateY.set(rY)
  }

  useAnimationFrame(() => {
    const rY = rotateY.get()
    const rX = rotateX.get()
    if (!isHovered && Math.abs(rX) > 0.1 && Math.abs(rY) > 0.1) {
      rotateX.set(rX * 0.7)
      rotateY.set(rY * 0.7)
    }
  })
  return (
    <motion.div
      className="p-card"
      initial={{
        rotateZ: '-50deg',
        scale: 0.01,
      }}
      style={{
        background: 'linear-gradient(45deg, #f3ec78, #af4261)',
        perspective: '1000px 100px',
        rotateX: rotateX,
        rotateY: rotateY,
        translateY: translateY,
        transformStyle: 'preserve-3d',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        border: '3px solid rgba(0, 0, 0, 1)',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      }}
      animate={{
        rotateZ: 0,
        scale: 1,
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}>
      {children}
    </motion.div>
  )
}
