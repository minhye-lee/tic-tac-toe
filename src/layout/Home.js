import React, { Component } from 'react';
import User from '../components/User';
import { Link } from 'react-router-dom';

class Home extends Component {
    render () {
        return (
            <div>
                <div>
                    <User />
                </div>
                <button>
                    <Link to = "/game">Game Start! </Link>
                </button>
            </div>
        )
    }
}

export default Home;