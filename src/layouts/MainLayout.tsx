
import { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-game-dark to-gray-900 relative overflow-hidden">
      {/* Background particles/elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-full bg-game-teal/5 blur-3xl"></div>
        <div className="absolute top-[30%] right-[10%] w-60 h-60 rounded-full bg-game-chess/10 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[15%] w-80 h-80 rounded-full bg-game-ludo/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-40 h-40 rounded-full bg-game-snake/10 blur-3xl"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-radial-gradient"></div>
      </div>
      
      <Navigation />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
