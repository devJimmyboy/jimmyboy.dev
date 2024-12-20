import { AnimatePresence, motion } from 'motion/react'
import { Anchor } from '@mantine/core'
import { Icon } from '@iconify/react'
type Props = {
  selected: number
}

export default function DetailsPanel({ selected }: Props) {
  const colors = ['#73bffb', '#ccc571', '#977be2', '#73dd96']
  // panel morphs based on selected project
  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: '0' }}
        animate={{
          height: selected === -1 ? '0%' : '50%',
          width: '95%',
          border: `2px solid ${colors[selected + 1]}`,
        }}
        style={{
          marginTop: '1em',
          borderRadius: '1rem',
          background: 'linear-gradient(180deg, #1c1c1c 97%, transparent)',
          overflow: 'hidden',
        }}>
        {selected === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%' }}>
              <Anchor href="https://pokesmash.xyz" target="poke-smash" style={{ fontSize: '2em', fontWeight: 700, color: '#ccc571' }}>
                PokeSmash <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>
              <p>
                Smash or Pass for Pokemon.
                <br />
                Made using Next.js, Firebase, and Material UI.
              </p>
            </div>
            <motion.img src="https://i.nuuls.com/9jxb6.png" alt="Deal or No Deal" style={{ right: 0, height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #ccc571' }} />
          </motion.div>
        )}
        {selected === 1 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%' }}>
              <Anchor href="https://deal-or-no-deal.pages.dev/" target="deal-or-no-deal" style={{ fontSize: '2em', fontWeight: 700, color: '#977be2' }}>
                Twitch Deal or No Deal <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>
              <p>
                Commissioned project for <Anchor href="https://twitch.tv/mizkif">Mizkif.</Anchor>
                <br />
                Made using Phaser.js.
              </p>
            </div>
            <motion.img src="https://i.nuuls.com/fWgvJ.png" alt="Deal or No Deal" style={{ right: 0, height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #977be2' }} />
          </motion.div>
        )}
        {selected === 2 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <div style={{ padding: '2em', width: '100%' }}>
              <Anchor href="https://sings.peepo.dev" target="peepo-sings" style={{ fontSize: '2em', fontWeight: 700, color: '#73dd96' }}>
                Peepo Sings <Icon icon="fa6-solid:arrow-up-right-from-square" style={{ fontSize: '0.6em', marginLeft: '0.25em' }} />
              </Anchor>

              <p>
                Desktop Music Player app that takes the unique idea of putting playlists into songs compared to the norm of songs into playlists.
                <br />
                Used Electron, Web Audio API, SQLite, MantineUI, and Dependency Injection.
              </p>
            </div>
            <motion.img src="https://i.nuuls.com/1mhEW.png" alt="Peepo Sings Music player interface" style={{ right: 0, height: '100%', boxSizing: 'border-box', borderLeft: '8px solid #73dd96' }} />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
