import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.scss';
import { BaseRouter } from './router';
import firebase from 'firebase';
import { UserContext } from './context';
import { AuthService } from './utils/AuthService';
import { theme } from './utils/theme';
import { firebaseConfig } from './utils/firebaseConfig';

function App() {
  const [user, setUser] = React.useState(AuthService.getUserFromStorage());
  React.useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <header data-testid='app-element'>
      <MuiThemeProvider theme={theme}>
        {/* Global user for app */}
        <UserContext.Provider value={{ user, setUser }}>
          <BaseRouter />
        </UserContext.Provider>
      </MuiThemeProvider>
    </header>
  );
}

export default App;
