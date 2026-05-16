import { WINNNER_COMBS } from "../constants"

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNNER_COMBS) {
        const [a, b, c] = combo

        if (
            boardToCheck[a] && 
            boardToCheck[a] === boardToCheck[b] && 
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }

    return null
}

export const checkEndGame = (newBoard) => { 
    return newBoard.every(board => board !== null)
}