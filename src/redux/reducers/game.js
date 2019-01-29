import { HANDLE_CLICKED, GO_TO_MOVE, SET_BOARD_SIZE } from "../actionTypes";
import { getWinner, checkDraw } from './calculate';

const initialState = {
    squaresHistory : [{
        squares: Array(3).fill(null).map(() => Array(3).fill(null)),
    }],
    isNextX : true,
    stepNumber : 0,
    isDraw : false,
    winner : null,
    xyHistory : [],
};

const game = (state = initialState, action) => {
    switch(action.type) {
        case HANDLE_CLICKED :

            const _historySquares = JSON.parse(JSON.stringify( state.squaresHistory ));
            const _currentSquares = JSON.parse(JSON.stringify( _historySquares[_historySquares.length -1] ));
            const _squares = _currentSquares.squares.slice();

            if(state.winner || _squares[action.x][action.y]) { //승패가 가려지거나 이미 눌러진 버튼이라면 state 리턴
              return state;
            } 

            _squares[action.x][action.y] = state.isNextX ? "X" : "O";

            return {
                ...state,
                isNextX : !state.isNextX,
                squaresHistory : _historySquares.concat([{squares : _squares}]),
                winner : getWinner(_squares),
                isDraw : checkDraw(_squares),
                xyHistory : state.xyHistory.concat([[action.x, action.y]]),
                
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
            const squaresSize =  Array(action.size).fill(null).map(() => Array(action.size).fill(null));
            return {
                ...initialState,
                squaresHistory : [{
                    squares : squaresSize,
                }]
            }

        default :
            return state;

    }
}

  export default game;