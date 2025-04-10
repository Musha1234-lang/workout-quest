
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

// Pages
import Dashboard from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import Progress from "./pages/Progress";
import Habits from "./pages/Habits";
import Nutrition from "./pages/Nutrition";
import Recovery from "./pages/Recovery";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* App Routes */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="workouts/details/:id" element={<WorkoutDetail />} />
            <Route path="progress" element={<Progress />} />
            <Route path="habits" element={<Habits />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="recovery" element={<Recovery />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
