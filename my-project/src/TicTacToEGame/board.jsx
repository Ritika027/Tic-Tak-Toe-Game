import React, { useState } from "react";
import Square from "./Square.jsx";

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);

    const checkWinner = () => {
        const winnerLogic = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];
        
        for (let logic of winnerLogic) {
            const [a, b, c] = logic;
            if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                return state[a]; // Return "X" or "O" as the winner
            }
        }
        return null;
    };

    const winner = checkWinner();
    const isDraw = !winner && state.every((square) => square !== null); // Check for draw

    const handleClick = (index) => {
        if (state[index] || winner || isDraw) return; // Prevent overwriting, clicks after win/draw

        const copyState = [...state];
        copyState[index] = isXTurn ? "X" : "O";
        setState(copyState);
        setIsXTurn(!isXTurn); // Toggle turn
    };

    const resetGame = () => {
        setState(Array(9).fill(null)); // Reset board
        setIsXTurn(true); // Reset turn to X
    };

    return (
        <>
            <div className="board-container">
                {winner ? (
                    <h2>🎉 {winner} Wins! 🎉</h2>
                ) : isDraw ? (
                    <h2>🤝 No One Wins! 🤝</h2>
                ) : (
                    <h2>Next Turn: {isXTurn ? "X" : "O"}</h2>
                )}

                <div className="board-row">
                    <Square onClick={() => handleClick(0)} value={state[0]} />
                    <Square onClick={() => handleClick(1)} value={state[1]} />
                    <Square onClick={() => handleClick(2)} value={state[2]} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(3)} value={state[3]} />
                    <Square onClick={() => handleClick(4)} value={state[4]} />
                    <Square onClick={() => handleClick(5)} value={state[5]} />
                </div>
                <div className="board-row">
                    <Square onClick={() => handleClick(6)} value={state[6]} />
                    <Square onClick={() => handleClick(7)} value={state[7]} />
                    <Square onClick={() => handleClick(8)} value={state[8]} />
                </div>

                {(winner || isDraw) && (
                    <button className="reset-button" onClick={resetGame}>🔄 Restart Game</button>
                )}
            </div>
        </>
    );
};

export default Board;
