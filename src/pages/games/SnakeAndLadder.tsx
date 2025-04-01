
import { useState } from "react";
import ModeSelect from "@/components/ModeSelect";
import SnakeAndLadderPlaceholder from "@/components/games/SnakeAndLadderPlaceholder";

const SnakeAndLadder = () => {
  const [gameMode, setGameMode] = useState<"ai" | "multiplayer" | null>(null);
  
  const handleModeSelect = (mode: "ai" | "multiplayer") => {
    setGameMode(mode);
  };

  return (
    <div className="game-layout">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-game-teal via-white to-game-teal bg-clip-text text-transparent">Snake & Ladder</h1>
      
      {!gameMode ? (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-game-snake to-gray-900/80 rounded-xl shadow-lg shadow-game-snake/20">
          <ModeSelect onSelectMode={handleModeSelect} />
        </div>
      ) : (
        <SnakeAndLadderPlaceholder gameMode={gameMode} />
      )}
    </div>
  );
};

export default SnakeAndLadder;
