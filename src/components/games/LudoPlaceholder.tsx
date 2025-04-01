
import { useState } from 'react';

interface LudoPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

const LudoPlaceholder: React.FC<LudoPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  
  const rollDice = () => {
    setDiceValue(null);
    setTimeout(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 300);
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <div className={`p-6 bg-game-ludo/30 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-xl font-bold mb-3">Ludo Game - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
        <p className="mb-3">
          This is a placeholder for the Ludo game implementation. In the full version,
          you would see a complete Ludo board with all pieces and game functionality.
        </p>
        {gameMode === 'ai' ? (
          <p className="text-sm text-gray-400">
            Playing against AI: The computer will make moves based on standard Ludo rules.
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            Multiplayer mode: Take turns on the same device or invite friends online.
          </p>
        )}
      </div>

      <div className="w-full aspect-square bg-gray-900 rounded-xl border border-gray-700 p-8 relative grid grid-cols-3 grid-rows-3">
        {/* Red area (top-left) */}
        <div className="bg-red-700/70 rounded-tl-lg"></div>
        {/* Path */}
        <div className="bg-gray-800 flex flex-col">
          <div className="flex-1 border-b border-gray-700 flex justify-center items-center">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <div className="flex-1 border-b border-gray-700"></div>
          <div className="flex-1"></div>
        </div>
        {/* Blue area (top-right) */}
        <div className="bg-blue-700/70 rounded-tr-lg"></div>
        
        {/* Path */}
        <div className="bg-gray-800 flex">
          <div className="flex-1 border-r border-gray-700"></div>
          <div className="flex-1 border-r border-gray-700"></div>
          <div className="flex-1"></div>
        </div>
        
        {/* Center */}
        <div className="bg-gray-800 grid grid-cols-3 grid-rows-3">
          <div className="border-r border-b border-gray-700"></div>
          <div className="border-r border-b border-gray-700"></div>
          <div className="border-b border-gray-700"></div>
          <div className="border-r border-b border-gray-700"></div>
          <div className="border-r border-b border-gray-700 bg-gray-900/50"></div>
          <div className="border-b border-gray-700"></div>
          <div className="border-r border-gray-700"></div>
          <div className="border-r border-gray-700"></div>
          <div></div>
        </div>
        
        {/* Path */}
        <div className="bg-gray-800 flex">
          <div className="flex-1 border-r border-gray-700"></div>
          <div className="flex-1 border-r border-gray-700"></div>
          <div className="flex-1"></div>
        </div>
        
        {/* Green area (bottom-left) */}
        <div className="bg-green-700/70 rounded-bl-lg"></div>
        
        {/* Path */}
        <div className="bg-gray-800 flex flex-col">
          <div className="flex-1 border-b border-gray-700"></div>
          <div className="flex-1 border-b border-gray-700"></div>
          <div className="flex-1 flex justify-center items-center">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>
        
        {/* Yellow area (bottom-right) */}
        <div className="bg-yellow-500/70 rounded-br-lg"></div>
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
    </div>
  );
};

export default LudoPlaceholder;
