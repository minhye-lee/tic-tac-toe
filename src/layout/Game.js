import React,  { Component}  from 'react';
import Board from "../components/Board";
import GameSetting from "../components/GameSetting";
import Status from "../components/Status";

class Game extends Component {
    render () {
        return (
            <div>
                <GameSetting />
                <Board />
                <Status />
            </div>
        );
    }
}

export default Game;