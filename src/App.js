import './App.css';
import LandingPage from './components/LandingPage'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

export default function App() {
  const config = { initialColorMode: "system"};
  const theme = extendTheme({config});

  return (<>
    <ChakraProvider theme={theme}>
      <div className="App">
          <LandingPage className="landPage"/>
      </div>
    </ChakraProvider>
  </>
  );
}


