
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
      <h1 className="text-3xl font-bold mb-4 text-center">Ludo</h1>
      
      {!gameMode ? (
        <ModeSelect onSelectMode={handleModeSelect} />
      ) : (
        <LudoPlaceholder gameMode={gameMode} />
      )}
    </div>
  );
};

export default Ludo;
