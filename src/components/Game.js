import React, {Component} from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import { handleClicked, goToMove, setBoardSize } from '../redux/actions';

class Game extends Component {
    setBoard = (event) => {
        const value = parseInt(event.target.value);
        this.props.setBoardSize(value);
    }
  
    render () {
  
      let _historySquares = this.props.squaresHistory;
      let _currentSquares = _historySquares[_historySquares.length - 1];
  
      let moves = _historySquares.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return(
          <li><button onClick={() => this.props.goToMove(move)}>{desc}</button></li>
        )
      })
        
      return(
        <div className="Game">
            <h1>Tic-Tac-Toe Game</h1>
            <div className="setGameBoard">
                <label>게임판의 크기를 설정해주세요. : </label>
                    <select onChange={this.setBoard}>
                        <option value="3">3 X 3</option>
                        <option value="4">4 X 4</option>
                        <option value="5">5 X 5</option>
                    </select>
            </div>
            <div className="gameBoard">
                <Board boardsize={_currentSquares.squares} onClick={this.props.handleClicked}/>
            </div>
                <ol>
                    {moves}
                </ol>
        </div>
      )
    }
  }
const mapStateToProps = (state) => ({
    squaresHistory : state.squaresHistory,
    isNextX : state.isNextX,
    winner : state.winner,
    
});

const mapDispatchToProps = (dispatch) => ({
    handleClicked(x,y) {
        dispatch(handleClicked({x,y}));
    },
    goToMove(index) {
        dispatch(goToMove(index));
    },
    setBoardSize(event) {
        dispatch(setBoardSize(event));
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(Game);