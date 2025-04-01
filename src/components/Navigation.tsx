
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gamepad, Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chess", path: "/games/chess" },
    { name: "Ludo", path: "/games/ludo" },
    { name: "Snake & Ladder", path: "/games/snake-and-ladder" },
    { name: "Tic Tac Toe", path: "/games/tic-tac-toe" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-game-dark/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-game-teal">
            <Gamepad className="h-7 w-7" />
            <span className="text-xl font-bold">PlayVerse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/chatbot" className="nav-link">
              Chatbot
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block nav-link ${isActive(link.path) ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/profile"
              className="block nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/chatbot"
              className="block nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatbot
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
