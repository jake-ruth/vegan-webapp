import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.scss';
import { BaseRouter } from './router';

function App() {
  const theme = createMuiTheme({
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
      button: {
        //fontFamily: '"Segoe UI"',
        fontStyle: 'bold'
      },
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  });

  return (
    <header data-testid='app-element'>
      <MuiThemeProvider theme={theme}>
        <BaseRouter />
      </MuiThemeProvider>
    </header>
  );
}

export default App;
