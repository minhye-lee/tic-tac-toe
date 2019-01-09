import React, {Component} from 'react';
import { connect } from 'react-redux';
import { handleClicked } from '../redux/actions';
import Square from './Square';

class Board extends Component{

    renderSquare(x, y, key) {
      const _historySquares = this.props.squaresHistory;
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      return <Square value={_squares[x][y]} key={key} onClick={() => this.props.handleClicked(x, y)} />
    }
  
    render() {

      const _historySquares = this.props.squaresHistory;
      console.log(_historySquares);
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      const rowSize = _squares.map((row, index) => {
        const colSize = _squares[index].map((col, index2) => {
          return(
            this.renderSquare(index,index2,index2)
          )
        })
        return(
          <div className="boardRow" key={index} >{colSize}</div>
        )
      })
  
      return(
        <div>{rowSize}</div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    squaresHistory : state.squaresHistory,

  });

  const mapDispatchToProps = (dispatch) => ({
    handleClicked(x,y) {
      dispatch(handleClicked({x,y}));
    },
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Board);