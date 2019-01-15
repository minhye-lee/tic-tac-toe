import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Game from './layout/Game';
import Home from './layout/Home';

class App extends Component {
  // state = { username: null };
  // componentDidMount() {
  //   fetch('/api/getUsername')
  //   .then(res => res.json())
  //   .then(user => this.setState({ username: user.username }));
//}

  render() {
    //const { username } = this.state;
    return(
      <BrowserRouter>
      <div>
          <Route exact path="/" component={Home}/>
          <Route path="/game" component={Game} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;