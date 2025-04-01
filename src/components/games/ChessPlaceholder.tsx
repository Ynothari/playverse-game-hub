import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface ChessPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
type PieceColor = 'white' | 'black';

interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

const ChessPlaceholder: React.FC<ChessPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<[number, number][]>([]);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>('white');
  const [lastMove, setLastMove] = useState<{ from: [number, number], to: [number, number] } | null>(null);
  const [gameStatus, setGameStatus] = useState<string>('');
  
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(() => {
    const initialBoard: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    
    for (let col = 0; col < 8; col++) {
      initialBoard[1][col] = { type: 'pawn', color: 'black' };
      initialBoard[6][col] = { type: 'pawn', color: 'white' };
    }
    
    initialBoard[0][0] = initialBoard[0][7] = { type: 'rook', color: 'black' };
    initialBoard[7][0] = initialBoard[7][7] = { type: 'rook', color: 'white' };
    
    initialBoard[0][1] = initialBoard[0][6] = { type: 'knight', color: 'black' };
    initialBoard[7][1] = initialBoard[7][6] = { type: 'knight', color: 'white' };
    
    initialBoard[0][2] = initialBoard[0][5] = { type: 'bishop', color: 'black' };
    initialBoard[7][2] = initialBoard[7][5] = { type: 'bishop', color: 'white' };
    
    initialBoard[0][3] = { type: 'queen', color: 'black' };
    initialBoard[7][3] = { type: 'queen', color: 'white' };
    
    initialBoard[0][4] = { type: 'king', color: 'black' };
    initialBoard[7][4] = { type: 'king', color: 'white' };
    
    return initialBoard;
  });

  useEffect(() => {
    setPossibleMoves([]);
    setSelectedCell(null);
    
    if (gameMode === 'ai' && currentTurn === 'black') {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  }, [currentTurn, gameMode]);

  const makeAIMove = () => {
    const blackPieces: [number, number][] = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] && board[row][col]?.color === 'black') {
          blackPieces.push([row, col]);
        }
      }
    }
    
    if (blackPieces.length > 0) {
      for (let i = blackPieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [blackPieces[i], blackPieces[j]] = [blackPieces[j], blackPieces[i]];
      }
      
      for (const [pieceRow, pieceCol] of blackPieces) {
        const moves = getValidMoves(pieceRow, pieceCol);
        
        if (moves.length > 0) {
          const moveIndex = Math.floor(Math.random() * moves.length);
          const [targetRow, targetCol] = moves[moveIndex];
          
          movePiece(pieceRow, pieceCol, targetRow, targetCol);
          return;
        }
      }
    }
    
    setGameStatus('Checkmate! White wins.');
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameStatus) return;
    
    if (selectedCell) {
      const [selectedRow, selectedCol] = selectedCell;
      
      if (possibleMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col)) {
        movePiece(selectedRow, selectedCol, row, col);
        return;
      }
      
      if (selectedRow === row && selectedCol === col) {
        setSelectedCell(null);
        setPossibleMoves([]);
        return;
      }
      
      const clickedPiece = board[row][col];
      if (clickedPiece && clickedPiece.color === currentTurn) {
        setSelectedCell([row, col]);
        setPossibleMoves(getValidMoves(row, col));
        return;
      }
      
      setSelectedCell(null);
      setPossibleMoves([]);
    } else {
      const clickedPiece = board[row][col];
      
      if (clickedPiece && clickedPiece.color === currentTurn) {
        setSelectedCell([row, col]);
        setPossibleMoves(getValidMoves(row, col));
      }
    }
  };
  
  const movePiece = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const newBoard = [...board.map(row => [...row])];
    const movingPiece = newBoard[fromRow][fromCol];
    
    if (!movingPiece) return;
    
    if (movingPiece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
      newBoard[toRow][toCol] = { type: 'queen', color: movingPiece.color };
    } else {
      newBoard[toRow][toCol] = { ...movingPiece, hasMoved: true };
    }
    
    newBoard[fromRow][fromCol] = null;
    
    setLastMove({ from: [fromRow, fromCol], to: [toRow, toCol] });
    
    setBoard(newBoard);
    setSelectedCell(null);
    setPossibleMoves([]);
    setCurrentTurn(currentTurn === 'white' ? 'black' : 'white');
    
    if (board[toRow][toCol]?.type === 'king') {
      setGameStatus(`${movingPiece.color === 'white' ? 'White' : 'Black'} wins!`);
    }
  };
  
  const getValidMoves = (row: number, col: number): [number, number][] => {
    const piece = board[row][col];
    if (!piece) return [];
    
    const moves: [number, number][] = [];
    
    const isValidPosition = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;
    const canMoveTo = (r: number, c: number) => {
      if (!isValidPosition(r, c)) return false;
      const targetPiece = board[r][c];
      return !targetPiece || targetPiece.color !== piece.color;
    };
    const canCapture = (r: number, c: number) => {
      if (!isValidPosition(r, c)) return false;
      const targetPiece = board[r][c];
      return targetPiece && targetPiece.color !== piece.color;
    };
    const isEmpty = (r: number, c: number) => {
      if (!isValidPosition(r, c)) return false;
      return board[r][c] === null;
    };
    
    switch (piece.type) {
      case 'pawn': {
        const direction = piece.color === 'white' ? -1 : 1;
        
        if (isEmpty(row + direction, col)) {
          moves.push([row + direction, col]);
          
          if ((piece.color === 'white' && row === 6) || (piece.color === 'black' && row === 1)) {
            if (isEmpty(row + direction * 2, col)) {
              moves.push([row + direction * 2, col]);
            }
          }
        }
        
        if (canCapture(row + direction, col + 1)) {
          moves.push([row + direction, col + 1]);
        }
        if (canCapture(row + direction, col - 1)) {
          moves.push([row + direction, col - 1]);
        }
        
        break;
      }
      
      case 'rook': {
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        
        for (const [dr, dc] of directions) {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            
            if (!isValidPosition(r, c)) break;
            
            if (isEmpty(r, c)) {
              moves.push([r, c]);
            } else if (canCapture(r, c)) {
              moves.push([r, c]);
              break;
            } else {
              break;
            }
          }
        }
        break;
      }
      
      case 'knight': {
        const knightMoves = [
          [-2, -1], [-2, 1], [-1, -2], [-1, 2],
          [1, -2], [1, 2], [2, -1], [2, 1]
        ];
        
        for (const [dr, dc] of knightMoves) {
          const r = row + dr;
          const c = col + dc;
          
          if (canMoveTo(r, c)) {
            moves.push([r, c]);
          }
        }
        break;
      }
      
      case 'bishop': {
        const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        
        for (const [dr, dc] of directions) {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            
            if (!isValidPosition(r, c)) break;
            
            if (isEmpty(r, c)) {
              moves.push([r, c]);
            } else if (canCapture(r, c)) {
              moves.push([r, c]);
              break;
            } else {
              break;
            }
          }
        }
        break;
      }
      
      case 'queen': {
        const directions = [
          [0, 1], [1, 0], [0, -1], [-1, 0],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        
        for (const [dr, dc] of directions) {
          for (let i = 1; i < 8; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            
            if (!isValidPosition(r, c)) break;
            
            if (isEmpty(r, c)) {
              moves.push([r, c]);
            } else if (canCapture(r, c)) {
              moves.push([r, c]);
              break;
            } else {
              break;
            }
          }
        }
        break;
      }
      
      case 'king': {
        const kingMoves = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1], [0, 1],
          [1, -1], [1, 0], [1, 1]
        ];
        
        for (const [dr, dc] of kingMoves) {
          const r = row + dr;
          const c = col + dc;
          
          if (canMoveTo(r, c)) {
            moves.push([r, c]);
          }
        }
        break;
      }
    }
    
    return moves;
  };
  
  const renderPiece = (piece: ChessPiece | null) => {
    if (!piece) return null;
    
    const pieces = {
      white: {
        pawn: '♙',
        rook: '♖',
        knight: '♘',
        bishop: '♗',
        queen: '♕',
        king: '♔'
      },
      black: {
        pawn: '♟',
        rook: '♜',
        knight: '♞',
        bishop: '♝',
        queen: '♛',
        king: '♚'
      }
    };
    
    return (
      <span className={`text-3xl ${piece.color === 'white' ? 'text-white' : 'text-gray-900'}`}>
        {pieces[piece.color][piece.type]}
      </span>
    );
  };

  const resetGame = () => {
    setBoard(() => {
      const initialBoard: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
      
      for (let col = 0; col < 8; col++) {
        initialBoard[1][col] = { type: 'pawn', color: 'black' };
        initialBoard[6][col] = { type: 'pawn', color: 'white' };
      }
      
      initialBoard[0][0] = initialBoard[0][7] = { type: 'rook', color: 'black' };
      initialBoard[7][0] = initialBoard[7][7] = { type: 'rook', color: 'white' };
      
      initialBoard[0][1] = initialBoard[0][6] = { type: 'knight', color: 'black' };
      initialBoard[7][1] = initialBoard[7][6] = { type: 'knight', color: 'white' };
      
      initialBoard[0][2] = initialBoard[0][5] = { type: 'bishop', color: 'black' };
      initialBoard[7][2] = initialBoard[7][5] = { type: 'bishop', color: 'white' };
      
      initialBoard[0][3] = { type: 'queen', color: 'black' };
      initialBoard[7][3] = { type: 'queen', color: 'white' };
      
      initialBoard[0][4] = { type: 'king', color: 'black' };
      initialBoard[7][4] = { type: 'king', color: 'white' };
      
      return initialBoard;
    });
    setCurrentTurn('white');
    setSelectedCell(null);
    setPossibleMoves([]);
    setLastMove(null);
    setGameStatus('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className={`p-6 bg-game-chess/30 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl font-bold mb-3">
          Chess Game - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}
        </h2>
        <p className="mb-3">
          Click on a piece to select it, and then click on a highlighted square to move it.
        </p>
        <p className="text-sm text-gray-400">
          {gameMode === 'ai' 
            ? 'Playing against AI: You play as White, AI plays as Black.' 
            : 'Multiplayer mode: White goes first, then players alternate turns.'}
        </p>
      </div>

      <div className="relative mb-4">
        <div className="bg-gradient-to-r from-game-chess to-gray-900 p-0.5 rounded-lg shadow-lg shadow-game-chess/40">
          <div className="grid grid-cols-8 grid-rows-8 w-full aspect-square bg-gray-800 rounded-md overflow-hidden">
            {board.map((row, rowIndex) => (
              row.map((piece, colIndex) => {
                const isWhite = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;
                const isLastMove = lastMove && 
                  ((lastMove.from[0] === rowIndex && lastMove.from[1] === colIndex) || 
                   (lastMove.to[0] === rowIndex && lastMove.to[1] === colIndex));
                const isPossibleMove = possibleMoves.some(([r, c]) => r === rowIndex && c === colIndex);
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      ${isWhite ? 'bg-gray-200' : 'bg-gray-600'} 
                      flex items-center justify-center cursor-pointer relative
                      ${isSelected ? 'ring-2 ring-yellow-400 ring-inset' : ''}
                      ${isLastMove ? 'bg-blue-300/30' : ''}
                      hover:opacity-90 transition-all
                    `}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {renderPiece(piece)}
                    
                    {isPossibleMove && (
                      <div className={`absolute inset-0 flex items-center justify-center ${board[rowIndex][colIndex] ? 'bg-red-500/40' : 'bg-green-500/40'} rounded-full w-1/3 h-1/3`}></div>
                    )}
                    
                    {false && (
                      <span className="absolute bottom-0 right-0 text-[8px] text-gray-500">
                        {rowIndex},{colIndex}
                      </span>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>
        
        {gameStatus && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-3 text-white">{gameStatus}</h3>
              <button 
                className="game-button"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="px-4 py-2 bg-gray-800 rounded-md flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${currentTurn === 'white' ? 'bg-white' : 'bg-gray-900'}`}></div>
          <span>{currentTurn === 'white' ? 'White' : 'Black'}'s turn</span>
        </div>
        
        <button
          className="game-button"
          onClick={resetGame}
        >
          Reset Game
        </button>

        <button
          className="game-button"
          onClick={() => setInfoVisible(!infoVisible)}
        >
          {infoVisible ? 'Hide Info' : 'Show Info'}
        </button>
      </div>
      
      <div className="md:hidden mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-2">
        <AlertCircle className="text-yellow-500 shrink-0" size={20} />
        <p className="text-sm text-left">
          For the best chess experience, consider playing on a larger screen. You can rotate your device to landscape mode for a better view.
        </p>
      </div>
    </div>
  );
};

export default ChessPlaceholder;
