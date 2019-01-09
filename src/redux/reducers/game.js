import { HANDLE_CLICKED, GO_TO_MOVE, SET_BOARD_SIZE } from "../actionTypes";

const initialState = {
    squaresHistory : [{
        squares: Array(3).fill(null).map(() => Array(3).fill(null)),
    }],
    isNextX : true,
    stepNumber : 0,
    isDraw : false,
    winner : null,
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_CLICKED :

            const _historySquares = JSON.parse(JSON.stringify( state.squaresHistory ));
            const _currentSquares = JSON.parse(JSON.stringify( _historySquares[_historySquares.length -1] ));
            const _squares = _currentSquares.squares.slice();
            const _winner = calculateWinner(_squares);

            if(_winner || _squares[action.x][action.y]) { //승패가 가려지거나 이미 눌러진 버튼이라면 state 리턴
                return state;
            } 

            _squares[action.x][action.y] = state.isNextX ? "X" : "O";

            // if(checkDraw(_squares)) {
            //     return 
            // }

            return {
                ...state,
                isNextX : !state.isNextX,
                squaresHistory : _historySquares.concat([{squares : _squares}]),
                winner : calculateWinner(_squares),
            };

        case GO_TO_MOVE :

            return {
                ...state,
                squaresHistory : state.squaresHistory.slice(0, (action.index) + 1),
                isNextX : ((action.index) % 2) === 0,
                isDraw : false,
                winner : null,
            };

        case SET_BOARD_SIZE : 
            const squaresSize =  Array(action.event).fill(null).map(() => Array(action.event).fill(null));
            return {
                ...state,
                squaresHistory : [{
                    squares : squaresSize,
                }]
            }

        default :
            return state;

    }
}
//승리 로직 함수
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
        if(i+j === squares.length-1 && squares[i][j] === 'X')
          countDia2X++;
        if(i+j === squares.length-1 && squares[i][j] === 'O')
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

//draw 확인 함수
function checkDraw (squares) {
    let _isDraw = true;
    for(let i = 0; i < squares.length; i++){
      for(let j = 0; j < squares.length; j++){
        if(squares[i][j] === null){
          _isDraw = false;
        }
      }
    }
    if(_isDraw)
        return true;
    else
        return false;
    // if(_isDraw){
    //   this.setState({
    //     isDraw : true
    //   })
    // }
}

  export default reducer;