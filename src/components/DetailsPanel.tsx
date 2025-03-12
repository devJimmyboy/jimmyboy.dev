import { AnimatePresence, motion } from 'motion/react'
import { Anchor } from '@mantine/core'
import { Icon } from '@iconify/react'
type Props = {
  selected: number
}

export default function DetailsPanel({ selected }: Props) {
  const colors = ['#73bffb', '#ccc571', '#ff69a1', '#977be2', '#73dd96']
  // panel morphs based on selected project
  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0' }}
        animate={{
          height: selected === -1 ? '0%' : '50%',
          minHeight: selected === -1 ? '0px' : '200px',
          width: '95%',
          border: `2px solid ${colors[selected + 1]}`,
        }}
        style={{
          marginTop: '1em',
          borderRadius: '1rem',
          background: '#1c1c1c',
          overflow: 'hidden',
        }}>
        {selected === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="details-panel"
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Anchor
                href="https://github.com/devJimmyboy/pokesmash"
                target="poke-smash"
                style={{ fontSize: '2em', fontWeight: 700, color: '#ccc571', position: 'absolute', top: '1em', right: '1em' }}>
                <Icon icon="fa6-brands:github" style={{ fontSize: '1em', marginLeft: '0.25em' }} />
              </Anchor>
              <Anchor href="https://pokesmash.xyz" target="poke-smash" style={{ fontSize: '2em', fontWeight: 700, color: '#ccc571' }}>
                PokeSmash <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>
              <p>
                My first major project
                <br /> It's amassed over <strong>1.2 Million unique users</strong> since 2022.
                <br /> Smash or Pass for Pokemon.
                <br />
                <br />
                <strong>Made using Next.js, Firebase, and Material UI.</strong>
              </p>
            </div>
            <motion.img src="/pokesmash.png" alt="PokeSmash Website" style={{ height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #ccc571' }} />
          </motion.div>
        )}
        {selected === 1 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="details-panel"
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* <Anchor
                href="https://github.com/devJimmyboy/pokesmash"
                target="crypto-investment-github"
                style={{
                  fontSize: '2em',
                  fontWeight: 700,
                  color: '#ff69a1',
                  position: 'absolute',
                  top: '1em',
                  right: '1em',
                }}>
                <Icon icon="fa6-brands:github" style={{ fontSize: '1em', marginLeft: '0.25em' }} />
              </Anchor> */}
              <Anchor href="https://crypto.peepo.dev/" target="crypto-investment" style={{ fontSize: '2em', fontWeight: 700, color: '#ff69a1' }}>
                Crypto Investment Tracker <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>
              <p>
                Commissioned project for <Anchor href="https://twitch.tv/mizkif">Mizkif.</Anchor>
                <br />
                <span>2 Streamers' chats choose 10 cryptos to invest $10,000 in. After one month they see how much they made and who profited the most.</span>
                <br />
                <br />
                <strong>Made using React, ReCharts, Joy UI (Material UI), Express, and PostgreSQL (Prisma).</strong>
              </p>
            </div>
            <motion.img src="/crypto-tracker.png" alt="Deal or No Deal" style={{ height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #ff69a1' }} />
          </motion.div>
        )}
        {selected === 2 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="details-panel"
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* <Anchor
                href="https://github.com/devJimmyboy/pokesmash"
                target="deal-or-no-deal-github"
                style={{
                  fontSize: '2em',
                  fontWeight: 700,
                  color: '#977be2',
                  position: 'absolute',
                  top: '1em',
                  right: '1em',
                }}>
                <Icon icon="fa6-brands:github" style={{ fontSize: '1em', marginLeft: '0.25em' }} />
              </Anchor> */}
              <Anchor href="https://deal-or-no-deal.pages.dev/" target="deal-or-no-deal" style={{ fontSize: '2em', fontWeight: 700, color: '#977be2' }}>
                Twitch Deal or No Deal <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>
              <p>
                Commissioned project for <Anchor href="https://twitch.tv/mizkif">Mizkif.</Anchor>
                <br />
                Spinoff game of the popular TV show designed for Twitch chat engagement. The <Anchor href="https://youtu.be/B_vQky3wUWk?t=1226">final stream</Anchor> amassed over 25,000 concurrent
                viewers.
                <br />
                <br />
                <strong>Made using Phaser.js.</strong>
              </p>
            </div>
            <motion.img src="/deal-or-no-deal.png" alt="Deal or No Deal" style={{ height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #977be2' }} />
          </motion.div>
        )}
        {selected === 3 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="details-panel"
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Anchor
                href="https://github.com/Jimmyboy-dev/PeepoSings"
                target="peepo-sings-github"
                style={{
                  fontSize: '2em',
                  fontWeight: 700,
                  color: '#73dd96',
                  position: 'absolute',
                  top: '1em',
                  right: '1em',
                }}>
                <Icon icon="fa6-brands:github" style={{ fontSize: '1em', marginLeft: '0.25em' }} />
              </Anchor>
              <Anchor href="https://sings.peepo.dev" target="peepo-sings" style={{ fontSize: '2em', fontWeight: 700, color: '#73dd96' }}>
                Peepo Sings <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>

              <p>
                Desktop Music Player app that takes the unique idea of putting playlists into songs compared to the norm of songs into playlists.
                <br />
                <br />
                <strong> Used Electron, Web Audio API, SQLite, MantineUI, and Dependency Injection.</strong>
              </p>
            </div>
            <motion.img src="/sings.png" alt="Peepo Sings Music player interface" style={{ right: 0, height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #73dd96' }} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
