import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#303030'
    },
    secondary: {
      main: '#FF5E5B'
    },
    error: {
      main: '#FF5E5B'
    },
    success: {
      main: '#20b2aa'
    }
  },
  typography: {
    fontFamily: ['Verdana'].join(',')
  }
});
