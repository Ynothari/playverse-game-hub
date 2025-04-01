
import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles } from "lucide-react";
import ChatbotMessage from "@/components/ChatbotMessage";
import { Link } from "react-router-dom";

type Message = {
  text: string;
  isBot: boolean;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your PlayVerse Game Advisor. Feeling competitive, relaxed, or somewhere in between? Tell me your mood or gaming preferences, and I'll recommend the perfect game for you!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeSentiment = (text: string): string => {
    const text_lower = text.toLowerCase();
    
    // Check for explicit game mentions
    if (text_lower.includes("chess") || text_lower.includes("strategy") || text_lower.includes("thinking")) {
      return "chess";
    } else if (text_lower.includes("ludo") || text_lower.includes("dice") || text_lower.includes("board game")) {
      return "ludo";
    } else if (text_lower.includes("snake") || text_lower.includes("ladder") || text_lower.includes("luck")) {
      return "snake-and-ladder";
    } else if (text_lower.includes("tic") || text_lower.includes("tac") || text_lower.includes("toe") || text_lower.includes("quick")) {
      return "tic-tac-toe";
    }
    
    // Check for emotional states or preferences
    if (
      text_lower.includes("happy") || 
      text_lower.includes("excited") || 
      text_lower.includes("energetic") ||
      text_lower.includes("fun") ||
      text_lower.includes("social") ||
      text_lower.includes("friends") ||
      text_lower.includes("party")
    ) {
      return "ludo";
    } else if (
      text_lower.includes("calm") || 
      text_lower.includes("focused") || 
      text_lower.includes("strategic") ||
      text_lower.includes("thoughtful") ||
      text_lower.includes("challenging") ||
      text_lower.includes("complex") ||
      text_lower.includes("intellectual")
    ) {
      return "chess";
    } else if (
      text_lower.includes("bored") || 
      text_lower.includes("simple") || 
      text_lower.includes("easy") ||
      text_lower.includes("quick") ||
      text_lower.includes("casual") ||
      text_lower.includes("fast")
    ) {
      return "tic-tac-toe";
    } else if (
      text_lower.includes("adventurous") || 
      text_lower.includes("random") || 
      text_lower.includes("chance") ||
      text_lower.includes("luck") ||
      text_lower.includes("unpredictable") ||
      text_lower.includes("exciting")
    ) {
      return "snake-and-ladder";
    }
    
    // Default recommendation based on word count
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 3) {
      return "tic-tac-toe"; // Quick and simple for short messages
    } else if (wordCount < 6) {
      return "snake-and-ladder"; // Middle range complexity
    } else if (wordCount < 10) {
      return "ludo"; // More complex for medium messages
    } else {
      return "chess"; // Most complex for long messages
    }
  };

  const getGameResponse = (gameType: string): string => {
    switch (gameType) {
      case "chess":
        return "Based on what you've shared, I think Chess would be perfect for you! It's a strategic battle of minds that rewards careful planning and foresight. Each piece has unique movement patterns, creating endless possibilities on the board. Would you like to challenge yourself with a game?";
      case "ludo":
        return "You seem like you're in the mood for something fun and social! Ludo is ideal with its perfect blend of luck and strategy. Roll the dice, move your tokens, and race to get all four home before your opponents. It's colorful, exciting, and brings people together. Ready to roll?";
      case "snake-and-ladder":
        return "I'd recommend Snake & Ladder for you! It's a thrilling game of ups and downs where fortune can change in an instant. Climb the ladders to advance quickly, but watch out for those sneaky snakes that send you sliding back. It's pure excitement with every roll of the dice!";
      case "tic-tac-toe":
        return "Tic Tac Toe would be perfect for you right now! It's quick, straightforward, and satisfying. Place your X or O strategically to create a line of three while blocking your opponent. It's the ultimate pick-up-and-play game when you want something engaging but not time-consuming.";
      default:
        return "I'm not quite sure which game would suit you best. Why not browse our collection and see what catches your eye? We have options ranging from quick casual games to deep strategic challenges.";
    }
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate processing time
    setTimeout(() => {
      const gameRecommendation = analyzeSentiment(userMessage.text);
      const botResponse = getGameResponse(gameRecommendation);
      
      const botMessage: Message = {
        text: botResponse,
        isBot: true,
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Add game recommendation link after a short delay
      setTimeout(() => {
        let gameName = "";
        if (gameRecommendation === "snake-and-ladder") {
          gameName = "Snake & Ladder";
        } else if (gameRecommendation === "tic-tac-toe") {
          gameName = "Tic Tac Toe";
        } else {
          gameName = gameRecommendation.charAt(0).toUpperCase() + gameRecommendation.slice(1);
        }
        
        const recommendationMessage: Message = {
          text: `Would you like to play ${gameName} now? Just click the button below!`,
          isBot: true,
        };
        
        setMessages((prev) => [...prev, recommendationMessage]);
        setIsLoading(false);
      }, 1000);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-game-teal via-white to-game-teal bg-clip-text text-transparent">Game Advisor</h1>
      <p className="text-gray-400 text-center mb-8">Tell me how you're feeling, and I'll recommend the perfect game for you</p>
      
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg shadow-game-teal/10">
        <div className="flex items-center gap-2 bg-gray-800/80 p-3 border-b border-gray-700">
          <Bot size={18} className="text-game-teal" />
          <span className="font-medium">PlayVerse AI Advisor</span>
          <span className="text-xs bg-game-teal/20 text-game-teal px-2 py-0.5 rounded-full ml-auto flex items-center gap-1">
            <Sparkles size={10} />
            <span>Active</span>
          </span>
        </div>
        
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0,transparent_70%)]"
        >
          {messages.map((message, index) => (
            <ChatbotMessage 
              key={index} 
              message={message.text} 
              isBot={message.isBot} 
            />
          ))}
          
          {isLoading && (
            <div className="self-start bg-secondary text-gray-100 rounded-2xl px-4 py-3">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-game-teal animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-game-teal animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-game-teal animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          
          {messages.length > 1 && messages[messages.length - 1].isBot && messages[messages.length - 1].text.includes("Would you like to play") && (
            <div className="self-center flex flex-wrap gap-2 mt-2">
              <Link to="/games/chess" className="bg-game-chess hover:bg-game-chess/80 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
                Chess
              </Link>
              <Link to="/games/ludo" className="bg-game-ludo hover:bg-game-ludo/80 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
                Ludo
              </Link>
              <Link to="/games/snake-and-ladder" className="bg-game-snake hover:bg-game-snake/80 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
                Snake & Ladder
              </Link>
              <Link to="/games/tic-tac-toe" className="bg-game-tictactoe hover:bg-game-tictactoe/80 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
                Tic Tac Toe
              </Link>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="How are you feeling today? Or what kind of game do you want to play?"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-game-teal focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || input.trim() === ""}
              className={`bg-game-teal text-game-dark rounded-lg p-3 transition-all duration-200 ${
                isLoading || input.trim() === ""
                  ? "opacity-50"
                  : "hover:opacity-90 hover:shadow-md hover:shadow-game-teal/30"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 max-w-2xl mx-auto">
        <p className="text-center text-sm text-gray-400">
          Try asking about your mood like "I'm feeling strategic" or "I want something quick and fun" 
          <br />or directly mention a game like "I want to play Chess" or "Show me Ludo"
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
