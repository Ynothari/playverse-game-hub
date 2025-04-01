
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  path: string;
  bgColor: string;
  icon: React.ReactNode;
}

const GameCard = ({ title, description, path, bgColor, icon }: GameCardProps) => {
  return (
    <div className="game-card">
      <div className={`p-6 ${bgColor} h-full flex flex-col justify-between`}>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <p className="text-gray-300 my-4">{description}</p>
        
        <Link to={path} className="game-button mt-4 inline-block text-center w-full md:w-auto">
          <div className="flex items-center justify-center gap-2">
            <Play size={18} />
            <span>Play Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
