
import { useState } from "react";
import ModeSelect from "@/components/ModeSelect";
import ChessPlaceholder from "@/components/games/ChessPlaceholder";

const Chess = () => {
  const [gameMode, setGameMode] = useState<"ai" | "multiplayer" | null>(null);
  
  const handleModeSelect = (mode: "ai" | "multiplayer") => {
    setGameMode(mode);
  };

  return (
    <div className="game-layout">
      <h1 className="text-3xl font-bold mb-4 text-center">Chess</h1>
      
      {!gameMode ? (
        <ModeSelect onSelectMode={handleModeSelect} />
      ) : (
        <ChessPlaceholder gameMode={gameMode} />
      )}
    </div>
  );
};

export default Chess;
