import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { DemoProvider } from "@/contexts/DemoContext";
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
import Achievements from "./pages/Achievements";
import StudentDashboard from "./pages/StudentDashboard";
import Integration from "./pages/Integration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount, error) => {
        console.log('Query retry:', { failureCount, error });
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

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
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/integration" element={<Integration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  console.log('App component mounting');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DemoProvider>
            <AppContent />
          </DemoProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;