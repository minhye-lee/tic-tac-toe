import React from 'react';
import Game from './components/Game';
import Status from './components/Status';

const App =  () => {
  return(
    <div className="app">
      <Game />
      <Status />
    </div>
  );
}

export default App;