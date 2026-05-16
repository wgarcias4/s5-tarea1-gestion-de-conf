import { useState } from "react"
import Square from "./components/Square.jsx"
import confetti from "canvas-confetti"

import { TURNS } from "./constants.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
    // Para los estados del tablero
    const [board, setBoard] = useState(() => {
        const boardFromLocalStorage = localStorage.getItem("board")
        return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
    })

    // Para saber de quién es el turno 
    const [turn, setTurn] = useState(() => { 
        const turnFromLocalStorage = localStorage.getItem("turn")
        return turnFromLocalStorage ?? TURNS.X
    })

    // null si no hay ganador, false si es un empate
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)

        localStorage.removeItem("board")
        localStorage.removeItem("turn")
    }
 
    const updateBoard = (index) => {
        // No actualiza la posición si ya tiene algo
        if (board[index] || winner) return;
        
        // Actualización del tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // Cambio de turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        // Guardar el estado del juego 
        localStorage.setItem("board", JSON.stringify(newBoard))
        localStorage.setItem("turn", newTurn)

        // Revisar si hay ganador
        const newWinner = checkWinner(newBoard)
        if (newWinner) { 
            confetti()
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
        }
    }

    return (
        <main className="board">
            <button onClick={resetGame}>Resetear el juego</button>
            <section className="game">
                {
                    board.map((_, index) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard}>
                                {board[index]}
                            </Square>
                        )
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square> 
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
        </main>      
    )
}

export default App
