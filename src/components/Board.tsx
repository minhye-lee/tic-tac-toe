import * as React from 'react';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';
import { handleClicked } from '../redux/actions';
import { IState } from '../redux/reducers/game';
import Square from './Square';

interface IProps {
  squaresHistory : { squares : string[][]; }[];
  handleClicked : (x : number, y : number) => void;
}

class Board extends React.Component<IProps> {

    renderSquare = (x : number, y : number, key : number) => {
      const { squaresHistory } = this.props;
      const _historySquares = squaresHistory;
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      return <Square
              value={_squares[x][y]}
              key={key}
              onClick={() => this.handleClick(x,y)}
              />
    }

    handleClick = (x : number, y : number) => {
      this.props.handleClicked(x,y);
    }
  
    render = () => {
      const { squaresHistory } = this.props;
      const _historySquares = squaresHistory;
      const _currentSquares = _historySquares[_historySquares.length - 1];
      const _squares = _currentSquares.squares;

      const boardSize = _squares.map((_, index) => {
        const colSize = _squares[index].map((_, index2) => {
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

  const mapStateToProps = (state) => ({
    squaresHistory : state.game.squaresHistory,

  });
  const mapDispatchToProps = {
    handleClicked,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Board);