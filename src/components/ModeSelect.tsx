
import { useState } from "react";
import { User, Bot } from "lucide-react";

interface ModeSelectProps {
  onSelectMode: (mode: "ai" | "multiplayer") => void;
}

const ModeSelect = ({ onSelectMode }: ModeSelectProps) => {
  const [selectedMode, setSelectedMode] = useState<"ai" | "multiplayer" | null>(null);

  const handleModeSelect = (mode: "ai" | "multiplayer") => {
    setSelectedMode(mode);
    onSelectMode(mode);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-xl bg-card mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Select Game Mode</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleModeSelect("ai")}
          className={`flex-1 p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-3
            ${selectedMode === "ai" 
              ? "border-game-teal bg-game-teal/10" 
              : "border-gray-700 hover:border-game-teal/50 hover:bg-game-teal/5"}`}
        >
          <Bot size={32} className={selectedMode === "ai" ? "text-game-teal" : "text-gray-400"} />
          <div className="text-center">
            <h3 className="font-medium mb-1">Play Against AI</h3>
            <p className="text-sm text-gray-400">Challenge our computer opponent</p>
          </div>
        </button>

        <button
          onClick={() => handleModeSelect("multiplayer")}
          className={`flex-1 p-6 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-3
            ${selectedMode === "multiplayer" 
              ? "border-game-teal bg-game-teal/10" 
              : "border-gray-700 hover:border-game-teal/50 hover:bg-game-teal/5"}`}
        >
          <User size={32} className={selectedMode === "multiplayer" ? "text-game-teal" : "text-gray-400"} />
          <div className="text-center">
            <h3 className="font-medium mb-1">Multiplayer</h3>
            <p className="text-sm text-gray-400">Play with friends locally</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelect;
