
import { useState } from "react";
import { User, Settings, Heart } from "lucide-react";

const Profile = () => {
  const [username, setUsername] = useState("Player1");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const gameStats = [
    { game: "Chess", played: 12, won: 5 },
    { game: "Ludo", played: 8, won: 3 },
    { game: "Snake & Ladder", played: 15, won: 8 },
    { game: "Tic Tac Toe", played: 24, won: 14 },
  ];

  const achievements = [
    { name: "First Win", description: "Win your first game", unlocked: true },
    { name: "Chess Master", description: "Win 10 Chess games", unlocked: false },
    { name: "Game Enthusiast", description: "Play all available games", unlocked: true },
    { name: "Multiplayer Fan", description: "Play 5 multiplayer games", unlocked: false },
  ];

  const handleSaveUsername = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Player Profile</h1>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={64} className="text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
                      autoFocus
                    />
                    <button 
                      onClick={handleSaveUsername}
                      className="bg-game-teal text-game-dark px-4 py-2 rounded-lg hover:bg-opacity-90"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => {
                        setTempUsername(username);
                        setIsEditing(false);
                      }}
                      className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-opacity-90"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-game-teal hover:underline flex items-center gap-1"
                    >
                      <Settings size={12} />
                      Edit
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-gray-400 text-sm">Games Played</p>
                  <p className="text-xl font-semibold">
                    {gameStats.reduce((sum, stat) => sum + stat.played, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-gray-400 text-sm">Games Won</p>
                  <p className="text-xl font-semibold">
                    {gameStats.reduce((sum, stat) => sum + stat.won, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-gray-400 text-sm">Win Rate</p>
                  <p className="text-xl font-semibold">
                    {Math.round(
                      (gameStats.reduce((sum, stat) => sum + stat.won, 0) /
                        gameStats.reduce((sum, stat) => sum + stat.played, 0)) *
                        100
                    )}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Game Statistics</h3>
            <div className="space-y-4">
              {gameStats.map((stat) => (
                <div key={stat.game} className="flex justify-between">
                  <span>{stat.game}</span>
                  <div className="flex gap-4">
                    <span className="text-gray-400">
                      {stat.won} / {stat.played} Won
                    </span>
                    <span className="text-game-teal">
                      {Math.round((stat.won / stat.played) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-3 rounded-lg ${
                    achievement.unlocked
                      ? "bg-game-teal/20"
                      : "bg-gray-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {achievement.unlocked ? (
                      <Heart
                        size={18}
                        className="text-game-teal"
                        fill="currentColor"
                      />
                    ) : (
                      <Heart size={18} className="text-gray-500" />
                    )}
                    <span
                      className={
                        achievement.unlocked
                          ? "font-semibold"
                          : "text-gray-400"
                      }
                    >
                      {achievement.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 ml-6">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
