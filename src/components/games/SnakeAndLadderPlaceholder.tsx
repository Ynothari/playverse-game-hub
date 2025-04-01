import { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Info, X, AlertCircle } from 'lucide-react';

interface SnakeAndLadderPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

const SnakeAndLadderPlaceholder: React.FC<SnakeAndLadderPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'blue' | 'green' | 'yellow'>('red');
  const [playerPositions, setPlayerPositions] = useState<Record<string, number>>({
    red: 0,
    blue: 0,
    green: 0,
    yellow: 0,
  });
  const [gameMessage, setGameMessage] = useState<string>('Roll the dice to start!');
  
  // Balanced snakes and ladders
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 79,
  };
  
  const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
  };

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setDiceValue(null);
    setGameMessage("Rolling the dice...");
    
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      setIsRolling(false);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      movePlayer(currentPlayer, finalValue);
    }, 800);
  };
  
  const movePlayer = (player: 'red' | 'blue' | 'green' | 'yellow', steps: number) => {
    const currentPos = playerPositions[player];
    let newPos = currentPos + steps;
    
    if (newPos > 100) {
      setGameMessage(`${player.charAt(0).toUpperCase() + player.slice(1)} needs exact number to finish`);
      endTurn();
      return;
    }
    
    // Check for win
    if (newPos === 100) {
      setPlayerPositions(prev => ({
        ...prev,
        [player]: newPos
      }));
      setGameMessage(`🎉 ${player.charAt(0).toUpperCase() + player.slice(1)} wins! 🎉`);
      return;
    }
    
    // Check for snakes
    if (snakes[newPos]) {
      const prevPos = newPos;
      newPos = snakes[newPos];
      setGameMessage(`${player.charAt(0).toUpperCase() + player.slice(1)} got bitten by a snake! Moved from ${prevPos} to ${newPos}`);
    }
    
    // Check for ladders
    if (ladders[newPos]) {
      const prevPos = newPos;
      newPos = ladders[newPos];
      setGameMessage(`${player.charAt(0).toUpperCase() + player.slice(1)} climbed a ladder! Moved from ${prevPos} to ${newPos}`);
    }
    
    setPlayerPositions(prev => ({
      ...prev,
      [player]: newPos
    }));
    
    endTurn();
  };
  
  const endTurn = () => {
    if (gameMode === 'multiplayer') {
      if (currentPlayer === 'red') setCurrentPlayer('blue');
      else if (currentPlayer === 'blue') setCurrentPlayer('green');
      else if (currentPlayer === 'green') setCurrentPlayer('yellow');
      else setCurrentPlayer('red');
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
    }
  };
  
  // AI turn
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'blue') {
      setTimeout(() => {
        rollDice();
      }, 1000);
    }
  }, [currentPlayer]);
  
  const getBoardCellPosition = (cellNumber: number): { top: string, left: string } => {
    // Convert 1-100 to row/column format
    const rows = 10;
    const row = Math.ceil(cellNumber / 10);
    let col;
    
    // Handle snake-like pattern
    if (row % 2 === 1) {
      // Odd rows go left to right
      col = ((cellNumber - 1) % 10) + 1;
    } else {
      // Even rows go right to left
      col = 10 - ((cellNumber - 1) % 10);
    }
    
    // Convert to percentage for positioning (bottom to top)
    const rowPos = 10 - row;
    return {
      top: `${rowPos * 10 + 5}%`,
      left: `${(col - 1) * 10 + 5}%`
    };
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

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <div className="bg-gradient-to-br from-game-snake to-gray-900 p-6 rounded-xl mb-8 shadow-lg shadow-game-teal/10">
        <div className={`p-6 bg-gray-900/70 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Snake & Ladder - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
            <button 
              onClick={() => setInfoVisible(!infoVisible)} 
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-3">
            Snake & Ladder is a classic board game where players roll dice to move their tokens and race to reach the final square.
            {gameMode === 'ai' ? ' You play as Red against Blue AI opponent.' : ' Take turns with your friends in multiplayer mode.'}
          </p>
          <div className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
            <p className="mb-2 flex items-center gap-1">
              <Info size={14} />
              <span className="font-medium text-game-teal">How to play:</span>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-left">
              <li>Roll the dice to move your token forward</li>
              <li>Climb up ladders to move ahead quickly</li>
              <li>Avoid snakes which will slide you down</li>
              <li>First player to reach exactly 100 wins</li>
              <li>You need the exact number to land on 100</li>
            </ul>
          </div>
        </div>

        <div className="relative w-full aspect-square bg-gradient-to-br from-emerald-800/40 to-green-900/40 rounded-xl border border-emerald-700/30 p-4 shadow-inner shadow-black/50 overflow-hidden">
          {/* Board grid */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-0">
            {Array.from({ length: 100 }).map((_, i) => {
              const cellNum = 100 - i;
              const row = Math.floor(i / 10);
              const isEvenRow = row % 2 === 0;
              const col = isEvenRow ? i % 10 : 9 - (i % 10);
              const cellIndex = row * 10 + col;
              const actualNumber = 100 - cellIndex;
              
              const isSnakeHead = Object.keys(snakes).includes(String(actualNumber));
              const isLadderFoot = Object.keys(ladders).includes(String(actualNumber));
              
              return (
                <div 
                  key={`cell-${cellNum}`} 
                  className={`
                    border border-emerald-800/30 flex justify-center items-center
                    ${(row + col) % 2 === 0 ? 'bg-emerald-700/20' : 'bg-green-900/20'}
                    ${isSnakeHead ? 'bg-red-900/30 border-red-500/30' : ''}
                    ${isLadderFoot ? 'bg-amber-600/30 border-amber-500/30' : ''}
                  `}
                >
                  <span className="text-xs sm:text-sm font-bold opacity-80 text-white">{actualNumber}</span>
                </div>
              );
            })}
          </div>
          
          {/* Snakes */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Object.entries(snakes).map(([head, tail]) => {
              const headPos = getBoardCellPosition(parseInt(head, 10));
              const tailPos = getBoardCellPosition(tail);
              
              // Calculate control points for more natural curves
              const headX = parseFloat(headPos.left);
              const headY = parseFloat(headPos.top);
              const tailX = parseFloat(tailPos.left);
              const tailY = parseFloat(tailPos.top);
              
              // Determine curve control points
              const controlX = (headX + tailX) / 2 + (Math.random() * 10 - 5);
              const controlY = (headY + tailY) / 2 + (Math.random() * 10 - 5);
              
              return (
                <g key={`snake-${head}`}>
                  {/* Snake body */}
                  <path 
                    d={`M ${headX} ${headY} Q ${controlX} ${controlY}, ${tailX} ${tailY}`}
                    stroke="crimson"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="0"
                    opacity="0.8"
                  />
                  {/* Snake head */}
                  <circle 
                    cx={headX} 
                    cy={headY} 
                    r="1.5" 
                    fill="red" 
                  />
                </g>
              );
            })}
          </svg>
          
          {/* Ladders */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Object.entries(ladders).map(([foot, top]) => {
              const footPos = getBoardCellPosition(parseInt(foot, 10));
              const topPos = getBoardCellPosition(parseInt(top.toString(), 10));
              
              const footX = parseFloat(footPos.left);
              const footY = parseFloat(footPos.top);
              const topX = parseFloat(topPos.left);
              const topY = parseFloat(topPos.top);
              
              // Create ladder rails with rungs
              const angle = Math.atan2(topY - footY, topX - footX);
              const length = Math.sqrt(Math.pow(topX - footX, 2) + Math.pow(topY - footY, 2));
              const rungCount = Math.ceil(length / 5);
              
              // Offset for the two rails
              const railOffset = 0.8;
              const xOffset = railOffset * Math.cos(angle + Math.PI/2);
              const yOffset = railOffset * Math.sin(angle + Math.PI/2);
              
              return (
                <g key={`ladder-${foot}`}>
                  {/* Left rail */}
                  <line 
                    x1={footX - xOffset}
                    y1={footY - yOffset}
                    x2={topX - xOffset}
                    y2={topY - yOffset}
                    stroke="gold"
                    strokeWidth="0.8"
                    opacity="0.9"
                  />
                  
                  {/* Right rail */}
                  <line 
                    x1={footX + xOffset}
                    y1={footY + yOffset}
                    x2={topX + xOffset}
                    y2={topY + yOffset}
                    stroke="gold"
                    strokeWidth="0.8"
                    opacity="0.9"
                  />
                  
                  {/* Rungs */}
                  {Array.from({ length: rungCount }).map((_, i) => {
                    const t = i / (rungCount - 1);
                    const x1 = footX - xOffset + (topX - footX - xOffset) * t;
                    const y1 = footY - yOffset + (topY - footY - yOffset) * t;
                    const x2 = footX + xOffset + (topX - footX + xOffset) * t;
                    const y2 = footY + yOffset + (topY - footY + yOffset) * t;
                    
                    return (
                      <line
                        key={`rung-${foot}-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="gold"
                        strokeWidth="0.6"
                        opacity="0.8"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
          
          {/* Player tokens */}
          {Object.entries(playerPositions).map(([player, position]) => {
            if (position === 0) return null;
            
            const pos = getBoardCellPosition(position);
            let bgColor = '';
            switch (player) {
              case 'red': bgColor = 'bg-red-500'; break;
              case 'blue': bgColor = 'bg-blue-500'; break; 
              case 'green': bgColor = 'bg-green-500'; break;
              case 'yellow': bgColor = 'bg-yellow-400'; break;
            }
            
            const isCurrentPlayer = player === currentPlayer;
            
            return (
              <div
                key={`player-${player}`}
                className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${bgColor} rounded-full border-2 border-white 
                  shadow-md transition-all duration-300
                  ${isCurrentPlayer ? 'animate-pulse ring-4 ring-white/50' : ''}`}
                style={{ 
                  top: pos.top, 
                  left: pos.left, 
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20
                }}
              ></div>
            );
          })}
        </div>
      
        <div className="mt-6 flex flex-wrap gap-4 justify-center items-center">
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPlayer === 'red' ? 'bg-red-700/70 text-white' : 
            currentPlayer === 'blue' ? 'bg-blue-700/70 text-white' : 
            currentPlayer === 'green' ? 'bg-green-700/70 text-white' : 
            'bg-yellow-600/70 text-white'
          }`}>
            {currentPlayer === 'red' ? 'Red' : 
             currentPlayer === 'blue' ? (gameMode === 'ai' ? 'AI (Blue)' : 'Blue') : 
             currentPlayer === 'green' ? 'Green' : 'Yellow'}'s Turn
          </div>

          <button 
            className={`game-button flex items-center gap-2 relative overflow-hidden ${isRolling || (gameMode === 'ai' && currentPlayer === 'blue') ? 'opacity-50 cursor-not-allowed' : 'group'}`}
            onClick={rollDice}
            disabled={isRolling || (gameMode === 'ai' && currentPlayer === 'blue')}
          >
            <span className="relative z-10">Roll Dice</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
          </button>
          
          <div className={`w-16 h-16 bg-white rounded-lg flex items-center justify-center text-gray-900 ${isRolling ? 'animate-bounce' : ''}`}>
            {diceValue !== null ? <DiceIcon /> : <span className="text-3xl font-bold">?</span>}
          </div>
          
          <button
            className="game-button flex items-center gap-2"
            onClick={() => setInfoVisible(!infoVisible)}
          >
            <Info size={18} />
            {infoVisible ? 'Hide Info' : 'Show Info'}
          </button>
        </div>

        <div className="mt-6 p-3 bg-gray-800/80 rounded-lg text-center">
          {gameMessage}
        </div>
        
        <div className="md:hidden mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-2">
          <AlertCircle className="text-yellow-500 shrink-0" size={20} />
          <p className="text-sm text-left">
            For the best Snake & Ladder experience, consider playing on a larger screen or rotating your device to landscape mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SnakeAndLadderPlaceholder;
