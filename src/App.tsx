import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Game from './layout/Game';
import Home from './layout/Home';


const App = () => {
  return(
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/game" component={Game} />
      </div>
    </BrowserRouter>
  );
}
export default App;