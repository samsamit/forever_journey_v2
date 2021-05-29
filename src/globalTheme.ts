import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, amber, red, blue } from '@material-ui/core/colors';

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {

  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {

  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    health: Palette['primary'];
    mana: Palette['primary'];
  }
  interface PaletteOptions {
    health: PaletteOptions['primary'];
    mana: PaletteOptions['primary'];
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: amber[500],
      contrastText: deepPurple[900],
    },
    health: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000'
    },
    mana: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
    }
  }
});