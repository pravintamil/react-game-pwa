import React from 'react';
import './App.css';
import { GuessingGame } from './features/guessing-game/GuessingGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GuessingGame />
      </header>
    </div>
  );
}

export default App;
