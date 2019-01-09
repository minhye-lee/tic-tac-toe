import React from 'react';
import Game from './components/Game';
import Status from './components/Status';
import Board from './components/Board';

const App =  () => {
  return(
    <div className="app">
      <Game />
      <Board />
      <Status />
    </div>
  );
}

export default App;