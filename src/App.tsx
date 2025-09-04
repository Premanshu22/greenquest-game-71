import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EcoMissions from "./pages/EcoMissions";
import EcoShop from "./pages/EcoShop";
import Forum from "./pages/Forum";
import ImpactTracker from "./pages/ImpactTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <div className="min-h-screen">
      <div className="floating-leaves"></div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/eco-missions" element={<EcoMissions />} />
        <Route path="/eco-shop" element={<EcoShop />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/impact-tracker" element={<ImpactTracker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;