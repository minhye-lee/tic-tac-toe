import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Game from './layout/Game';
import Home from './layout/Home';

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
      <BrowserRouter>
      <div>
          <Route exact path="/" component={Home}/>
          <Route path="/game" component={Game} />

          {/* express 잘 연동 되었는지 확인용 */}
          <div>
              {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;