
import { useState, useEffect } from 'react';
import { AlertCircle, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Info } from 'lucide-react';

interface SnakeAndLadderPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

interface Player {
  id: string;
  name: string;
  position: number;
  color: string;
}

// Define snake and ladder positions
interface SnakeLadder {
  start: number;
  end: number;
  type: 'snake' | 'ladder';
}

const SnakeAndLadderPlaceholder: React.FC<SnakeAndLadderPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameMessage, setGameMessage] = useState("Roll the dice to start!");
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  
  // Define snake and ladder positions
  const snakesAndLadders: SnakeLadder[] = [
    // Ladders
    { start: 1, end: 38, type: 'ladder' },
    { start: 4, end: 14, type: 'ladder' },
    { start: 9, end: 31, type: 'ladder' },
    { start: 21, end: 42, type: 'ladder' },
    { start: 28, end: 84, type: 'ladder' },
    { start: 51, end: 67, type: 'ladder' },
    { start: 72, end: 91, type: 'ladder' },
    { start: 80, end: 99, type: 'ladder' },
    
    // Snakes
    { start: 17, end: 7, type: 'snake' },
    { start: 54, end: 34, type: 'snake' },
    { start: 62, end: 19, type: 'snake' },
    { start: 64, end: 60, type: 'snake' },
    { start: 87, end: 36, type: 'snake' },
    { start: 93, end: 73, type: 'snake' },
    { start: 95, end: 75, type: 'snake' },
    { start: 98, end: 79, type: 'snake' },
  ];
  
  // Initialize players
  useEffect(() => {
    if (gameMode === 'ai') {
      setPlayers([
        { id: 'p1', name: 'You', position: 0, color: 'bg-game-teal' },
        { id: 'ai', name: 'AI', position: 0, color: 'bg-red-500' }
      ]);
    } else {
      setPlayers([
        { id: 'p1', name: 'Player 1', position: 0, color: 'bg-game-teal' },
        { id: 'p2', name: 'Player 2', position: 0, color: 'bg-red-500' },
        { id: 'p3', name: 'Player 3', position: 0, color: 'bg-yellow-500' },
        { id: 'p4', name: 'Player 4', position: 0, color: 'bg-green-500' }
      ]);
    }
  }, [gameMode]);
  
  // AI turn logic
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayerIndex === 1 && !gameOver) {
      setTimeout(() => {
        rollDice();
      }, 1000);
    }
  }, [currentPlayerIndex, gameMode, gameOver]);
  
  const rollDice = () => {
    if (isRolling || gameOver) return;
    
    setIsRolling(true);
    setDiceValue(null);
    setGameMessage("Rolling the dice...");
    
    // Simulate dice rolling
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Stop rolling and move player
    setTimeout(() => {
      clearInterval(rollInterval);
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      movePlayer(roll);
    }, 800);
  };
  
  const movePlayer = (steps: number) => {
    if (!players.length) return;
    
    const player = players[currentPlayerIndex];
    let newPosition = player.position + steps;
    
    // Check if player wins
    if (newPosition >= 100) {
      newPosition = 100;
      setGameMessage(`${player.name} wins the game!`);
      setGameOver(true);
    } else {
      setGameMessage(`${player.name} rolled ${steps} and moved to ${newPosition}`);
    }
    
    // Update player position
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = { ...player, position: newPosition };
    setPlayers(updatedPlayers);
    
    // Process after initial move animation completes
    setTimeout(() => {
      // Check if landed on a snake or ladder
      const snakeOrLadder = snakesAndLadders.find(sl => sl.start === newPosition);
      
      if (snakeOrLadder) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex] = { 
          ...player, 
          position: snakeOrLadder.end 
        };
        setPlayers(updatedPlayers);
        
        if (snakeOrLadder.type === 'ladder') {
          setGameMessage(`${player.name} climbed a ladder to ${snakeOrLadder.end}!`);
        } else {
          setGameMessage(`${player.name} got bitten by a snake and fell to ${snakeOrLadder.end}!`);
        }
        
        // Check if winning by ladder
        if (snakeOrLadder.end === 100) {
          setGameMessage(`${player.name} wins the game!`);
          setGameOver(true);
        }
      }
      
      // Next player's turn if game not over
      if (!gameOver) {
        setTimeout(() => {
          setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
          setIsRolling(false);
        }, 1000);
      } else {
        setIsRolling(false);
      }
    }, 500);
  };
  
  const resetGame = () => {
    // Reset all players to start
    setPlayers(players.map(player => ({ ...player, position: 0 })));
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setGameMessage("Roll the dice to start!");
    setGameOver(false);
    setIsRolling(false);
  };
  
  const DiceIcon = () => {
    if (diceValue === 1) return <Dice1 className="w-10 h-10" />;
    if (diceValue === 2) return <Dice2 className="w-10 h-10" />;
    if (diceValue === 3) return <Dice3 className="w-10 h-10" />;
    if (diceValue === 4) return <Dice4 className="w-10 h-10" />;
    if (diceValue === 5) return <Dice5 className="w-10 h-10" />;
    if (diceValue === 6) return <Dice6 className="w-10 h-10" />;
    return null;
  };

  // Get number cell position
  const getCellPosition = (number: number): { row: number, col: number } => {
    const row = Math.floor((100 - number) / 10);
    const isEvenRow = row % 2 === 0;
    
    // For even rows (0, 2, 4, 6, 8), numbers go right to left
    // For odd rows (1, 3, 5, 7, 9), numbers go left to right
    let col;
    if (isEvenRow) {
      col = 9 - ((100 - number) % 10);
    } else {
      col = (100 - number) % 10;
    }
    
    return { row, col };
  };
  
  // Get player position on the board
  const getPlayerPosition = (playerIndex: number): { top: string, left: string } => {
    if (!players.length) return { top: '0%', left: '0%' };
    
    const position = players[playerIndex].position;
    if (position === 0) return { top: '105%', left: `${25 + playerIndex * 15}%` }; // Start position
    
    const { row, col } = getCellPosition(position);
    
    // Calculate percentage position with offset for multiple players
    const baseTop = row * 10 + 5;
    const baseLeft = col * 10 + 5;
    
    // Add small offset for each player to avoid complete overlap
    const playerOffset = playerIndex * 3;
    
    return {
      top: `${baseTop + playerOffset / 2}%`,
      left: `${baseLeft + playerOffset}%`
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-game-snake to-gray-900/80 p-6 rounded-xl shadow-lg mb-8">
        <div className={`p-6 bg-gray-900/70 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-xl font-bold mb-3">Snake & Ladder - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
          <p className="mb-3">
            Roll the dice and move your token. Land on a ladder to climb up, but beware of snakes 
            that will slide you down! First player to reach 100 wins.
          </p>
          {gameMode === 'ai' ? (
            <p className="text-sm text-gray-400">
              Playing against AI: Take turns rolling the dice with the computer.
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              Multiplayer mode: Take turns rolling the dice with your friends.
            </p>
          )}
        </div>

        <div className="relative w-full aspect-square bg-gray-900 rounded-xl border border-gray-700 p-4 mb-6 shadow-inner">
          {/* Board grid */}
          <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
            {[...Array(100)].map((_, i) => {
              const position = 100 - i;
              const { row, col } = getCellPosition(position);
              
              // Determine if this cell has a snake or ladder
              const snakeStart = snakesAndLadders.find(sl => sl.start === position && sl.type === 'snake');
              const snakeEnd = snakesAndLadders.find(sl => sl.end === position && sl.type === 'snake');
              const ladderStart = snakesAndLadders.find(sl => sl.start === position && sl.type === 'ladder');
              const ladderEnd = snakesAndLadders.find(sl => sl.end === position && sl.type === 'ladder');
              
              return (
                <div
                  key={i}
                  className={`border border-gray-800 flex items-center justify-center relative
                    ${(row + col) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}
                    ${position === 100 ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold' : ''}
                    ${position === 1 ? 'bg-green-600/30' : ''}
                  `}
                >
                  <span className="text-xs sm:text-sm opacity-70">{position}</span>
                  
                  {/* Snake and ladder indicators */}
                  {snakeStart && (
                    <div className="absolute inset-0 border-2 border-red-500 rounded-sm opacity-70" />
                  )}
                  {snakeEnd && (
                    <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-70" />
                  )}
                  {ladderStart && (
                    <div className="absolute inset-0 border-2 border-yellow-500 rounded-sm opacity-70" />
                  )}
                  {ladderEnd && (
                    <div className="absolute inset-0 border-2 border-yellow-500 rounded-full opacity-70" />
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Snake bodies */}
          {snakesAndLadders.filter(sl => sl.type === 'snake').map((snake, i) => {
            const startPos = getCellPosition(snake.start);
            const endPos = getCellPosition(snake.end);
            
            // Calculate positions as percentages
            const startTop = startPos.row * 10 + 5;
            const startLeft = startPos.col * 10 + 5;
            const endTop = endPos.row * 10 + 5;
            const endLeft = endPos.col * 10 + 5;
            
            // Calculate an intermediate bend point for the snake
            const midTop = (startTop + endTop) / 2 + (i % 2 ? 5 : -5);
            const midLeft = (startLeft + endLeft) / 2 + (i % 3 ? 7 : -7);
            
            return (
              <div key={`snake-${i}`} className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d={`M ${startLeft}% ${startTop}% Q ${midLeft}% ${midTop}%, ${endLeft}% ${endTop}%`} 
                    stroke="red" 
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="5,3"
                  />
                  <circle cx={`${startLeft}%`} cy={`${startTop}%`} r="2" fill="red" />
                  <circle cx={`${endLeft}%`} cy={`${endTop}%`} r="2" fill="red" />
                </svg>
              </div>
            );
          })}
          
          {/* Ladder bodies */}
          {snakesAndLadders.filter(sl => sl.type === 'ladder').map((ladder, i) => {
            const startPos = getCellPosition(ladder.start);
            const endPos = getCellPosition(ladder.end);
            
            // Calculate positions as percentages
            const startTop = startPos.row * 10 + 5;
            const startLeft = startPos.col * 10 + 5;
            const endTop = endPos.row * 10 + 5;
            const endLeft = endPos.col * 10 + 5;
            
            return (
              <div key={`ladder-${i}`} className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line 
                    x1={`${startLeft}%`} y1={`${startTop}%`} 
                    x2={`${endLeft}%`} y2={`${endTop}%`} 
                    stroke="gold" 
                    strokeWidth="2.5"
                  />
                  
                  {/* Rungs for the ladder */}
                  {[0.2, 0.4, 0.6, 0.8].map((ratio, j) => {
                    const rungLeft = startLeft + (endLeft - startLeft) * ratio;
                    const rungTop = startTop + (endTop - startTop) * ratio;
                    const perpX = -(endTop - startTop);
                    const perpY = endLeft - startLeft;
                    const length = Math.sqrt(perpX * perpX + perpY * perpY);
                    const normX = perpX / length * 3;
                    const normY = perpY / length * 3;
                    
                    return (
                      <line 
                        key={`rung-${j}`}
                        x1={`${rungLeft - normX}%`} y1={`${rungTop - normY}%`} 
                        x2={`${rungLeft + normX}%`} y2={`${rungTop + normY}%`} 
                        stroke="gold" 
                        strokeWidth="1.5"
                      />
                    );
                  })}
                  
                  <circle cx={`${startLeft}%`} cy={`${startTop}%`} r="1.5" fill="gold" />
                  <circle cx={`${endLeft}%`} cy={`${endTop}%`} r="1.5" fill="gold" />
                </svg>
              </div>
            );
          })}
          
          {/* Player tokens */}
          {players.map((player, index) => {
            const position = getPlayerPosition(index);
            const isCurrentPlayer = index === currentPlayerIndex;
            
            return (
              <div
                key={player.id}
                className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${player.color} rounded-full 
                  border-2 border-white shadow-lg transition-all duration-500 
                  ${isCurrentPlayer ? 'animate-pulse z-20' : 'z-10'}`}
                style={{
                  top: position.top,
                  left: position.left,
                  transform: 'translate(-50%, -50%)',
                }}
              ></div>
            );
          })}
        </div>
      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {players.map((player, index) => (
            <div 
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg bg-gray-800/80 
                ${index === currentPlayerIndex ? 'ring-2 ring-game-teal' : ''}`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${player.color} mr-3`}></div>
                <span>{player.name}</span>
              </div>
              <span className="font-semibold">Position: {player.position}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
          <button 
            className={`game-button ${isRolling || (gameMode === 'ai' && currentPlayerIndex === 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={rollDice}
            disabled={isRolling || (gameMode === 'ai' && currentPlayerIndex === 1) || gameOver}
          >
            Roll Dice
          </button>
          
          <div className={`w-16 h-16 bg-white rounded-lg flex items-center justify-center text-gray-900 ${isRolling ? 'animate-bounce' : ''}`}>
            {diceValue !== null ? <DiceIcon /> : <span className="text-3xl font-bold">?</span>}
          </div>
          
          <button className="game-button" onClick={() => setInfoVisible(!infoVisible)}>
            {infoVisible ? 'Hide Info' : <Info size={18} />}
          </button>
          
          {gameOver && (
            <button className="game-button bg-purple-600" onClick={resetGame}>
              New Game
            </button>
          )}
        </div>
        
        <div className="p-3 bg-gray-800/60 rounded-lg text-center">
          {gameMessage}
        </div>
        
        {/* Mobile instruction */}
        <div className="md:hidden mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-2">
          <AlertCircle className="text-yellow-500 shrink-0" size={20} />
          <p className="text-sm text-left">
            For the best experience, consider rotating your device to landscape mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeAndLadderPlaceholder;
