
import { Link } from "react-router-dom";
import GameCard from "@/components/GameCard";
import { Gamepad } from "lucide-react";

const Index = () => {
  const games = [
    {
      title: "Chess",
      description: "The classic strategic board game of kings and queens.",
      path: "/games/chess",
      bgColor: "bg-game-chess",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 16v-5h8v5"></path>
              <path d="M10 8V6c0-1.1.9-2 2-2s2 .9 2 2v2"></path>
              <path d="M13 7h2"></path>
              <path d="M16 16c0 2-1.8 3-4 3s-4-1 4-3Z"></path>
              <path d="M5 8h14v6H5z"></path>
            </svg>
    },
    {
      title: "Ludo",
      description: "Race your pieces around the board in this game of chance.",
      path: "/games/ludo",
      bgColor: "bg-game-ludo",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="10" height="10" x="2" y="2" rx="2"></rect>
              <rect width="10" height="10" x="12" y="2" rx="2"></rect>
              <rect width="10" height="10" x="12" y="12" rx="2"></rect>
              <rect width="10" height="10" x="2" y="12" rx="2"></rect>
            </svg>
    },
    {
      title: "Snake & Ladder",
      description: "Climb the ladders and avoid the snakes in this race to the top.",
      path: "/games/snake-and-ladder",
      bgColor: "bg-game-snake",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7"></path>
              <path d="M16 6h.01"></path>
              <path d="M16 10h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M16 18h.01"></path>
              <path d="M12 6h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M8 6h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="m18 22 4-11h-4"></path>
            </svg>
    },
    {
      title: "Tic Tac Toe",
      description: "A 3x3 grid game where you place Xs and Os to win.",
      path: "/games/tic-tac-toe",
      bgColor: "bg-game-tictactoe",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3z"></path>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
              <path d="M9 3v18"></path>
              <path d="M15 3v18"></path>
            </svg>
    }
  ];

  return (
    <div className="min-h-[90vh] flex flex-col">
      <div className="bg-gradient-to-b from-game-dark to-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="text-game-teal mb-4 animate-float">
              <Gamepad size={56} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-game-teal to-blue-400 bg-clip-text text-transparent mb-4">
              Welcome to PlayVerse
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl text-gray-300 mb-8">
              Choose a game to play from our collection of classic and modern favorites.
            </p>
            <Link to="/chatbot" className="game-button">
              Need Game Suggestions? Ask Our Chatbot
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Games</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              path={game.path}
              bgColor={game.bgColor}
              icon={game.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
