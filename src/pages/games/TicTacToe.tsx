
import { useState } from "react";
import ModeSelect from "@/components/ModeSelect";
import TicTacToe from "@/components/games/TicTacToe";
import { toast } from "sonner";

const TicTacToeGame = () => {
  const [gameMode, setGameMode] = useState<"ai" | "multiplayer" | null>(null);
  
  const handleModeSelect = (mode: "ai" | "multiplayer") => {
    setGameMode(mode);
    toast(`${mode === "ai" ? "AI" : "Multiplayer"} mode selected!`);
  };

  const handleGameEnd = (result: "X" | "O" | "draw") => {
    if (result === "draw") {
      toast("Game ended in a draw!");
    } else {
      toast(`Player ${result} wins!`);
    }
  };

  return (
    <div className="game-layout">
      <h1 className="text-3xl font-bold mb-4 text-center">Tic Tac Toe</h1>
      
      {!gameMode ? (
        <ModeSelect onSelectMode={handleModeSelect} />
      ) : (
        <TicTacToe gameMode={gameMode} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
};

export default TicTacToeGame;
