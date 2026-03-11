import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Anchor } from '@mantine/core'
import { Icon } from '@iconify/react'

type Props = {
  selected: number
  onClose: () => void
}

const projects = [
  {
    index: 0,
    name: 'PokeSmash',
    color: '#f0e080',
    liveUrl: 'https://pokesmash.xyz',
    githubUrl: 'https://github.com/devJimmyboy/pokesmash',
    image: '/pokesmash.png',
    description: (
      <>
        My first major project — it's amassed over <strong>1.2 Million unique users</strong> since 2022.
        <br />
        Smash or Pass for Pokémon.
      </>
    ),
    stack: 'Next.js · Firebase · Material UI',
  },
  {
    index: 1,
    name: 'Crypto Investment Tracker',
    color: '#ff8fbf',
    liveUrl: 'https://crypto.peepo.dev/',
    githubUrl: null,
    image: '/crypto-tracker.png',
    description: (
      <>
        Commissioned project for <Anchor href="https://twitch.tv/mizkif" style={{ color: '#ff8fbf' }}>Mizkif</Anchor>.
        <br />
        2 streamers' chats each pick 10 cryptos to invest $10,000 in and see who profits after a month.
      </>
    ),
    stack: 'React · ReCharts · Joy UI · Express · PostgreSQL',
  },
  {
    index: 2,
    name: 'Twitch Deal or No Deal',
    color: '#b89ff0',
    liveUrl: 'https://deal-or-no-deal.pages.dev/',
    githubUrl: null,
    image: '/deal-or-no-deal.png',
    description: (
      <>
        Commissioned project for <Anchor href="https://twitch.tv/mizkif" style={{ color: '#b89ff0' }}>Mizkif</Anchor>.
        <br />
        Twitch-integrated Deal or No Deal. The{' '}
        <Anchor href="https://youtu.be/B_vQky3wUWk?t=1226" style={{ color: '#b89ff0' }}>final stream</Anchor>{' '}
        hit <strong>25,000 concurrent viewers</strong>.
      </>
    ),
    stack: 'Phaser.js',
  },
  {
    index: 3,
    name: 'Peepo Sings',
    color: '#90f0b0',
    liveUrl: 'https://sings.peepo.dev',
    githubUrl: 'https://github.com/Jimmyboy-dev/PeepoSings',
    image: '/sings.png',
    description: (
      <>
        Desktop music player with a novel idea: put playlists <em>into</em> songs instead of songs into playlists.
      </>
    ),
    stack: 'Electron · Web Audio API · SQLite · MantineUI',
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

function ProjectContent({ project }: { project: (typeof projects)[number] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.index}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
        {/* Text */}
        <div style={{ flex: 1, padding: '1.4em 1.8em', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, gap: '0.45em' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', flexWrap: 'wrap' }}>
            <Anchor
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'clamp(1.05em, 2.2vw, 1.55em)', fontWeight: 700, color: project.color, lineHeight: 1.2 }}>
              {project.name}{' '}
              <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.5em', verticalAlign: 'middle' }} />
            </Anchor>
            {project.githubUrl && (
              <Anchor href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: project.color, fontSize: '1.35em', lineHeight: 1 }}>
                <Icon icon="fa6-brands:github" />
              </Anchor>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(0.78em, 1.35vw, 0.92em)', lineHeight: 1.65, color: '#ccc' }}>
            {project.description}
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(0.68em, 1.1vw, 0.8em)', color: `${project.color}cc`, fontWeight: 600, letterSpacing: '0.03em' }}>
            {project.stack}
          </p>
        </div>
        {/* Screenshot */}
        <div style={{ flexShrink: 0, borderLeft: `3px solid ${project.color}55`, overflow: 'hidden', maxWidth: '42%' }}>
          <img src={project.image} alt={project.name} style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function DetailsPanel({ selected, onClose }: Props) {
  const project = selected >= 0 ? projects[selected] : null
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <AnimatePresence>
          {project && (
            <motion.div
              className="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
            />
          )}
        </AnimatePresence>

        {/* Bottom sheet */}
        <motion.div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 950,
            background: '#18181e',
            borderTop: project ? `2px solid ${project.color}55` : '2px solid transparent',
            borderRadius: '18px 18px 0 0',
            padding: '12px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
            overflow: 'hidden',
          }}
          initial={false}
          animate={{ y: project ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 34, stiffness: 320 }}>
          <div className="sheet-handle" />
          <div style={{ height: 'clamp(200px, 42vh, 320px)', overflow: 'hidden' }}>
            {project && <ProjectContent project={project} />}
          </div>
        </motion.div>
      </>
    )
  }

  // Desktop: inline panel that pushes the hand up
  return (
    <motion.div
      initial={false}
      animate={{
        height: project ? 'clamp(180px, 34vh, 320px)' : '0px',
        opacity: project ? 1 : 0,
      }}
      transition={{ duration: 0.36, ease: [0.32, 0, 0.2, 1] }}
      style={{
        width: '95%',
        maxWidth: '960px',
        overflow: 'hidden',
        borderRadius: '1rem',
        flexShrink: 0,
        background: project ? '#18181e' : 'transparent',
        border: project ? `2px solid ${project.color}55` : '2px solid transparent',
      }}>
      {project && <ProjectContent project={project} />}
    </motion.div>
  )
}
