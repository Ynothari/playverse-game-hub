
import { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Info, X, AlertCircle } from 'lucide-react';

interface LudoPlaceholderProps {
  gameMode: 'ai' | 'multiplayer';
}

interface Token {
  id: string;
  color: 'red' | 'blue' | 'green' | 'yellow';
  position: number | null;
  isHome: boolean;
  isComplete: boolean;
}

const LudoPlaceholder: React.FC<LudoPlaceholderProps> = ({ gameMode }) => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<'red' | 'blue' | 'green' | 'yellow'>('red');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [gameMessage, setGameMessage] = useState<string>('Roll the dice to start!');

  useEffect(() => {
    // Initialize tokens with correct typing
    const initialTokens: Token[] = [
      { id: 'r1', color: 'red', position: null, isHome: true, isComplete: false },
      { id: 'r2', color: 'red', position: null, isHome: true, isComplete: false },
      { id: 'r3', color: 'red', position: null, isHome: true, isComplete: false },
      { id: 'r4', color: 'red', position: null, isHome: true, isComplete: false },
      
      { id: 'b1', color: 'blue', position: null, isHome: true, isComplete: false },
      { id: 'b2', color: 'blue', position: null, isHome: true, isComplete: false },
      { id: 'b3', color: 'blue', position: null, isHome: true, isComplete: false },
      { id: 'b4', color: 'blue', position: null, isHome: true, isComplete: false },
      
      ...(gameMode === 'multiplayer' ? [
        { id: 'g1', color: 'green', position: null, isHome: true, isComplete: false },
        { id: 'g2', color: 'green', position: null, isHome: true, isComplete: false },
        { id: 'g3', color: 'green', position: null, isHome: true, isComplete: false },
        { id: 'g4', color: 'green', position: null, isHome: true, isComplete: false },
        
        { id: 'y1', color: 'yellow', position: null, isHome: true, isComplete: false },
        { id: 'y2', color: 'yellow', position: null, isHome: true, isComplete: false },
        { id: 'y3', color: 'yellow', position: null, isHome: true, isComplete: false },
        { id: 'y4', color: 'yellow', position: null, isHome: true, isComplete: false },
      ] as Token[] : [])
    ];
    
    setTokens(initialTokens);
  }, [gameMode]);

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'blue') {
      setTimeout(() => {
        handleAITurn();
      }, 1000);
    }
  }, [currentPlayer, gameMode]);

  const handleAITurn = () => {
    rollDice(true);
  };

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'blue' && diceValue !== null && !isRolling) {
      setTimeout(() => {
        const aiTokens = tokens.filter(token => token.color === 'blue');
        
        if (diceValue === 6) {
          const homeTokens = aiTokens.filter(token => token.isHome);
          if (homeTokens.length > 0) {
            releaseToken(homeTokens[0]);
            return;
          }
        }
        
        const activeTokens = aiTokens.filter(token => !token.isHome && !token.isComplete);
        if (activeTokens.length > 0) {
          moveToken(activeTokens[0]);
        } else {
          endTurn();
        }
      }, 1000);
    }
  }, [diceValue, isRolling, currentPlayer, tokens]);

  const rollDice = (isAI = false) => {
    if (isRolling) return;

    setIsRolling(true);
    setDiceValue(null);
    setSelectedToken(null);
    setGameMessage(isAI ? "AI is rolling the dice..." : "Rolling the dice...");
    
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      setIsRolling(false);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      
      const currentTokens = tokens.filter(token => token.color === currentPlayer);
      const hasActiveTokens = currentTokens.some(token => !token.isHome && !token.isComplete);
      
      if (finalValue === 6) {
        setGameMessage(`You rolled a 6! Select a token to move or release.`);
      } else if (hasActiveTokens) {
        setGameMessage(`Select a token to move.`);
      } else {
        setGameMessage(`No valid moves. Turn passes.`);
        setTimeout(() => endTurn(), 1500);
      }
    }, 800);
  };

  const handleTokenClick = (token: Token) => {
    if (isRolling || token.color !== currentPlayer || token.isComplete) return;
    
    setSelectedToken(token);
    
    if (token.isHome) {
      if (diceValue === 6) {
        releaseToken(token);
      } else {
        setGameMessage("Need a 6 to release this token!");
      }
    } else {
      moveToken(token);
    }
  };
  
  const releaseToken = (token: Token) => {
    const startPosition = getStartPosition(token.color);
    
    const tokenAtStart = tokens.find(t => 
      t.position === startPosition && t.color === token.color && t.id !== token.id
    );
    
    if (tokenAtStart) {
      setGameMessage("Start position already occupied by your token!");
      return;
    }
    
    const opponentAtStart = tokens.find(t => 
      t.position === startPosition && t.color !== token.color
    );
    
    setTokens(prevTokens => 
      prevTokens.map(t => {
        if (t.id === token.id) {
          return { ...t, isHome: false, position: startPosition };
        }
        
        if (opponentAtStart && t.id === opponentAtStart.id) {
          return { ...t, isHome: true, position: null };
        }
        
        return t;
      })
    );
    
    if (opponentAtStart) {
      setGameMessage(`Token released and captured ${opponentAtStart.color} token!`);
    } else {
      setGameMessage(`Token released!`);
    }
    
    if (diceValue === 6) {
      setDiceValue(null); // Allow rolling again after a 6
      return;
    }
    
    setTimeout(() => endTurn(), 1000);
  };
  
  const moveToken = (token: Token) => {
    if (token.position === null || diceValue === null) return;
    
    let newPosition = token.position + diceValue;
    
    const homeEntrance = getHomeEntrance(token.color);
    const homeRunStart = getHomeRunStart(token.color);
    
    if (token.position < homeEntrance && newPosition >= homeEntrance) {
      const overshoot = newPosition - homeEntrance;
      newPosition = homeRunStart + overshoot;
    }
    
    const isComplete = newPosition >= homeRunStart + 6;
    
    if (isComplete) {
      setTokens(prevTokens => 
        prevTokens.map(t => {
          if (t.id === token.id) {
            return { ...t, isComplete: true, position: null };
          }
          return t;
        })
      );
      
      setGameMessage(`Token completed!`);
      
      const allComplete = tokens
        .filter(t => t.color === token.color)
        .every(t => t.id === token.id || t.isComplete);
      
      if (allComplete) {
        setGameMessage(`${token.color.toUpperCase()} wins the game!`);
        return;
      }
      
      // Roll again after completing a token
      setDiceValue(null);
      return;
    }
    
    // Check for safe zones (start positions and every 8th position)
    const safePositions = [0, 8, 13, 21, 26, 34, 39, 47];
    const isSafePosition = safePositions.includes(newPosition % 52);
    
    // Check for own token or safe position
    const ownTokenAtPosition = tokens.find(t => 
      t.position === newPosition && t.color === token.color && t.id !== token.id
    );
    
    if (ownTokenAtPosition) {
      setGameMessage("Cannot move - destination occupied by your token!");
      return;
    }
    
    // Check for opponent token that can be captured (if not on safe position)
    const opponentAtPosition = tokens.find(t => 
      t.position === newPosition && t.color !== token.color && 
      newPosition < homeRunStart && !isSafePosition
    );
    
    setTokens(prevTokens => 
      prevTokens.map(t => {
        if (t.id === token.id) {
          return { ...t, position: newPosition };
        }
        
        // Send opponent token home if captured
        if (opponentAtPosition && t.id === opponentAtPosition.id) {
          return { ...t, isHome: true, position: null };
        }
        
        return t;
      })
    );
    
    if (opponentAtPosition) {
      setGameMessage(`Moved and captured ${opponentAtPosition.color} token!`);
    } else {
      setGameMessage(`Token moved!`);
    }
    
    if (diceValue === 6) {
      setDiceValue(null); // Allow rolling again after a 6
    } else {
      setTimeout(() => endTurn(), 1000);
    }
  };
  
  const endTurn = () => {
    setSelectedToken(null);
    setDiceValue(null);
    
    if (gameMode === 'multiplayer') {
      if (currentPlayer === 'red') setCurrentPlayer('blue');
      else if (currentPlayer === 'blue') setCurrentPlayer('green');
      else if (currentPlayer === 'green') setCurrentPlayer('yellow');
      else setCurrentPlayer('red');
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
    }
  };
  
  const getStartPosition = (color: 'red' | 'blue' | 'green' | 'yellow'): number => {
    switch (color) {
      case 'red': return 0; 
      case 'blue': return 13;
      case 'green': return 26;
      case 'yellow': return 39;
      default: return 0;
    }
  };
  
  const getHomeEntrance = (color: 'red' | 'blue' | 'green' | 'yellow'): number => {
    switch (color) {
      case 'red': return 51;
      case 'blue': return 12;
      case 'green': return 25;
      case 'yellow': return 38;
      default: return 51;
    }
  };
  
  const getHomeRunStart = (color: 'red' | 'blue' | 'green' | 'yellow'): number => {
    switch (color) {
      case 'red': return 100;
      case 'blue': return 200;
      case 'green': return 300;
      case 'yellow': return 400;
      default: return 100;
    }
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

  const getTokenPosition = (token: Token): { top: string, left: string } | null => {
    if (token.isHome) {
      switch (token.color) {
        case 'red':
          if (token.id === 'r1') return { top: '20%', left: '20%' };
          if (token.id === 'r2') return { top: '20%', left: '30%' };
          if (token.id === 'r3') return { top: '30%', left: '20%' };
          if (token.id === 'r4') return { top: '30%', left: '30%' };
        case 'blue':
          if (token.id === 'b1') return { top: '20%', left: '70%' };
          if (token.id === 'b2') return { top: '20%', left: '80%' };
          if (token.id === 'b3') return { top: '30%', left: '70%' };
          if (token.id === 'b4') return { top: '30%', left: '80%' };
        case 'green':
          if (token.id === 'g1') return { top: '70%', left: '20%' };
          if (token.id === 'g2') return { top: '70%', left: '30%' };
          if (token.id === 'g3') return { top: '80%', left: '20%' };
          if (token.id === 'g4') return { top: '80%', left: '30%' };
        case 'yellow':
          if (token.id === 'y1') return { top: '70%', left: '70%' };
          if (token.id === 'y2') return { top: '70%', left: '80%' };
          if (token.id === 'y3') return { top: '80%', left: '70%' };
          if (token.id === 'y4') return { top: '80%', left: '80%' };
      }
    }
    
    if (token.isComplete) {
      switch (token.color) {
        case 'red': return { top: '50%', left: '43%' };
        case 'blue': return { top: '43%', left: '50%' };
        case 'green': return { top: '50%', left: '57%' };
        case 'yellow': return { top: '57%', left: '50%' };
      }
    }
    
    if (token.position === null) return null;
    
    const homeRunStart = getHomeRunStart(token.color);
    if (token.position >= homeRunStart) {
      const homePosition = token.position - homeRunStart;
      switch (token.color) {
        case 'red':
          return { top: `${40 + homePosition * 5}%`, left: '43%' };
        case 'blue':
          return { top: '43%', left: `${60 - homePosition * 5}%` };
        case 'green':
          return { top: `${60 - homePosition * 5}%`, left: '57%' };
        case 'yellow':
          return { top: '57%', left: `${40 + homePosition * 5}%` };
      }
    }
    
    // Main board positions (0-51)
    const pos = token.position % 52;
    
    // Red path (0-12)
    if (pos >= 0 && pos <= 12) {
      return { top: '40%', left: `${25 + pos * 2.5}%` };
    }
    
    // Blue path (13-25)  
    if (pos >= 13 && pos <= 25) {
      return { top: `${40 - (pos - 13) * 2.5}%`, left: '55%' };
    }
    
    // Green path (26-38)
    if (pos >= 26 && pos <= 38) {
      return { top: '15%', left: `${55 - (pos - 26) * 2.5}%` };
    }
    
    // Yellow path (39-51)
    if (pos >= 39 && pos <= 51) {
      return { top: `${15 + (pos - 39) * 2.5}%`, left: '25%' };
    }
    
    return { top: '0%', left: '0%' };
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
            {gameMode === 'ai' ? ' You play as Red against Blue AI opponent.' : ' Take turns with your friends in multiplayer mode.'}
          </p>
          <div className="text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
            <p className="mb-2 flex items-center gap-1">
              <Info size={14} />
              <span className="font-medium text-game-teal">How to play:</span>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-left">
              <li>Roll a 6 to release a token from home</li>
              <li>Move tokens clockwise around the board</li>
              <li>Capture opponent tokens by landing on their space</li>
              <li>Roll again after getting a 6 or completing a token</li>
              <li>Get all your tokens to your home run to win</li>
              <li>Safe zones protect your tokens from capture</li>
            </ul>
          </div>
        </div>

        <div className="relative w-full aspect-square bg-gray-900 rounded-xl border border-gray-700 p-4 shadow-inner shadow-black/50 overflow-hidden">
          {/* Board grid with improved design */}
          <div className="absolute inset-0 grid grid-cols-15 grid-rows-15 gap-0">
            {/* Red home (top-left) */}
            <div className="col-span-6 row-span-6 bg-red-700/90 rounded-tl-lg border border-red-600/50"></div>
            
            {/* Center top path */}
            <div className="col-span-3 row-span-6 grid grid-rows-6 grid-cols-3">
              {Array(18).fill(0).map((_, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const isRedSafety = row === 1 && col === 1;
                const isBlueSafety = row === 4 && col === 1;
                const isRedPath = row === 2 || row === 3 || row === 4;
                const isBluePath = row === 0 || row === 1 || row === 2;
                
                return (
                  <div 
                    key={`top-${i}`} 
                    className={`
                      border border-gray-700 flex justify-center items-center
                      ${isRedSafety ? 'bg-red-500/50' : ''}
                      ${isBlueSafety ? 'bg-blue-500/50' : ''}
                      ${isRedPath && col === 1 ? 'bg-red-500/30' : ''}
                      ${isBluePath && col === 1 ? 'bg-blue-500/30' : ''}
                      ${(!isRedSafety && !isBlueSafety && !isRedPath && !isBluePath) ? 'bg-gray-800' : ''}
                      ${(!isRedSafety && !isBlueSafety && (isRedPath || isBluePath) && col !== 1) ? 'bg-gray-800' : ''}
                    `}
                  ></div>
                );
              })}
            </div>
            
            {/* Blue home (top-right) */}
            <div className="col-span-6 row-span-6 bg-blue-700/90 rounded-tr-lg border border-blue-600/50"></div>
            
            {/* Left side path */}
            <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3">
              {Array(18).fill(0).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const isGreenSafety = row === 1 && col === 4;
                const isYellowSafety = row === 1 && col === 1;
                const isYellowPath = col === 0 || col === 1 || col === 2;
                const isGreenPath = col === 3 || col === 4 || col === 5;
                
                return (
                  <div 
                    key={`left-${i}`} 
                    className={`
                      border border-gray-700 flex justify-center items-center
                      ${isGreenSafety ? 'bg-green-500/50' : ''}
                      ${isYellowSafety ? 'bg-yellow-500/50' : ''}
                      ${isYellowPath && row === 1 ? 'bg-yellow-500/30' : ''}
                      ${isGreenPath && row === 1 ? 'bg-green-500/30' : ''}
                      ${(!isGreenSafety && !isYellowSafety && !isYellowPath && !isGreenPath) ? 'bg-gray-800' : ''}
                      ${(!isGreenSafety && !isYellowSafety && (isYellowPath || isGreenPath) && row !== 1) ? 'bg-gray-800' : ''}
                    `}
                  ></div>
                );
              })}
            </div>
            
            {/* Center grid */}
            <div className="col-span-3 row-span-3 grid grid-cols-3 grid-rows-3">
              {/* Home runs for each color */}
              <div className="grid grid-rows-3 bg-red-700/40"></div>
              <div className="grid grid-cols-3 bg-blue-700/40"></div>
              <div className="grid grid-rows-3 bg-green-700/40"></div>
              <div className="grid grid-cols-3 bg-yellow-500/40"></div>
              <div className="bg-gray-700/50 border border-gray-600">
                <div className="w-full h-full bg-gradient-to-br from-red-600/50 via-blue-600/50 via-green-600/50 to-yellow-500/50"></div>
              </div>
            </div>
            
            {/* Right side path */}
            <div className="col-span-6 row-span-3 grid grid-cols-6 grid-rows-3">
              {Array(18).fill(0).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const isYellowSafety = row === 1 && col === 1;
                const isGreenSafety = row === 1 && col === 4;
                const isGreenPath = col === 0 || col === 1 || col === 2;
                const isYellowPath = col === 3 || col === 4 || col === 5;
                
                return (
                  <div 
                    key={`right-${i}`} 
                    className={`
                      border border-gray-700 flex justify-center items-center
                      ${isYellowSafety ? 'bg-yellow-500/50' : ''}
                      ${isGreenSafety ? 'bg-green-500/50' : ''}
                      ${isYellowPath && row === 1 ? 'bg-yellow-500/30' : ''}
                      ${isGreenPath && row === 1 ? 'bg-green-500/30' : ''}
                      ${(!isYellowSafety && !isGreenSafety && !isYellowPath && !isGreenPath) ? 'bg-gray-800' : ''}
                      ${(!isYellowSafety && !isGreenSafety && (isYellowPath || isGreenPath) && row !== 1) ? 'bg-gray-800' : ''}
                    `}
                  ></div>
                );
              })}
            </div>
            
            {/* Green home (bottom-left) */}
            <div className="col-span-6 row-span-6 bg-green-700/90 rounded-bl-lg border border-green-600/50"></div>
            
            {/* Center bottom path */}
            <div className="col-span-3 row-span-6 grid grid-rows-6 grid-cols-3">
              {Array(18).fill(0).map((_, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const isYellowSafety = row === 1 && col === 1;
                const isGreenSafety = row === 4 && col === 1;
                const isYellowPath = row === 0 || row === 1 || row === 2;
                const isGreenPath = row === 3 || row === 4 || row === 5;
                
                return (
                  <div 
                    key={`bottom-${i}`} 
                    className={`
                      border border-gray-700 flex justify-center items-center
                      ${isYellowSafety ? 'bg-yellow-500/50' : ''}
                      ${isGreenSafety ? 'bg-green-500/50' : ''}
                      ${isYellowPath && col === 1 ? 'bg-yellow-500/30' : ''}
                      ${isGreenPath && col === 1 ? 'bg-green-500/30' : ''}
                      ${(!isYellowSafety && !isGreenSafety && !isYellowPath && !isGreenPath) ? 'bg-gray-800' : ''}
                      ${(!isYellowSafety && !isGreenSafety && (isYellowPath || isGreenPath) && col !== 1) ? 'bg-gray-800' : ''}
                    `}
                  ></div>
                );
              })}
            </div>
            
            {/* Yellow home (bottom-right) */}
            <div className="col-span-6 row-span-6 bg-yellow-500/90 rounded-br-lg border border-yellow-400/50"></div>
          </div>
          
          {/* Home positions for tokens */}
          <div className="absolute top-[8%] left-[8%] w-[30%] h-[30%] bg-red-900/20 rounded-lg border border-red-700/30 grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="bg-red-100 rounded-full shadow-lg"></div>
            <div className="bg-red-100 rounded-full shadow-lg"></div>
            <div className="bg-red-100 rounded-full shadow-lg"></div>
            <div className="bg-red-100 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute top-[8%] right-[8%] w-[30%] h-[30%] bg-blue-900/20 rounded-lg border border-blue-700/30 grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="bg-blue-100 rounded-full shadow-lg"></div>
            <div className="bg-blue-100 rounded-full shadow-lg"></div>
            <div className="bg-blue-100 rounded-full shadow-lg"></div>
            <div className="bg-blue-100 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute bottom-[8%] left-[8%] w-[30%] h-[30%] bg-green-900/20 rounded-lg border border-green-700/30 grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="bg-green-100 rounded-full shadow-lg"></div>
            <div className="bg-green-100 rounded-full shadow-lg"></div>
            <div className="bg-green-100 rounded-full shadow-lg"></div>
            <div className="bg-green-100 rounded-full shadow-lg"></div>
          </div>
          
          <div className="absolute bottom-[8%] right-[8%] w-[30%] h-[30%] bg-yellow-800/20 rounded-lg border border-yellow-600/30 grid grid-cols-2 grid-rows-2 gap-4 p-4">
            <div className="bg-yellow-100 rounded-full shadow-lg"></div>
            <div className="bg-yellow-100 rounded-full shadow-lg"></div>
            <div className="bg-yellow-100 rounded-full shadow-lg"></div>
            <div className="bg-yellow-100 rounded-full shadow-lg"></div>
          </div>
          
          {/* Home run paths */}
          <div className="absolute top-[43%] left-[40%] w-[20%] h-[3%] bg-red-500/40"></div>
          <div className="absolute top-[40%] left-[57%] w-[3%] h-[20%] bg-blue-500/40"></div>
          <div className="absolute top-[57%] left-[40%] w-[20%] h-[3%] bg-green-500/40"></div>
          <div className="absolute top-[40%] left-[40%] w-[3%] h-[20%] bg-yellow-500/40"></div>
          
          {/* Center finish */}
          <div className="absolute top-[43%] left-[43%] w-[14%] h-[14%] bg-gray-800 rounded-lg border border-white/10 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-blue-600/20 via-green-600/20 to-yellow-600/20 rounded-md"></div>
          </div>
          
          {/* Player tokens */}
          {tokens.map(token => {
            const position = getTokenPosition(token);
            
            if (!position) return null;
            
            let bgColor = '';
            switch (token.color) {
              case 'red': bgColor = 'bg-red-500'; break;
              case 'blue': bgColor = 'bg-blue-500'; break; 
              case 'green': bgColor = 'bg-green-500'; break;
              case 'yellow': bgColor = 'bg-yellow-400'; break;
            }
            
            const isSelected = selectedToken?.id === token.id;
            const isCurrentPlayerToken = token.color === currentPlayer;
            
            return (
              <div
                key={token.id}
                className={`absolute w-5 h-5 sm:w-6 sm:h-6 ${bgColor} rounded-full border-2 border-white 
                  shadow-md transition-all duration-300 cursor-pointer
                  ${isSelected ? 'ring-4 ring-white/50' : ''}
                  ${isCurrentPlayerToken && !token.isHome && !token.isComplete ? 'animate-pulse' : ''}
                  ${token.isComplete ? 'opacity-50' : 'opacity-100'}`}
                style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
                onClick={() => handleTokenClick(token)}
              ></div>
            );
          })}
          
          {/* Safe zone indicators */}
          <div className="absolute top-[15%] left-[55%] w-3 h-3 rounded-full bg-yellow-300/50 shadow-md transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute top-[85%] left-[45%] w-3 h-3 rounded-full bg-yellow-300/50 shadow-md transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute top-[45%] left-[15%] w-3 h-3 rounded-full bg-yellow-300/50 shadow-md transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute top-[55%] left-[85%] w-3 h-3 rounded-full bg-yellow-300/50 shadow-md transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
      
        <div className="mt-6 flex flex-wrap gap-4 justify-center items-center">
          <div className={`px-4 py-2 rounded-lg text-sm ${
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
            onClick={() => rollDice()}
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
            For the best Ludo experience, consider playing on a larger screen or rotating your device to landscape mode.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LudoPlaceholder;
