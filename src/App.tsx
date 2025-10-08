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
import Patients from "./pages/Patients";
import Admissions from "./pages/Admissions";
import Discharges from "./pages/Discharges";
import MedicalRecords from "./pages/MedicalRecords";
import Emergency from "./pages/Emergency";
import Pharmacy from "./pages/Pharmacy";
import Staff from "./pages/Staff";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Database from "./pages/Database";
import Surgery from "./pages/Surgery";
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
          
          {/* Core Operations */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/requests" element={<DashboardLayout><LiveRequests /></DashboardLayout>} />
          
          {/* Patient Management */}
          <Route path="/patients" element={<DashboardLayout><Patients /></DashboardLayout>} />
          <Route path="/admissions" element={<DashboardLayout><Admissions /></DashboardLayout>} />
          <Route path="/discharges" element={<DashboardLayout><Discharges /></DashboardLayout>} />
          <Route path="/records" element={<DashboardLayout><MedicalRecords /></DashboardLayout>} />
          
          {/* Resource Management */}
          <Route path="/beds" element={<DashboardLayout><Beds /></DashboardLayout>} />
          <Route path="/blood" element={<DashboardLayout><BloodBank /></DashboardLayout>} />
          <Route path="/oxygen" element={<DashboardLayout><Oxygen /></DashboardLayout>} />
          <Route path="/ambulances" element={<DashboardLayout><Ambulances /></DashboardLayout>} />
          <Route path="/pharmacy" element={<DashboardLayout><Pharmacy /></DashboardLayout>} />
          
          {/* Medical Services */}
          <Route path="/emergency" element={<DashboardLayout><Emergency /></DashboardLayout>} />
          <Route path="/surgery" element={<DashboardLayout><Surgery /></DashboardLayout>} />
          
          {/* Operations & Analytics */}
          <Route path="/staff" element={<DashboardLayout><Staff /></DashboardLayout>} />
          <Route path="/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
          
          {/* System */}
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/database" element={<DashboardLayout><Database /></DashboardLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
