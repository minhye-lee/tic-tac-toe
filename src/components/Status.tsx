import * as React from 'react';
import { returntypeof } from'react-redux-typescript';
import { connect } from 'react-redux';
import { goToMove } from '../redux/actions';

const mapStateToProps = state => ({
    winner : state.game.winner,
    isNextX : state.game.isNextX,
    isDraw : state.game.isDraw,
    squaresHistory : state.game.squaresHistory,
    xyHistory : state.game.xyHistory,
    curUser1 : state.user.curUser1,
    curUser2 : state.user.curUser2
})
const mapDispatchToProps = {
    goToMove
}
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

class Status extends React.Component<Props> {

    render () {
        const { winner, isNextX, isDraw, curUser1, curUser2, squaresHistory, goToMove, xyHistory } = this.props;
        let curWinner = null;
        let status;

        if(winner === 'X') {
            curWinner = curUser1.name;
        }
        else if(winner === 'O'){
            curWinner = curUser2.name;
        }
        else{
            curWinner = null
        }

        if(curWinner) {
            status = `Winner :  ${curWinner}`;
        }
        else if(isDraw) {
            status = 'Draw!!!';
        }
        else {
            status = `Next Player : ${isNextX ? curUser1.name : curUser2.name}`;
        }


        const moves = squaresHistory.map((_, move) => {
            const desc = move ? `Go to move # ( ${xyHistory[move-1]}  )`: `Go to game start`;
            return(
              <li key={move}><button onClick={() => goToMove(move)}>{desc}</button></li>
            )
          })
           

        return (
            <div className="gameInfo">
                <div>
                    {status}
                </div>
                <ol>
                    {moves}
                </ol>
            </div>
            
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Status);