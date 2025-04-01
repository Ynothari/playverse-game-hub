
import { useState } from 'react';

interface SnakeAndLadderPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

const SnakeAndLadderPlaceholder: React.FC<SnakeAndLadderPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [playerPosition, setPlayerPosition] = useState(1);
  const [aiPosition, setAiPosition] = useState(1);
  
  const rollDice = () => {
    setDiceValue(null);
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      
      // Move player
      let newPosition = playerPosition + roll;
      if (newPosition > 100) newPosition = playerPosition;
      setPlayerPosition(newPosition);
      
      // Move AI if in AI mode
      if (gameMode === 'ai') {
        setTimeout(() => {
          const aiRoll = Math.floor(Math.random() * 6) + 1;
          let newAiPosition = aiPosition + aiRoll;
          if (newAiPosition > 100) newAiPosition = aiPosition;
          setAiPosition(newAiPosition);
        }, 1000);
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <div className={`p-6 bg-game-snake/30 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl font-bold mb-3">Snake & Ladder - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
        <p className="mb-3">
          This is a placeholder for the Snake & Ladder game implementation. In the full version,
          you would see a complete board with snakes, ladders, and game functionality.
        </p>
        {gameMode === 'ai' ? (
          <p className="text-sm text-gray-400">
            Playing against AI: The computer will take turns rolling the dice.
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Multiplayer mode: Take turns rolling the dice with your friends.
          </p>
        )}
      </div>

      <div className="w-full aspect-square bg-gray-900 rounded-xl border border-gray-700 p-4 relative grid grid-cols-10 grid-rows-10">
        {[...Array(100)].map((_, i) => {
          const position = 100 - i;
          const row = Math.floor(i / 10);
          const isEvenRow = row % 2 === 0;
          const adjustedPosition = isEvenRow ? position : position - (position % 10) + 9 - (position % 10);
          
          const hasPlayer = adjustedPosition === playerPosition;
          const hasAI = gameMode === 'ai' && adjustedPosition === aiPosition;
          
          return (
            <div
              key={i}
              className={`border border-gray-800 flex items-center justify-center text-xs relative
                ${(row + i % 10) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}
              `}
            >
              <span className="opacity-40">{adjustedPosition}</span>
              
              {hasPlayer && (
                <div className="absolute w-4 h-4 bg-game-teal rounded-full animate-pulse-glow"></div>
              )}
              
              {hasAI && (
                <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse-glow"></div>
              )}
            </div>
          );
        })}
        
        {/* Snake Indicators */}
        <div className="absolute top-[30%] left-[25%] w-[20%] h-[30%] border-l-4 border-red-500 transform -rotate-45"></div>
        <div className="absolute top-[60%] left-[65%] w-[15%] h-[20%] border-l-4 border-red-500 transform -rotate-45"></div>
        
        {/* Ladder Indicators */}
        <div className="absolute top-[10%] left-[75%] w-[10%] h-[40%] border-l-4 border-yellow-500 transform rotate-45"></div>
        <div className="absolute top-[50%] left-[45%] w-[15%] h-[30%] border-l-4 border-yellow-500 transform rotate-45"></div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="game-button" onClick={rollDice}>
          Roll Dice
        </button>
        
        <div className="w-16 h-16 bg-white rounded-lg text-3xl font-bold flex items-center justify-center text-gray-900">
          {diceValue !== null ? diceValue : '?'}
        </div>
        
        <button
          className="game-button"
          onClick={() => setInfoVisible(!infoVisible)}
        >
          {infoVisible ? 'Hide Info' : 'Show Info'}
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-game-teal/20 rounded-lg">
          <span className="font-bold">You:</span> Position {playerPosition}
        </div>
        
        {gameMode === 'ai' && (
          <div className="p-3 bg-red-500/20 rounded-lg">
            <span className="font-bold">AI:</span> Position {aiPosition}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeAndLadderPlaceholder;
