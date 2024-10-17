import { Anchor, Box, Stack, Text, Title } from '@mantine/core'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle'
import UnderConstruction from '../components/UnderConstruction'
import FrostedGlassBox from '../components/FrostedGlassBox'
import { Canvas } from '@react-three/fiber'
import AnimatedLogo from '../components/AnimatedLogo'

export default function HomePage() {
  return (
    <Stack justify="center" align="center" style={{ background: 'url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3) no-repeat', width: '100vw', height: '100vh' }}>
      <FrostedGlassBox
        p={15}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Title ta="center">
          {/* <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
            Jimmyboy.dev
          </Text> */}
          <AnimatedLogo />
        </Title>
        {/* <Canvas>
        <UnderConstruction />
        </Canvas> */}
        {/* <ColorSchemeToggle /> */}
      </FrostedGlassBox>
    </Stack>
  )
}
