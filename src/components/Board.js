import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleClicked } from '../redux/actions';
import Square from './Square';

class Board extends Component{

    renderSquare = (x, y, key) => {
      const { squaresHistory } = this.props;
      const _historySquares = squaresHistory;
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      return <Square value={_squares[x][y]} key={key} onClick={() => this.handleClick(x,y)} />
    }

    handleClick = (x, y) => {
      this.props.handleClicked(x,y);
    }
  
    render = () => {
      const { squaresHistory } = this.props;
      const _historySquares = squaresHistory;
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      const boardSize = _squares.map((row, index) => {
        const colSize = _squares[index].map((col, index2) => {
          return(
            this.renderSquare(index, index2, index2)
          )
        })
        return(
          <div className="boardRow" key={index} >{colSize}</div>
        )
      })
  
      return(
        <div>{boardSize}</div>
      )
    }
  }

  const mapStateToProps = state => ({
    squaresHistory : state.game.squaresHistory,

  });
  const mapDispatchToProps = {
    handleClicked,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Board);