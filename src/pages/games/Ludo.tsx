
import { useState } from "react";
import ModeSelect from "@/components/ModeSelect";
import LudoPlaceholder from "@/components/games/LudoPlaceholder";

const Ludo = () => {
  const [gameMode, setGameMode] = useState<"ai" | "multiplayer" | null>(null);
  
  const handleModeSelect = (mode: "ai" | "multiplayer") => {
    setGameMode(mode);
  };

  return (
    <div className="game-layout">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-game-teal via-white to-game-teal bg-clip-text text-transparent">Ludo</h1>
      
      {!gameMode ? (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-game-ludo to-gray-900/80 rounded-xl shadow-lg shadow-game-ludo/20">
          <ModeSelect onSelectMode={handleModeSelect} />
        </div>
      ) : (
        <LudoPlaceholder gameMode={gameMode} />
      )}
    </div>
  );
};

export default Ludo;
