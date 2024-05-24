import { checkDraw, checkWin } from "./logic"

export const minimax = (board: number[][], currentPlayer: number, otherPlayer: number): {score: number, row?: number, col?: number} => {
    
    if (checkWin(board, currentPlayer)) 
        return { score: 1 };
    if (checkDraw(board))
        return { score: 0 };
    if (checkWin(board, otherPlayer))
        return { score: -1 };

    let bestScore = -Infinity;
    let row:  number | undefined = undefined;
    let col:  number | undefined = undefined;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === 0) {
                board[i][j] = currentPlayer;
                let result = minimax(board, otherPlayer, currentPlayer);
                let score = -result.score;
                board[i][j] = 0;

                if(score > bestScore) {
                    bestScore = score;
                    row = i
                    col = j
                }
            }
        }
    }    

    return { score: bestScore, row: row, col: col };
}

export const alpha_beta_pruning = (board: number[][], currentPlayer: number, otherPlayer: number, max: number): {score: number, row?: number, col?: number} => {
    if (checkWin(board, currentPlayer)) 
        return { score: 1 };
    if (checkDraw(board))
        return { score: 0 };
    if (checkWin(board, otherPlayer))
        return { score: -1 };

    let bestScore = -Infinity;
    let row:  number | undefined = undefined;
    let col:  number | undefined = undefined;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] === 0) {
                if(bestScore > max) return { score: bestScore, row: row, col: col } 
                board[i][j] = currentPlayer;
                let score = -alpha_beta_pruning(board, otherPlayer, currentPlayer, -max).score;
                board[i][j] = 0;
                if(score > bestScore) {
                    bestScore = score;
                    row = i
                    col = j
                }
            }
        }
    }
    return { score: bestScore, row: row, col: col };
}   
