import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { LoginPage } from './pages/LoginPage';
import { BaseRouter } from './router';

function App() {
  return (
    <header>
      <BaseRouter />
    </header>
  );
}

export default App;
