import React from 'react';
import './App.scss';
import { BaseRouter } from './router';

function App() {
  return (
    <header data-testid="app-element">
      <BaseRouter />
    </header>
  );
}

export default App;
