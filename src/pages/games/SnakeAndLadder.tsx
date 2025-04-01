
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
      <h1 className="text-3xl font-bold mb-4 text-center">Snake & Ladder</h1>
      
      {!gameMode ? (
        <ModeSelect onSelectMode={handleModeSelect} />
      ) : (
        <SnakeAndLadderPlaceholder gameMode={gameMode} />
      )}
    </div>
  );
};

export default SnakeAndLadder;
