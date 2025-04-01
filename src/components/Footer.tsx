
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card mt-auto py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-game-teal">PlayVerse</h3>
            <p className="text-gray-400 mt-1">Classic games reimagined</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <h4 className="font-medium mb-2">Games</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><Link to="/games/chess" className="hover:text-game-teal">Chess</Link></li>
                <li><Link to="/games/ludo" className="hover:text-game-teal">Ludo</Link></li>
                <li><Link to="/games/snake-and-ladder" className="hover:text-game-teal">Snake & Ladder</Link></li>
                <li><Link to="/games/tic-tac-toe" className="hover:text-game-teal">Tic Tac Toe</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Account</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><Link to="/profile" className="hover:text-game-teal">Profile</Link></li>
                <li><Link to="/chatbot" className="hover:text-game-teal">Game Advisor</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} PlayVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
