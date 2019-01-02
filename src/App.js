import React, {Component} from 'react';

function Square(props){
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends Component{
  renderSquare(x, y) {
    return <Square value={this.props.boardsize[x][y]} onClick={() => this.props.onClick(x,y)} />
  }

  render() {
    const rowSize = this.props.boardsize.map((row, index) => {
      const colSize = this.props.boardsize[index].map((col, index2) => {
        return(
          this.renderSquare(index,index2)
        )
      })
      return(
        <div className="boardRow">{colSize}</div>
      )
    })

    return(
      <div>{rowSize}</div>
    )
  }
}
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squaresHistory: [{
        squares: Array(3).fill(null).map(() => Array(3).fill(null)),
      }],
      isNextX : true,
      stepNumber : 0,
    }
  }

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

  handleClick (x, y) {

    const _historySquares = JSON.parse(JSON.stringify( this.state.squaresHistory ));
    const _currentSquares = JSON.parse(JSON.stringify( _historySquares[_historySquares.length -1] ));
    
    const _squares = _currentSquares.squares.slice();

    if(calculateWinner(_squares) || _squares[x][y]){
      return;
    }
    _squares[x][y] = this.state.isNextX ? "X" : "O";

    this.setState({
      isNextX : !this.state.isNextX,
      squaresHistory : _historySquares.concat([{squares : _squares,}]),
    })
  //  console.log(x,y);
 //   console.log(_currentSquares);
  }

  jumpTo (move) {

    this.setState({
      squaresHistory : this.state.squaresHistory.slice(0, move+1),
      isNextX : (move % 2) === 0
    })
  }

  render () {

    let _historySquares = this.state.squaresHistory;
    let _currentSquares = _historySquares[_historySquares.length - 1];

    let moves = _historySquares.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return(
        <li><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
      )
    })

    let winner = calculateWinner(_currentSquares.squares);
    let status;
    
    if(winner) {
      status = 'Winner : ' + winner;
    } else {
      status = 'Next player : ' + (this.state.isNextX ? "X" : "O");
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
        <Board boardsize={_currentSquares.squares} onClick={(x,y) => this.handleClick(x,y)}/>
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


function calculateWinner(squares) {
  let countDia1X = 0;
  let countDia1O = 0;
  let countDia2X = 0;
  let countDia2O = 0;

  for(let i = 0; i <squares.length; i++){
    let countRowX = 0;
    let countRowO = 0;
    let countColX = 0;
    let countColO = 0;

    for(let j = 0; j < squares.length; j++){
      if(squares[i][j] === 'X')
        countRowX++;
      if(squares[i][j] === 'O')
        countRowO++;
      if(squares[j][i] === 'X')
        countColX++;
      if(squares[j][i] === 'O')
        countColO++;
      if(i === j && squares[i][j] === 'X')
        countDia1X++;
      if(i === j && squares[i][j] === 'O')
        countDia1O++;
      if(i+j === squares.length && squares[i][j] === 'X')
        countDia2X++;
      if(i+j === squares.length && squares[i][j] === 'O')
        countDia2O++;  
    }
    if(countRowX === squares.length || countRowO === squares.length){
      return squares[i][0];
    }
    if(countColX === squares.length || countColO === squares.length){
      return squares[0][i];
    }
  }
  if(countDia1X === squares.length || countDia1O === squares.length){
    return squares[0][0];
  }
  if(countDia2X === squares.length || countDia2O === squares.length){
      return squares[squares.length-1][0];
  }  
  return null;
}
export default Game;
