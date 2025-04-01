
import React, { useState, useEffect } from 'react';

interface TicTacToeProps {
  gameMode: 'ai' | 'multiplayer';
  onGameEnd?: (result: 'X' | 'O' | 'draw') => void;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ gameMode, onGameEnd }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Check if game is over
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
      setGameOver(true);
      onGameEnd?.(winner as 'X' | 'O');
    } else if (!board.includes(null)) {
      setGameStatus('Game ended in a draw!');
      setGameOver(true);
      onGameEnd?.('draw');
    } else {
      setGameStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [board, isXNext, onGameEnd]);

  // AI move
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !gameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, gameOver]);

  const makeAIMove = () => {
    // Copy the current board
    const newBoard = [...board];
    
    // Find available moves
    const availableMoves = newBoard
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null) as number[];
    
    if (availableMoves.length > 0) {
      // Simple AI: Check for winning move
      for (let move of availableMoves) {
        const testBoard = [...newBoard];
        testBoard[move] = 'O';
        if (calculateWinner(testBoard) === 'O') {
          handleSquareClick(move);
          return;
        }
      }
      
      // Block opponent's winning move
      for (let move of availableMoves) {
        const testBoard = [...newBoard];
        testBoard[move] = 'X';
        if (calculateWinner(testBoard) === 'X') {
          handleSquareClick(move);
          return;
        }
      }
      
      // Prefer center
      if (availableMoves.includes(4)) {
        handleSquareClick(4);
        return;
      }
      
      // Prefer corners
      const corners = [0, 2, 6, 8].filter(corner => availableMoves.includes(corner));
      if (corners.length > 0) {
        handleSquareClick(corners[Math.floor(Math.random() * corners.length)]);
        return;
      }
      
      // Random move
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleSquareClick(randomMove);
    }
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setGameStatus(`Next player: X`);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    return (
      <button
        key={index}
        className={`w-full aspect-square flex items-center justify-center text-3xl sm:text-4xl font-bold rounded transition-colors border border-gray-700
          ${value === 'X' ? 'text-game-teal' : 'text-pink-400'}
          ${!value && !gameOver ? 'hover:bg-gray-800' : ''}
        `}
        onClick={() => handleSquareClick(index)}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <div className="text-xl">{gameStatus}</div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((_, index) => renderSquare(index))}
      </div>
      
      <button 
        onClick={resetGame}
        className="game-button w-full"
      >
        Reset Game
      </button>
    </div>
  );
};

// Helper function to calculate winner
function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}

export default TicTacToe;
