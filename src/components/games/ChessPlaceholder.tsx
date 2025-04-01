
import { useState } from 'react';

interface ChessPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

const ChessPlaceholder: React.FC<ChessPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className={`p-6 bg-game-chess/30 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl font-bold mb-3">Chess Game - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
        <p className="mb-3">
          This is a placeholder for the chess game implementation. In the full version,
          you would see a complete chess board with all pieces and game functionality.
        </p>
        {gameMode === 'ai' ? (
          <p className="text-sm text-gray-400">
            Playing against AI: The computer will follow standard chess rules and strategies.
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Multiplayer mode: Take turns on the same device or invite friends online.
          </p>
        )}
      </div>

      <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square border border-gray-700 bg-gray-900 rounded">
        {[...Array(64)].map((_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const isWhite = (row + col) % 2 === 0;
          return (
            <div
              key={i}
              className={`${isWhite ? 'bg-gray-700' : 'bg-gray-900'} flex items-center justify-center`}
            >
              {getChessPiece(row, col)}
            </div>
          );
        })}
      </div>

      <button
        className="game-button mt-6"
        onClick={() => setInfoVisible(!infoVisible)}
      >
        {infoVisible ? 'Hide Info' : 'Show Info'}
      </button>
    </div>
  );
};

function getChessPiece(row: number, col: number): JSX.Element | null {
  // Initial chess board setup
  const pieces: { [key: string]: string } = {
    '0-0': '♜', '0-1': '♞', '0-2': '♝', '0-3': '♛', '0-4': '♚', '0-5': '♝', '0-6': '♞', '0-7': '♜',
    '1-0': '♟', '1-1': '♟', '1-2': '♟', '1-3': '♟', '1-4': '♟', '1-5': '♟', '1-6': '♟', '1-7': '♟',
    '6-0': '♙', '6-1': '♙', '6-2': '♙', '6-3': '♙', '6-4': '♙', '6-5': '♙', '6-6': '♙', '6-7': '♙',
    '7-0': '♖', '7-1': '♘', '7-2': '♗', '7-3': '♕', '7-4': '♔', '7-5': '♗', '7-6': '♘', '7-7': '♖',
  };
  
  const key = `${row}-${col}`;
  const piece = pieces[key];
  
  if (piece) {
    const isBlack = row < 2;
    return <span className={`text-2xl ${isBlack ? 'text-gray-900' : 'text-white'}`}>{piece}</span>;
  }
  
  return null;
}

export default ChessPlaceholder;
