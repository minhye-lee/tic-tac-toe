import React, {Component} from 'react';
import Square from './Square';

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

  export default Board;