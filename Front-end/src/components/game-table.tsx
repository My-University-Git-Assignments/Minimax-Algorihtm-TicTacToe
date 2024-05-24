import Piece from "./game-piece";
import { board, checkDraw, checkWin } from "../logic.ts";
import { useEffect, useState } from "react";
import {  notification } from 'antd';
import { SiWolframlanguage } from "react-icons/si";
import { alpha_beta_pruning, minimax } from "../Agent.ts";




interface Game{
    turn: number,
    board: number[][],
    winner: number
}

export default function Table() {
    const [game, setGame] = useState<Game>({
        turn: 1,
        board: board,
        winner: 0
    })
    const agentPlacePiece = (()=>{
        if(game.winner) return

        const newBoard = [...game.board]
        
        // const bestMove = alpha_beta_pruning(newBoard, 2, 1, 0)
        const bestMove = minimax(newBoard, 2, 1)        

        newBoard[bestMove.row][bestMove.col] = 2

        setGame(prev => {
            return {
                ...prev,
                turn: prev.turn === 1 ? 2 : 1,
                board: newBoard,
            }
        })
        if(checkWin(newBoard, 2)){
            setGame(prev => {
                return {
                    ...prev,
                    winner: 2
                }
            })

        }
        else if(checkDraw(newBoard))
            notification.open({
                message: 'Draw',
                icon: <SiWolframlanguage />,
                description: 'The game ended in a draw'
            })
            
    })

    const placePiece = ((rowIndex: number, colIndex:number)=>{
        if(game.winner) return
        if(game.board[rowIndex][colIndex] !== 0) return
        
        const newBoard = [...game.board]
        newBoard[rowIndex][colIndex] = game.turn
        setGame(prev => {
            return {
                ...prev,
                turn: prev.turn === 1 ? 2 : 1,
                board: newBoard,
            }
        })
        if(checkWin(newBoard, game.turn)){
            setGame(prev => {
                return {
                    ...prev,
                    winner: game.turn
                }
            })
        }
        else if(checkDraw(newBoard))
        notification.open({
            message: 'Draw',
            icon: <SiWolframlanguage />,
            description: 'The game ended in a draw'
        })

        agentPlacePiece()
    })

    useEffect(()=>{
        if(game.winner) {
            notification.open({
                message: 'Game Over',
                description:
                  game.winner === 1
                    ? 'X is the Winner'
                    : 'O is the Winner',

                icon: <SiWolframlanguage />,
                style: {
                    background: game.winner === 1 ? '#4BA3C3' : '#BA324F',
                }
            })
        }
    }, [game.winner])

  return (
    <div className="flex flex-col border-[6px] border-secondary rounded-[50px] p-4 bg-tertiary shadow-2xl"
         style={{
           background: "linear-gradient(to bottom right, #123456, #123456 50%, #0f2439 50%, #0f2439)",
           transform: "perspective(1000px) rotateX(10deg)"
         }}>
        {
            board.map((row, rowIndex) => {
                return (
                    <div key={`row-${rowIndex}`} className="flex">
                        {row.map((piece, colIndex) => {
                            return (
                                <div onClick={placePiece.bind(null, rowIndex, colIndex)} key={`cell-${rowIndex}-${colIndex}`} className="p-3 bg-tertiary cursor-pointer"
                                     style={{
                                       boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                                       background: "linear-gradient(to top right, #175676, #175676 50%, #113450 50%, #113450)"
                                     }}>
                                    <Piece colorCode={piece}/>
                                </div>
                            )
                        })}
                    </div>
                )
            })
        }
    </div>
  )
}
