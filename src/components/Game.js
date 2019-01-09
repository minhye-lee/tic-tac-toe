import React, {Component} from 'react';
import Board from './Board';
import { connect } from 'react-redux';
import { handleClicked } from '../redux/actions';

class Game extends Component {
    setBoard = (event) => {
  
      console.log(event.target.value);
      const squaresSize =  Array(parseInt(event.target.value)).fill(null).map(() => Array(parseInt(event.target.value)).fill(null));
      this.setState({
        squaresHistory : [{
          squares : squaresSize,
        }]
       })
      console.log(squaresSize);
    }

    jumpTo (move) {
  
      this.setState({
        squaresHistory : this.state.squaresHistory.slice(0, move+1),
        isNextX : (move % 2) === 0,
        isDraw : false
      })
    }
  
    checkDraw (squares) {
      let _isDraw = true;
      for(let i = 0; i < squares.length; i++){
        for(let j = 0; j < squares.length; j++){
          if(squares[i][j] === null){
            _isDraw = false;
          }
        }
      }
      if(_isDraw){
        this.setState({
          isDraw : true
        })
      }
    }
  
    render () {
  
      let _historySquares = this.props.squaresHistory;
      let _currentSquares = _historySquares[_historySquares.length - 1];
  
      let moves = _historySquares.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return(
          <li><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
        )
      })
  
      let winner = this.props.winner;
      console.log("winner " + winner);
      let status;
      
      if(winner) {
        status = 'Winner : ' + winner;
       }
       else if(this.props.isDraw) {
         status = 'Draw!';
      }
       else {
        status = 'Next player : ' + (this.props.isNextX ? "X" : "O");
      }
  
      return(
        <div className="Game">
          <div className="setGameBoard">
            <label>게임판의 크기를 설정해주세요. :</label>
            <select onChange={this.setBoard}>
              <option value="3">3X3</option>
              <option value="4">4X4</option>
              <option value="5">5X5</option>
            </select>
          </div>
          <div className="gameBoard">
          <Board boardsize={_currentSquares.squares} onClick={this.props.handleClicked}/>
          </div>
          <div className="gameInfo">
            <div>{status}</div>
            <ol>
              {moves}
            </ol>
          </div>
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Game);