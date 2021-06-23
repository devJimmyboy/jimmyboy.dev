import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import LandingPage from "./components/LandingPage";

export default function App() {
  const config = { initialColorMode: "system" };
  const theme = extendTheme({ config });

  return (
    <>
      <ChakraProvider theme={theme}>
        <div className="App">
          <LandingPage className="landPage" />
        </div>
        <Toaster />
      </ChakraProvider>
    </>
  );
}
