
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Index from "@/pages/Index";
import Chess from "@/pages/games/Chess";
import Ludo from "@/pages/games/Ludo";
import SnakeAndLadder from "@/pages/games/SnakeAndLadder";
import TicTacToe from "@/pages/games/TicTacToe";
import Profile from "@/pages/Profile";
import Chatbot from "@/pages/Chatbot";
import NotFound from "@/pages/NotFound";

const App = () => {
  // Create QueryClient inside the component
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/games/chess" element={<Chess />} />
              <Route path="/games/ludo" element={<Ludo />} />
              <Route path="/games/snake-and-ladder" element={<SnakeAndLadder />} />
              <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
