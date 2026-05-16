import Square from "./Square.jsx";

export function WinnerModal ({winner, resetGame}) {
    const textGame = winner === false ? "Empate" : `Ganador`
    if (winner === null) return null;

    return (
        winner !== null && (
            <section className="winner">
                <div className="text">
                    <h2>{textGame}</h2>

                    <header className="win">
                        {winner && <Square>{winner}</Square>}
                    </header>

                    <footer>
                        <button onClick={resetGame}>Empezar de nuevo</button>
                    </footer>
                </div>
            </section>
        )
            
    )
}