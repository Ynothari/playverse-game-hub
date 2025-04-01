
import { useState } from "react";
import { User, Settings, Heart, History, Trophy, Star, Award, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Profile = () => {
  const [username, setUsername] = useState("Player1");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  // Updated game statistics with realistic values that match
  const gameStats = [
    { game: "Chess", played: 0, won: 0, lastPlayed: "-" },
    { game: "Ludo", played: 0, won: 0, lastPlayed: "-" },
    { game: "Snake & Ladder", played: 0, won: 0, lastPlayed: "-" },
    { game: "Tic Tac Toe", played: 0, won: 0, lastPlayed: "-" },
  ];

  const recentGames: {
    game: string;
    result: "Won" | "Lost" | "-";
    opponent: string;
    date: string;
    duration: string;
  }[] = [];

  const achievements = [
    { name: "First Win", description: "Win your first game", unlocked: false, progress: "0/1" },
    { name: "Chess Master", description: "Win 10 Chess games", unlocked: false, progress: "0/10" },
    { name: "Game Enthusiast", description: "Play all available games", unlocked: false, progress: "0/4" },
    { name: "Multiplayer Fan", description: "Play 5 multiplayer games", unlocked: false, progress: "0/5" },
    { name: "Strategic Mind", description: "Win 3 games in a row", unlocked: false, progress: "0/3" },
    { name: "Quick Thinker", description: "Win a game in under 2 minutes", unlocked: false, progress: "0/1" },
  ];

  const handleSaveUsername = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div 
          className="bg-gradient-to-r from-game-dark to-gray-900 rounded-xl p-6 mb-8 border border-gray-800 shadow-lg shadow-game-teal/10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.8)), url('/lovable-uploads/428ec2c3-e9f7-49c3-aea1-78b10caa07c1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-game-teal/30 to-game-teal/10 flex items-center justify-center border-2 border-game-teal animate-pulse-glow">
              <User size={64} className="text-game-teal" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg focus:border-game-teal focus:outline-none"
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
                <div className="bg-gray-800/80 px-5 py-3 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-game-teal" />
                    <p className="text-gray-400 text-sm">Games Won</p>
                  </div>
                  <p className="text-xl font-semibold mt-1">
                    {gameStats.reduce((sum, stat) => sum + stat.won, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-800/80 px-5 py-3 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <History size={18} className="text-game-teal" />
                    <p className="text-gray-400 text-sm">Games Played</p>
                  </div>
                  <p className="text-xl font-semibold mt-1">
                    {gameStats.reduce((sum, stat) => sum + stat.played, 0)}
                  </p>
                </div>
                
                <div className="bg-gray-800/80 px-5 py-3 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="text-game-teal" />
                    <p className="text-gray-400 text-sm">Win Rate</p>
                  </div>
                  <p className="text-xl font-semibold mt-1">
                    {gameStats.reduce((sum, stat) => sum + stat.played, 0) > 0
                      ? Math.round(
                          (gameStats.reduce((sum, stat) => sum + stat.won, 0) /
                            gameStats.reduce((sum, stat) => sum + stat.played, 0)) *
                            100
                        )
                      : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-gray-900">
            <TabsTrigger value="overview" className="data-[state=active]:bg-game-teal/20 data-[state=active]:text-game-teal">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-game-teal/20 data-[state=active]:text-game-teal">
              Game History
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-game-teal/20 data-[state=active]:text-game-teal">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-game-teal/20 data-[state=active]:text-game-teal">
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border border-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History size={20} className="text-game-teal" />
                    Recent Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {recentGames.length > 0 ? (
                    <div className="space-y-4">
                      {recentGames.slice(0, 3).map((game, index) => (
                        <div key={index} className="flex justify-between border-b border-gray-800 pb-2 last:border-0">
                          <div>
                            <p className="font-medium">{game.game}</p>
                            <p className="text-sm text-gray-400">vs {game.opponent}</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium ${game.result === "Won" ? "text-green-400" : game.result === "Lost" ? "text-red-400" : "text-gray-400"}`}>
                              {game.result}
                            </p>
                            <p className="text-sm text-gray-400">{game.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>No recent games played</p>
                      <p className="text-sm mt-2">Start playing games to see your history</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border border-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award size={20} className="text-game-teal" />
                    Latest Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.filter(a => a.unlocked).length > 0 ? (
                    <div className="space-y-4">
                      {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement, index) => (
                        <div key={index} className="border-b border-gray-800 pb-2 last:border-0">
                          <div className="flex items-center gap-2">
                            <Heart
                              size={18}
                              className="text-game-teal"
                              fill="currentColor"
                            />
                            <span className="font-medium">{achievement.name}</span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1 ml-6">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>No achievements unlocked yet</p>
                      <p className="text-sm mt-2">Keep playing to earn achievements</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-card border border-gray-800 shadow-md md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy size={20} className="text-game-teal" />
                    Game Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gameStats.map((stat, index) => (
                      <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                        <p className="font-medium text-lg">{stat.game}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Played:</span>
                            <span>{stat.played}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Won:</span>
                            <span className="text-green-400">{stat.won}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Win Rate:</span>
                            <span className="text-game-teal">{stat.played > 0 ? Math.round((stat.won / stat.played) * 100) : 0}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-card border border-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History size={20} className="text-game-teal" />
                  Game History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentGames.length > 0 ? (
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Game</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Opponent</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentGames.map((game, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{game.game}</TableCell>
                            <TableCell className={game.result === "Won" ? "text-green-400" : game.result === "Lost" ? "text-red-400" : "text-gray-400"}>
                              {game.result}
                            </TableCell>
                            <TableCell>{game.opponent}</TableCell>
                            <TableCell>{game.date}</TableCell>
                            <TableCell>{game.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-500">
                    <p>No game history yet</p>
                    <p className="text-sm mt-2">Play some games to see your history here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border border-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy size={20} className="text-game-teal" />
                    Detailed Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {gameStats.map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">{stat.game}</h3>
                          <span className="text-sm text-gray-400">Last played: {stat.lastPlayed}</span>
                        </div>
                        <div className="bg-gray-800 h-2 rounded-full">
                          <div 
                            className="bg-game-teal h-2 rounded-full" 
                            style={{ width: `${stat.played > 0 ? Math.round((stat.won / stat.played) * 100) : 0}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Win rate: {stat.played > 0 ? Math.round((stat.won / stat.played) * 100) : 0}%</span>
                          <span>{stat.won} / {stat.played}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border border-gray-800 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock size={20} className="text-game-teal" />
                    Playing Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Total playing time</h3>
                      <div className="text-3xl font-semibold text-game-teal">0 hours</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Chess</p>
                        <p className="font-medium mt-1">0 hours</p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Ludo</p>
                        <p className="font-medium mt-1">0 hours</p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Snake & Ladder</p>
                        <p className="font-medium mt-1">0 hours</p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400">Tic Tac Toe</p>
                        <p className="font-medium mt-1">0 hours</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card className="bg-card border border-gray-800 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} className="text-game-teal" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        achievement.unlocked
                          ? "bg-game-teal/20 border border-game-teal/30"
                          : "bg-gray-800/50 border border-gray-700"
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
                      {achievement.unlocked ? (
                        <p className="text-xs text-game-teal mt-2 ml-6">
                          Unlocked
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-2 ml-6">
                          Progress: {achievement.progress}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
