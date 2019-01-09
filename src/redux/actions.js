import * as types from "./actionTypes";

export const handleClicked = ({x, y}) => ({
    type : types.HANDLE_CLICKED,
    x,
    y
});

export const goToMove = (index) => ({
    type : types.GO_TO_MOVE,
    index
});

export const setBoardSize = (event) => ({
    type : types.SET_BOARD_SIZE,
    event
});