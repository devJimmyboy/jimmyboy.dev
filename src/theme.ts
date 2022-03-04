import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", sans-serif;'
  },
  palette: {
    mode: "dark",
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    peepo: {
      main: 'rgba(50,150,75,0.9)',
    }
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    peepo: Palette['primary'];
  }
  interface PaletteOptions {
    peepo: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }

}

export default theme;
