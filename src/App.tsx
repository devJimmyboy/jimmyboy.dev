import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import { Router } from './Router'
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion'

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto" stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <Router />
      </MantineEmotionProvider>
    </MantineProvider>
  )
}
