import * as React from 'react';
import Board from "../components/Board";
import GameSetting from "../components/GameSetting";
import Status from "../components/Status";
import Score from "../components/Score";

const Game : React.StatelessComponent = () => {
    return (
        <div>
            <GameSetting />
            <Board />
            <Status />
            <Score />
        </div>
    );
}
export default Game;