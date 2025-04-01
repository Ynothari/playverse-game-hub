
import { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Info, X } from 'lucide-react';

interface LudoPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

const LudoPlaceholder: React.FC<LudoPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  
  // Tokens for each player color
  const redTokens = [{ id: 'r1', home: true, position: null }, { id: 'r2', home: true, position: null }];
  const blueTokens = [{ id: 'b1', home: true, position: null }, { id: 'b2', home: true, position: null }];
  const greenTokens = [{ id: 'g1', home: true, position: null }, { id: 'g2', home: true, position: null }];
  const yellowTokens = [{ id: 'y1', home: true, position: null }, { id: 'y2', home: true, position: null }];
  
  const rollDice = () => {
    setIsRolling(true);
    setDiceValue(null);
    
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Stop rolling after a certain time
    setTimeout(() => {
      clearInterval(rollInterval);
      setIsRolling(false);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
    }, 800);
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
      <div className="bg-gradient-to-br from-game-ludo to-gray-900 p-6 rounded-xl mb-8 shadow-lg shadow-game-teal/10">
        <div className={`p-6 bg-gray-900/70 rounded-xl mb-6 transition-opacity duration-300 ${infoVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Ludo Game - {gameMode === 'ai' ? 'AI Opponent' : 'Multiplayer Mode'}</h2>
            <button 
              onClick={() => setInfoVisible(!infoVisible)} 
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-3">
            Ludo is a strategy board game where players race their tokens from start to finish based on dice rolls.
            {gameMode === 'ai' ? ' You are playing against an AI opponent.' : ' Take turns with your friend in multiplayer mode.'}
          </p>
          <div className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
            <p className="mb-2 flex items-center gap-1">
              <Info size={14} />
              <span className="font-medium text-game-teal">How to play:</span>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Roll a 6 to release a token from home</li>
              <li>Move your tokens clockwise around the board</li>
              <li>Capture opponent tokens by landing on their space</li>
              <li>Get all your tokens to the center to win</li>
            </ul>
          </div>
        </div>

        {/* Ludo Board */}
        <div className="w-full aspect-square bg-gray-900 rounded-xl border border-gray-700 p-4 relative grid grid-cols-15 grid-rows-15 gap-0 overflow-hidden shadow-inner shadow-black/50">
          {/* Red home (top-left) */}
          <div className="col-span-6 row-span-6 bg-red-700/70 rounded-tl-lg relative p-3">
            <div className="absolute inset-3 bg-red-900/30 rounded-lg border border-red-600/30 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div className="bg-red-100 rounded-full shadow-inner shadow-red-900/50"></div>
              <div className="bg-red-100 rounded-full shadow-inner shadow-red-900/50"></div>
              <div className="bg-red-100 rounded-full shadow-inner shadow-red-900/50"></div>
              <div className="bg-red-100 rounded-full shadow-inner shadow-red-900/50"></div>
            </div>
          </div>
          
          {/* Top path */}
          <div className="col-span-3 row-span-6 grid grid-rows-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={`top-${i}`} className="bg-gray-800 border border-gray-700 flex justify-center items-center">
                {i === 1 && <div className="w-3 h-3 rounded-full bg-red-500"></div>}
              </div>
            ))}
          </div>
          
          {/* Blue home (top-right) */}
          <div className="col-span-6 row-span-6 bg-blue-700/70 rounded-tr-lg relative p-3">
            <div className="absolute inset-3 bg-blue-900/30 rounded-lg border border-blue-600/30 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div className="bg-blue-100 rounded-full shadow-inner shadow-blue-900/50"></div>
              <div className="bg-blue-100 rounded-full shadow-inner shadow-blue-900/50"></div>
              <div className="bg-blue-100 rounded-full shadow-inner shadow-blue-900/50"></div>
              <div className="bg-blue-100 rounded-full shadow-inner shadow-blue-900/50"></div>
            </div>
          </div>
          
          {/* Left path */}
          <div className="col-span-6 row-span-3 grid grid-cols-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={`left-${i}`} className="bg-gray-800 border border-gray-700 flex justify-center items-center">
                {i === 1 && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
              </div>
            ))}
          </div>
          
          {/* Center paths */}
          <div className="col-span-3 row-span-3 bg-gray-800/80 grid grid-cols-3 grid-rows-3">
            {/* Red finish path */}
            <div className="col-span-1 row-span-3 grid grid-rows-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={`red-finish-${i}`} className="bg-red-700/40 border border-gray-700"></div>
              ))}
            </div>
            
            {/* Blue finish path */}
            <div className="col-span-3 row-span-1 grid grid-cols-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={`blue-finish-${i}`} className="bg-blue-700/40 border border-gray-700"></div>
              ))}
            </div>
            
            {/* Center finish */}
            <div className="bg-gray-700/50 border border-gray-600 flex justify-center items-center">
              <div className="w-full h-full bg-gradient-to-br from-red-600/50 via-blue-600/50 via-green-600/50 to-yellow-500/50 rounded-md"></div>
            </div>
            
            {/* Yellow finish path */}
            <div className="col-span-3 row-span-1 grid grid-cols-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={`yellow-finish-${i}`} className="bg-yellow-500/40 border border-gray-700"></div>
              ))}
            </div>
            
            {/* Green finish path */}
            <div className="col-span-1 row-span-3 grid grid-rows-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={`green-finish-${i}`} className="bg-green-700/40 border border-gray-700"></div>
              ))}
            </div>
          </div>
          
          {/* Right path */}
          <div className="col-span-6 row-span-3 grid grid-cols-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={`right-${i}`} className="bg-gray-800 border border-gray-700 flex justify-center items-center">
                {i === 4 && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
              </div>
            ))}
          </div>
          
          {/* Green home (bottom-left) */}
          <div className="col-span-6 row-span-6 bg-green-700/70 rounded-bl-lg relative p-3">
            <div className="absolute inset-3 bg-green-900/30 rounded-lg border border-green-600/30 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div className="bg-green-100 rounded-full shadow-inner shadow-green-900/50"></div>
              <div className="bg-green-100 rounded-full shadow-inner shadow-green-900/50"></div>
              <div className="bg-green-100 rounded-full shadow-inner shadow-green-900/50"></div>
              <div className="bg-green-100 rounded-full shadow-inner shadow-green-900/50"></div>
            </div>
          </div>
          
          {/* Bottom path */}
          <div className="col-span-3 row-span-6 grid grid-rows-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={`bottom-${i}`} className="bg-gray-800 border border-gray-700 flex justify-center items-center">
                {i === 4 && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
              </div>
            ))}
          </div>
          
          {/* Yellow home (bottom-right) */}
          <div className="col-span-6 row-span-6 bg-yellow-500/70 rounded-br-lg relative p-3">
            <div className="absolute inset-3 bg-yellow-800/30 rounded-lg border border-yellow-600/30 grid grid-cols-2 grid-rows-2 gap-2 p-2">
              <div className="bg-yellow-100 rounded-full shadow-inner shadow-yellow-800/50"></div>
              <div className="bg-yellow-100 rounded-full shadow-inner shadow-yellow-800/50"></div>
              <div className="bg-yellow-100 rounded-full shadow-inner shadow-yellow-800/50"></div>
              <div className="bg-yellow-100 rounded-full shadow-inner shadow-yellow-800/50"></div>
            </div>
          </div>
          
          {/* Game pieces overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Example game pieces - in a real implementation these would move */}
            <div className="absolute top-[12%] left-[12%] w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md"></div>
            <div className="absolute top-[12%] right-[12%] w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
            <div className="absolute bottom-[12%] left-[12%] w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            <div className="absolute bottom-[12%] right-[12%] w-6 h-6 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
            
            {/* A token on the board */}
            <div className="absolute top-[40%] left-[25%] w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
          </div>
        </div>
      
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="game-button flex items-center gap-2 relative overflow-hidden group"
            onClick={rollDice}
            disabled={isRolling}
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
      </div>
    </div>
  );
};

export default LudoPlaceholder;
