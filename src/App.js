import React, { Component } from 'react';
import Game from './components/Game';
import Status from './components/Status';
import Board from './components/Board';
import User from './components/User';

class App extends Component {
  state = { username: null };
  componentDidMount() {
    fetch('/api/getUsername')
    .then(res => res.json())
    .then(user => this.setState({ username: user.username }));
    
}

  render() {
    const { username } = this.state;
    return(
      <div className="app">
        <User />
        <Game />
        <Board />
        <Status />
        <div>
              {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        </div>
      </div>
    );
  }
}

export default App;