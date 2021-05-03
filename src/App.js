import './App.css';
import LandingPage from './components/LandingPage'
import {ChakraProvider, theme} from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
          
          <LandingPage className="landPage">
          
          </LandingPage>
      </div>
    </ChakraProvider>
  );
}


