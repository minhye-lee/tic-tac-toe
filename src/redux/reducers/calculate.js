//승자 확인
export const getWinner = (squares) => {
    return fromRow(squares) || fromColumn(squares) ||
        fromLeftUpperDiagonal(squares) || fromRightUpperDiagonal(squares)
}

const fromRow = (squares) => {
    const bingoRow = squares.find(isBingo)
    if (bingoRow && bingoRow.length) return bingoRow[0]
    return null
}

const isBingo = row => row.every(cell => cell && cell === row[0])

const fromColumn = (squares) => fromRow(transpose(squares))

const transpose = (arr) => arr[0].map((_, i) => arr.map(row => row[i]))

const fromLeftUpperDiagonal = (squares) => {
    const dia = squares.map((row, i) => squares[i][i])
    return (isBingo(dia) && dia[0]) || null
}

const fromRightUpperDiagonal = (squares) => {
    const length = squares.length
    const dia = squares.map((row, i) => squares[i][length - i - 1])
    return (isBingo(dia) && dia[0]) || null
}

//무승부 확인
export const checkDraw = (squares) => {
    let _isDraw = true;
    for (let i = 0; i < squares.length; i++) {
        for (let j = 0; j < squares.length; j++) {
            if (squares[i][j] === null) {
                _isDraw = false;
            }
        }
    }
    if (_isDraw)
        return true;
    else
        return false;
}