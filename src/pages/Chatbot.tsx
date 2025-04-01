
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatbotMessage from "@/components/ChatbotMessage";
import { Link } from "react-router-dom";

type Message = {
  text: string;
  isBot: boolean;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your game advisor. Tell me how you're feeling or what type of game you're looking for today, and I'll recommend a game for you!",
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
      text_lower.includes("fun")
    ) {
      return "ludo";
    } else if (
      text_lower.includes("calm") || 
      text_lower.includes("focused") || 
      text_lower.includes("strategic") ||
      text_lower.includes("thoughtful") ||
      text_lower.includes("challenging")
    ) {
      return "chess";
    } else if (
      text_lower.includes("bored") || 
      text_lower.includes("simple") || 
      text_lower.includes("easy") ||
      text_lower.includes("quick")
    ) {
      return "tic-tac-toe";
    } else if (
      text_lower.includes("adventurous") || 
      text_lower.includes("random") || 
      text_lower.includes("chance") ||
      text_lower.includes("luck")
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
        return "Based on your mood, I think you might enjoy a strategic game of Chess! It's perfect for thoughtful planning and exercising your mind. Would you like to play?";
      case "ludo":
        return "You seem like you're in the mood for something fun and social! Ludo would be a great choice with its mix of luck and light strategy. Want to give it a try?";
      case "snake-and-ladder":
        return "How about trying Snake & Ladder? It's a game of chance with exciting ups and downs - perfect for an adventurous mood! Would you like to play?";
      case "tic-tac-toe":
        return "I think Tic Tac Toe would be perfect for you right now! It's quick, simple, and always fun. Would you like to play a round?";
      default:
        return "I'm not sure what game would suit you best. Why not browse our collection and see what catches your eye?";
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
        const recommendationMessage: Message = {
          text: `Would you like to play ${gameRecommendation === "snake-and-ladder" ? "Snake & Ladder" : 
                 gameRecommendation === "tic-tac-toe" ? "Tic Tac Toe" : 
                 gameRecommendation.charAt(0).toUpperCase() + gameRecommendation.slice(1)}?`,
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
      <h1 className="text-3xl font-bold mb-8 text-center">Game Advisor</h1>
      
      <div className="max-w-2xl mx-auto bg-card rounded-xl overflow-hidden">
        <div 
          ref={chatContainerRef}
          className="h-[500px] overflow-y-auto p-4 flex flex-col gap-4"
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
              <Link to="/games/chess" className="bg-game-chess px-4 py-2 rounded-lg hover:opacity-90">
                Chess
              </Link>
              <Link to="/games/ludo" className="bg-game-ludo px-4 py-2 rounded-lg hover:opacity-90">
                Ludo
              </Link>
              <Link to="/games/snake-and-ladder" className="bg-game-snake px-4 py-2 rounded-lg hover:opacity-90">
                Snake & Ladder
              </Link>
              <Link to="/games/tic-tac-toe" className="bg-game-tictactoe px-4 py-2 rounded-lg hover:opacity-90">
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
              placeholder="Tell me how you're feeling or what game you're looking for..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || input.trim() === ""}
              className={`bg-game-teal text-game-dark rounded-lg p-3 ${
                isLoading || input.trim() === ""
                  ? "opacity-50"
                  : "hover:opacity-90"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
