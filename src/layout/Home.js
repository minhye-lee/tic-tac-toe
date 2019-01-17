import React, { Component } from 'react';
import User from '../components/User';
import SignUp from '../components/SignUp';
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
                <div>
                    <SignUp />
                </div>
            </div>
        )
    }
}

export default Home;