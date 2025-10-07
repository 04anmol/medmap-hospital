import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LiveRequests from "./pages/LiveRequests";
import Beds from "./pages/Beds";
import BloodBank from "./pages/BloodBank";
import Oxygen from "./pages/Oxygen";
import Ambulances from "./pages/Ambulances";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/requests" element={<DashboardLayout><LiveRequests /></DashboardLayout>} />
          <Route path="/beds" element={<DashboardLayout><Beds /></DashboardLayout>} />
          <Route path="/blood" element={<DashboardLayout><BloodBank /></DashboardLayout>} />
          <Route path="/oxygen" element={<DashboardLayout><Oxygen /></DashboardLayout>} />
          <Route path="/ambulances" element={<DashboardLayout><Ambulances /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
