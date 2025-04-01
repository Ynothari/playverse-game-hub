
import { useState, useEffect } from "react";

interface ChatbotMessageProps {
  message: string;
  isBot: boolean;
}

const ChatbotMessage = ({ message, isBot }: ChatbotMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the message to create a typing effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, isBot ? 600 : 100);

    return () => clearTimeout(timeout);
  }, [isBot]);

  return (
    <div
      className={`max-w-[80%] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isBot ? "self-start" : "self-end"}`}
    >
      <div
        className={`rounded-2xl px-4 py-3 ${
          isBot
            ? "bg-secondary text-gray-100"
            : "bg-game-teal text-gray-900"
        }`}
      >
        <p className="text-sm md:text-base">{message}</p>
      </div>
      <div className="text-xs text-gray-500 mt-1 px-2">
        {isBot ? "Advisor" : "You"}
      </div>
    </div>
  );
};

export default ChatbotMessage;
