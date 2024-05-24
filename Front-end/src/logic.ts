export const board: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

export interface Game{
    turn: number,
    board: number[][],
    winner: number
}
export const checkWin = (gameBoard: number[][], turn: number) => {
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] === turn && gameBoard[i][1] === turn && gameBoard[i][2] === turn) return true
        if (gameBoard[0][i] === turn && gameBoard[1][i] === turn && gameBoard[2][i] === turn) return true
    }
    if (gameBoard[0][0] === turn && gameBoard[1][1] === turn && gameBoard[2][2] === turn) return true
    if (gameBoard[0][2] === turn && gameBoard[1][1] === turn && gameBoard[2][0] === turn) return true
}

export const checkDraw = (gameBoard: number[][]) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === 0) return false
        }
    }
    return true
}