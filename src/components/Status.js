import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goToMove } from '../redux/actions';

class Status extends Component {
    render () {
        const winner = this.props.winner;
        let status;

        if(winner) {
            status = 'Winner : ' + winner;
        }
        else if(this.props.isDraw) {
            status = 'Draw!!!';
        }
        else {
            status = 'Next Player : ' + (this.props.isNextX ? "X" : "O");
        }

        const moves = this.props.squaresHistory.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return(
              <li key={move}><button onClick={() => this.props.goToMove(move)}>{desc}</button></li>
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

const mapStateToProps = (state) => ({
    winner : state.winner,
    isNextX : state.isNextX,
    isDraw : state.isDraw,
    squaresHistory : state.squaresHistory
})

const mapDispatchToProps = (dispatch) => ({
    goToMove(index) {
        dispatch(goToMove(index));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);