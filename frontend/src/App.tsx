import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.scss';
import { BaseRouter } from './router';
import firebase from 'firebase';

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
      fontFamily: ['Verdana'].join(',')
    }
  });

  var firebaseConfig = {
    apiKey: 'AIzaSyAkL0lof7kkTmXwPw_xsyf57ZkrUwIbVxo',
    authDomain: 'vegan-webapp.firebaseapp.com',
    databaseURL: 'https://vegan-webapp.firebaseio.com',
    projectId: 'vegan-webapp',
    storageBucket: 'vegan-webapp.appspot.com',
    messagingSenderId: '29504851544',
    appId: '1:29504851544:web:f3981ecbd3eb6f51c7042d',
    measurementId: 'G-2B8615KNJN'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  return (
    <header data-testid='app-element'>
      <MuiThemeProvider theme={theme}>
        <BaseRouter />
      </MuiThemeProvider>
    </header>
  );
}

export default App;
