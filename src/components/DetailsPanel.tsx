import { AnimatePresence, motion } from 'motion/react'
import { Anchor } from '@mantine/core'
import { Icon } from '@iconify/react'

type Props = {
  selected: number
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

export default function DetailsPanel({ selected }: Props) {
  const project = selected >= 0 ? projects[selected] : null

  return (
    <motion.div
      className="details-panel-container"
      initial={false}
      animate={{
        height: project ? 'clamp(180px, 38vh, 340px)' : '0px',
        opacity: project ? 1 : 0,
      }}
      transition={{ duration: 0.38, ease: [0.32, 0, 0.2, 1] }}
      style={{
        width: '95%',
        maxWidth: '900px',
        overflow: 'hidden',
        borderRadius: '1rem',
        flexShrink: 0,
      }}>
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={project.index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              background: '#18181e',
              border: `2px solid ${project.color}55`,
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'stretch',
              overflow: 'hidden',
            }}>
            {/* Text section */}
            <div style={{ flex: 1, padding: '1.6em 2em', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, gap: '0.5em' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75em', flexWrap: 'wrap' }}>
                <Anchor
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 'clamp(1.1em, 2.5vw, 1.6em)', fontWeight: 700, color: project.color, lineHeight: 1.2 }}>
                  {project.name}{' '}
                  <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.55em', verticalAlign: 'middle' }} />
                </Anchor>
                {project.githubUrl && (
                  <Anchor
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: project.color, fontSize: '1.4em', lineHeight: 1 }}>
                    <Icon icon="fa6-brands:github" />
                  </Anchor>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 'clamp(0.8em, 1.4vw, 0.95em)', lineHeight: 1.6, color: '#ccc' }}>
                {project.description}
              </p>
              <p style={{ margin: 0, fontSize: 'clamp(0.7em, 1.2vw, 0.82em)', color: `${project.color}cc`, fontWeight: 600, letterSpacing: '0.03em' }}>
                {project.stack}
              </p>
            </div>

            {/* Screenshot */}
            <div style={{ flexShrink: 0, borderLeft: `4px solid ${project.color}66`, overflow: 'hidden', maxWidth: '45%' }}>
              <img
                src={project.image}
                alt={project.name}
                style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
